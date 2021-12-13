import { Instructions } from '../Instructions'
import {
  StyleBackgroundColor,
  StyleColor,
  StyleTextDecoration,
  StyleUtilities,
} from '../typings/enums'
import {
  IElementList,
  IElementParagraph,
  IInstruction,
  IStyleRules
} from '../typings/interfaces'
import {
  TContent,
  TInstructionName,
  TLogPrefix,
  TNumericRule,
  TTag
} from '../typings/types'
import { Instruction } from './Instruction'
import { InstructionStack } from './InstructionStack'

/**
 * The valid props to pass a new Element instance.
 */
type InputProps = TTag | IElementList | IElementParagraph

/**
 * The Element class.
 * @author CasperSocio
 * @version 0.0.5
 * @since 0.0.1
 */
 export class Element {
  private _activeStyles: IInstruction[]
  private _content: TContent
  private _stack
  private _log: [TLogPrefix, string][]
  private _style: IStyleRules
  private _tag

  constructor(input: InputProps) {
    this._activeStyles = []
    this._log = []
    this._stack = new InstructionStack()
    this._style = {}

    if (typeof input === 'string') {
      this._tag = input
      this._content = ''
    } else {
      this._tag = input.tag
      switch (this._tag) {
        case 'ol':
        case 'ul':
          this._content = input.content || []
          break
        case 'p':
        default:
          this._content = input.content || ''
          break
      }
    }

  }

  public set content(content: TContent) {
    this.log('LOG', 'Setting new content')
    this._content = content
  }

  public set style(rules: IStyleRules) {
    this.log('LOG', 'Setting new style rules')
    this._style = rules
  }

  /**
   * Adds a new instruction to this._activeStyles.
   * @author CasperSocio
   * @version 0.0.5
   * @param instruction The instruction to add
   * @since 0.0.5
   * @private
   */
  private activateStyle(instruction: IInstruction) {
    let exists: boolean = false
    this._activeStyles.forEach(style => {
      if (style.name === instruction.name) {
        exists = true
      }
    })
    if (!exists) {
      this.log('LOG', 'Activating ' + instruction.name)
      this._activeStyles.push(instruction)
    }
  }

  /**
   * Adds new CONTENT instructions to the stack.
   * @author CasperSocio
   * @version 0.0.3
   * @since 0.0.1
   * @private
   */
  private addContent() {
    this.log('ACT', 'ADDING CONTENT [START]')

    if (typeof this._content !== 'string') {
      this._content.forEach(content => {
        this.addToStack(new Instruction('CONTENT', content))
      })
    } else {
      let contentNode = Instructions.CONTENT
      contentNode.value = this._content
      this.addToStack(contentNode)
    }
    this.log('ACT', 'ADDING CONTENT [END]')
  }

  /**
   * Adds a new styling instruction to the stack whos value can be a number or 'none'.
   * @author CasperSocio
   * @version 0.0.3
   * @param rule this._style.<rule>
   * @param instruction Instructions.<instruction>
   * @since 0.0.3
   * @private
   */
  private addNumberValueInstruction(rule: TNumericRule, instruction: IInstruction) {
    // Applies rule even if value is 0
    if (rule !== undefined) {
      // Remove matching rules
      this.removeFromStack(instruction.name)

      if (rule !== 'none') {
        for (let i = 0; i < rule; i++) {
          this.addToStack(Instructions[instruction.name])
        }
      }
    }
  }

  /**
   * Adds a new instruction to the stack.
   * @author CasperSocio
   * @version 0.0.3
   * @param instruction The instruction to add
   * @since 0.0.3
   * @private
   */
  private addToStack(instruction: IInstruction, value?: number | string) {
    this.log('INS', [
      StyleTextDecoration.strong,
      StyleColor.green,
      'ADD ',
      StyleBackgroundColor.green,
      StyleColor.black,
      ' ' + instruction.name + ' ',
      StyleUtilities.reset
    ].join(''))
    this._stack.add(instruction, value)
  }

  /**
   * Adds new styling instructions to the stack.
   * @author CasperSocio
   * @version 0.0.5
   * @since 0.0.1
   * @private
   */
  private applyStyling() {
    this.log('ACT', 'APPLYING STYLES [START]')

    // Background-color
    if (this._style.backgroundColor) {
      let bgStyle = Instructions.BACKGROUND_COLOR
      bgStyle.value = StyleBackgroundColor[this._style.backgroundColor]
      this.addToStack(bgStyle)
      this.addToStack(Instructions.PADDING_LEFT)
      this.addToStack(Instructions.PADDING_RIGHT)
      this.removeFromStack('RESET')
      this.addToStack(Instructions.RESET)
    }

    // Color
    if (this._style.color) {
      let colorStyle = Instructions.COLOR
      colorStyle.value = StyleColor[this._style.color]
      this.addToStack(colorStyle)
      this.removeFromStack('RESET')
      this.addToStack(Instructions.RESET)
    }

    // Margin
    if (this._style.margin) {
      for (let i = 0; i < this._style.margin; i++) {
        this.addToStack(Instructions.MARGIN_BOTTOM)
        this.addToStack(Instructions.MARGIN_LEFT)
        this.addToStack(Instructions.MARGIN_RIGHT)
        this.addToStack(Instructions.MARGIN_TOP)
      }
    }
    // Margin-bottom
    this.addNumberValueInstruction(this._style.marginBottom, Instructions.MARGIN_BOTTOM)
    // Margin-left
    this.addNumberValueInstruction(this._style.marginLeft, Instructions.MARGIN_LEFT)
    // Margin-right
    this.addNumberValueInstruction(this._style.marginRight, Instructions.MARGIN_RIGHT)
    // Margin-top
    this.addNumberValueInstruction(this._style.marginTop, Instructions.MARGIN_TOP)

    // Padding-left
    this.addNumberValueInstruction(this._style.paddingLeft, Instructions.PADDING_LEFT)
    // Padding-right
    this.addNumberValueInstruction(this._style.paddingRight, Instructions.PADDING_RIGHT)

    // Text-align
    this._style.textAlign && this.addToStack(Instructions[`TEXT_ALIGN_${this._style.textAlign.toUpperCase()}`])

    // Text-decoration
    this._style.textDecoration && this.addToStack(Instructions[`TEXT_DECORATION_${this._style.textDecoration.toUpperCase()}`])

    // Text-transform
    this._style.textTransform && this.addToStack(Instructions[`TEXT_TRANSFORM_${this._style.textTransform.toUpperCase()}`])

    // Width
    if (this._style.width !== undefined) {

      // Find the total length of content + padding
      let preWidth: number = this._content.length
      let hasBackgroundPaddingLeft: boolean,
          hasBackgroundPaddingRight: boolean

      hasBackgroundPaddingLeft = (
        this._style.backgroundColor && !this._style.paddingLeft
        ? true
        : false
      )
      hasBackgroundPaddingRight = (
        this._style.backgroundColor && !this._style.paddingRight
        ? true
        : false
      )

      if (hasBackgroundPaddingLeft || hasBackgroundPaddingRight)
        preWidth++
      if (this._style.paddingLeft && typeof this._style.paddingLeft === 'number')
        preWidth += this._style.paddingLeft
      if (this._style.paddingRight && typeof this._style.paddingRight === 'number')
        preWidth += this._style.paddingRight

      // Only add width if (width > content.length + padding)
      if (preWidth < this._style.width) {
        // Add 'WIDTH' instructions
        this.addToStack(Instructions.WIDTH, this._style.width - preWidth)
      }
    }

    this.log('ACT', 'APPLYING STYLES [END]')
  }

  /**
   * Removes an instruction from this._activeStyles.
   * @author CasperSocio
   * @version 0.0.5
   * @param instruction The instruction to remove
   * @since 0.0.5
   * @private
   */
  private deactivateStyle(instruction: IInstruction) {
    let newActiveStyles: IInstruction[] = []
    this._activeStyles.forEach(style => {
      if (style === instruction) {
        this.log('LOG', 'Deactivating ' + instruction.name)
      } else {
        newActiveStyles.push(style)
      }
    })
    this._activeStyles = newActiveStyles
  }

  /**
   * Adds a new log entry.
   * @author CasperSocio
   * @version 0.0.5
   * @param prefix What type of log to use
   * @param msg The string message
   * @since 0.0.1
   * @private
   */
  private log(prefix: TLogPrefix, msg: string) {
    this._log.push([prefix, msg])
  }

  /**
   * Parses the instruction stack and
   * generates the final output string.
   * @author CasperSocio
   * @version 0.0.5
   * @since 0.0.1
   * @private
   */
  private parseInstructions() {
    this.log('ACT', 'PARSING INSTRUCTIONS [START]')
    let output: string[] = []

    // Iterate through the instruction stack
    this._stack.stack.forEach(instruction => {
      this.log('PAR', `${instruction.name}`)

      switch (instruction.name) {
        case 'BACKGROUND_COLOR':
        case 'COLOR':
        case 'TEXT_DECORATION_ITALIC':
        case 'TEXT_DECORATION_STRONG':
        case 'TEXT_DECORATION_UNDERLINE':
          if (instruction.value) {
            output.push(String(instruction.value))
            this.activateStyle(instruction)
          }
          break
        
        case 'CONTENT':
          if (instruction.value) {
            if (this._tag === 'ol' || this._tag === 'ul') {
              output.push(instruction.value + '\n')
            } else {
              output.push(String(instruction.value))
            }
          }
          this.deactivateStyle(Instructions.COLOR)
          this.deactivateStyle(Instructions.TEXT_DECORATION_ITALIC)
          this.deactivateStyle(Instructions.TEXT_DECORATION_STRONG)
          this.deactivateStyle(Instructions.TEXT_DECORATION_UNDERLINE)
          output.push(this.updateStyles())
          break

        case 'TEXT_TRANSFORM_CAPITALIZE':
          this._stack.findAndReplaceValue({
            name: 'CONTENT',
            callback: (value: string) => (
              value.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')
            )
          })
          break

        case 'TEXT_TRANSFORM_LOWERCASE':
          this._stack.findAndReplaceValue({
            name: 'CONTENT',
            callback: (value: string) => value.toLowerCase()
          })
          break

        case 'TEXT_TRANSFORM_UPPERCASE':
          this._stack.findAndReplaceValue({
            name: 'CONTENT',
            callback: value => value.toUpperCase()
          })
          break

        case 'RESET':
          this.deactivateStyle(Instructions.BACKGROUND_COLOR)
          output.push(this.updateStyles())
          break

        case 'WIDTH':
          if (instruction.value) {
            for (let i = 1; i < instruction.value; i++) {
              output.push(' ')
            }
          }
          break
      
        default:
          instruction.value && typeof instruction.value === 'string' && output.push(instruction.value)
          break
      }
    })
    this.log('ACT', 'PARSING INSTRUCTIONS [END]')
    return output.join('')
  }

  /**
   * Prints the final output string.
   * @author CasperSocio
   * @version 0.0.3
   * @since 0.0.1
   * @public
   */
  public print() {
    this.log('ACT', 'PRINTING ELEMENT [START]')
    this._stack.reset()
    this.addContent()
    this.applyStyling()
    this._stack.sort()
    console.log(this.parseInstructions())
    this.log('ACT', 'PRINTING ELEMENT [END]')
  }

  /**
   * Removes matching instructions from the stack.
   * @author CasperSocio
   * @version 0.0.3
   * @param name The instruction to add
   * @since 0.0.3
   * @private
   */
  private removeFromStack(name: TInstructionName) {
    this.log('INS', [
      StyleTextDecoration.strong,
      StyleColor.red,
      'DEL ',
      StyleBackgroundColor.red,
      StyleColor.white,
      ' ' + name + ' ',
      StyleUtilities.reset
    ].join(''))
    this._stack.findAndRemoveInstruction(name)
  }

  /**
   * Prints instruction stack.
   * @author CasperSocio
   * @version 0.0.5
   * @since 0.0.2
   * @public
   */
  public showInstructions() {
    console.log('[')
    console.group()
    this._stack.stack.forEach(Instruction => {
      console.log(`{ ${StyleColor.green + Instruction.name + StyleUtilities.reset} }`)
    })
    console.groupEnd()
    console.log(']')
  }

  /**
   * Prints all log entries.
   * @author CasperSocio
   * @version 0.0.5
   * @since 0.0.1
   * @public
   */
  public showLog() {
    let tabSize: number = 0
    this._log.forEach(log => {
      switch (log[0]) {
        case 'ACT':
          if (log[1].includes('[END]') && tabSize > 0) {
            console.groupEnd()
            tabSize--
          }
          console.log(`${StyleColor.blue}[${log[0]}] ${log[1] + StyleUtilities.reset}`)
          if (log[1].includes('[START]')) {
            console.group()
            tabSize++
          }
          break

        case 'PAR':
          console.log(`${StyleColor.yellow}[${log[0]}] ${log[1] + StyleUtilities.reset}`)
          break
      
        default:
          console.log(`[${log[0]}] ${log[1]}`)
          break
      }
    })
  }

  /**
   * Resets formatting and re-applies styling.
   * @author CasperSocio
   * @version 0.0.5
   * @returns The updated formatting as a string
   * @since 0.0.5
   * @private
   */
  private updateStyles() {
    this.log('LOG', 'Updating styles')
    let updatedStyles: string[] = [StyleUtilities.reset]
    this._activeStyles.forEach(style => {
      style.value && updatedStyles.push(String(style.value))
    })
    return updatedStyles.join('')
  }
}
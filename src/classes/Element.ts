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
import { TContent, TInstructionName, TLogPrefix, TNumericRule } from '../typings/types'
import { Instruction } from './Instruction'
import { InstructionStack } from './InstructionStack'

/**
 * The Element class.
 * @author CasperSocio
 * @version 0.0.3
 * @since 0.0.1
 */
 export class Element {
  private _content: TContent
  private _stack
  private _log: string[]
  private _style: IStyleRules
  private _tag

  constructor({
    content,
    tag
  }: IElementList | IElementParagraph) {
    this._stack = new InstructionStack()
    this._log = []
    this._style = {}
    this._tag = tag

    // Initialize this._content
    switch (this._tag) {
      case 'ol':
      case 'ul':
        this._content = content || []
        break
      case 'p':
      default:
        this._content = content || ''
        break
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
  private addToStack(instruction: IInstruction) {
    this.log('INS', [
      StyleTextDecoration.strong,
      StyleColor.green,
      'ADD ',
      StyleBackgroundColor.green,
      StyleColor.black,
      ' ' + instruction.name + ' ',
      StyleUtilities.reset
    ].join(''))
    this._stack.add(instruction)
  }

  /**
   * Adds new styling instructions to the stack.
   * @author CasperSocio
   * @version 0.0.3
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

    // Text-decoration
    if (this._style.textDecoration) {
      switch (this._style.textDecoration) {
        case 'italic':
          this.addToStack(Instructions.TEXT_DECORATION_ITALIC)
          break
        case 'strong':
          this.addToStack(Instructions.TEXT_DECORATION_STRONG)
          break
        case 'underline':
          this.addToStack(Instructions.TEXT_DECORATION_UNDERLINE)
          break
        default:
          break
      }
    }

    // Text-transform
    if (this._style.textTransform) {
      switch (this._style.textTransform) {
        case 'capitalize':
          this.addToStack(Instructions.TEXT_TRANSFORM_CAPITALIZE)
          break
        case 'lowercase':
          this.addToStack(Instructions.TEXT_TRANSFORM_LOWERCASE)
          break
        case 'uppercase':
          this.addToStack(Instructions.TEXT_TRANSFORM_UPPERCASE)
          break
        default:
          break
      }
    }
    this.log('ACT', 'APPLYING STYLES [END]')
  }

  /**
   * Adds a new log entry.
   * @author CasperSocio
   * @version 0.0.1
   * @param prefix What type of log to use
   * @param msg The string message
   * @since 0.0.1
   * @private
   */
  private log(prefix: TLogPrefix, msg: string) {
    if (prefix === 'ACT') {
      this._log.push(`${StyleColor.blue}[${prefix}] ${msg}${StyleUtilities.reset}`)
    } else {
      this._log.push(`[${prefix}] ${msg}`)
    }
  }

  /**
   * Parses the instruction stack and
   * generates the final output string.
   * @author CasperSocio
   * @version 0.0.3
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
        case 'CONTENT':
          if (instruction.value) {
            if (this._tag === 'ol' || this._tag === 'ul') {
              output.push(instruction.value + '\n')
              break
            }
            output.push(instruction.value)
          }
          break

        case 'TEXT_TRANSFORM_CAPITALIZE':
          this._stack.findAndReplaceValue('CONTENT', value => (
            value.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')
          ))
          break

        case 'TEXT_TRANSFORM_LOWERCASE':
          this._stack.findAndReplaceValue('CONTENT', value => value.toLowerCase())
          break

        case 'TEXT_TRANSFORM_UPPERCASE':
          this._stack.findAndReplaceValue('CONTENT', value => value.toUpperCase())
          break
      
        default:
          instruction.value && output.push(instruction.value)
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
   * @version 0.0.3
   * @since 0.0.2
   * @public
   */
  public showInstructions() {
    console.log(this._stack.stack)
  }

  /**
   * Prints all log entries.
   * @author CasperSocio
   * @version 0.0.1
   * @since 0.0.1
   * @public
   */
  public showLog() {
    this._log.forEach(log => {
      console.log(log)
    })
  }
}
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
  IStyleRules,
} from '../typings/interfaces'
import {
  TContent,
  TInstructionName,
  TLogPrefix,
  TNumericRule,
  TTag,
} from '../typings/types'
import { Instruction } from './Instruction'
import { InstructionStack } from './InstructionStack'

/**
 * The valid props to pass a new Element instance.
 */
type InputProps = TTag | IElementList | IElementParagraph

/**
 * The Element class.
 */
export class Element {
  private _activeStyles: IInstruction[]
  private _content: TContent
  private _stack
  private _logEntries: [TLogPrefix, string][]
  private _style: IStyleRules
  private _tag

  constructor(input: InputProps) {
    this._activeStyles = []
    this._logEntries = []
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

  set content(content: TContent) {
    this._log('LOG', 'Setting new content')
    this._content = content
  }

  set style(rules: IStyleRules) {
    this._log('LOG', 'Setting new style rules')
    this._style = rules
  }

  /**
   * Adds a new instruction to this._activeStyles.
   * @param instruction The instruction to add
   */
  private _activateStyle(instruction: IInstruction) {
    let exists: boolean = false
    this._activeStyles.forEach((style) => {
      if (style.name === instruction.name) {
        exists = true
      }
    })
    if (!exists) {
      this._log('LOG', 'Activating ' + instruction.name)
      this._activeStyles.push(instruction)
    }
  }

  /**
   * Adds new CONTENT instructions to the stack.
   */
  private _addContent() {
    this._log('ACT', 'ADDING CONTENT [START]')

    if (typeof this._content !== 'string') {
      this._content.forEach((content) => {
        this._addToStack(new Instruction('CONTENT', content))
      })
    } else {
      let contentNode = Instructions.CONTENT
      contentNode.value = this._content
      this._addToStack(contentNode)
    }
    this._log('ACT', 'ADDING CONTENT [END]')
  }

  /**
   * Adds a new styling instruction to the stack whos value can be a number or 'none'.
   * @param rule this._style.<rule>
   * @param instruction Instructions.<instruction>
   */
  private _addNumberValueInstruction(
    rule: TNumericRule,
    instruction: IInstruction,
  ) {
    // Applies rule even if value is 0
    if (rule !== undefined) {
      // Remove matching rules
      this._removeFromStack(instruction.name)

      if (rule !== 'none') {
        for (let i = 0; i < rule; i++) {
          this._addToStack(Instructions[instruction.name])
        }
      }
    }
  }

  /**
   * Adds a new instruction to the stack.
   * @param instruction The instruction to add
   */
  private _addToStack(instruction: IInstruction, value?: number | string) {
    this._log(
      'INS',
      [
        StyleTextDecoration.strong,
        StyleColor.green,
        'ADD ',
        StyleBackgroundColor.green,
        StyleColor.black,
        ' ' + instruction.name + ' ',
        StyleUtilities.reset,
      ].join(''),
    )
    this._stack.add(instruction, value)
  }

  /**
   * Adds new styling instructions to the stack.
   */
  private _applyStyling() {
    this._log('ACT', 'APPLYING STYLES [START]')

    // Background-color
    if (this._style.backgroundColor) {
      let bgStyle = Instructions.BACKGROUND_COLOR
      bgStyle.value = StyleBackgroundColor[this._style.backgroundColor]
      this._addToStack(bgStyle)
      this._addToStack(Instructions.PADDING_LEFT)
      this._addToStack(Instructions.PADDING_RIGHT)
      this._removeFromStack('RESET')
      this._addToStack(Instructions.RESET)
    }

    // Color
    if (this._style.color) {
      let colorStyle = Instructions.COLOR
      colorStyle.value = StyleColor[this._style.color]
      this._addToStack(colorStyle)
      this._removeFromStack('RESET')
      this._addToStack(Instructions.RESET)
    }

    // Margin
    if (this._style.margin && typeof this._style.margin === 'number') {
      for (let i = 0; i < this._style.margin; i++) {
        this._addToStack(Instructions.MARGIN_BOTTOM)
        this._addToStack(Instructions.MARGIN_LEFT)
        this._addToStack(Instructions.MARGIN_RIGHT)
        this._addToStack(Instructions.MARGIN_TOP)
      }
    }
    // Margin-bottom
    this._addNumberValueInstruction(
      this._style.marginBottom,
      Instructions.MARGIN_BOTTOM,
    )
    // Margin-left
    this._addNumberValueInstruction(
      this._style.marginLeft,
      Instructions.MARGIN_LEFT,
    )
    // Margin-right
    this._addNumberValueInstruction(
      this._style.marginRight,
      Instructions.MARGIN_RIGHT,
    )
    // Margin-top
    this._addNumberValueInstruction(
      this._style.marginTop,
      Instructions.MARGIN_TOP,
    )

    // Padding-left
    this._addNumberValueInstruction(
      this._style.paddingLeft,
      Instructions.PADDING_LEFT,
    )
    // Padding-right
    this._addNumberValueInstruction(
      this._style.paddingRight,
      Instructions.PADDING_RIGHT,
    )

    // Text-align
    this._style.textAlign &&
      this._addToStack(
        Instructions[`TEXT_ALIGN_${this._style.textAlign.toUpperCase()}`],
      )

    // Text-decoration
    this._style.textDecoration &&
      this._addToStack(
        Instructions[
          `TEXT_DECORATION_${this._style.textDecoration.toUpperCase()}`
        ],
      )

    // Text-transform
    this._style.textTransform &&
      this._addToStack(
        Instructions[
          `TEXT_TRANSFORM_${this._style.textTransform.toUpperCase()}`
        ],
      )

    // Width
    if (this._style.width !== undefined) {
      // Find the total length of content + padding
      let preWidth: number = this._content.length
      let hasBackgroundPaddingLeft: boolean, hasBackgroundPaddingRight: boolean

      hasBackgroundPaddingLeft =
        this._style.backgroundColor && !this._style.paddingLeft ? true : false
      hasBackgroundPaddingRight =
        this._style.backgroundColor && !this._style.paddingRight ? true : false

      if (hasBackgroundPaddingLeft || hasBackgroundPaddingRight) preWidth++
      if (
        this._style.paddingLeft &&
        typeof this._style.paddingLeft === 'number'
      )
        preWidth += this._style.paddingLeft
      if (
        this._style.paddingRight &&
        typeof this._style.paddingRight === 'number'
      )
        preWidth += this._style.paddingRight

      // Only add width if (width > content.length + padding)
      if (preWidth < this._style.width) {
        // Add 'WIDTH' instructions
        this._addToStack(Instructions.WIDTH, this._style.width - preWidth)
      }
    }

    this._log('ACT', 'APPLYING STYLES [END]')
  }

  /**
   * Removes an instruction from this._activeStyles.
   * @param instruction The instruction to remove
   */
  private _deactivateStyle(instruction: IInstruction) {
    let newActiveStyles: IInstruction[] = []
    this._activeStyles.forEach((style) => {
      if (style === instruction) {
        this._log('LOG', 'Deactivating ' + instruction.name)
      } else {
        newActiveStyles.push(style)
      }
    })
    this._activeStyles = newActiveStyles
  }

  /**
   * Adds a new log entry.
   * @param prefix What type of log to use
   * @param msg The string message
   */
  private _log(prefix: TLogPrefix, msg: string) {
    this._logEntries.push([prefix, msg])
  }

  /**
   * Parses the instruction stack and generates the final output string.
   */
  private _parseInstructions() {
    this._log('ACT', 'PARSING INSTRUCTIONS [START]')
    let output: string[] = []

    // Iterate through the instruction stack
    this._stack.stack.forEach((instruction) => {
      this._log('PAR', `${instruction.name}`)

      switch (instruction.name) {
        case 'BACKGROUND_COLOR':
        case 'COLOR':
        case 'TEXT_DECORATION_ITALIC':
        case 'TEXT_DECORATION_STRONG':
        case 'TEXT_DECORATION_UNDERLINE':
          if (instruction.value) {
            output.push(String(instruction.value))
            this._activateStyle(instruction)
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
          this._deactivateStyle(Instructions.COLOR)
          this._deactivateStyle(Instructions.TEXT_DECORATION_ITALIC)
          this._deactivateStyle(Instructions.TEXT_DECORATION_STRONG)
          this._deactivateStyle(Instructions.TEXT_DECORATION_UNDERLINE)
          output.push(this._updateStyles())
          break

        case 'TEXT_TRANSFORM_CAPITALIZE':
          this._stack.findAndReplaceValue({
            name: 'CONTENT',
            callback: (value: string) =>
              value
                .split(' ')
                .map((word) => word[0].toUpperCase() + word.slice(1))
                .join(' '),
          })
          break

        case 'TEXT_TRANSFORM_LOWERCASE':
          this._stack.findAndReplaceValue({
            name: 'CONTENT',
            callback: (value: string) => value.toLowerCase(),
          })
          break

        case 'TEXT_TRANSFORM_UPPERCASE':
          this._stack.findAndReplaceValue({
            name: 'CONTENT',
            callback: (value) => value.toUpperCase(),
          })
          break

        case 'RESET':
          this._deactivateStyle(Instructions.BACKGROUND_COLOR)
          output.push(this._updateStyles())
          break

        case 'WIDTH':
          if (instruction.value && typeof instruction.value === 'number') {
            for (let i = 1; i < instruction.value; i++) {
              output.push(' ')
            }
          }
          break

        default:
          instruction.value &&
            typeof instruction.value === 'string' &&
            output.push(instruction.value)
          break
      }
    })
    this._log('ACT', 'PARSING INSTRUCTIONS [END]')
    return output.join('')
  }

  /**
   * Removes matching instructions from the stack.
   * @param name The instruction to add
   */
  private _removeFromStack(name: TInstructionName) {
    this._log(
      'INS',
      [
        StyleTextDecoration.strong,
        StyleColor.red,
        'DEL ',
        StyleBackgroundColor.red,
        StyleColor.white,
        ' ' + name + ' ',
        StyleUtilities.reset,
      ].join(''),
    )
    this._stack.findAndRemoveInstruction(name)
  }

  /**
   * Resets formatting and re-applies styling.
   * @returns The updated formatting as a string
   */
  private _updateStyles() {
    this._log('LOG', 'Updating styles')
    let updatedStyles: string[] = [StyleUtilities.reset]
    this._activeStyles.forEach((style) => {
      style.value && updatedStyles.push(String(style.value))
    })
    return updatedStyles.join('')
  }

  /**
   * Prints the final output string.
   */
  print() {
    this._log('ACT', 'PRINTING ELEMENT [START]')
    this._stack.reset()
    this._addContent()
    this._applyStyling()
    this._stack.sort()
    console.log(this._parseInstructions())
    this._log('ACT', 'PRINTING ELEMENT [END]')
  }

  /**
   * Prints instruction stack.
   */
  showInstructions() {
    console.log('[')
    console.group()
    this._stack.stack.forEach((Instruction) => {
      console.log(
        `{ ${StyleColor.green + Instruction.name + StyleUtilities.reset} }`,
      )
    })
    console.groupEnd()
    console.log(']')
  }

  /**
   * Prints all log entries.
   */
  showLog() {
    let tabSize: number = 0
    this._logEntries.forEach((log) => {
      switch (log[0]) {
        case 'ACT':
          if (log[1].includes('[END]') && tabSize > 0) {
            console.groupEnd()
            tabSize--
          }
          console.log(
            `${StyleColor.blue}[${log[0]}] ${log[1] + StyleUtilities.reset}`,
          )
          if (log[1].includes('[START]')) {
            console.group()
            tabSize++
          }
          break

        case 'PAR':
          console.log(
            `${StyleColor.yellow}[${log[0]}] ${log[1] + StyleUtilities.reset}`,
          )
          break

        default:
          console.log(`[${log[0]}] ${log[1]}`)
          break
      }
    })
  }
}

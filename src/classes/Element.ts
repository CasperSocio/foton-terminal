import { Instructions } from '../Instructions'
import {
  StyleBackgroundColor,
  StyleColor,
  StyleTextDecoration,
  StyleUtilities,
} from '../typings/enums'
import { IInstruction, IStyleRules } from '../typings/interfaces'
import { TContent, TLogPrefix, TTag } from '../typings/types'

/**
 * The Foton.Element class.
 * @author CasperSocio
 * @version 0.0.8
 * @since 0.0.1
 */
 export class Element {
  private _content: TContent
  private _instructionStack: IInstruction[]
  private _log: string[]
  private _style: IStyleRules
  private _tag

  constructor(tag: TTag) {
    this._content = ''
    this._instructionStack = []
    this._log = []
    this._style = {}
    this._tag = tag
  }

  public set content(content: TContent) {
    this.log('LOG', 'Adding element content...')

    this._content = content
    this.addContent()
  }

  public get instructions() {
    return this._instructionStack
  }

  public set style(rules: IStyleRules) {
    this.log('LOG', 'Setting new style rules...')

    this._style = rules
    this.applyStyling()
    this.sortInstructions()
  }

  /**
   * Adds CONTENT nodes to instruction stack.
   * @author CasperSocio
   * @version 0.0.8
   * @since 0.0.8
   * @private
   */
  private addContent() {
    this.log('LOG', 'Adding element instructions...')

    if (typeof this._content !== 'string') {
      this._content.forEach(element => {
        let contentNode = Instructions.CONTENT
        contentNode.value = element
        this.addInstruction(contentNode)
      })
    } else {
      let contentNode = Instructions.CONTENT
      contentNode.value = this._content
      this.addInstruction(contentNode)
    }
  }

  /**
   * Adds a new node to instruction stack.
   * @author CasperSocio
   * @version 0.0.7
   * @param instruction Instruction to add
   * @since 0.0.7
   * @private
   */
  private addInstruction(instruction: IInstruction) {
    this.log('INS', `Adding ${instruction.name}`)
    this._instructionStack.push(instruction)
  }

  /**
   * Adds styling instruction nodes to stack.
   * @author CasperSocio
   * @version 0.0.8
   * @since 0.0.1
   * @private
   */
  private applyStyling() {
    this.log('LOG', 'Applying styles...')
    this.resetInstructions()

    // Background-color
    if (this._style.backgroundColor) {
      let bgStyle = Instructions.BACKGROUND_COLOR
      bgStyle.value = StyleBackgroundColor[this._style.backgroundColor]
      this.addInstruction(bgStyle)
      this.addInstruction(Instructions.SPACE_BEFORE)
      this.addInstruction(Instructions.SPACE_AFTER)
      this.findAndRemoveInstructions(Instructions.RESET)
      this.addInstruction(Instructions.RESET)
    }
    // Color
    if (this._style.color) {
      let colorStyle = Instructions.COLOR
      colorStyle.value = StyleColor[this._style.color]
      this.addInstruction(colorStyle)
      this.findAndRemoveInstructions(Instructions.RESET)
      this.addInstruction(Instructions.RESET)
    }

    // Margin
    if (this._style.margin) {
      for (let i = 0; i < this._style.margin; i++) {
        this.addInstruction(Instructions.MARGIN_BOTTOM)
        this.addInstruction(Instructions.MARGIN_LEFT)
        this.addInstruction(Instructions.MARGIN_RIGHT)
        this.addInstruction(Instructions.MARGIN_TOP)
      }
    }
    // Margin-bottom
    if (this._style.marginBottom) {
      this.findAndRemoveInstructions(Instructions.MARGIN_BOTTOM)
      for (let i = 0; i < this._style.marginBottom; i++) {
        this.addInstruction(Instructions.MARGIN_BOTTOM)
      }
    }
    // Margin-left
    if (this._style.marginLeft) {
      this.findAndRemoveInstructions(Instructions.MARGIN_LEFT)
      for (let i = 0; i < this._style.marginLeft; i++) {
        this.addInstruction(Instructions.MARGIN_LEFT)
      }
    }
    // Margin-right
    if (this._style.marginRight) {
      this.findAndRemoveInstructions(Instructions.MARGIN_RIGHT)
      for (let i = 0; i < this._style.marginRight; i++) {
        this.addInstruction(Instructions.MARGIN_RIGHT)
      }
    }
    // Margin-top
    if (this._style.marginTop) {
      this.findAndRemoveInstructions(Instructions.MARGIN_TOP)
      for (let i = 0; i < this._style.marginTop; i++) {
        this.addInstruction(Instructions.MARGIN_TOP)
      }
    }

    // Text-decoration
    if (this._style.textDecoration) {
      switch (this._style.textDecoration) {
        case 'italic':
          this.addInstruction(Instructions.TEXT_DECORATION_ITALIC)
          break

        case 'strong':
          this.addInstruction(Instructions.TEXT_DECORATION_STRONG)
          break

        case 'underline':
          this.addInstruction(Instructions.TEXT_DECORATION_UNDERLINE)
          break
      
        default:
          break
      }
    }

    // Text-transform
    if (this._style.textTransform) {
      switch (this._style.textTransform) {
        case 'capitalize':
          this.addInstruction(Instructions.TEXT_TRANSFORM_CAPITALIZE)
          break
      
        case 'lowercase':
          this.addInstruction(Instructions.TEXT_TRANSFORM_LOWERCASE)
          break
      
        case 'uppercase':
          this.addInstruction(Instructions.TEXT_TRANSFORM_UPPERCASE)
          break
        
        default:
          break
      }
    }
  }

  /**
   * Iterates through the instruction stack
   * and removes all matching nodes.
   * @author CasperSocio
   * @version 0.0.7
   * @param target The instruction to remove
   * @since 0.0.1
   * @private
   */
  private findAndRemoveInstructions(target: IInstruction) {
    this.log('LOG', `Find and remove ${target.name}...`)

    let newInstructions: IInstruction[] = []
    this._instructionStack.map(instruction => {
      if (instruction.name !== target.name) {
        newInstructions.push(instruction)
      }
    })
    this._instructionStack = newInstructions
  }

  /**
   * Adds a new log entry.
   * @author CasperSocio
   * @version 0.0.8
   * @param prefix What type of log to use
   * @param msg The string message
   * @since 0.0.7
   * @private
   */
  private log(prefix: TLogPrefix, msg: string) {
    if (prefix === 'INS') {
      this._log.push(`${StyleColor.yellow}[${prefix}] ${msg}${StyleUtilities.reset}`)
    } else if (prefix === 'ACT') {
      this._log.push(`${StyleColor.blue}[${prefix}] ${msg}${StyleUtilities.reset}`)
    } else {
      this._log.push(`[${prefix}] ${msg}`)
    }
  }

  /**
   * Parses the instruction stack and
   * generates the final output string.
   * @author CasperSocio
   * @version 0.0.8
   * @since 0.0.7
   * @private
   */
  private parseInstructions() {
    this.log('ACT', 'PARSING INSTRUCTIONS [START]')
    let output: string[] = []

    // Iterate through the instruction stack
    this._instructionStack.forEach(instruction => {
      this.log('PAR', `${instruction.name}`)

      if (typeof this._content === 'string') {
        switch (instruction.name) {
          case 'CONTENT':
            output.push(this._content)
            break

          case 'TEXT_TRANSFORM_CAPITALIZE':
            this._content = this._content.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')
            break

          case 'TEXT_TRANSFORM_LOWERCASE':
            this._content = this._content.toLowerCase()
            break

          case 'TEXT_TRANSFORM_UPPERCASE':
            this._content = this._content.toUpperCase()
            break
        
          default:
            instruction.value && output.push(instruction.value)
            break
        }
      }
    })
    this.log('ACT', 'PARSING INSTRUCTIONS [END]')
    return output.join('')
  }

  /**
   * Prints the final output string.
   * @author CasperSocio
   * @version 0.0.8
   * @since 0.0.1
   * @public
   */
  public print() {
    this.log('ACT', 'PRINTING ELEMENT [START]')
    console.log(this.parseInstructions())
    this.log('ACT', 'PRINTING ELEMENT [END]')
  }

  /**
   * Resets the instruction stack.
   * Use before adding new style rules.
   * @author CasperSocio
   * @version 0.0.8
   * @since 0.0.8
   * @private
   */
  private resetInstructions() {
    this.log('LOG', 'Resetting instructions...')
    this._instructionStack = []
    this.addContent()
  }

  /**
   * Prints all log entries.
   * @author CasperSocio
   * @version 0.0.7
   * @since 0.0.7
   * @public
   */
  public showLog() {
    this._log.forEach(log => {
      console.log(log)
    })
  }

  /**
   * Sorts the instruction stack based 'sortPriority'.
   * @author CasperSocio
   * @version 0.0.7
   * @since 0.0.1
   * @private
   */
  private sortInstructions() {
    this.log('LOG', 'Sorting instructions...')
    this._instructionStack.sort((a, b) => a.sortPriority > b.sortPriority ? 1 : -1)
  }
}
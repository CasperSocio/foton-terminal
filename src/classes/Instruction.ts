import { StyleTextDecoration, StyleUtilities } from '../typings/enums'
import { TInstructionName } from '../typings/types'

export class Instruction {
  private _name: TInstructionName
  private _sortPriority: number
  private _value: string

  constructor(name: TInstructionName, value?: string) {
    this._name = name
    this._sortPriority = this.setSortPriority()
    this._value = value || this.setValue()
  }

  get name() {
    return this._name
  }
  get sortPriority() {
    return this._sortPriority
  }
  get value() {
    return this._value
  }
  set value(value: string) {
    this._value = value
  }

  /**
   * Sets the sorting priority.
   * @author CasperSocio
   * @version 0.0.3
   * @returns The sorting priority
   * @since 0.0.1
   * @private
   */
  private setSortPriority() {
    switch (this._name) {
      case 'BACKGROUND_COLOR': return -4
      case 'COLOR': return -3
      case 'MARGIN_BOTTOM': return 10
      case 'MARGIN_LEFT': return -9
      case 'MARGIN_RIGHT': return 9
      case 'MARGIN_TOP': return -10
      case 'RESET': return 3
      case 'PADDING_LEFT': return -2
      case 'PADDING_RIGHT': return 2
      case 'TEXT_DECORATION_ITALIC':
      case 'TEXT_DECORATION_STRONG':
      case 'TEXT_DECORATION_UNDERLINE': return -1
      case 'TEXT_TRANSFORM_CAPITALIZE':
      case 'TEXT_TRANSFORM_LOWERCASE':
      case 'TEXT_TRANSFORM_UPPERCASE': return -20
      default: return 0
    }
  }

  /**
   * Sets the instruction value.
   * @author CasperSocio
   * @version 0.0.3
   * @returns The instruction value
   * @since 0.0.1
   * @private
   */
  private setValue() {
    switch (this._name) {
      case 'MARGIN_BOTTOM':
      case 'MARGIN_TOP': return '\n'
      case 'MARGIN_LEFT':
      case 'MARGIN_RIGHT':
      case 'PADDING_LEFT':
      case 'PADDING_RIGHT': return ' '
      case 'RESET': return StyleUtilities.reset
      case 'TEXT_DECORATION_ITALIC': return StyleTextDecoration.italic
      case 'TEXT_DECORATION_STRONG': return StyleTextDecoration.strong
      case 'TEXT_DECORATION_UNDERLINE': return StyleTextDecoration.underline
      default: return ''
    }
  }
}

import { EUtilities } from '../typings/enums'
import { TInstructionType } from '../typings/types'

export class Instruction {
  private _name: TInstructionType
  private _sortPriority: number
  private _value: string

  constructor(name: TInstructionType) {
    this._name = name
    this._sortPriority = this.setSortPriority()
    this._value = this.setValue()
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
   * @returns The sorting priority
   * @private
   */
  private setSortPriority() {
    switch (this._name) {
      case 'BACKGROUND_COLOR': return -3
      case 'COLOR': return -2
      case 'MARGIN_BOTTOM': return 10
      case 'MARGIN_LEFT': return -9
      case 'MARGIN_RIGHT': return 9
      case 'MARGIN_TOP': return -10
      case 'RESET': return 2
      case 'SPACE_AFTER': return 1
      case 'SPACE_BEFORE': return -1
      default: return 0
    }
  }

  private setValue() {
    switch (this._value) {
      case 'MARGIN_BOTTOM':
      case 'MARGIN_TOP': '\n'
      case 'MARGIN_LEFT':
      case 'MARGIN_RIGHT':
      case 'SPACE_AFTER':
      case 'SPACE_BEFORE': return '  '
      case 'RESET': EUtilities.reset
      default: break
    }
  }
}

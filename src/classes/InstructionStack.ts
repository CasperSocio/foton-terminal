import { TInstructionName } from '../typings/types'
import { IInstruction } from '../typings/interfaces'

export class InstructionStack {
  private _stack: IInstruction[]

  constructor() {
    this._stack = []
  }

  get stack() {
    return this._stack
  }

  /**
   * Adds a new instruction to the stack.
   * @author CasperSocio
   * @version 0.0.5
   * @param instruction The new instruction to add
   * @since 0.0.3
   * @public
   */
  add(instruction: IInstruction, value?: number | string) {
    if (value) {
      instruction.value = value
    }
    this._stack.push(instruction)
  }

  findByName(name: TInstructionName) {
    let res: IInstruction[] = []
    this._stack.forEach(instruction => {
      if (instruction.name === name) {
        res.push(instruction)
      }
    })
    return res
  }

  /**
   * Finds matching instructions and removes them from the stack.
   * @author CasperSocio
   * @version 0.0.3
   * @param name The target instruction name
   * @since 0.0.3
   * @public
   */
  findAndRemoveInstruction(name: TInstructionName) {
    let newStack: IInstruction[] = []
    this._stack.forEach(instruction => {
      if (instruction.name !== name) {
        newStack.push(instruction)
      }
    })
    this._stack = newStack
  }

  /**
   * Finds matching instructions by name and assigns a new value.
   * @author CasperSocio
   * @version 0.0.5
   * @param name The instruction target name
   * @param value The new value to assign instruction
   * @param callback The callback function
   * @since 0.0.3
   * @public
   */
  findAndReplaceValue({ name, value, callback }: {
    name: TInstructionName
    value?: number | string
    callback?: (newValue: string) => string
  }): void {
    this._stack = this._stack.map(instruction => {
      if (instruction.name === name) {
        if (value !== undefined) {
          instruction.value = value
        }
        else if (callback !== undefined) {
          if (typeof instruction.value === 'string') {
            instruction.value = callback(instruction.value || '')
          }
        }
      }
      return instruction
    })
  }

  /**
   * Sorts the instruction stack based 'sortPriority'.
   * @author CasperSocio
   * @version 0.0.3
   * @since 0.0.3
   * @public
   */
  sort() {
    this._stack.sort((a, b) => a.sortPriority > b.sortPriority ? 1 : -1)
  }

  /**
   * Removes all values from stack.
   * @author CasperSocio
   * @version 0.0.3
   * @since 0.0.3
   * @public
   */
  reset() {
    this._stack = []
  }
}

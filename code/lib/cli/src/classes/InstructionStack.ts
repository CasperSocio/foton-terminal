import { IInstruction } from '../typings/interfaces'
import { TInstructionName } from '../typings/types'

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
   * @param instruction The new instruction to add
   */
  add(instruction: IInstruction, value?: number | string): void {
    if (value) {
      instruction.value = value
    }
    this._stack.push(instruction)
  }

  /**
   * Checks if the stack contains a given instruction.
   * @param name The instruction.name to look for
   */
  contains(name: TInstructionName): boolean {
    for (let i in this._stack) {
      if (this._stack[i].name === name) {
        return true
      }
    }
    return false
  }

  findByName(name: TInstructionName): IInstruction | boolean {
    return this._stack.find((ins) => ins.name === name) || false
  }

  /**
   * Finds matching instructions and removes them from the stack.
   * @param name The target instruction name
   */
  findAndRemoveInstruction(name: TInstructionName) {
    let newStack: IInstruction[] = []
    this._stack.forEach((instruction) => {
      if (instruction.name !== name) {
        newStack.push(instruction)
      }
    })
    this._stack = newStack
  }

  /**
   * Finds matching instructions by name and assigns a new value.
   * @param name The instruction target name
   * @param value The new value to assign instruction
   * @param callback The callback function
   */
  findAndReplaceValue({
    name,
    value,
    callback,
  }: {
    name: TInstructionName
    value?: number | string
    callback?: (newValue: string) => string
  }): void {
    this._stack = this._stack.map((instruction) => {
      if (instruction.name === name) {
        if (value !== undefined) {
          instruction.value = value
        } else if (callback !== undefined) {
          if (typeof instruction.value === 'string') {
            instruction.value = callback(instruction.value || '')
          }
        }
      }
      return instruction
    })
  }

  /**
   * Finds the stack index of an instruction.
   * @param name Name of the instruction
   * @returns The index, or -1 if not found
   */
  indexOf(name: TInstructionName) {
    return this._stack.findIndex((ins) => ins.name === name)
  }

  /**
   * Sorts the instruction stack based 'sortPriority'.
   */
  sort() {
    this._stack.sort((a, b) => (a.sortPriority > b.sortPriority ? 1 : -1))
  }

  /**
   * Removes all values from stack.
   */
  reset() {
    this._stack = []
  }
}

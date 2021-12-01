import {
  EBackground,
  EForeground,
  EUtilities
} from './enums'
import Instructions, { Instruction } from './Instructions'

namespace Foton {
  interface Props {
    /**
     * Add styling to element
     */
    style?: Style
    /**
     * Prints element to the console
     */
    //print: () => void
  }
  interface List {
    content: string[]
    tag: 'ol' | 'ul'
  }
  interface Paragraph {
    content: string
    tag: 'p'
  }
  interface Style {
    backgroundColor?: Color
    border?: 'white'
    color?: Color
    listStyle?: 'none'
    margin?: number | [number, number]
    marginBottom?: number
    marginLeft?: number
    marginRight?: number
    marginTop?: number
    textDecoration?: 'dim' | 'italic' | 'strong' | 'underline'
    textTransform?: 'capitalize' | 'lowercase' | 'uppercase'
  }
  type Color = 'black' | 'blue' | 'green' | 'red' | 'white' | 'yellow'
  type LogPrefix = 'INS' | 'LOG' | 'PAR'
  type TagProps = List | Paragraph
  
  export class Element implements Props {
    private _content: string | string[]
    private _instructions: Instruction[]
    private _log: string[]
    private _style: Style
    private _tag
  
    constructor({
      tag,
      content
    }: TagProps) {
      this._content = content
      this._instructions = [Instructions.CONTENT]
      this._log = []
      this._style = {}
      this._tag = tag

      // Add content to CONTENT node
      if (typeof this._content === 'string') {
        this._instructions[0].value = this._content
      }
    }

    public get instructions() {
      return this._instructions
    }
  
    public set style(rules: Style) {
      this.log('LOG', 'Setting new style rules...')

      this._style = rules
      this.applyStyling()
      this.sortInstructions()
    }

    private addInstruction(instruction: Instruction) {
      this.log('INS', `Adding ${instruction.name}`)
      this._instructions.push(instruction)
    }
  
    private applyStyling() {
      this.log('LOG', 'Applying styles...')

      // Background-color
      if (this._style.backgroundColor) {
        let bgStyle = Instructions.BACKGROUND_COLOR
        bgStyle.value = EBackground[this._style.backgroundColor]
        this.addInstruction(bgStyle)
        this.addInstruction(Instructions.SPACE_BEFORE)
        this.addInstruction(Instructions.SPACE_AFTER)
        this.findAndRemoveInstructions(Instructions.RESET)
        this.addInstruction(Instructions.RESET)
      }
      // Color
      if (this._style.color) {
        let colorStyle = Instructions.COLOR
        colorStyle.value = EForeground[this._style.color]
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

    private findAndRemoveInstructions(target: Instruction) {
      this.log('LOG', `Find and remove ${target.name}...`)

      let newInstructions: Instruction[] = []
      this._instructions.map(instruction => {
        if (instruction.name !== target.name) {
          newInstructions.push(instruction)
        }
      })
      this._instructions = newInstructions
    }

    private log(prefix: LogPrefix, msg: string) {
      if (prefix === 'INS') {
        this._log.push(`${EForeground.yellow}[${prefix}] ${msg}${EUtilities.reset}`)
      } else {
        this._log.push(`[${prefix}] ${msg}`)
      }
    }

    /**
     * Parses the list of instructions and generates the final output string
     */
    private parseInstructions() {
      this.log('LOG', 'Parsing...')
      let output: string[] = []

      // Iterate through instruction list
      this._instructions.forEach(instruction => {
        this.log('PAR', `${instruction.name}: Running...`)

        if (typeof this._content === 'string') {
          switch (instruction.name) {
            case 'CONTENT':
              output.push(this._content)
              this.log('PAR', 'CONTENT: Success')
              break
  
            case 'TEXT_TRANSFORM_CAPITALIZE':
              this._content = this._content.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')
              this.log('INS', 'TEXT_TRANSFORM_CAPITALIZE: Success')
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
      return output.join('')
    }

    public print() {
      console.log(this.parseInstructions())
    }

    public showLog() {
      this._log.forEach(log => {
        console.log(log)
      })
    }

    /**
     * Sorts the list of instructions according to 'sortPriority'
     */
    private sortInstructions() {
      this.log('LOG', 'Sorting instructions...')
      this._instructions.sort((a, b) => a.sortPriority > b.sortPriority ? 1 : -1)
    }
  }
}


let element = new Foton.Element({
  tag: 'p',
  content: 'hello!'
})

element.style = {
  backgroundColor: 'green',
  color: 'black',
  margin: 1,
  textTransform: 'uppercase'
}

console.log(element.instructions)
element.print()

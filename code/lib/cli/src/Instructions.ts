import { Instruction } from './classes/Instruction'
import { IInstruction } from './typings/interfaces'

interface InstructionsProps {
  [key: string]: IInstruction
}

/**
 * List of instructions available to the stack.
 */
export const Instructions: InstructionsProps = {
  BACKGROUND_COLOR: new Instruction('BACKGROUND_COLOR'),
  COLOR: new Instruction('COLOR'),
  CONTENT: new Instruction('CONTENT'),
  MARGIN_BOTTOM: new Instruction('MARGIN_BOTTOM'),
  MARGIN_LEFT: new Instruction('MARGIN_LEFT'),
  MARGIN_RIGHT: new Instruction('MARGIN_RIGHT'),
  MARGIN_TOP: new Instruction('MARGIN_TOP'),
  PADDING_LEFT: new Instruction('PADDING_LEFT'),
  PADDING_RIGHT: new Instruction('PADDING_RIGHT'),
  RESET: new Instruction('RESET'),
  TEXT_ALIGN_CENTER: new Instruction('TEXT_ALIGN_CENTER'),
  TEXT_ALIGN_LEFT: new Instruction('TEXT_ALIGN_LEFT'),
  TEXT_ALIGN_RIGHT: new Instruction('TEXT_ALIGN_RIGHT'),
  TEXT_DECORATION_ITALIC: new Instruction('TEXT_DECORATION_ITALIC'),
  TEXT_DECORATION_STRONG: new Instruction('TEXT_DECORATION_STRONG'),
  TEXT_DECORATION_UNDERLINE: new Instruction('TEXT_DECORATION_UNDERLINE'),
  TEXT_TRANSFORM_CAPITALIZE: new Instruction('TEXT_TRANSFORM_CAPITALIZE'),
  TEXT_TRANSFORM_LOWERCASE: new Instruction('TEXT_TRANSFORM_LOWERCASE'),
  TEXT_TRANSFORM_UPPERCASE: new Instruction('TEXT_TRANSFORM_UPPERCASE'),
  WIDTH: new Instruction('WIDTH'),
}

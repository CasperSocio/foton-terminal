import {
  IElementList,
  IElementParagraph
} from './interfaces'

/** The available color options */
export type TColor = 'black' | 'blue' | 'green' | 'red' | 'white' | 'yellow'

export type TContent = string | string[]

export type TInstructionType =
  | 'BACKGROUND_COLOR'
  | 'COLOR'
  | 'CONTENT'
  | 'MARGIN_BOTTOM'
  | 'MARGIN_LEFT'
  | 'MARGIN_RIGHT'
  | 'MARGIN_TOP'
  | 'RESET'
  | 'SPACE_AFTER'
  | 'SPACE_BEFORE'
  | 'TEXT_DECORATION_ITALIC'
  | 'TEXT_DECORATION_STRONG'
  | 'TEXT_DECORATION_UNDERLINE'
  | 'TEXT_TRANSFORM_CAPITALIZE'
  | 'TEXT_TRANSFORM_LOWERCASE'
  | 'TEXT_TRANSFORM_UPPERCASE'

export type TLogPrefix = 'ACT' | 'INS' | 'LOG' | 'PAR'

/** The available element types */
export type TTag = 'ol' | 'p' | 'ul'

export type TTagProps = IElementList | IElementParagraph

import {
  IElementList,
  IElementParagraph
} from './interfaces'

/** The available color options */
export type TColor = 'black' | 'blue' | 'cyan' | 'green' | 'magenta' | 'red' | 'white' | 'yellow'

export type TContent = string | string[]

export type TElementType = IElementList | IElementParagraph

export type TInstructionName =
  | 'BACKGROUND_COLOR'
  | 'COLOR'
  | 'CONTENT'
  | 'MARGIN_BOTTOM'
  | 'MARGIN_LEFT'
  | 'MARGIN_RIGHT'
  | 'MARGIN_TOP'
  | 'PADDING_LEFT'
  | 'PADDING_RIGHT'
  | 'RESET'
  | 'TEXT_ALIGN_CENTER'
  | 'TEXT_ALIGN_LEFT'
  | 'TEXT_ALIGN_RIGHT'
  | 'TEXT_DECORATION_ITALIC'
  | 'TEXT_DECORATION_STRONG'
  | 'TEXT_DECORATION_UNDERLINE'
  | 'TEXT_TRANSFORM_CAPITALIZE'
  | 'TEXT_TRANSFORM_LOWERCASE'
  | 'TEXT_TRANSFORM_UPPERCASE'
  | 'WIDTH'

export type TLogPrefix = 'ACT' | 'INS' | 'LOG' | 'PAR'

export type TNumericRule = number | 'none' | undefined

/** The available element types */
export type TTag = 'ol' | 'p' | 'ul'

import {
  IElementList,
  IElementParagraph
} from './interfaces'

/** The available color options */
export type TColor = 'black' | 'blue' | 'green' | 'red' | 'white' | 'yellow'

export type TLogPrefix = 'INS' | 'LOG' | 'PAR'

/** The available element types */
export type TTag = 'ol' | 'p' | 'ul'

export type TTagProps = IElementList | IElementParagraph

import { TColor, TInstructionName } from './types'

export interface IInstruction {
  name: TInstructionName
  sortPriority: number
  value?: number | string
}

export interface IElementList {
  content: string[]
  tag: 'ol' | 'ul'
}
export interface IElementParagraph {
  content: string
  tag: 'p'
}

export interface IStyleRules {
  backgroundColor?: TColor
  color?: TColor
  margin?: number | 'none'
  marginBottom?: number | 'none'
  marginLeft?: number | 'none'
  marginRight?: number | 'none'
  marginTop?: number | 'none'
  paddingLeft?: number | 'none'
  paddingRight?: number | 'none'
  textAlign?: 'center' | 'left' | 'right'
  textDecoration?: 'italic' | 'strong' | 'underline'
  textTransform?: 'capitalize' | 'lowercase' | 'uppercase'
  width?: number
}

import { TColor } from './types'

export interface IInstruction {
  name: string
  sortPriority: number
  value?: string
}

export interface IElementList {
  content: string[]
  tag: 'ol' | 'ul'
}
export interface IElementParagraph {
  content: string
  tag: 'p'
}

export interface IStyle {
  backgroundColor?: TColor
  border?: 'white'
  color?: TColor
  listStyle?: 'none'
  margin?: number | [number, number]
  marginBottom?: number
  marginLeft?: number
  marginRight?: number
  marginTop?: number
  textDecoration?: 'dim' | 'italic' | 'strong' | 'underline'
  textTransform?: 'capitalize' | 'lowercase' | 'uppercase'
}

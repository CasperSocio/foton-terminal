import { Color } from './types'

export interface Instruction {
  name: string
  sortPriority: number
  value?: string
}

export interface List {
  content: string[]
  tag: 'ol' | 'ul'
}
export interface Paragraph {
  content: string
  tag: 'p'
}

export interface Style {
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

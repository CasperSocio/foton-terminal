import {
  EUtilities
} from './enums'

export interface Instruction {
  name: string
  sortPriority: number
  value?: string
}
interface InstructionsProps {
  [key: string]: Instruction
}
const Instructions: InstructionsProps = {
  'BACKGROUND_COLOR': {
    name: 'BACKGROUND_COLOR',
    sortPriority: -3
  },
  'COLOR': {
    name: 'COLOR',
    sortPriority: -2
  },
  'CONTENT': {
    name: 'CONTENT',
    sortPriority: 0
  },
  'MARGIN_BOTTOM': {
    name: 'MARGIN_BOTTOM',
    sortPriority: 10,
    value: '\n'
  },
  'MARGIN_LEFT': {
    name: 'MARGIN_LEFT',
    sortPriority: -9,
    value: '  '
  },
  'MARGIN_RIGHT': {
    name: 'MARGIN_RIGHT',
    sortPriority: 9,
    value: '  '
  },
  'MARGIN_TOP': {
    name: 'MARGIN_TOP',
    sortPriority: -10,
    value: '\n'
  },
  'RESET': {
    name: 'RESET',
    sortPriority: 2,
    value: EUtilities.reset
  },
  'SPACE_AFTER': {
    name: 'SPACE_AFTER',
    sortPriority: 1,
    value: ' '
  },
  'SPACE_BEFORE': {
    name: 'SPACE_BEFORE',
    sortPriority: -1,
    value: ' '
  },
  'TEXT_TRANSFORM_CAPITALIZE': {
    name: 'TEXT_TRANSFORM_CAPITALIZE',
    sortPriority: 0
  },
  'TEXT_TRANSFORM_LOWERCASE': {
    name: 'TEXT_TRANSFORM_LOWERCASE',
    sortPriority: 0
  },
  'TEXT_TRANSFORM_UPPERCASE': {
    name: 'TEXT_TRANSFORM_UPPERCASE',
    sortPriority: 0
  },
}

export default Instructions

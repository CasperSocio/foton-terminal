import { StyleTextDecoration, StyleUtilities } from './typings/enums'
import { IInstruction } from './typings/interfaces'

interface InstructionsProps {
  [key: string]: IInstruction
}

/**
 * List of instructions available to the stack.
 * @author CasperSocio
 * @version 0.0.1
 * @since 0.0.1
 */
export const Instructions: InstructionsProps = {
  'BACKGROUND_COLOR': {
    name: 'BACKGROUND_COLOR',
    sortPriority: -4
  },
  'COLOR': {
    name: 'COLOR',
    sortPriority: -3
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
    value: StyleUtilities.reset
  },
  'SPACE_AFTER': {
    name: 'SPACE_AFTER',
    sortPriority: 1,
    value: ' '
  },
  'SPACE_BEFORE': {
    name: 'SPACE_BEFORE',
    sortPriority: -2,
    value: ' '
  },
  'TEXT_DECORATION_ITALIC': {
    name: 'TEXT_DECORATION_ITALIC',
    sortPriority: -1,
    value: StyleTextDecoration.italic
  },
  'TEXT_DECORATION_STRONG': {
    name: 'TEXT_DECORATION_STRONG',
    sortPriority: -1,
    value: StyleTextDecoration.strong
  },
  'TEXT_DECORATION_UNDERLINE': {
    name: 'TEXT_DECORATION_UNDERLINE',
    sortPriority: -1,
    value: StyleTextDecoration.underline
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

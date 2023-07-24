import {
  AssignmentTokenType,
  LiteralTokenType,
  Token,
  assignmentTokenTypes,
  literalTokenTypes,
  tokenTypes,
} from './types'

/**
 * Checks if the provided value is an assignment operator token type.
 * @param value The value to inspect
 */
export function isAssignmentOperatorTokenType(
  value: any,
): value is AssignmentTokenType {
  return (
    typeof value === 'string' &&
    assignmentTokenTypes.findIndex((type) => type === value) !== -1
  )
}

/**
 * Checks if the provided value is a literal token type.
 * @param value The value to inspect
 */
export function isLiteralTokenType(value: any): value is LiteralTokenType {
  return (
    typeof value === 'string' &&
    literalTokenTypes.findIndex((type) => type === value) !== -1
  )
}

/**
 * Checks if the provided value is a Token object.
 * @param value The value to inspect
 */
export function isToken(value: any): value is Token {
  return (
    typeof value === 'object' &&
    tokenTypes.includes(value.type) &&
    typeof value.value === 'string'
  )
}

/**
 * Checks if the provided value is a variable keyword type.
 * @param value The value to inspect
 */
export function isVariableTokenType(
  value: unknown,
): value is 'CONST' | 'LET' | 'VAR' {
  return typeof value === 'string' && ['CONST', 'LET', 'VAR'].includes(value)
}

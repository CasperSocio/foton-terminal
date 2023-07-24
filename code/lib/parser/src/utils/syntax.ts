import { isString } from '@photon-terminal/shared'

export const assignmentOperators = ['=', '+=', '-=', '*=', '/='] as const

export const additiveOperators = ['+', '-'] as const
export const multiplicativeOperators = ['*', '/'] as const
export const relationalOperators = ['<', '<=', '>', '>='] as const
export const binaryOperators = [
  ...additiveOperators,
  ...multiplicativeOperators,
  ...relationalOperators,
] as const

export const variableKeywords = ['const', 'let', 'var'] as const

export type AdditiveOperator = (typeof additiveOperators)[number]
export type AssignmentOperator = (typeof assignmentOperators)[number]
export type BinaryOperator = (typeof binaryOperators)[number]
export type MultiplicativeOperator = (typeof multiplicativeOperators)[number]
export type RelationalOperator = (typeof relationalOperators)[number]
export type VariableKeyword = (typeof variableKeywords)[number]

/**
 * Checks if a value is "+" or "-".
 * @param value The value to inspect
 */
export function isAdditiveOperator(value: unknown): value is AdditiveOperator {
  return (
    isString(value) && additiveOperators.findIndex((op) => op === value) !== -1
  )
}

/**
 * Checks if a value is "=", "+=", "-=", "*=" or "/=".
 * @param value The value to inspect
 */
export function isAssignmentOperator(
  value: unknown,
): value is AssignmentOperator {
  return (
    isString(value) &&
    assignmentOperators.findIndex((op) => op === value) !== -1
  )
}

/**
 * Checks if a value is a binary operator.
 * @param value The value to inspect
 */
export function isBinaryOperator(value: unknown): value is BinaryOperator {
  return (
    isAdditiveOperator(value) ||
    isMultiplicativeOperator(value) ||
    isRelationalOperator(value)
  )
}

/**
 * Checks if a value is "*" or "/".
 * @param value The value to inspect
 */
export function isMultiplicativeOperator(
  value: unknown,
): value is MultiplicativeOperator {
  return (
    isString(value) &&
    multiplicativeOperators.findIndex((op) => op === value) !== -1
  )
}

/**
 * Checks if a value is "<", "<=", ">=" or ">".
 * @param value The value to inspect
 */
export function isRelationalOperator(
  value: unknown,
): value is RelationalOperator {
  return (
    isString(value) &&
    relationalOperators.findIndex((op) => op === value) !== -1
  )
}

/**
 * Checks if a value is "const", "let", or "var".
 * @param value The value to inspect
 */
export function isVariableKeyword(value: unknown): value is VariableKeyword {
  return (
    isString(value) && variableKeywords.findIndex((op) => op === value) !== -1
  )
}

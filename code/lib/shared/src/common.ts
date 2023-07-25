/**
 * Checks if value is a number.
 * @param value The value to inspect
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}

/**
 * Checks if value is a string.
 * @param value The value to inspect
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

/**
 * Converts value to a number.
 * @param value The value to convert
 * @returns
 */
export function toNumber(value: unknown): number {
  if (isNumber(value)) return value
  if (toString(value).match(/^(-?\d+(?:\.\d+)?)$/)) return Number(value)

  const values = toString(value).split(/[.,]/)
  if (values.length === 2) {
    const dotSepValue = values.join('.')
    if (dotSepValue.match(/^(-?\d+(?:\.\d+)?)$/)) return Number(dotSepValue)
  }

  throw new SyntaxError(`${value} can not be converted into a valid number`)
}

/**
 * Converts value to a string.
 * @param value The value to convert
 */
export function toString(value: unknown): string {
  return String(value)
}

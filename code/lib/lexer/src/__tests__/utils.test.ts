import { Token } from '../types'
import {
  isAssignmentOperatorTokenType,
  isLiteralTokenType,
  isToken,
  isVariableTokenType,
} from '../utils'

describe('isAssignmentOperatorTokenType()', () => {
  it('returns true', () => {
    expect(isAssignmentOperatorTokenType('COMPLEX_ASSIGN')).toBeTruthy()
    expect(isAssignmentOperatorTokenType('SIMPLE_ASSIGN')).toBeTruthy()
  })
  it('returns false', () => {
    expect(isAssignmentOperatorTokenType('BOOLEAN')).toBeFalsy()
  })
})

describe('isLiteralTokenType()', () => {
  it('returns true', () => {
    expect(isLiteralTokenType('BOOLEAN')).toBeTruthy()
    expect(isLiteralTokenType('NUMBER')).toBeTruthy()
    expect(isLiteralTokenType('STRING')).toBeTruthy()
  })
  it('returns false', () => {
    expect(isLiteralTokenType('SEMICOLON')).toBeFalsy()
  })
})

describe('isToken()', () => {
  it('returns true', () => {
    const value: Token = {
      type: 'BOOLEAN',
      value: 'true',
    }
    const result = isToken(value)

    expect(result).toBeTruthy()
  })
  it('returns false on invalid type', () => {
    const value = 42
    const result = isToken(value)

    expect(result).toBeFalsy()
  })
  it('returns false on invalid Token.type', () => {
    const value = {
      type: 'NOT_A_TOKEN_TYPE',
      value: 'true',
    }
    const result = isToken(value)

    expect(result).toBeFalsy()
  })
  it('returns false on invalid Token.value', () => {
    const value = {
      type: 'BOOLEAN',
      value: 42,
    }
    const result = isToken(value)

    expect(result).toBeFalsy()
  })
})

describe('isVariableTokenType()', () => {
  it('returns true', () => {
    expect(isVariableTokenType(`CONST`)).toBeTruthy()
    expect(isVariableTokenType(`LET`)).toBeTruthy()
    expect(isVariableTokenType(`VAR`)).toBeTruthy()
  })
  it('returns false', () => {
    expect(isVariableTokenType(`BOOLEAN`)).toBeFalsy()
  })
})

import {
  isAdditiveOperator,
  isAssignmentOperator,
  isBinaryOperator,
  isMultiplicativeOperator,
  isRelationalOperator,
  isVariableKeyword,
} from '../syntax'

describe('isAdditiveOperator()', () => {
  it('returns `true`', () => {
    expect(isAdditiveOperator('+')).toBeTruthy()
    expect(isAdditiveOperator('-')).toBeTruthy()
  })
  it('returns `false`', () => {
    expect(isAdditiveOperator('*')).toBeFalsy()
    expect(isAdditiveOperator('/')).toBeFalsy()
    expect(isAdditiveOperator('<')).toBeFalsy()
    expect(isAdditiveOperator('<=')).toBeFalsy()
    expect(isAdditiveOperator('>=')).toBeFalsy()
    expect(isAdditiveOperator('>')).toBeFalsy()
    expect(isAdditiveOperator('=')).toBeFalsy()
    expect(isAdditiveOperator('+=')).toBeFalsy()
    expect(isAdditiveOperator('-=')).toBeFalsy()
    expect(isAdditiveOperator('*=')).toBeFalsy()
    expect(isAdditiveOperator('/=')).toBeFalsy()
    expect(isAdditiveOperator('const')).toBeFalsy()
    expect(isAdditiveOperator('let')).toBeFalsy()
    expect(isAdditiveOperator('var')).toBeFalsy()
  })
})

describe('isAssignmentOperator()', () => {
  it('returns `true`', () => {
    expect(isAssignmentOperator('=')).toBeTruthy()
    expect(isAssignmentOperator('+=')).toBeTruthy()
    expect(isAssignmentOperator('-=')).toBeTruthy()
    expect(isAssignmentOperator('*=')).toBeTruthy()
    expect(isAssignmentOperator('/=')).toBeTruthy()
  })
  it('returns `false`', () => {
    expect(isAssignmentOperator('+')).toBeFalsy()
    expect(isAssignmentOperator('-')).toBeFalsy()
    expect(isAssignmentOperator('*')).toBeFalsy()
    expect(isAssignmentOperator('/')).toBeFalsy()
    expect(isAssignmentOperator('<')).toBeFalsy()
    expect(isAssignmentOperator('<=')).toBeFalsy()
    expect(isAssignmentOperator('>=')).toBeFalsy()
    expect(isAssignmentOperator('>')).toBeFalsy()
    expect(isAssignmentOperator('const')).toBeFalsy()
    expect(isAssignmentOperator('let')).toBeFalsy()
    expect(isAssignmentOperator('var')).toBeFalsy()
  })
})

describe('isBinaryOperator()', () => {
  it('returns `true`', () => {
    expect(isBinaryOperator('+')).toBeTruthy()
    expect(isBinaryOperator('-')).toBeTruthy()
    expect(isBinaryOperator('*')).toBeTruthy()
    expect(isBinaryOperator('/')).toBeTruthy()
    expect(isBinaryOperator('<')).toBeTruthy()
    expect(isBinaryOperator('<=')).toBeTruthy()
    expect(isBinaryOperator('>=')).toBeTruthy()
    expect(isBinaryOperator('>')).toBeTruthy()
  })
  it('returns `false`', () => {
    expect(isBinaryOperator('=')).toBeFalsy()
    expect(isBinaryOperator('+=')).toBeFalsy()
    expect(isBinaryOperator('-=')).toBeFalsy()
    expect(isBinaryOperator('*=')).toBeFalsy()
    expect(isBinaryOperator('/=')).toBeFalsy()
    expect(isBinaryOperator('const')).toBeFalsy()
    expect(isBinaryOperator('let')).toBeFalsy()
    expect(isBinaryOperator('var')).toBeFalsy()
  })
})

describe('isMultiplicativeOperator()', () => {
  it('returns `true`', () => {
    expect(isMultiplicativeOperator('*')).toBeTruthy()
    expect(isMultiplicativeOperator('/')).toBeTruthy()
  })
  it('returns `false`', () => {
    expect(isMultiplicativeOperator('+')).toBeFalsy()
    expect(isMultiplicativeOperator('-')).toBeFalsy()
    expect(isMultiplicativeOperator('<')).toBeFalsy()
    expect(isMultiplicativeOperator('<=')).toBeFalsy()
    expect(isMultiplicativeOperator('>=')).toBeFalsy()
    expect(isMultiplicativeOperator('>')).toBeFalsy()
    expect(isMultiplicativeOperator('=')).toBeFalsy()
    expect(isMultiplicativeOperator('+=')).toBeFalsy()
    expect(isMultiplicativeOperator('-=')).toBeFalsy()
    expect(isMultiplicativeOperator('*=')).toBeFalsy()
    expect(isMultiplicativeOperator('/=')).toBeFalsy()
    expect(isMultiplicativeOperator('const')).toBeFalsy()
    expect(isMultiplicativeOperator('let')).toBeFalsy()
    expect(isMultiplicativeOperator('var')).toBeFalsy()
  })
})

describe('isRelationalOperator()', () => {
  it('returns `true`', () => {
    expect(isRelationalOperator('<')).toBeTruthy()
    expect(isRelationalOperator('<=')).toBeTruthy()
    expect(isRelationalOperator('>=')).toBeTruthy()
    expect(isRelationalOperator('>')).toBeTruthy()
  })
  it('returns `false`', () => {
    expect(isRelationalOperator('+')).toBeFalsy()
    expect(isRelationalOperator('-')).toBeFalsy()
    expect(isRelationalOperator('*')).toBeFalsy()
    expect(isRelationalOperator('/')).toBeFalsy()
    expect(isRelationalOperator('=')).toBeFalsy()
    expect(isRelationalOperator('+=')).toBeFalsy()
    expect(isRelationalOperator('-=')).toBeFalsy()
    expect(isRelationalOperator('*=')).toBeFalsy()
    expect(isRelationalOperator('/=')).toBeFalsy()
    expect(isRelationalOperator('const')).toBeFalsy()
    expect(isRelationalOperator('let')).toBeFalsy()
    expect(isRelationalOperator('var')).toBeFalsy()
  })
})

describe('isVariableKeyword()', () => {
  it('returns `true`', () => {
    expect(isVariableKeyword('const')).toBeTruthy()
    expect(isVariableKeyword('let')).toBeTruthy()
    expect(isVariableKeyword('var')).toBeTruthy()
  })
  it('returns `false`', () => {
    expect(isVariableKeyword('+')).toBeFalsy()
    expect(isVariableKeyword('-')).toBeFalsy()
    expect(isVariableKeyword('*')).toBeFalsy()
    expect(isVariableKeyword('/')).toBeFalsy()
    expect(isVariableKeyword('<')).toBeFalsy()
    expect(isVariableKeyword('<=')).toBeFalsy()
    expect(isVariableKeyword('>=')).toBeFalsy()
    expect(isVariableKeyword('>')).toBeFalsy()
    expect(isVariableKeyword('=')).toBeFalsy()
    expect(isVariableKeyword('+=')).toBeFalsy()
    expect(isVariableKeyword('-=')).toBeFalsy()
    expect(isVariableKeyword('*=')).toBeFalsy()
    expect(isVariableKeyword('/=')).toBeFalsy()
  })
})

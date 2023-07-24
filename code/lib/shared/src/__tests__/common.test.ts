import { isNumber, isString, toNumber, toString } from '../common'

describe('isNumber()', () => {
  it('returns a boolean', () => {
    const actual = typeof isNumber('hello')
    expect(actual).toBe('boolean')
  })
  it('returns true', () => {
    expect(isNumber(0)).toBeTruthy()
    expect(isNumber(1)).toBeTruthy()
    expect(isNumber(2000)).toBeTruthy()
    expect(isNumber(3.14)).toBeTruthy()
  })
  it('returns false', () => {
    expect(isNumber('42')).toBeFalsy()
    expect(isNumber(true)).toBeFalsy()
    expect(isNumber(false)).toBeFalsy()
    expect(isNumber(null)).toBeFalsy()
    expect(isNumber(undefined)).toBeFalsy()
  })
})

describe('isString()', () => {
  it('returns a boolean', () => {
    const actual = typeof isString('hello')
    expect(actual).toBe('boolean')
  })
  it('returns true', () => {
    expect(isString('hello')).toBeTruthy()
  })
  it('returns false', () => {
    expect(isString(42)).toBeFalsy()
    expect(isString(true)).toBeFalsy()
    expect(isString(false)).toBeFalsy()
    expect(isString(null)).toBeFalsy()
    expect(isString(undefined)).toBeFalsy()
  })
})

describe('toNumber()', () => {
  it('returns a number', () => {
    expect(typeof toNumber(4)).toBe('number')
  })
  it('converts strings containing valid numbers', () => {
    expect(toNumber('0')).toStrictEqual(0)
    expect(toNumber('1')).toStrictEqual(1)
    expect(toNumber('3.14')).toStrictEqual(3.14)
    expect(toNumber('-0.25')).toStrictEqual(-0.25)
  })
  it('throws error on booleans', () => {
    expect(() => {
      toNumber(true)
    }).toThrowError()
    expect(() => {
      toNumber(false)
    }).toThrowError()
  })
  it('throws error on null', () => {
    expect(() => {
      toNumber(null)
    }).toThrowError()
  })
  it('throws error on undefined', () => {
    expect(() => {
      toNumber(undefined)
    }).toThrowError()
  })
})

describe('toString()', () => {
  it('returns a string', () => {
    expect(typeof toString(null)).toBe('string')
  })
  it('converts numbers', () => {
    expect(toString(3.14)).toStrictEqual('3.14')
  })
  it('converts booleans', () => {
    expect(toString(false)).toStrictEqual('false')
    expect(toString(true)).toStrictEqual('true')
  })
  it('converts null', () => {
    expect(toString(null)).toStrictEqual('null')
  })
  it('converts undefined', () => {
    expect(toString(undefined)).toStrictEqual('undefined')
  })
})

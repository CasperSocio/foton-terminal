# Photon Terminal Shared

Shared utilities and resources used by Photon Terminal.

## Install

```bash
npm i @photon-terminal/shared
```

## Usage

```typescript
import { isNumber, isString, toNumber, toString } from '@photon-terminal/shared'

const user = {
  age: '30',
  firstName: 'John',
  lastName: 'Doe',
}

console.log(isNumber(user.age)) // false
console.log(isString(user.age)) // true

user.age = toNumber(user.age)
console.log(user.age) // 30
console.log(isNumber(user.age)) // true
console.log(isString(user.age)) // false

user.age = toString(user.age)
console.log(isNumber(user.age)) // false
console.log(isString(user.age)) // true
```

## API

### isNumber(value)

> Replaces `typeof myVar === 'number'`

Checks if the provided value is of type number, and has the benefit of being more readable.

```typescript
import { isNumber } from '@photon-terminal/shared'

function validateAge(age: unknown): number {
  if (isNumber(age)) {
    return age
  }
  throw new Error(`Expected age to be a number, but got ${typeof age} instead`)
}
```

### isString(value)

> Replaces `typeof myVar === 'string'`

Checks if the provided value is of type string, and has the benefit of being more readable.

```typescript
import { isString } from '@photon-terminal/shared'

function validateAge(age: number | string): number {
  if (isString(age)) {
    throw new Error(`Expected age to be a number, but got a string instead`)
  }
  return age
}
```

### toNumber(value)

Converts the provided value to a number if possible. Otherwise throwing a syntax error. It also converts comma-separated decimals contained within strings.

```typescript
import { toNumber } from '@photon-terminal/shared'

console.log(toNumber(0)) //  0
console.log(toNumber('0')) //  0
console.log(toNumber('3.14')) //  3.14
console.log(toNumber('3,14')) //  3.14
console.log(toNumber('-0.45')) // -0.45

// These will throw SyntaxError
toNumber(null)
toNumber(unknown)
toNumber(true)
toNumber('3x')
```

### toString(value)

Converts the provided value to a string.

```typescript
import { toString } from '@photon-terminal/shared'

console.log(toString(0)) // '0'
console.log(toString(true)) // 'true'
console.log(toString(null)) // 'null'
console.log(toString(undefined)) // 'undefined'
```

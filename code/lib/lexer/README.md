# Lexer

The lexical analysis tool made for Photon Terminal.

# Install

```
npm i @photon-terminal/lexer
```

# Usage
```typescript
import { Token, Tokenizer } from '@photon-terminal/lexer'

// Initialize the lexer with some code
const lexer = new Tokenizer().init('1 + 2;')

const tokens: Token[] = [lexer.getNextToken()]
let nextToken: Token | null = lexer.getNextToken()

while (nextToken) {
  tokens.push(nextToken)
  nextToken = lexer.getNextToken()
}

console.log(tokens)
// [
//   { type: 'NUMBER', value: '1' },
//   { type: 'ADDITIVE_OPERATOR', value: '+' },
//   { type: 'NUMBER', value: '2' },
//   { type: 'SEMICOLON', value: ';' },
// ]
```

The code above shows how you can perform your own lexical analysis on JavaScript code.

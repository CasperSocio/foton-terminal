import { TokenType } from './types'

/**
 * Tokenizer spesifications.
 */
export const spec: [RegExp, TokenType | null][] = [
  // ————————————————————— Whitespace —————————————————————

  [/^\s+/, null],

  // —————————————————————— Comments ——————————————————————

  [/^\/{2}.*/, null], // Skip single-line comments
  [/^\/\*[\s\S]*?\*\//, null], // Skip multi-line comments

  // ———————————————— Symbols, delimiters —————————————————
  // ;, {, }, (, )

  [/^;/, 'SEMICOLON'],
  [/^\{/, 'OPEN_CURLY_BRACKET'],
  [/^\}/, 'CLOSE_CURLY_BRACKET'],
  [/^\(/, 'OPEN_PAREN'],
  [/^\)/, 'CLOSE_PAREN'],
  [/^,/, 'COMMA'],

  // ————————————————— Equality operators —————————————————
  // ==, ===, !=, !==

  [/^[=!]==/, 'STRICT_EQUALITY_OPERATOR'],
  [/^[=!]=/, 'EQUALITY_OPERATOR'],

  // ———————————————— Assignment operators ————————————————
  // =, *=, /=, +=, -=

  [/^=/, 'SIMPLE_ASSIGN'],
  [/^[\*\/\+\-]=/, 'COMPLEX_ASSIGN'],

  // ——————————————————— Math operators ———————————————————
  // +, -, *, /

  [/^[+\-]/, 'ADDITIVE_OPERATOR'],
  [/^[*\/]/, 'MULTIPLICATIVE_OPERATOR'],

  // ———————————————— Relational operators ————————————————
  // <, <=, >, >=

  [/^[<>]=?/, 'RELATIONAL_OPERATOR'],

  // —————————————————————— Keywords ——————————————————————
  // const, else, if, let, var

  [/^\bconst\b/, 'CONST'],
  [/^\belse\b/, 'ELSE'],
  [/^\bif\b/, 'IF'],
  [/^\blet\b/, 'LET'],
  [/^\bnull\b/, 'NULL'],
  [/^\bvar\b/, 'VAR'],

  // —————————————————————— Booleans ——————————————————————
  // false, true

  [/^(false|true)(?=\s|;|$)/, 'BOOLEAN'],

  // —————————————————————— Numbers ———————————————————————
  // 0, 1, 3.14, 1337

  [/^(-?\d+(?:\.\d+)?)(?=\s|\)|;|$)/, 'NUMBER'],

  // —————————————————————— Strings ———————————————————————
  // 'hello', "hello"

  [/^'[^']*'/, 'STRING'],
  [/^"[^"]*"/, 'STRING'],

  // ———————————————————— Identifiers —————————————————————
  // x, age, firstName

  [/^\b\w+\b/, 'IDENTIFIER'],
]

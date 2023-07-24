export const assignmentTokenTypes = ['COMPLEX_ASSIGN', 'SIMPLE_ASSIGN'] as const
const keywordTokenTypes = ['CONST', 'ELSE', 'IF', 'LET', 'NULL', 'VAR'] as const
export const literalTokenTypes = ['BOOLEAN', 'NUMBER', 'STRING'] as const
const operatorTokenTypes = [
  'ADDITIVE_OPERATOR',
  'EQUALITY_OPERATOR',
  'MULTIPLICATIVE_OPERATOR',
  'RELATIONAL_OPERATOR',
  'STRICT_EQUALITY_OPERATOR',
] as const
const symbolTokenTypes = [
  'CLOSE_CURLY_BRACKET',
  'CLOSE_PAREN',
  'COMMA',
  'OPEN_CURLY_BRACKET',
  'OPEN_PAREN',
  'SEMICOLON',
] as const
export const tokenTypes = [
  'IDENTIFIER',
  ...assignmentTokenTypes,
  ...keywordTokenTypes,
  ...literalTokenTypes,
  ...operatorTokenTypes,
  ...symbolTokenTypes,
] as const

export type AssignmentTokenType = (typeof assignmentTokenTypes)[number]
export type LiteralTokenType = (typeof literalTokenTypes)[number]
export type TokenType = (typeof tokenTypes)[number]

export type Token = {
  type: TokenType
  value: string
}

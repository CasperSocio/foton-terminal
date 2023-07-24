import {
  AssignmentExpression,
  BinaryExpression,
  BlockStatement,
  BooleanLiteral,
  EmptyStatement,
  ExpressionStatement,
  Identifier,
  IfStatement,
  NumericLiteral,
  StringLiteral,
  VariableStatement,
} from './nodes'

export type Expression =
  | AssignmentExpression
  | BinaryExpression
  | Identifier
  | Literal

export type Literal = BooleanLiteral | NumericLiteral | StringLiteral
export type LiteralType = Literal['type']

export type Statement =
  | BlockStatement
  | IfStatement
  | EmptyStatement
  | ExpressionStatement
  | VariableStatement

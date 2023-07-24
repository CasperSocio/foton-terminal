import { toNumber } from '@photon-terminal/shared'
import { Expression, Statement } from './types'
import { AssignmentOperator, BinaryOperator, VariableKeyword } from './utils'

export class AssignmentExpression {
  readonly type = 'AssignmentExpression'

  constructor(
    readonly operator: AssignmentOperator,
    readonly left: Identifier,
    readonly right: Expression,
  ) {}
}

export class BinaryExpression {
  readonly type = 'BinaryExpression'

  constructor(
    readonly operator: BinaryOperator,
    readonly left: Expression,
    readonly right: Expression,
  ) {}
}

export class BlockStatement {
  readonly type = 'BlockStatement'

  constructor(readonly body: Statement[]) {}
}

export class BooleanLiteral {
  readonly type = 'BooleanLiteral'

  constructor(readonly value: boolean) {}
}

export class EmptyStatement {
  readonly type = 'EmptyStatement'

  constructor() {}
}

export class ExpressionStatement {
  readonly type = 'ExpressionStatement'

  constructor(readonly expression: Expression) {}
}

export class Identifier {
  readonly type = 'Identifier'

  constructor(readonly name: string) {}
}

export class IfStatement {
  readonly type = 'IfStatement'

  constructor(
    readonly test: Expression,
    readonly consequent: Statement,
    readonly alternate: Statement | null = null,
  ) {}
}

export class NumericLiteral {
  readonly type = 'NumericLiteral'
  readonly value: number

  constructor(value: number | string) {
    this.value = toNumber(value)
  }
}

export class Program {
  readonly type = 'Program'

  constructor(readonly body: Statement[]) {}
}

export class StringLiteral {
  readonly type = 'StringLiteral'

  constructor(readonly value: string) {}
}

export class VariableDeclaration {
  readonly type = 'VariableDeclaration'

  constructor(
    readonly id: Identifier,
    readonly init: Expression | null = null,
  ) {}
}

export class VariableStatement {
  readonly type = 'VariableStatement'

  constructor(
    readonly kind: VariableKeyword,
    readonly declarations: VariableDeclaration[],
  ) {}
}

/**
 * Checks if a value is Identifier node.
 * @param value The value to inspect
 */
export function isIdentifierNode(value: any): value is Identifier {
  return (
    typeof value === 'object' &&
    value.type === 'Identifier' &&
    typeof value.name === 'string'
  )
}

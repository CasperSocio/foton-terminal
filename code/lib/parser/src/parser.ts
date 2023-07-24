import {
  Token,
  TokenType,
  Tokenizer,
  isAssignmentOperatorTokenType,
  isLiteralTokenType,
  isVariableTokenType,
} from '@photon-terminal/lexer'
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
  Program,
  StringLiteral,
  VariableDeclaration,
  VariableStatement,
  isIdentifierNode,
} from './nodes'
import { Expression, Literal, Statement } from './types'
import {
  AssignmentOperator,
  isAssignmentOperator,
  isBinaryOperator,
  isVariableKeyword,
} from './utils'

/**
 * Abstract Syntax Tree class.
 *
 * This class is responsible for parsing JavaScript syntax
 * into an abstract syntax tree.
 */
class AST {
  private _lookahead: Token | null
  private _tokenizer: Tokenizer

  /**
   * Initializes the parser.
   */
  constructor() {
    this._lookahead = null
    this._tokenizer = new Tokenizer()
  }

  /**
   * AdditiveExpression
   *  : MultiplicativeExpression
   *  | AdditiveExpression ADDITIVE_OPERATOR Literal
   *  ;
   */
  public AdditiveExpression(): Expression {
    let left = this.MultiplicativeExpression()

    while (this._lookahead?.type === 'ADDITIVE_OPERATOR') {
      const operator = this._eat('ADDITIVE_OPERATOR').value
      if (!isBinaryOperator(operator)) {
        throw new SyntaxError(
          `Unexpected operator: "${operator}" is not a valid binary operator`,
        )
      }
      const right = this.MultiplicativeExpression()
      left = new BinaryExpression(operator, left, right)
    }

    return left
  }

  /**
   * AssignmentExpression
   *  : RelationalExpression
   *  | LeftHandSideExpression AssignmentOperator AssignmentExpression
   *  ;
   */
  public AssignmentExpression(): Expression {
    const left = this.RelationalExpression()

    if (!isAssignmentOperatorTokenType(this._lookahead?.type)) {
      return left
    }

    if (!isIdentifierNode(left)) {
      throw new SyntaxError('Invalid left-hand side in assignment expression')
    }

    return new AssignmentExpression(
      this.AssignmentOperator(),
      left,
      this.AssignmentExpression(),
    )
  }

  /**
   * AssignmentOperator
   *  : SIMPLE_ASSIGN
   *  | COMPLEX_ASSIGN
   *  ;
   */
  public AssignmentOperator(): AssignmentOperator {
    let operator: string

    if (this._lookahead?.type === 'SIMPLE_ASSIGN') {
      operator = this._eat('SIMPLE_ASSIGN').value
    } else {
      operator = this._eat('COMPLEX_ASSIGN').value
    }

    if (!isAssignmentOperator(operator)) {
      throw new SyntaxError(
        `Unexpected operator: "${operator}" is not an assignment operator`,
      )
    }

    return operator
  }

  /**
   * BlockStatement
   *  : OPEN_CURLY_BRACKET OptStatementList CLOSE_CURLY_BRACKET
   *  ;
   */
  public BlockStatement(): BlockStatement {
    this._eat('OPEN_CURLY_BRACKET')

    const body: Statement[] =
      this._lookahead?.type !== 'CLOSE_CURLY_BRACKET'
        ? this.StatementList('CLOSE_CURLY_BRACKET')
        : []

    this._eat('CLOSE_CURLY_BRACKET')

    return new BlockStatement(body)
  }

  /**
   * BooleanLiteral
   *  : BOOLEAN
   *  ;
   */
  public BooleanLiteral(): BooleanLiteral {
    const token = this._eat('BOOLEAN')

    const value = token.value === 'true'

    return new BooleanLiteral(value)
  }

  /**
   * EmptyStatement
   *  : SEMICOLON
   *  ;
   */
  public EmptyStatement(): EmptyStatement {
    this._eat('SEMICOLON')

    return new EmptyStatement()
  }

  /**
   * Expression
   *  : AdditiveExpression
   *  ;
   */
  public Expression(): Expression {
    return this.AssignmentExpression()
  }

  /**
   * ExpressionStatement
   *  : Expression SEMICOLON
   *  ;
   */
  public ExpressionStatement(): ExpressionStatement {
    const expression = this.Expression()

    this._eat('SEMICOLON')

    return new ExpressionStatement(expression)
  }

  /**
   * Identifier
   *  : IDENTIFIER
   *  ;
   */
  public Identifier(): Identifier {
    const name = this._eat('IDENTIFIER').value

    return new Identifier(name)
  }

  /**
   * IfStatement
   *  : IF OPEN_PAREN Expression CLOSE_PAREN Statement
   *  | IF OPEN_PAREN Expression CLOSE_PAREN Statement ELSE Statement
   *  ;
   */
  public IfStatement(): IfStatement {
    this._eat('IF')

    this._eat('OPEN_PAREN')
    const test = this.Expression()
    this._eat('CLOSE_PAREN')

    const consequent = this.Statement()

    let alternate: Statement | null = null
    if (this._lookahead && this._lookahead.type === 'ELSE') {
      this._eat('ELSE')
      alternate = this.Statement()
    }

    return new IfStatement(test, consequent, alternate)
  }

  /**
   * LeftHandSideExpression
   *  : Identifier
   *  ;
   */
  public LeftHandSideExpression(): Identifier {
    return this.Identifier()
  }

  /**
   * Literal
   *  : BooleanLiteral
   *  | NumericLiteral
   *  | StringLiteral
   *  ;
   */
  public Literal(): Literal {
    switch (this._lookahead?.type) {
      case 'BOOLEAN':
        return this.BooleanLiteral()
      case 'NUMBER':
        return this.NumericLiteral()
      case 'STRING':
        return this.StringLiteral()
    }
    throw new SyntaxError(`Literal: unexpected literal production`)
  }

  /**
   * MultiplicativeExpression
   *  : PrimaryExpression
   *  | BinaryExpression
   *  ;
   */
  public MultiplicativeExpression() {
    let left = this.PrimaryExpression()

    while (this._lookahead?.type === 'MULTIPLICATIVE_OPERATOR') {
      const operator = this._eat('MULTIPLICATIVE_OPERATOR').value
      if (!isBinaryOperator(operator)) {
        throw new SyntaxError(
          `Unexpected operator: "${operator}" is not a valid binary operator`,
        )
      }
      const right = this.PrimaryExpression()
      left = new BinaryExpression(operator, left, right)
    }

    return left
  }

  /**
   * NumericLiteral
   *  : NUMBER
   *  ;
   */
  public NumericLiteral(): NumericLiteral {
    return new NumericLiteral(this._eat('NUMBER').value)
  }

  /**
   * ParenthesizedExpression
   *  : OPEN_PAREN Expression CLOSE_PAREN
   */
  public ParenthesizedExpression(): Expression {
    this._eat('OPEN_PAREN')
    const expression = this.Expression()
    this._eat('CLOSE_PAREN')

    return expression
  }

  /**
   * PrimaryExpression
   *  : Literal
   *  | ParenthesizedExpression
   *  | LeftHandSideExpression
   *  ;
   */
  public PrimaryExpression(): Expression {
    if (isLiteralTokenType(this._lookahead?.type)) {
      return this.Literal()
    }
    if (this._lookahead?.type === 'OPEN_PAREN') {
      return this.ParenthesizedExpression()
    }
    return this.LeftHandSideExpression()
  }

  /**
   * Program
   *  : StatementList
   *  ;
   */
  public Program(): Program {
    return new Program(this.StatementList())
  }

  /**
   * RelationalExpression
   *  : AdditiveExpression
   *  | AdditiveExpression RELATIONAL_OPERATOR RelationalExpression
   *  ;
   */
  public RelationalExpression() {
    let left = this.AdditiveExpression()

    while (this._lookahead?.type === 'RELATIONAL_OPERATOR') {
      const operator = this._eat('RELATIONAL_OPERATOR').value
      if (!isBinaryOperator(operator)) {
        throw new SyntaxError(
          `Unexpected operator: "${operator}" is not a valid binary operator`,
        )
      }
      const right = this.AdditiveExpression()
      left = new BinaryExpression(operator, left, right)
    }

    return left
  }

  /**
   * Statement
   *  : BlockStatement
   *  | IfStatement
   *  | EmptyStatement
   *  | ExpressionStatement
   *  | VariableStatement
   *  ;
   */
  public Statement(): Statement {
    switch (this._lookahead?.type) {
      case 'SEMICOLON':
        return this.EmptyStatement()
      case 'IF':
        return this.IfStatement()
      case 'OPEN_CURLY_BRACKET':
        return this.BlockStatement()
      case 'CONST':
      case 'LET':
      case 'VAR':
        return this.VariableStatement(this._lookahead)
      default:
        return this.ExpressionStatement()
    }
  }

  /**
   * StatementList
   *  : Statement
   *  | StatementList Statement -> Statement Statement Statement Statement
   *  ;
   */
  public StatementList(stopLookahead: TokenType | null = null) {
    const statementList = [this.Statement()]

    while (this._lookahead !== null && this._lookahead.type !== stopLookahead) {
      statementList.push(this.Statement())
    }

    return statementList
  }

  /**
   * StringLiteral
   *  : STRING
   *  ;
   */
  public StringLiteral(): StringLiteral {
    const token = this._eat('STRING')

    // remove quotations
    const value = token.value.slice(1, -1)

    return new StringLiteral(value)
  }

  /**
   * VariableDeclaration
   *  : Identifier OptVariableInitializer
   *  ;
   */
  public VariableDeclaration(): VariableDeclaration {
    const id = this.Identifier()

    // OptValiableInitializer
    const init =
      this._lookahead?.type !== 'SEMICOLON' && this._lookahead?.type !== 'COMMA'
        ? this.ValiableInitializer()
        : null

    return new VariableDeclaration(id, init)
  }

  /**
   * VariableDeclarationList
   *  : VariableDeclaration
   *  | VariableDeclarationList COMMA VariableDeclaration
   *  ;
   */
  public VariableDeclarationList(): VariableDeclaration[] {
    const declarations: VariableDeclaration[] = []

    do {
      declarations.push(this.VariableDeclaration())
    } while (this._lookahead?.type === 'COMMA' && this._eat('COMMA'))

    return declarations
  }

  /**
   * ValiableInitializer
   *  : SIMPLE_ASSIGN AssignmentExpression
   *  ;
   */
  public ValiableInitializer() {
    this._eat('SIMPLE_ASSIGN')

    return this.AssignmentExpression()
  }

  /**
   * VariableStatement
   *  : (CONST | LET | VAR) VariableDeclarationList SEMICOLON
   *  ;
   */
  public VariableStatement(variableToken: Token): VariableStatement {
    const kind = variableToken.value

    if (!isVariableKeyword(kind)) {
      throw SyntaxError(
        `Unexpected variable production: expected a variable keyword, but got ${kind} instead`,
      )
    }
    if (!isVariableTokenType(this._lookahead?.type)) {
      throw new SyntaxError(`Unexpected token: "${this._lookahead?.value}"`)
    }
    this._eat(variableToken.type)

    const declarations = this.VariableDeclarationList()

    this._eat('SEMICOLON')

    return new VariableStatement(kind, declarations)
  }

  /**
   * Expects a token of a given type.
   * @param tokenType Token type to expect
   */
  private _eat(tokenType: TokenType) {
    const token = this._lookahead

    if (!token) {
      throw new SyntaxError(`Unexpected end of input, expected: "${tokenType}"`)
    }

    if (token.type !== tokenType) {
      throw new SyntaxError(
        `Unexpected token: "${token.value}", expected: "${tokenType}"`,
      )
    }

    // Advance to next token
    this._lookahead = this._tokenizer.getNextToken()

    return token
  }

  /**
   * Parses a string into an AST.
   * @param data String to parse
   */
  public parse(data: string) {
    this._tokenizer.init(data)

    // Prime the tokenizer to obtain the first token which is out lookahead.
    // The lookahead is used for predictive parsing.
    this._lookahead = this._tokenizer.getNextToken()

    // Parse recursively starting from the main entry point, the Program:
    return this.Program()
  }
}

/**
 * Parses a JavaScript syntax string into an abstract syntax tree.
 * @param text A valid JavaScript syntax string
 */
export function parse(text: string): Program {
  return new AST().parse(text)
}

import { Program } from '../nodes'
import { parse } from '../parser'
import { Expression, Statement } from '../types'

describe('parse()', () => {
  const program = (...statement: Statement[]) => new Program([...statement])

  describe('BlockStatement', () => {
    const blockStatement = (...statement: Statement[]) =>
      program({
        type: 'BlockStatement',
        body: [...statement],
      })

    it('parses EmptyStatement', () => {
      // {}
      const expected = blockStatement()
      const actual = parse(`{}`)
      expect(actual).toMatchObject(expected)
    })
    it('can contain multiple statements', () => {
      // { 42; "hello"; }
      const expected = blockStatement(
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NumericLiteral',
            value: 42,
          },
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'StringLiteral',
            value: 'hello',
          },
        },
      )
      const actual = parse(`{ 42; "hello"; }`)
      expect(actual).toMatchObject(expected)
    })
    it('handles nested BlockStatement', () => {
      // { 42; { "hello"; } }
      const expected = blockStatement(
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NumericLiteral',
            value: 42,
          },
        },
        {
          type: 'BlockStatement',
          body: [
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'StringLiteral',
                value: 'hello',
              },
            },
          ],
        },
      )
      const actual = parse(`{ 42; { "hello"; } }`)
      expect(actual).toMatchObject(expected)
    })
  })
  describe('ExpressionStatement', () => {
    const expressionStatement = (expression: Expression): Program =>
      program({
        type: 'ExpressionStatement',
        expression,
      })

    it('parses BooleanLiteral', () => {
      // true
      expect(parse(`true;`)).toMatchObject(
        expressionStatement({
          type: 'BooleanLiteral',
          value: true,
        }),
      )
      // false
      expect(parse(`false;`)).toMatchObject(
        expressionStatement({
          type: 'BooleanLiteral',
          value: false,
        }),
      )
    })
    it('parses NumericLiteral', () => {
      // 2023
      expect(parse(`2023;`)).toMatchObject(
        expressionStatement({
          type: 'NumericLiteral',
          value: 2023,
        }),
      )
      // 42.25
      expect(parse(`42.25;`)).toMatchObject(
        expressionStatement({
          type: 'NumericLiteral',
          value: 42.25,
        }),
      )
    })
    it('parses StringLiteral', () => {
      // "Hello World!"
      expect(parse(`'Hello World!';`)).toMatchObject(
        expressionStatement({
          type: 'StringLiteral',
          value: 'Hello World!',
        }),
      )
    })
    describe('AssignmentExpression', () => {
      it('fails if LeftHandSideExpression is not Identifier', () => {
        // 42 = 42
        expect(() => {
          parse(`42 = 42;`)
        }).toThrowError()
      })
      it('parses BooleanLiteral', () => {
        // x = true
        const expected = expressionStatement({
          type: 'AssignmentExpression',
          operator: '=',
          left: {
            type: 'Identifier',
            name: 'x',
          },
          right: {
            type: 'BooleanLiteral',
            value: true,
          },
        })
        const actual = parse(`x = true;`)
        expect(actual).toMatchObject(expected)
      })
      it('parses NumericLiteral', () => {
        // x = 42
        const expected = expressionStatement({
          type: 'AssignmentExpression',
          operator: '=',
          left: {
            type: 'Identifier',
            name: 'x',
          },
          right: {
            type: 'NumericLiteral',
            value: 42,
          },
        })
        const actual = parse(`x = 42;`)
        expect(actual).toMatchObject(expected)
      })
      it('parses StringLiteral', () => {
        // firstName = "John"
        const expected = expressionStatement({
          type: 'AssignmentExpression',
          operator: '=',
          left: {
            type: 'Identifier',
            name: 'firstName',
          },
          right: {
            type: 'StringLiteral',
            value: 'John',
          },
        })
        const actual = parse(`firstName = "John";`)
        expect(actual).toMatchObject(expected)
      })
      it('parses nested AssignmentExpression', () => {
        // x = y = 42
        const expected = expressionStatement({
          type: 'AssignmentExpression',
          operator: '=',
          left: {
            type: 'Identifier',
            name: 'x',
          },
          right: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'Identifier',
              name: 'y',
            },
            right: {
              type: 'NumericLiteral',
              value: 42,
            },
          },
        })
        const actual = parse(`x = y = 42;`)
        expect(actual).toMatchObject(expected)
      })
      it('parses complex assignment', () => {
        // x += 42
        const expected = expressionStatement({
          type: 'AssignmentExpression',
          operator: '+=',
          left: {
            type: 'Identifier',
            name: 'x',
          },
          right: {
            type: 'NumericLiteral',
            value: 42,
          },
        })
        const actual = parse(`x += 42;`)
        expect(actual).toMatchObject(expected)
      })
    })
    describe('BinaryExpression', () => {
      it('has higher precedence than AssignmentExpression', () => {
        // x = y + 10
        const expected = expressionStatement({
          type: 'AssignmentExpression',
          operator: '=',
          left: {
            type: 'Identifier',
            name: 'x',
          },
          right: {
            type: 'BinaryExpression',
            operator: '+',
            left: {
              type: 'Identifier',
              name: 'y',
            },
            right: {
              type: 'NumericLiteral',
              value: 10,
            },
          },
        })
        const actual = parse(`x = y + 10;`)
        expect(actual).toMatchObject(expected)
      })
      it('parses nested BinaryExpressions', () => {
        // 3 + 2 - 1
        const expected = expressionStatement({
          type: 'BinaryExpression',
          operator: '-',
          left: {
            type: 'BinaryExpression',
            operator: '+',
            left: {
              type: 'NumericLiteral',
              value: 3,
            },
            right: {
              type: 'NumericLiteral',
              value: 2,
            },
          },
          right: {
            type: 'NumericLiteral',
            value: 1,
          },
        })
        const actual = parse(`3 + 2 - 1;`)
        expect(actual).toMatchObject(expected)
      })
      describe('AdditiveExpression', () => {
        it('has higher precedence than RelationalExpression', () => {
          // x + 5 > 0
          const expected = expressionStatement({
            type: 'BinaryExpression',
            operator: '>',
            left: {
              type: 'BinaryExpression',
              operator: '+',
              left: {
                type: 'Identifier',
                name: 'x',
              },
              right: {
                type: 'NumericLiteral',
                value: 5,
              },
            },
            right: {
              type: 'NumericLiteral',
              value: 0,
            },
          })
          const actual = parse(`x + 5 > 0;`)
          expect(actual).toMatchObject(expected)
        })
        it('parses NumericLiteral addition', () => {
          // 2 + 3
          const expected = expressionStatement({
            type: 'BinaryExpression',
            operator: '+',
            left: {
              type: 'NumericLiteral',
              value: 2,
            },
            right: {
              type: 'NumericLiteral',
              value: 3,
            },
          })
          const actual = parse(`2 + 3;`)
          expect(actual).toMatchObject(expected)
        })
        it('parses NumericLiteral subtraction', () => {
          // 2010 - 1961
          const expected = expressionStatement({
            type: 'BinaryExpression',
            operator: '-',
            left: {
              type: 'NumericLiteral',
              value: 2010,
            },
            right: {
              type: 'NumericLiteral',
              value: 1961,
            },
          })
          const actual = parse(`2010 - 1961;`)
          expect(actual).toMatchObject(expected)
        })
        it('parses Identifier addition', () => {
          // x + y
          const expected = expressionStatement({
            type: 'BinaryExpression',
            operator: '+',
            left: {
              type: 'Identifier',
              name: 'x',
            },
            right: {
              type: 'Identifier',
              name: 'y',
            },
          })
          const actual = parse(`x + y;`)
          expect(actual).toMatchObject(expected)
        })
      })
      describe('MultiplicativeExpression', () => {
        it('has higher precedence than AdditiveExpression', () => {
          // 1 + 2 * 3
          const expected1 = expressionStatement({
            type: 'BinaryExpression',
            operator: '+',
            left: {
              type: 'NumericLiteral',
              value: 1,
            },
            right: {
              type: 'BinaryExpression',
              operator: '*',
              left: {
                type: 'NumericLiteral',
                value: 2,
              },
              right: {
                type: 'NumericLiteral',
                value: 3,
              },
            },
          })
          // 1 * 2 - 3
          const expected2 = expressionStatement({
            type: 'BinaryExpression',
            operator: '-',
            left: {
              type: 'BinaryExpression',
              operator: '*',
              left: {
                type: 'NumericLiteral',
                value: 1,
              },
              right: {
                type: 'NumericLiteral',
                value: 2,
              },
            },
            right: {
              type: 'NumericLiteral',
              value: 3,
            },
          })
          const actual1 = parse(`1 + 2 * 3;`)
          const actual2 = parse(`1 * 2 - 3;`)

          expect(actual1).toMatchObject(expected1)
          expect(actual2).toMatchObject(expected2)
        })
        it('parses NumericLiteral multiplication', () => {
          // 9 * 3
          const expected = expressionStatement({
            type: 'BinaryExpression',
            operator: '*',
            left: {
              type: 'NumericLiteral',
              value: 9,
            },
            right: {
              type: 'NumericLiteral',
              value: 3,
            },
          })
          const actual = parse(`9 * 3;`)
          expect(actual).toMatchObject(expected)
        })
        it('parses NumericLiteral division', () => {
          // 25 / 5
          const expected = expressionStatement({
            type: 'BinaryExpression',
            operator: '/',
            left: {
              type: 'NumericLiteral',
              value: 25,
            },
            right: {
              type: 'NumericLiteral',
              value: 5,
            },
          })
          const actual = parse(`25 / 5;`)
          expect(actual).toMatchObject(expected)
        })
      })
      describe('ParenthesizedExpression', () => {
        it('has higher precedence than AdditiveExpression', () => {
          // 8 + (1 + 2)
          const expected = expressionStatement({
            type: 'BinaryExpression',
            operator: '+',
            left: {
              type: 'NumericLiteral',
              value: 8,
            },
            right: {
              type: 'BinaryExpression',
              operator: '+',
              left: {
                type: 'NumericLiteral',
                value: 1,
              },
              right: {
                type: 'NumericLiteral',
                value: 2,
              },
            },
          })
          const actual = parse(`8 + (1 + 2);`)
          expect(actual).toMatchObject(expected)
        })
        it('has higher precedence than MultiplicativeExpression', () => {
          // x * (y - 4)
          const expected = expressionStatement({
            type: 'BinaryExpression',
            operator: '*',
            left: {
              type: 'Identifier',
              name: 'x',
            },
            right: {
              type: 'BinaryExpression',
              operator: '-',
              left: {
                type: 'Identifier',
                name: 'y',
              },
              right: {
                type: 'NumericLiteral',
                value: 4,
              },
            },
          })
          const actual = parse(`x * (y - 4);`)
          expect(actual).toMatchObject(expected)
        })
        it('has higher precedence than RelationalExpression', () => {
          // 20 <= (counter - 4)
          const expected = expressionStatement({
            type: 'BinaryExpression',
            operator: '<=',
            left: {
              type: 'NumericLiteral',
              value: 20,
            },
            right: {
              type: 'BinaryExpression',
              operator: '-',
              left: {
                type: 'Identifier',
                name: 'counter',
              },
              right: {
                type: 'NumericLiteral',
                value: 4,
              },
            },
          })
          const actual = parse(`20 <= (counter - 4);`)
          expect(actual).toMatchObject(expected)
        })
      })
      describe('RelationalExpression', () => {
        it('parses Identifier > NumericLiteral', () => {
          // x > 10
          const expected = expressionStatement({
            type: 'BinaryExpression',
            operator: '>',
            left: {
              type: 'Identifier',
              name: 'x',
            },
            right: {
              type: 'NumericLiteral',
              value: 10,
            },
          })
          const actual = parse(`x > 10;`)
          expect(actual).toMatchObject(expected)
        })
      })
    })
  })
  describe('IfStatement', () => {
    describe('.test', () => {
      it('parses Identifier', () => {
        // if (x) {}
        const expected = program({
          type: 'IfStatement',
          test: {
            type: 'Identifier',
            name: 'x',
          },
          consequent: {
            type: 'BlockStatement',
            body: [],
          },
          alternate: null,
        })
        const actual = parse(`if (x) {}`)
        expect(actual).toMatchObject(expected)
      })
    })
  })
  describe('Program', () => {
    it('parses EmptyStatement', () => {
      // ;
      const expected = program({
        type: 'EmptyStatement',
      })
      const actual = parse(`;`)
      expect(actual).toMatchObject(expected)
    })
  })
  describe('VariableStatement', () => {
    it('parses variable declaration', () => {
      // let y
      const expected = program({
        type: 'VariableStatement',
        declarations: [
          {
            type: 'VariableDeclaration',
            id: {
              type: 'Identifier',
              name: 'y',
            },
            init: null,
          },
        ],
        kind: 'let',
      })
      const actual = parse(`let y;`)
      expect(actual).toMatchObject(expected)
    })
    it('parses multiple declarations', () => {
      // let a, b
      const expected = program({
        type: 'VariableStatement',
        declarations: [
          {
            type: 'VariableDeclaration',
            id: {
              type: 'Identifier',
              name: 'a',
            },
            init: null,
          },
          {
            type: 'VariableDeclaration',
            id: {
              type: 'Identifier',
              name: 'b',
            },
            init: null,
          },
        ],
        kind: 'let',
      })
      const actual = parse(`let a, b;`)
      expect(actual).toMatchObject(expected)
    })
    it('parses variable initialization', () => {
      // const x = 42
      const expected = program({
        type: 'VariableStatement',
        declarations: [
          {
            type: 'VariableDeclaration',
            id: {
              type: 'Identifier',
              name: 'x',
            },
            init: {
              type: 'NumericLiteral',
              value: 42,
            },
          },
        ],
        kind: 'const',
      })
      const actual = parse(`const x = 42;`)
      expect(actual).toMatchObject(expected)
    })
    it('parses multiple declarations combined with initializer', () => {
      // let c, d = 10
      const expected = program({
        type: 'VariableStatement',
        declarations: [
          {
            type: 'VariableDeclaration',
            id: {
              type: 'Identifier',
              name: 'c',
            },
            init: null,
          },
          {
            type: 'VariableDeclaration',
            id: {
              type: 'Identifier',
              name: 'd',
            },
            init: {
              type: 'NumericLiteral',
              value: 10,
            },
          },
        ],
        kind: 'let',
      })
      const actual = parse(`let c, d = 10;`)
      expect(actual).toMatchObject(expected)
    })
    it('parses declaration combined with assignment initializer', () => {
      // var foo = bar = 10
      const expected = program({
        type: 'VariableStatement',
        declarations: [
          {
            type: 'VariableDeclaration',
            id: {
              type: 'Identifier',
              name: 'foo',
            },
            init: {
              type: 'AssignmentExpression',
              operator: '=',
              left: {
                type: 'Identifier',
                name: 'bar',
              },
              right: {
                type: 'NumericLiteral',
                value: 10,
              },
            },
          },
        ],
        kind: 'var',
      })
      const actual = parse(`var foo = bar = 10;`)
      expect(actual).toMatchObject(expected)
    })
  })

  // —————————— LINE ——————————

  describe('.parse()', () => {
    describe('IfStatement', () => {
      it('parses `if (x) { x = 1; }`', () => {
        const expected: Program = {
          type: 'Program',
          body: [
            {
              type: 'IfStatement',
              test: {
                type: 'Identifier',
                name: 'x',
              },
              consequent: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'AssignmentExpression',
                      operator: '=',
                      left: {
                        type: 'Identifier',
                        name: 'x',
                      },
                      right: {
                        type: 'NumericLiteral',
                        value: 1,
                      },
                    },
                  },
                ],
              },
              alternate: null,
            },
          ],
        }
        const actual = parse(`if (x) { x = 1; }`)

        expect(actual).toMatchObject(expected)
      })

      it('parses `if (x) { x = 1; } else { x = 2; }`', () => {
        const expected: Program = {
          type: 'Program',
          body: [
            {
              type: 'IfStatement',
              test: {
                type: 'Identifier',
                name: 'x',
              },
              consequent: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'AssignmentExpression',
                      operator: '=',
                      left: {
                        type: 'Identifier',
                        name: 'x',
                      },
                      right: {
                        type: 'NumericLiteral',
                        value: 1,
                      },
                    },
                  },
                ],
              },
              alternate: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'AssignmentExpression',
                      operator: '=',
                      left: {
                        type: 'Identifier',
                        name: 'x',
                      },
                      right: {
                        type: 'NumericLiteral',
                        value: 2,
                      },
                    },
                  },
                ],
              },
            },
          ],
        }
        const actual = parse(`if (x) { x = 1; } else { x = 2; }`)

        expect(actual).toMatchObject(expected)
      })

      it('parses `if (x) x = 0;`', () => {
        const expected: Program = {
          type: 'Program',
          body: [
            {
              type: 'IfStatement',
              test: {
                type: 'Identifier',
                name: 'x',
              },
              consequent: {
                type: 'ExpressionStatement',
                expression: {
                  type: 'AssignmentExpression',
                  operator: '=',
                  left: {
                    type: 'Identifier',
                    name: 'x',
                  },
                  right: {
                    type: 'NumericLiteral',
                    value: 0,
                  },
                },
              },
              alternate: null,
            },
          ],
        }
        const actual = parse(`if (x) x = 0;`)

        expect(actual).toMatchObject(expected)
      })

      it('parses `if (x) if (y) {} else {}`', () => {
        const expected: Program = {
          type: 'Program',
          body: [
            {
              type: 'IfStatement',
              test: {
                type: 'Identifier',
                name: 'x',
              },
              consequent: {
                type: 'IfStatement',
                test: {
                  type: 'Identifier',
                  name: 'y',
                },
                consequent: {
                  type: 'BlockStatement',
                  body: [],
                },
                alternate: {
                  type: 'BlockStatement',
                  body: [],
                },
              },
              alternate: null,
            },
          ],
        }
        const actual = parse(`if (x) if (y) {} else {}`)

        expect(actual).toMatchObject(expected)
      })

      it('parses `if (x > 10) { x = 0; } else { x += 1; }`', () => {
        const expected: Program = {
          type: 'Program',
          body: [
            {
              type: 'IfStatement',
              test: {
                type: 'BinaryExpression',
                operator: '>',
                left: {
                  type: 'Identifier',
                  name: 'x',
                },
                right: {
                  type: 'NumericLiteral',
                  value: 10,
                },
              },
              consequent: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'AssignmentExpression',
                      operator: '=',
                      left: {
                        type: 'Identifier',
                        name: 'x',
                      },
                      right: {
                        type: 'NumericLiteral',
                        value: 0,
                      },
                    },
                  },
                ],
              },
              alternate: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'AssignmentExpression',
                      operator: '+=',
                      left: {
                        type: 'Identifier',
                        name: 'x',
                      },
                      right: {
                        type: 'NumericLiteral',
                        value: 1,
                      },
                    },
                  },
                ],
              },
            },
          ],
        }
        const actual = parse(`if (x > 10) { x = 0; } else { x += 1; }`)

        expect(actual).toMatchObject(expected)
      })
    })
  })
})

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
} from '../nodes'

describe('AssignmentExpression', () => {
  it('has 4 properties', () => {
    const node = new AssignmentExpression(
      '=',
      new Identifier('x'),
      new NumericLiteral(0),
    )
    const actual = Object.keys(node).length
    expect(actual).toEqual(4)
  })
  describe('.type', () => {
    it('returns AssignmentExpression', () => {
      const node = new AssignmentExpression(
        '=',
        new Identifier('x'),
        new NumericLiteral(0),
      )
      const actual = node.type
      expect(actual).toStrictEqual('AssignmentExpression')
    })
  })
})

describe('BinaryExpression', () => {
  it('has 4 properties', () => {
    const node = new BinaryExpression(
      '+',
      new NumericLiteral(1),
      new NumericLiteral(2),
    )
    const actual = Object.keys(node).length
    expect(actual).toEqual(4)
  })
  describe('.type', () => {
    it('returns BinaryExpression', () => {
      const node = new BinaryExpression(
        '+',
        new NumericLiteral(1),
        new NumericLiteral(2),
      )
      const actual = node.type
      expect(actual).toStrictEqual('BinaryExpression')
    })
  })
})

describe('BlockStatement', () => {
  it('has 2 properties', () => {
    const node = new BlockStatement([])
    const actual = Object.keys(node).length
    expect(actual).toEqual(2)
  })
  describe('.type', () => {
    it('returns BlockStatement', () => {
      const node = new BlockStatement([])
      const actual = node.type
      expect(actual).toStrictEqual('BlockStatement')
    })
  })
})

describe('BooleanLiteral', () => {
  it('has 2 properties', () => {
    const node = new BooleanLiteral(true)
    const actual = Object.keys(node).length
    expect(actual).toEqual(2)
  })
  describe('.type', () => {
    it('returns BooleanLiteral', () => {
      const node = new BooleanLiteral(true)
      const actual = node.type
      expect(actual).toStrictEqual('BooleanLiteral')
    })
  })
  describe('.value', () => {
    it('returns a boolean', () => {
      const node = new BooleanLiteral(true)
      const actual = typeof node.value
      expect(actual).toBe('boolean')
    })
  })
})

describe('EmptyStatement', () => {
  it('has 1 property', () => {
    const node = new EmptyStatement()
    const actual = Object.keys(node).length
    expect(actual).toEqual(1)
  })
  describe('.type', () => {
    it('returns EmptyStatement', () => {
      const node = new EmptyStatement()
      const actual = node.type
      expect(actual).toStrictEqual('EmptyStatement')
    })
  })
})

describe('ExpressionStatement', () => {
  it('has 2 properties', () => {
    const node = new ExpressionStatement(new Identifier('x'))
    const actual = Object.keys(node).length
    expect(actual).toEqual(2)
  })
  describe('.type', () => {
    it('returns ExpressionStatement', () => {
      const node = new ExpressionStatement(new Identifier('x'))
      const actual = node.type
      expect(actual).toStrictEqual('ExpressionStatement')
    })
  })
})

describe('Identifier', () => {
  it('has 2 properties', () => {
    const node = new Identifier('myVar')
    const actual = Object.keys(node).length
    expect(actual).toEqual(2)
  })
  describe('.name', () => {
    it('returns a string', () => {
      const node = new Identifier('myVar')
      const actual = typeof node.name
      expect(actual).toBe('string')
    })
  })
  describe('.type', () => {
    it('returns Identifier', () => {
      const node = new Identifier('myVar')
      const actual = node.type
      expect(actual).toStrictEqual('Identifier')
    })
  })
})

describe('IfStatement', () => {
  const identifier = new Identifier('x')
  const assignment = new AssignmentExpression(
    '=',
    identifier,
    new NumericLiteral(10),
  )
  const statement = new ExpressionStatement(assignment)

  it('has 4 properties', () => {
    const node = new IfStatement(identifier, statement)
    const actual = Object.keys(node).length
    expect(actual).toEqual(4)
  })
  describe('.alternate', () => {
    it('defaults to null', () => {
      const node = new IfStatement(identifier, statement)
      const actual = node.alternate
      expect(actual).toBeNull()
    })
  })
  describe('.type', () => {
    it('returns IfStatement', () => {
      const node = new IfStatement(identifier, statement)
      const actual = node.type
      expect(actual).toStrictEqual('IfStatement')
    })
  })
})

describe('NumericLiteral', () => {
  it('has 2 properties', () => {
    const node = new NumericLiteral(42)
    const actual = Object.keys(node).length
    expect(actual).toEqual(2)
  })
  describe('.constructor()', () => {
    it('converts string containing valid number', () => {
      const node = new NumericLiteral('42')
      const actual = node.value
      expect(actual).toStrictEqual(42)
    })
    it('throws error string does not contain a valid number', () => {
      expect(() => {
        new NumericLiteral('null')
      }).toThrowError()
    })
  })
  describe('.type', () => {
    it('returns NumericLiteral', () => {
      const node = new NumericLiteral(42)
      const actual = node.type
      expect(actual).toStrictEqual('NumericLiteral')
    })
  })
  describe('.value', () => {
    it('returns a number', () => {
      const node = new NumericLiteral(42)
      const actual = typeof node.value
      expect(actual).toBe('number')
    })
  })
})

describe('Program', () => {
  it('has 2 properties', () => {
    const node = new Program([])
    const actual = Object.keys(node).length
    expect(actual).toEqual(2)
  })
  describe('.type', () => {
    it('returns Program', () => {
      const node = new Program([])
      const actual = node.type
      expect(actual).toStrictEqual('Program')
    })
  })
})

describe('StringLiteral', () => {
  it('has 2 properties', () => {
    const node = new StringLiteral('hello')
    const actual = Object.keys(node).length
    expect(actual).toEqual(2)
  })
  describe('.type', () => {
    it('returns StringLiteral', () => {
      const node = new StringLiteral('hello')
      const actual = node.type
      expect(actual).toStrictEqual('StringLiteral')
    })
  })
  describe('.value', () => {
    it('returns a string', () => {
      const node = new StringLiteral('hello')
      const actual = typeof node.value
      expect(actual).toBe('string')
    })
  })
})

describe('VariableDeclaration', () => {
  it('has 3 properties', () => {
    const node = new VariableDeclaration(new Identifier('x'))
    const actual = Object.keys(node).length
    expect(actual).toEqual(3)
  })
  describe('.init', () => {
    it('defaults to null', () => {
      const node = new VariableDeclaration(new Identifier('x'))
      const actual = node.init
      expect(actual).toBeNull()
    })
  })
  describe('.type', () => {
    it('returns VariableDeclaration', () => {
      const node = new VariableDeclaration(new Identifier('x'))
      const actual = node.type
      expect(actual).toStrictEqual('VariableDeclaration')
    })
  })
})

describe('VariableStatement', () => {
  it('has 3 properties', () => {
    const node = new VariableStatement('const', [])
    const actual = Object.keys(node).length
    expect(actual).toEqual(3)
  })
  describe('.type', () => {
    it('returns VariableStatement', () => {
      const node = new VariableStatement('const', [])
      const actual = node.type
      expect(actual).toStrictEqual('VariableStatement')
    })
  })
})

describe('isIdentifier()', () => {
  it('returns true', () => {
    const identifier = new Identifier('myVar')
    const actual = isIdentifierNode(identifier)

    expect(actual).toBeTruthy()
  })

  it('returns false', () => {
    expect(isIdentifierNode(new BooleanLiteral(true))).toBeFalsy()
    expect(isIdentifierNode('hello')).toBeFalsy()
  })
})

# Photon Terminal Parser

The syntax analysis tool made for Photon Terminal.

## Install

```bash
npm i @photon-terminal/parser
```

## Usage

```typescript
import { parse } from '@photon-terminal/parser'

const ast = parse(`
  const age = 42;
  let isOld;

  if (age <= 69) {
    isOld = false;
  } else {
    isOld = true;
  }
`)

console.log(JSON.stringify(ast, null, 2))
```

Will print

```json
{
  "type": "Program",
  "body": [
    {
      "type": "VariableStatement",
      "kind": "const",
      "declarations": [
        {
          "type": "VaraiableDeclaration",
          "id": {
            "type": "Identifier",
            "name": "age"
          },
          "init": {
            "type": "NumericLiteral",
            "value": 42
          }
        }
      ]
    },
    {
      "type": "VariableStatement",
      "kind": "let",
      "declarations": [
        {
          "type": "VaraiableDeclaration",
          "id": {
            "type": "Identifier",
            "name": "isOld"
          },
          "init": null
        }
      ]
    },
    {
      "type": "IfStatement",
      "test": {
        "type": "ExpressionStatement",
        "expression": {
          "type": "BinaryExpression",
          "operator": "<=",
          "left": {
            "type": "Identifier",
            "name": "age"
          },
          "right": {
            "type": "NumericLiteral",
            "value": 69
          }
        }
      },
      "consequent": {
        "type": "BlockStatement",
        "body": [
          {
            "type": "ExpressionStatement",
            "expression": {
              "type": "AssignmentExpression",
              "operator": "=",
              "left": {
                "type": "Identifier",
                "name": "isOld"
              },
              "right": {
                "type": "BooleanLiteral",
                "value": false
              }
            }
          }
        ]
      },
      "alternate": [
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "AssignmentExpression",
            "operator": "=",
            "left": {
              "type": "Identifier",
              "name": "isOld"
            },
            "right": {
              "type": "BooleanLiteral",
              "value": true
            }
          }
        }
      ]
    }
  ]
}
```

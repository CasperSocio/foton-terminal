import { Tokenizer } from '../lexer'

describe('Tokenizer class', () => {
  const tokenizer = new Tokenizer()

  describe('.getNextToken()', () => {
    it('throws unexpected token error', () => {
      tokenizer.init('!')
      expect(() => {
        tokenizer.getNextToken()
      }).toThrowError(`Unexpected token: "!"`)
    })
    it('returns null', () => {
      tokenizer.init(``)

      expect(tokenizer.getNextToken()).toBeNull()
    })
    describe('Assignment operators', () => {
      it('returns =', () => {
        tokenizer.init(`= 23`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('SIMPLE_ASSIGN')
        expect(token?.value).toStrictEqual(`=`)
      })
      it('returns +=', () => {
        tokenizer.init(`+= 23`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('COMPLEX_ASSIGN')
        expect(token?.value).toStrictEqual(`+=`)
      })
      it('returns -=', () => {
        tokenizer.init(`-= 23`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('COMPLEX_ASSIGN')
        expect(token?.value).toStrictEqual(`-=`)
      })
      it('returns *=', () => {
        tokenizer.init(`*= 23`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('COMPLEX_ASSIGN')
        expect(token?.value).toStrictEqual(`*=`)
      })
      it('returns /=', () => {
        tokenizer.init(`/= 23`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('COMPLEX_ASSIGN')
        expect(token?.value).toStrictEqual(`/=`)
      })
    })
    describe('Booleans', () => {
      it('returns true', () => {
        tokenizer.init(`true : false`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('BOOLEAN')
        expect(token?.value).toStrictEqual(`true`)
      })
      it('returns false', () => {
        tokenizer.init(`false : true`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('BOOLEAN')
        expect(token?.value).toStrictEqual(`false`)
      })
      it('does not match trueBlood', () => {
        tokenizer.init(`trueBlood`)
        const token = tokenizer.getNextToken()

        expect(token?.type).not.toBe('BOOLEAN')
      })
    })
    describe('Comments', () => {
      it('skips single-line comments', () => {
        tokenizer.init(`
          // comment
          42
        `)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('NUMBER')
        expect(token?.value).toStrictEqual(`42`)
      })
      it('skips multi-line comments', () => {
        tokenizer.init(`
          /**
           * comment
           */
          42
        `)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('NUMBER')
        expect(token?.value).toStrictEqual(`42`)
      })
    })
    describe('Equality operators', () => {
      it('returns ==', () => {
        tokenizer.init(`== true`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('EQUALITY_OPERATOR')
        expect(token?.value).toStrictEqual(`==`)
      })
      it('returns !=', () => {
        tokenizer.init(`!= true`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('EQUALITY_OPERATOR')
        expect(token?.value).toStrictEqual(`!=`)
      })
      it('returns ===', () => {
        tokenizer.init(`=== true`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('STRICT_EQUALITY_OPERATOR')
        expect(token?.value).toStrictEqual(`===`)
      })
      it('returns !==', () => {
        tokenizer.init(`!== true`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('STRICT_EQUALITY_OPERATOR')
        expect(token?.value).toStrictEqual(`!==`)
      })
    })
    describe('Identifiers', () => {
      it('returns x', () => {
        tokenizer.init(`x, y;`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('IDENTIFIER')
        expect(token?.value).toStrictEqual(`x`)
      })
      it('returns age', () => {
        tokenizer.init(`age = 2;`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('IDENTIFIER')
        expect(token?.value).toStrictEqual(`age`)
      })
      it('returns firstName', () => {
        tokenizer.init(`firstName=2;`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('IDENTIFIER')
        expect(token?.value).toStrictEqual(`firstName`)
      })
    })
    describe('Keywords', () => {
      it('returns const', () => {
        tokenizer.init(`const x = 2`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('CONST')
        expect(token?.value).toStrictEqual(`const`)
      })
      it('returns else', () => {
        tokenizer.init(`else {}`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('ELSE')
        expect(token?.value).toStrictEqual(`else`)
      })
      it('returns if', () => {
        tokenizer.init(`if (x) {}`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('IF')
        expect(token?.value).toStrictEqual(`if`)
      })
      it('returns let', () => {
        tokenizer.init(`let x`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('LET')
        expect(token?.value).toStrictEqual(`let`)
      })
      it('returns null', () => {
        tokenizer.init(`null;`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('NULL')
        expect(token?.value).toStrictEqual(`null`)
      })
      it('returns var', () => {
        tokenizer.init(`var x`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('VAR')
        expect(token?.value).toStrictEqual(`var`)
      })
    })
    describe('Math operators', () => {
      it('returns +', () => {
        tokenizer.init(`+ 42`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('ADDITIVE_OPERATOR')
        expect(token?.value).toStrictEqual(`+`)
      })
      it('returns -', () => {
        tokenizer.init(`- 42`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('ADDITIVE_OPERATOR')
        expect(token?.value).toStrictEqual(`-`)
      })
      it('returns *', () => {
        tokenizer.init(`* 42`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('MULTIPLICATIVE_OPERATOR')
        expect(token?.value).toStrictEqual(`*`)
      })
      it('returns /', () => {
        tokenizer.init(`/ 42`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('MULTIPLICATIVE_OPERATOR')
        expect(token?.value).toStrictEqual(`/`)
      })
    })
    describe('Numbers', () => {
      it('returns integer', () => {
        tokenizer.init(`42 + 3`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('NUMBER')
        expect(token?.value).toStrictEqual(`42`)
      })
      it('returns decimal', () => {
        tokenizer.init(`3.14 + 3`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('NUMBER')
        expect(token?.value).toStrictEqual(`3.14`)
      })
      it('does not match 1a', () => {
        tokenizer.init(`1a`)
        const token = tokenizer.getNextToken()

        expect(token?.type).not.toBe('NUMBER')
      })
    })
    describe('Relational operators', () => {
      it('returns `<`', () => {
        tokenizer.init(`< 10`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('RELATIONAL_OPERATOR')
        expect(token?.value).toStrictEqual(`<`)
      })
      it('returns `<=`', () => {
        tokenizer.init(`<= 10`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('RELATIONAL_OPERATOR')
        expect(token?.value).toStrictEqual(`<=`)
      })
      it('returns `>`', () => {
        tokenizer.init(`> 10`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('RELATIONAL_OPERATOR')
        expect(token?.value).toStrictEqual(`>`)
      })
      it('returns `>=`', () => {
        tokenizer.init(`>=10`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('RELATIONAL_OPERATOR')
        expect(token?.value).toStrictEqual(`>=`)
      })
    })
    describe('Strings', () => {
      it("returns 'Hello'", () => {
        tokenizer.init(`'Hello' as string`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('STRING')
        expect(token?.value).toStrictEqual(`'Hello'`)
      })
      it('returns "Hello"', () => {
        tokenizer.init(`"Hello" as tring`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('STRING')
        expect(token?.value).toStrictEqual(`"Hello"`)
      })
      it('returns "true"', () => {
        tokenizer.init(`"true" as boolean`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('STRING')
        expect(token?.value).toStrictEqual(`"true"`)
      })
    })
    describe('Symbols', () => {
      it('returns ;', () => {
        tokenizer.init(`;`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('SEMICOLON')
        expect(token?.value).toStrictEqual(`;`)
      })
      it('returns {', () => {
        tokenizer.init(`{ const`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('OPEN_CURLY_BRACKET')
        expect(token?.value).toStrictEqual(`{`)
      })
      it('returns }', () => {
        tokenizer.init(`}`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('CLOSE_CURLY_BRACKET')
        expect(token?.value).toStrictEqual(`}`)
      })
      it('returns (', () => {
        tokenizer.init(`(`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('OPEN_PAREN')
        expect(token?.value).toStrictEqual(`(`)
      })
      it('returns )', () => {
        tokenizer.init(`)`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('CLOSE_PAREN')
        expect(token?.value).toStrictEqual(`)`)
      })
      it('returns ,', () => {
        tokenizer.init(`,`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('COMMA')
        expect(token?.value).toStrictEqual(`,`)
      })
    })
    describe('Whitespace', () => {
      it('skips \\s', () => {
        tokenizer.init(`    true`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('BOOLEAN')
        expect(token?.value).toStrictEqual(`true`)
      })
      it('skips \\n', () => {
        tokenizer.init(`\ntrue`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('BOOLEAN')
        expect(token?.value).toStrictEqual(`true`)
      })
      it('skips \\t', () => {
        tokenizer.init(`\ttrue`)
        const token = tokenizer.getNextToken()

        expect(token?.type).toBe('BOOLEAN')
        expect(token?.value).toStrictEqual(`true`)
      })
    })
  })
  describe('.hasMoreTokens()', () => {
    it('returns a boolean', () => {
      expect(typeof tokenizer.hasMoreTokens() === 'boolean').toBe(true)
    })
    it('returns true', () => {
      tokenizer.init(`42`)
      expect(tokenizer.hasMoreTokens()).toBe(true)
    })
    it('returns false', () => {
      tokenizer.init(``)
      expect(tokenizer.hasMoreTokens()).toBe(false)
    })
  })
  describe('.isEOF()', () => {
    it('returns a boolean', () => {
      expect(typeof tokenizer.isEOF() === 'boolean').toBe(true)
    })
    it('returns true', () => {
      tokenizer.init(``)
      expect(tokenizer.isEOF()).toBe(true)
    })
    it('returns false', () => {
      tokenizer.init(`42`)
      expect(tokenizer.isEOF()).toBe(false)
    })
  })
})

import { spec } from './specs'
import { Token } from './types'

/**
 * Tokenizer class.
 *
 * Lazily pulls a token from a stream.
 */
export class Tokenizer {
  private _cursorIndex = 0
  private _string = ''

  /**
   * Matches a token for a regular expression.
   * @param regexp Regular expression to match
   * @param string String to match expression in
   */
  private _getMatch(regexp: RegExp, string: string) {
    const match = string.match(regexp)
    if (match) {
      this._cursorIndex += match[0].length
      return match[0]
    }
  }

  /**
   * Obtains the next token.
   */
  public getNextToken(): Token | null {
    if (!this.hasMoreTokens()) {
      return null
    }

    const string = this._string.slice(this._cursorIndex)

    for (const [regexp, tokenType] of spec) {
      const tokenValue = this._getMatch(regexp, string)

      // can't match this rule, continue
      if (!tokenValue) continue

      // should skip token, e.g. whitespace
      if (!tokenType) {
        return this.getNextToken()
      }

      return {
        type: tokenType,
        value: tokenValue,
      }
    }

    throw new SyntaxError(`Unexpected token: "${string[0]}"`)
  }

  /**
   * Checks if there are more tokens left in string.
   */
  public hasMoreTokens(): boolean {
    return this._cursorIndex < this._string.length
  }

  /**
   * Initializes the string.
   * @param string String to tokenize.
   */
  public init(string: string): void {
    this._cursorIndex = 0
    this._string = string
  }

  /**
   * Checks if the cursor is at the end of the file.
   */
  public isEOF(): boolean {
    return this._cursorIndex === this._string.length
  }
}

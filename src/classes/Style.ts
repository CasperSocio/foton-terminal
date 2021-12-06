import { IStyleRules } from '../typings/interfaces'

interface StyleClass {
  rules: IStyleRules
  add(rules: IStyleRules): void
}

/**
 * A class to hold element styling
 * @author CasperSocio
 * @version 0.0.8
 * @since 0.0.8
 */
export class Style implements StyleClass {
  private _rules: IStyleRules

  constructor(rules: IStyleRules) {
    this._rules = rules
  }

  get rules() {
    return this._rules
  }
  set rules(rules: IStyleRules) {
    this._rules = rules
  }

  add(rules: IStyleRules) {
    this._rules = {
      ...this._rules,
      ...rules
    }
  }
}
import { Element } from '../classes'

describe('Element class', () => {
  it('generates a <p> element', () => {
    const el = new Element({
      tag: 'p',
      content: 'Hello',
    })

    expect(el.content).toBe('Hello')
    expect(el.style).toStrictEqual({})
  })
})

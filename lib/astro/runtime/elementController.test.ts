import { describe, expect, it, vi } from 'vitest'
import { elementController } from './elementController'

function mount(html: string) {
  document.body.innerHTML = html
}

describe('elementController', () => {
  it('throws when the fragment name is missing', () => {
    expect(() => elementController('', vi.fn())).toThrow(TypeError)
  })

  it('runs the builder once per matching element', () => {
    mount(`
      <div data-element="au-thing"></div>
      <div data-element="au-thing"></div>
      <div data-element="other"></div>
    `)

    const builder = vi.fn()
    elementController('au-thing', builder)

    expect(builder).toHaveBeenCalledTimes(2)
  })

  it('does not run twice on the same element', () => {
    mount('<div data-element="au-thing"></div>')

    const builder = vi.fn()
    elementController('au-thing', builder)
    elementController('au-thing', builder)

    expect(builder).toHaveBeenCalledTimes(1)
  })

  it('scopes query and queryAll to the root element', () => {
    mount(`
      <div data-element="au-thing"><span class="child">a</span></div>
      <span class="child">outside</span>
    `)

    elementController('au-thing', ({ query, queryAll }) => {
      expect(query('.child')?.textContent).toBe('a')
      expect(queryAll('.child')).toHaveLength(1)
    })
  })

  it('scopes `on` to the root and returns an unsubscribe', () => {
    mount('<div data-element="au-thing"><button></button></div>')

    const handler = vi.fn()
    let off = () => {}

    elementController('au-thing', ({ on }) => {
      off = on('click', handler)
    })

    document.querySelector('button')?.click()
    expect(handler).toHaveBeenCalledTimes(1)

    off()
    document.querySelector('button')?.click()
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('binds to window with the `global:` prefix', () => {
    mount('<div data-element="au-thing"></div>')

    const handler = vi.fn()
    elementController('au-thing', ({ on }) => {
      on('global:resize', handler)
    })

    window.dispatchEvent(new Event('resize'))
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('emits a bubbling CustomEvent from the root', () => {
    mount('<div data-element="au-thing"></div>')

    const handler = vi.fn()
    document.addEventListener('au:changed', handler)

    elementController('au-thing', ({ emit }) => {
      emit('au:changed', { tab: 'debts' })
    })

    expect(handler).toHaveBeenCalledTimes(1)
    expect((handler.mock.calls[0][0] as CustomEvent).detail).toEqual({
      tab: 'debts',
    })

    document.removeEventListener('au:changed', handler)
  })

  it('defers the builder to the IntersectionObserver when lazy', () => {
    mount('<div data-element="au-thing"></div>')

    const observe = vi.fn()
    const unobserve = vi.fn()
    let trigger: (entries: unknown[]) => void = () => {}

    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(callback: (entries: unknown[]) => void) {
          trigger = callback
        }
        observe = observe
        unobserve = unobserve
        disconnect = vi.fn()
      },
    )

    const builder = vi.fn()
    elementController('au-thing', builder, { lazy: true })

    expect(builder).not.toHaveBeenCalled()
    expect(observe).toHaveBeenCalledTimes(1)

    const target = document.querySelector('[data-element="au-thing"]')
    trigger([{ isIntersecting: true, target }])

    expect(builder).toHaveBeenCalledTimes(1)
    expect(unobserve).toHaveBeenCalledWith(target)

    vi.unstubAllGlobals()
  })
})

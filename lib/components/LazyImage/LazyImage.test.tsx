import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { LazyImage } from './index'

describe('LazyImage', () => {
  it('renders image immediately when lazy is false', () => {
    render(<LazyImage lazy={false} src="/img.png" alt="img" />)
    const img = screen.getByAltText('img') as HTMLImageElement
    expect(img.src).toContain('/img.png')

    expect(img.getAttribute('loading')).toBe(null)
  })

  describe('with IntersectionObserver (lazy=true)', () => {
    let originalIO: unknown

    beforeAll(() => {
      originalIO = (global as unknown as { IntersectionObserver?: unknown })
        .IntersectionObserver

      class MockIO {
        callback: (entries: IntersectionObserverEntry[]) => void
        constructor(cb: (entries: IntersectionObserverEntry[]) => void) {
          this.callback = cb
        }
        observe() {
          this.callback([
            { isIntersecting: true } as unknown as IntersectionObserverEntry,
          ])
        }
        unobserve() {}
        disconnect() {}
      }

      (
        global as unknown as { IntersectionObserver?: unknown }
      ).IntersectionObserver = MockIO
    })

    afterAll(() => {
      (
        global as unknown as { IntersectionObserver?: unknown }
      ).IntersectionObserver = originalIO
    })

    it('sets src after intersection', () => {
      render(<LazyImage lazy src="/lazy.png" alt="lazy" />)
      const img = screen.getByAltText('lazy') as HTMLImageElement

      expect(img.getAttribute('loading')).toBe('lazy')
      expect(img.src).toContain('/lazy.png')
    })
  })
})

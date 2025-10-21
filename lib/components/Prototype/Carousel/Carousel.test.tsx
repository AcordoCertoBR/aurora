/* eslint-disable @typescript-eslint/no-explicit-any */
vi.mock('./helpers', () => ({
  ...vi.importActual('./helpers'),
  isMobile: () => false,
}))
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

const prevSpy = vi.fn()
const nextSpy = vi.fn()

vi.mock('react-snap-carousel', () => ({
  useSnapCarousel: () => ({
    scrollRef: () => {},
    pages: [[0], [1]],
    activePageIndex: 0,
    hasPrevPage: false,
    hasNextPage: true,
    prev: prevSpy,
    next: nextSpy,
    snapPointIndexes: new Set([0, 1]),
    refresh: vi.fn(),
  }),
}))

vi.mock('./useCarouselDrag', () => ({
  useCarouselDrag: ({ goNext, goPrevious }: any) => ({
    handleStartDrag: () => {},
    handleMouseMove: (e: any) => {
      if (e.clientX < 50) {
        goNext()
      } else {
        goPrevious()
      }
    },
  }),
}))

import { Carousel } from './index'

describe('Carousel', () => {
  const originalMatchMedia = (window as unknown as any).matchMedia

  beforeAll(() => {
    (window as unknown as any).matchMedia = (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    })
  })

  afterAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as unknown as any).matchMedia = originalMatchMedia
  })

  it('renders items and controls', async () => {
    const items = [<div key="a">A</div>, <div key="b">B</div>]
    render(<Carousel items={items} type="pages" mobileText="M" />)

    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('B')).toBeInTheDocument()

    expect(document.querySelector('.au-carousel__actions')).toBeTruthy()
    const nextBtn = document.querySelectorAll('.au-carousel__btns button')[1]
    expect(nextBtn).toBeTruthy()
  })

  it('calls goNext/goPrevious on drag', () => {
    const items = [<div key="a">A</div>, <div key="b">B</div>]
    const { container } = render(
      <Carousel items={items} type="pages" mobileText="M" />,
    )
    const rail = container.querySelector(
      '.au-carousel__rail',
    ) as HTMLUListElement

    rail.dispatchEvent(
      new MouseEvent('mousedown', { clientX: 100, bubbles: true }),
    )
    rail.dispatchEvent(
      new MouseEvent('mousemove', { clientX: 120, bubbles: true }),
    )
    rail.dispatchEvent(
      new MouseEvent('mousedown', { clientX: 100, bubbles: true }),
    )
    rail.dispatchEvent(
      new MouseEvent('mousemove', { clientX: 20, bubbles: true }),
    )
    expect(prevSpy).toHaveBeenCalled()
    expect(nextSpy).toHaveBeenCalled()
  })

  it('renders scrollbar when type=scrollbar', () => {
    const items = [<div key="a">A</div>, <div key="b">B</div>]
    render(<Carousel items={items} type="scrollbar" />)

    expect(document.querySelector('.au-carousel__scrollbar')).toBeTruthy()
  })

  it('useCarouselDrag (real) calls goPrevious/goNext when dragging', async () => {
    const real =
      await vi.importActual<typeof import('./useCarouselDrag')>(
        './useCarouselDrag',
      )
    const goPrev = vi.fn()
    const goNext = vi.fn()

    const Wrapper = () => {
      const { handleStartDrag, handleMouseMove } = real.useCarouselDrag({
        goPrevious: goPrev,
        goNext,
      })
      return (
        <ul
          data-testid="rail"
          onMouseDown={(e) => handleStartDrag(e as any)}
          onMouseMove={(e) => handleMouseMove(e as any)}
        />
      )
    }

    const { getByTestId } = render(<Wrapper />)
    const rail = getByTestId('rail')

    fireEvent.mouseDown(rail, { clientX: 100 })
    await Promise.resolve()

    fireEvent.mouseMove(rail, { clientX: 120 })
    fireEvent.mouseMove(rail, { clientX: 20 })

    expect(goPrev).toHaveBeenCalled()
    expect(goNext).toHaveBeenCalled()
  })

  it('handleRelease stops dragging on mouseup', async () => {
    const real =
      await vi.importActual<typeof import('./useCarouselDrag')>(
        './useCarouselDrag',
      )
    const goPrev = vi.fn()
    const goNext = vi.fn()

    const Wrapper = () => {
      const { handleStartDrag, handleMouseMove } = real.useCarouselDrag({
        goPrevious: goPrev,
        goNext,
      })
      return (
        <ul
          data-testid="rail2"
          onMouseDown={(e) => handleStartDrag(e as any)}
          onMouseMove={(e) => handleMouseMove(e as any)}
        />
      )
    }

    const { getByTestId } = render(<Wrapper />)
    const rail = getByTestId('rail2')

    fireEvent.mouseDown(rail, { clientX: 100 })
    await Promise.resolve()

    document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))
    await Promise.resolve()

    fireEvent.mouseMove(rail, { clientX: 120 })
    fireEvent.mouseMove(rail, { clientX: 20 })

    expect(goPrev).not.toHaveBeenCalled()
    expect(goNext).not.toHaveBeenCalled()
  })
})

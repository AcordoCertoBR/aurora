import { render, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { SpecialButton } from './index'

describe('SpecialButton type="press"', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the label', () => {
    const { getByText } = render(
      <SpecialButton type="press">Hold to confirm</SpecialButton>,
    )
    expect(getByText('Hold to confirm')).toBeInTheDocument()
  })

  it('calls onConfirm after holding for holdDuration', () => {
    const onConfirm = vi.fn()
    const { getByRole } = render(
      <SpecialButton type="press" onConfirm={onConfirm} holdDuration={1000}>
        Hold
      </SpecialButton>,
    )
    const button = getByRole('button')

    fireEvent.pointerDown(button)
    expect(button.className).toContain('au-special-button--holding')

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(onConfirm).toHaveBeenCalledTimes(1)
    expect(button.className).toContain('au-special-button--success')
  })

  it('does not confirm when released before holdDuration', () => {
    const onConfirm = vi.fn()
    const { getByRole } = render(
      <SpecialButton type="press" onConfirm={onConfirm} holdDuration={1000}>
        Hold
      </SpecialButton>,
    )
    const button = getByRole('button')

    fireEvent.pointerDown(button)
    act(() => {
      vi.advanceTimersByTime(500)
    })
    fireEvent.pointerUp(button)
    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(onConfirm).not.toHaveBeenCalled()
    expect(button.className).not.toContain('au-special-button--holding')
  })

  it('supports holding via keyboard', () => {
    const onConfirm = vi.fn()
    const { getByRole } = render(
      <SpecialButton type="press" onConfirm={onConfirm} holdDuration={1000}>
        Hold
      </SpecialButton>,
    )
    const button = getByRole('button')

    fireEvent.keyDown(button, { key: 'Enter' })
    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(onConfirm).toHaveBeenCalledTimes(1)
  })

  it('does not start holding when disabled', () => {
    const onConfirm = vi.fn()
    const { getByRole } = render(
      <SpecialButton type="press" onConfirm={onConfirm} disabled>
        Hold
      </SpecialButton>,
    )
    const button = getByRole('button')

    fireEvent.pointerDown(button)
    act(() => {
      vi.advanceTimersByTime(5000)
    })

    expect(onConfirm).not.toHaveBeenCalled()
    expect(button).toBeDisabled()
    expect(button.className).toContain('au-special-button--disabled')
  })

  it('shows the spinner and aria-busy when loading', () => {
    const { getByRole } = render(
      <SpecialButton type="press" loading>
        Hold
      </SpecialButton>,
    )
    const button = getByRole('button')

    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(button.className).toContain('au-special-button--loading')
    expect(button.querySelector('.au-icon')).not.toBeNull()
  })

  it('applies the success class when success prop is set', () => {
    const { getByRole } = render(
      <SpecialButton type="press" success>
        Hold
      </SpecialButton>,
    )
    expect(getByRole('button').className).toContain(
      'au-special-button--success',
    )
  })

  it('is the default type', () => {
    const { getByRole } = render(<SpecialButton>Hold</SpecialButton>)
    expect(getByRole('button').className).toContain(
      'au-special-button--type-press',
    )
  })
})

function _mockContainerWidth(container: HTMLElement, width: number) {
  const root = container.querySelector('.au-special-button') as HTMLElement
  Object.defineProperty(root, 'clientWidth', {
    value: width,
    configurable: true,
  })
  return root
}

describe('SpecialButton type="slider"', () => {
  it('renders the label and the knob', () => {
    const { getByText, getByRole } = render(
      <SpecialButton type="slider">Slide to action</SpecialButton>,
    )
    expect(getByText('Slide to action')).toBeInTheDocument()
    expect(
      getByRole('button', { name: 'Arraste para confirmar' }),
    ).toBeInTheDocument()
  })

  it('confirms when the knob is dragged to the end of the track', () => {
    const onConfirm = vi.fn()
    const { container, getByRole } = render(
      <SpecialButton type="slider" onConfirm={onConfirm}>
        Slide to action
      </SpecialButton>,
    )
    const root = _mockContainerWidth(container, 272)
    const knob = getByRole('button')

    fireEvent.pointerDown(knob, { clientX: 0 })
    fireEvent.pointerMove(knob, { clientX: 250 })
    fireEvent.pointerUp(knob)

    expect(onConfirm).toHaveBeenCalledTimes(1)
    expect(root.className).toContain('au-special-button--success')
  })

  it('snaps back without confirming when released early', () => {
    const onConfirm = vi.fn()
    const { container, getByRole } = render(
      <SpecialButton type="slider" onConfirm={onConfirm}>
        Slide to action
      </SpecialButton>,
    )
    const root = _mockContainerWidth(container, 272)
    const knob = getByRole('button')

    fireEvent.pointerDown(knob, { clientX: 0 })
    fireEvent.pointerMove(knob, { clientX: 50 })
    fireEvent.pointerUp(knob)

    expect(onConfirm).not.toHaveBeenCalled()
    expect(root.className).not.toContain('au-special-button--success')
  })

  it('confirms via keyboard on the focused knob', () => {
    const onConfirm = vi.fn()
    const { getByRole } = render(
      <SpecialButton type="slider" onConfirm={onConfirm}>
        Slide to action
      </SpecialButton>,
    )

    fireEvent.keyDown(getByRole('button'), { key: 'Enter' })

    expect(onConfirm).toHaveBeenCalledTimes(1)
  })

  it('does not confirm when disabled', () => {
    const onConfirm = vi.fn()
    const { container, getByRole } = render(
      <SpecialButton type="slider" onConfirm={onConfirm} disabled>
        Slide to action
      </SpecialButton>,
    )
    const root = container.querySelector('.au-special-button') as HTMLElement
    const knob = getByRole('button')

    fireEvent.keyDown(knob, { key: 'Enter' })
    fireEvent.pointerDown(knob, { clientX: 0 })
    fireEvent.pointerMove(knob, { clientX: 250 })
    fireEvent.pointerUp(knob)

    expect(onConfirm).not.toHaveBeenCalled()
    expect(knob).toBeDisabled()
    expect(root.className).toContain('au-special-button--disabled')
  })

  it('renders only the spinner when loading', () => {
    const { container, queryByRole } = render(
      <SpecialButton type="slider" loading />,
    )
    const root = container.querySelector('.au-special-button') as HTMLElement

    expect(root.className).toContain('au-special-button--loading')
    expect(queryByRole('button')).toBeNull()
    expect(root.querySelector('.au-icon')).not.toBeNull()
  })

  it('renders an empty placeholder when skeleton', () => {
    const { container, queryByRole } = render(
      <SpecialButton type="slider" skeleton />,
    )
    const root = container.querySelector('.au-special-button') as HTMLElement

    expect(root.className).toContain('au-special-button--skeleton')
    expect(queryByRole('button')).toBeNull()
    expect(root.textContent).toBe('')
  })

  it('applies the secondary variant class', () => {
    const { container } = render(
      <SpecialButton type="slider" variant="secondary">
        Slide to action
      </SpecialButton>,
    )
    expect(
      container.querySelector('.au-special-button--variant-secondary'),
    ).not.toBeNull()
  })
})

import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { Transition } from './index'

const messages = ['Gerando acordo...', 'Ajustando detalhes...', 'Tudo pronto!']

describe('Transition', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  const advance = (ms: number) => {
    act(() => {
      vi.advanceTimersByTime(ms)
    })
  }

  it('starts on the first message with proportional progress', () => {
    render(<Transition messages={messages} messageDuration={1000} />)

    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveAttribute('aria-label', messages[0])
    expect(bar).toHaveAttribute('aria-valuenow', '33')
  })

  it('advances through the messages on each step duration', () => {
    render(<Transition messages={messages} messageDuration={1000} />)

    advance(1000)
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-label',
      messages[1],
    )

    advance(1000)
    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveAttribute('aria-label', messages[2])
    expect(bar).toHaveAttribute('aria-valuenow', '100')
  })

  it('calls onFinish after the last message', () => {
    const onFinish = vi.fn()
    render(
      <Transition messages={messages} messageDuration={1000} onFinish={onFinish} />,
    )

    advance(1000) // -> step 1
    advance(1000) // -> step 2 (last)
    expect(onFinish).not.toHaveBeenCalled()

    advance(1000) // last message shown for one duration
    expect(onFinish).toHaveBeenCalledTimes(1)
  })

  it('holds on the penultimate message while isLoading is true', () => {
    const onFinish = vi.fn()
    const { rerender } = render(
      <Transition
        messages={messages}
        messageDuration={1000}
        isLoading
        onFinish={onFinish}
      />,
    )

    advance(1000) // -> penultimate (step 1)
    advance(5000) // stays put while loading
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-label',
      messages[1],
    )
    expect(onFinish).not.toHaveBeenCalled()

    rerender(
      <Transition
        messages={messages}
        messageDuration={1000}
        isLoading={false}
        onFinish={onFinish}
      />,
    )

    advance(1000) // -> final message
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-label',
      messages[2],
    )

    advance(1000)
    expect(onFinish).toHaveBeenCalledTimes(1)
  })
})

import { render, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { act } from 'react'
import { TokenField } from './index'

describe('TokenField', () => {
  it('renders TokenField', () => {
    const { container } = render(<TokenField />)
    expect(container).toBeInTheDocument()
  })

  it('fills digits and calls onChange and onComplete', () => {
    const onChange = vi.fn()
    const onComplete = vi.fn()
    const { container } = render(
      <TokenField size={4} onChange={onChange} onComplete={onComplete} />,
    )

    const inputs = container.querySelectorAll('input')

    fireEvent.change(inputs[0], { target: { value: '1' } })
    fireEvent.change(inputs[1], { target: { value: '2' } })
    fireEvent.change(inputs[2], { target: { value: '3' } })
    fireEvent.change(inputs[3], { target: { value: '4' } })

    expect(onChange).toHaveBeenCalled()
    expect(onComplete).toHaveBeenCalledWith('1234')
  })

  it('supports paste and focuses next input', () => {
    const { container } = render(<TokenField size={4} />)
    const inputs = container.querySelectorAll('input')

    fireEvent.paste(inputs[0], {
      clipboardData: {
        getData: () => '5678',
      },
    } as unknown as ClipboardEvent)

    expect((inputs[3] as HTMLInputElement).value).toBe('8')
  })

  it('clears tokens and resets focus when timer reaches 0', async () => {
    vi.useFakeTimers()
    try {
      const onChangeTimer = vi.fn()
      const { container } = render(
        <TokenField size={3} timer={2} onChangeTimer={onChangeTimer} />,
      )
      const inputs = container.querySelectorAll('input')

      fireEvent.change(inputs[0], { target: { value: '1' } })
      fireEvent.change(inputs[1], { target: { value: '2' } })

      act(() => {
        vi.advanceTimersByTime(2000)
      })

      await Promise.resolve()

      expect(onChangeTimer).toHaveBeenCalled()

      expect((inputs[0] as HTMLInputElement).value).toBe('')
      expect((inputs[1] as HTMLInputElement).value).toBe('')
    } finally {
      vi.useRealTimers()
    }
  })
})

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { Alert } from '.'
import { IconAlertCircle } from '@components/icons'

describe('Alert', () => {
  beforeEach(() => {
    vi.useRealTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders title, text and status class', () => {
    render(
      <Alert
        title={{ content: 'My title', weight: 'bold' }}
        text="hello"
        status="error"
      />,
    )

    expect(screen.getByText('My title')).toBeInTheDocument()
    expect(screen.getByText('hello')).toBeInTheDocument()
    const root = document.querySelector('.au-alert')
    expect(root).toHaveClass('au-alert--error--type-1')
  })

  it('renders customIcon when provided', () => {
    render(<Alert customIcon={<span data-testid="custom"><IconAlertCircle /></span>} />)
    expect(screen.getByTestId('custom')).toBeInTheDocument()
  })

  it('renders action button and triggers click when not timer', async () => {
    const onAction = vi.fn()
    render(
      <Alert actionButton={{ content: 'Go', onClick: onAction }} status="info" />,
    )

    const user = userEvent.setup()
    const btn = screen.getByText('Go')
    await user.click(btn)
    expect(onAction).toHaveBeenCalled()
  })

  it('closeButton calls onCloseButton and hides the alert', async () => {
    const onClose = vi.fn()
    render(<Alert closeButton onCloseButton={onClose} />)

    const wrapper = document.querySelector('.au-alert__close-btn')
    const iconEl = wrapper?.querySelector('.au-icon')
    const user = userEvent.setup()
    if (iconEl) await user.click(iconEl)

    expect(onClose).toHaveBeenCalled()
    expect(document.querySelector('.au-alert')).toBeNull()
  })

  it('timer status counts down and calls onCountdownEnd', async () => {
    vi.useFakeTimers()
    const onEnd = vi.fn()
    render(
      <Alert status="timer" countdown={2} onCountdownEnd={onEnd} actionButton={{ content: 'Retry', onClick: () => {} }} />,
    )

    expect(screen.getByText(/2s/)).toBeInTheDocument()

    vi.advanceTimersByTime(2100)

    await Promise.resolve()

    expect(onEnd).toHaveBeenCalled()
    expect(screen.getByText('Retry')).toBeInTheDocument()

    vi.useRealTimers()
  })
})

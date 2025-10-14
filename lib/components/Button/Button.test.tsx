import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { Button } from './index'

describe('Button', () => {
  beforeEach(() => {
    vi.useRealTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders children text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked and not disabled', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Press</Button>)

    const user = userEvent.setup()
    const btn = screen.getByText('Press')
    await user.click(btn)
    expect(onClick).toHaveBeenCalled()
  })

  it('does not call onClick when disabled', async () => {
    const onClick = vi.fn()
    render(
      <Button onClick={onClick} disabled>
        Disabled
      </Button>,
    )

    const user = userEvent.setup()
    const btn = screen.getByText('Disabled')
    await user.click(btn)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('shows loader when loading', () => {
    render(<Button loading>Loading</Button>)
    const root = document.querySelector('.au-btn')
    expect(root).toHaveClass('au-btn--loading')
  })

  it('calls onEnabled when becomes enabled', async () => {
    const onEnabled = vi.fn()
    const { rerender } = render(
      <Button onEnabled={onEnabled} disabled>
        Toggle
      </Button>,
    )

    expect(onEnabled).not.toHaveBeenCalled()
    rerender(<Button onEnabled={onEnabled}>Toggle</Button>)

    await Promise.resolve()

    expect(onEnabled).toHaveBeenCalled()
  })

  it('applies expand class when expand prop is provided', () => {
    render(<Button expand="x">Expand</Button>)
    const root = document.querySelector('.au-btn')
    expect(root).toHaveClass('au-btn--expand-x')
  })

  it('sets the correct htmlType attribute', () => {
    render(<Button htmlType="submit">Submit</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('type', 'submit')
  })

  it('applies size class when size prop is provided', () => {
    render(<Button size="large">Large</Button>)
    const root = document.querySelector('.au-btn')
    expect(root).toHaveClass('au-btn--size-large')
  })

  it('applies type class when type prop is provided', () => {
    render(<Button type="ghost">Ghost</Button>)
    const root = document.querySelector('.au-btn')
    expect(root).toHaveClass('au-btn--type-ghost')
  })
})

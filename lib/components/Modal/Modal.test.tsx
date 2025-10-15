import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Modal } from './index'

describe('Modal', () => {
  it('renders when isOpen is true', () => {
    render(<Modal isOpen={true} content="Modal Content" />)
    expect(screen.getByText('Modal Content')).toBeInTheDocument()
  })

  it('does not render when isOpen is false', () => {
    render(<Modal isOpen={false} content="Modal Content" />)
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn()
    render(<Modal isOpen={true} onClose={onClose} />)

    const user = userEvent.setup()
    const closeButton = screen.getByRole('button')
    await user.click(closeButton)

    expect(onClose).toHaveBeenCalled()
  })

  it('renders headerContent and content', () => {
    render(
      <Modal
        isOpen={true}
        headerContent="Header"
        content="Body Content"
      />,
    )

    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Body Content')).toBeInTheDocument()
  })

  it('applies correct classes for layoutMobile and layoutDesktop', () => {
    const { container } = render(
      <Modal
        isOpen={true}
        layoutMobile="centralized"
        layoutDesktop="centralized"
      />,
    )

    const modal = container.querySelector('.au-modal')
    expect(modal).toHaveClass('au-modal--mobile-centralized')
    expect(modal).toHaveClass('au-modal--desktop-centralized')
  })
})
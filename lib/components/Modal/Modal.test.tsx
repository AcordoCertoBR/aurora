import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Modal, ModalProps } from './index'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

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
        onClose={() => {}}
        headerContent="Header"
        content="Body Content"
      />,
    )

    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Body Content')).toBeInTheDocument()
  })

  const renderModal = (props: Partial<ModalProps>) => {
    const finalProps = {
      isOpen: true,
      onClose: vi.fn(),
      ...props,
    } as ModalProps

    return render(<Modal {...finalProps} />)
  }

  it('renders with desktop centralized class', () => {
    const { container } = renderModal({ layoutDesktop: 'centralized' })
    const modal = container.querySelector('.au-modal')

    expect(modal).toHaveClass('au-modal--desktop-centralized')
  })

  it('renders with mobile centralized class', () => {
    const { container } = renderModal({ layoutMobile: 'centralized' })
    const modal = container.querySelector('.au-modal')

    expect(modal).toHaveClass('au-modal--mobile-centralized')
  })

  it('renders with mobile full-screen class', () => {
    const { container } = renderModal({ layoutMobile: 'full-screen' })
    const modal = container.querySelector('.au-modal')

    expect(modal).toHaveClass('au-modal--mobile-full-screen')
  })
})

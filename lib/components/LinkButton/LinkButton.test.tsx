import { render, fireEvent, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { IconArrowRight } from '../icons/default'
import { LinkButton } from './index'

describe('LinkButton', () => {
  it('renders as a button by default with medium size', () => {
    render(<LinkButton>Meu link</LinkButton>)
    const button = screen.getByRole('button', { name: 'Meu link' })
    expect(button).toHaveClass('au-link-button')
    expect(button).toHaveClass('au-link-button--size-medium')
  })

  it('applies the size class', () => {
    render(<LinkButton size="small">Link</LinkButton>)
    expect(screen.getByRole('button')).toHaveClass(
      'au-link-button--size-small',
    )
  })

  it('renders left and right icons', () => {
    render(
      <LinkButton iconLeft={<IconArrowRight />} iconRight={<IconArrowRight />}>
        Link
      </LinkButton>,
    )
    expect(document.querySelectorAll('.au-link-button__icon')).toHaveLength(2)
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<LinkButton onClick={onClick}>Link</LinkButton>)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', () => {
    const onClick = vi.fn()
    render(
      <LinkButton onClick={onClick} disabled>
        Link
      </LinkButton>,
    )
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(onClick).not.toHaveBeenCalled()
    expect(button).toBeDisabled()
    expect(button).toHaveClass('au-link-button--disabled')
  })

  it('renders as an anchor when as="a"', () => {
    render(
      <LinkButton as="a" href="https://example.com" target="_blank">
        Link
      </LinkButton>,
    )
    const link = screen.getByRole('link')
    expect(link.tagName).toBe('A')
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('target', '_blank')
  })
})

import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Icon from './Icon'

describe('Icon', () => {
  it('renders markup and applies name/className', () => {
    render(<Icon markup={'<svg data-testid="i"></svg>'} name="Test" />)
    expect(screen.getByTestId('i')).toBeInTheDocument()
    expect(document.querySelector('.au-icon--test')).toBeTruthy()
  })

  it('applies rawColor style and extra className', () => {
    render(<Icon markup={'<svg />'} rawColor="#123" className="extra" />)
    const el = document.querySelector('.au-icon') as HTMLElement
    expect(el).toHaveStyle({ color: '#123' })
    expect(el.classList.contains('extra')).toBeTruthy()
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<Icon markup={'<svg />'} onClick={onClick} />)
    const el = document.querySelector('.au-icon') as HTMLElement
    el.click()
    expect(onClick).toHaveBeenCalled()
  })

  it('namespaces svg ids per instance so two icons never share defs', () => {
    const markup =
      "<svg><defs><linearGradient id='grad'><stop stop-color='currentColor'/></linearGradient></defs><path fill='url(#grad)'/></svg>"
    render(
      <>
        <Icon markup={markup} name="A" />
        <Icon markup={markup} name="B" />
      </>,
    )

    const gradients = document.querySelectorAll('linearGradient')
    const paths = document.querySelectorAll('path')
    expect(gradients).toHaveLength(2)

    const idA = gradients[0].getAttribute('id')
    const idB = gradients[1].getAttribute('id')
    expect(idA).not.toBe('grad')
    expect(idA).not.toBe(idB)
    expect(paths[0].getAttribute('fill')).toBe(`url(#${idA})`)
    expect(paths[1].getAttribute('fill')).toBe(`url(#${idB})`)
  })
})

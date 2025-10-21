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
})

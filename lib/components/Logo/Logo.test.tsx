import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Logo } from './Logo'

describe('Logo', () => {
  it('renders children and has au-logo class', () => {
    render(
      <Logo>
        <span>My Logo</span>
      </Logo>,
    )

    expect(screen.getByText('My Logo')).toBeInTheDocument()
    expect(document.querySelector('.au-logo')).toBeTruthy()
  })

  it('renders SVG child correctly', () => {
    render(
      <Logo>
        <svg data-testid="logo-svg" />
      </Logo>,
    )

    expect(screen.getByTestId('logo-svg')).toBeInTheDocument()
  })
})

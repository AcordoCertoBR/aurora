import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Container } from './index'

describe('Container', () => {
  it('renders children content', () => {
    render(
      <Container>
        <p>Test Content</p>
      </Container>,
    )
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('applies default container class', () => {
    const { container } = render(<Container>Content</Container>)
    expect(container.firstChild).toHaveClass('au-container')
  })

  it('applies custom class when provided', () => {
    const { container } = render(
      <Container customClass="custom-class">Content</Container>,
    )
    expect(container.firstChild).toHaveClass('custom-class')
  })
})
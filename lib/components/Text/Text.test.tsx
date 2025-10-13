import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Text } from '.'

describe('Text', () => {
  it('renders children by default', () => {
    render(<Text>hello world</Text>)
    expect(screen.getByText('hello world')).toBeInTheDocument()
  })

  it('respects the `as` prop and renders correct tag', () => {
    render(<Text as="h1">inline</Text>)
    const el = screen.getByText('inline')
    expect(el.tagName.toLowerCase()).toBe('h1')
  })

  it('applies variant and variantDesk classes', () => {
    render(
      <Text variant="heading-small" variantDesk="heading-medium">
        styled-variant
      </Text>,
    )
    const el = screen.getByText('styled-variant')
    expect(el).toHaveClass('au-text')
    expect(el).toHaveClass('au-text--heading-small')
    expect(el).toHaveClass('au-text--desk-heading-medium')
  })

  it('applies color and weight classes', () => {
    render(
      <Text color="secondary" weight="bold">
        styled-color
      </Text>,
    )
    const el = screen.getByText('styled-color')
    expect(el).toHaveClass('au-text--color-secondary')
    expect(el).toHaveClass('au-text--weight-bold')
  })

  it('renders dangerouslySetInnerHTML when provided', () => {
    render(<Text dangerouslySetInnerHTML="<strong>bold</strong>" />)
    const strong = screen.getByText('bold')
    expect(strong.tagName.toLowerCase()).toBe('strong')
  })
})

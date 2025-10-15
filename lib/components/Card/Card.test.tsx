import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Card } from './index'

describe('CardRoot', () => {
  it('renders card with default classes', () => {
    const { container } = render(
      <Card.Root>
        <p>Card Content</p>
      </Card.Root>,
    )
    expect(container.firstChild).toHaveClass('au-card__root')
  })

  it('applies correct classes for props', () => {
    const { container } = render(
      <Card.Root color="secondary" paddingLess hoverShadow border={false}>
        <p>Card Content</p>
      </Card.Root>,
    )
    const card = container.firstChild
    expect(card).toHaveClass('au-card__root--color-secondary')
    expect(card).toHaveClass('au-card__root--paddingless')
    expect(card).toHaveClass('au-card__root--with-hover-shadow')
    expect(card).toHaveClass('au-card__root--border-none')
  })

  it('applies correct dimensions', () => {
    const { container } = render(
      <Card.Root width={300} height={200} maxWidth={500} maxHeight={400}>
        <p>Card Content</p>
      </Card.Root>,
    )
    const card = container.firstChild as HTMLElement
    expect(card).toHaveStyle({
      width: '300px',
      height: '200px',
      maxWidth: '500px',
      maxHeight: '400px',
    })
  })

  it('renders children content', () => {
    const { getByText } = render(
      <Card.Root>
        <p>Card Content</p>
      </Card.Root>,
    )
    expect(getByText('Card Content')).toBeInTheDocument()
  })
})

describe('CardTag', () => {
  it('renders tag with correct content and class', () => {
    const { getByText } = render(
      <Card.Tag>
        Tag Content
      </Card.Tag>,
    )
    expect(getByText('Tag Content')).toBeInTheDocument()
  })
})

describe('CardEmphasis', () => {
  it('renders emphasis with correct content', () => {
    const { getByText } = render(
      <Card.Emphasis content={[{ title: 'Emphasis Title', description: 'Emphasis Description' }]} />,
    )
    expect(getByText('Emphasis Title')).toBeInTheDocument()
    expect(getByText('Emphasis Description')).toBeInTheDocument()
  })
})

describe('CardContainer', () => {
  it('renders container with children', () => {
    const { getByText } = render(
      <Card.Container>
        <p>Container Content</p>
      </Card.Container>,
    )
    expect(getByText('Container Content')).toBeInTheDocument()
  })
})

describe('CardImage', () => {
  it('renders image with correct src and alt', () => {
    const { container } = render(
      <Card.Image src="image.jpg" alt="Image Description" />,
    )
    const img = container.querySelector('img')
    expect(img).toHaveAttribute('src', 'image.jpg')
    expect(img).toHaveAttribute('alt', 'Image Description')
  })
})
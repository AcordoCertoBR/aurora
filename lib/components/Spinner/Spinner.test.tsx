import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Spinner } from './index'

describe('Spinner', () => {
  it('renders spinner with default class and medium size', () => {
    const { container } = render(<Spinner />)
    const spinner = container.firstChild as HTMLElement
    expect(spinner).toHaveClass('au-spinner')
    expect(spinner).toHaveClass('au-spinner--size-medium')
    expect(spinner).toHaveStyle({ width: '20px', height: '20px' })
  })

  it('maps token sizes to pixel values', () => {
    const { container } = render(<Spinner size="large" />)
    const spinner = container.firstChild as HTMLElement
    expect(spinner).toHaveClass('au-spinner--size-large')
    expect(spinner).toHaveStyle({ width: '32px', height: '32px' })
  })

  it('renders the brand color by default', () => {
    const { container } = render(<Spinner />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('color', '#0048db')
  })

  it('renders white when negative', () => {
    const { container } = render(<Spinner negative />)
    const spinner = container.firstChild as HTMLElement
    const svg = container.querySelector('svg')
    expect(spinner).toHaveClass('au-spinner--negative')
    expect(svg).toHaveAttribute('color', '#ffffff')
  })

  it('gives each instance a unique gradient id', () => {
    const { container } = render(
      <>
        <Spinner />
        <Spinner />
      </>,
    )
    const gradients = container.querySelectorAll('linearGradient')
    expect(gradients).toHaveLength(2)
    expect(gradients[0].getAttribute('id')).not.toBe(
      gradients[1].getAttribute('id'),
    )
  })
})

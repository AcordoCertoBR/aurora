import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Spinner } from './index'

describe('Spinner', () => {
  it('renders spinner with default class', () => {
    const { container } = render(<Spinner size={64} color="blue" />)
    expect(container.firstChild).toHaveClass('au-spinner')
  })

  it('applies correct size based on size prop', () => {
    const { container } = render(<Spinner size={100} color="blue" />)
    const spinner = container.firstChild as HTMLElement
    expect(spinner).toHaveStyle({ width: '100px', height: '100px' })
  })

  it('applies correct color based on color prop', () => {
    const { container } = render(<Spinner size={64} color="red" />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('color', 'red')
  })
})
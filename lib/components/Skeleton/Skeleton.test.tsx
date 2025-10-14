import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Skeleton } from './index'

describe('Skeleton', () => {
  it('renders skeleton with default classes', () => {
    const { container } = render(<Skeleton />)
    expect(container.firstChild).toHaveClass('au-skeleton')
    expect(container.firstChild).toHaveClass('au-skeleton--active')
  })

  it('applies correct class for shape', () => {
    const { container: square } = render(<Skeleton shape="square" />)
    expect(square.firstChild).toHaveClass('au-skeleton--shape-square')

    const { container: circle } = render(<Skeleton shape="circle" />)
    expect(circle.firstChild).toHaveClass('au-skeleton--shape-circle')
  })

  it('applies correct class for color', () => {
    const { container: secondary } = render(<Skeleton color="secondary" />)
    expect(secondary.firstChild).toHaveClass('au-skeleton--color-secondary')
  })

  it('applies correct width and height', () => {
    const { container } = render(<Skeleton width={150} height={50} />)
    const skeleton = container.firstChild as HTMLElement
    expect(skeleton).toHaveStyle({ width: '150px', height: '50px' })
  })

  it('applies 100% width when block is true', () => {
    const { container } = render(<Skeleton block />)
    const skeleton = container.firstChild as HTMLElement
    expect(skeleton).toHaveStyle({ width: '100%' })
  })
})
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest'
import { Tooltip } from './index'

describe('Tooltip', () => {
  it('renders children', () => {
    render(
      <Tooltip text="hello">
        <span data-testid="child">child</span>
      </Tooltip>,
    )

    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('renders the text prop in the DOM', () => {
    render(
      <Tooltip text="always visible">
        <span>child</span>
      </Tooltip>,
    )

    expect(screen.getByText('always visible')).toBeInTheDocument()
  })

  it('shows text when open is true', () => {
    render(
      <Tooltip text="visible text" open>
        <span>child</span>
      </Tooltip>,
    )

    expect(screen.getByText('visible text')).toBeInTheDocument()
  })

  it('applies the correct class for each position', () => {
    const positions = ['top', 'bottom', 'left', 'right'] as const

    positions.forEach((position) => {
      render(
        <Tooltip text="position" position={position}>
          <span data-testid={`child-${position}`}>child</span>
        </Tooltip>,
      )

      const child = screen.getByTestId(`child-${position}`)
      const container = child.parentElement
      expect(container).toHaveClass(`tooltip-${position}`)
    })
  })
})

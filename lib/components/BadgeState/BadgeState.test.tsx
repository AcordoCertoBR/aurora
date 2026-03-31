import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BadgeState } from '.'

describe('BadgeState', () => {
  describe('Basic rendering', () => {
    it('renders text content with default props', () => {
      render(<BadgeState status="info" text="Info badge" />)
      
      expect(screen.getByText('Info badge')).toBeInTheDocument()
    })

    it('applies base CSS classes correctly', () => {
      render(<BadgeState status="info" text="Test" />)
      
      const container = screen.getByText('Test').closest('.au-badgeState')
      expect(container).toHaveClass('au-badgeState')
      expect(container).toHaveClass('au-badgeState--info')
      expect(container).toHaveClass('au-badgeState--variant-regular')
    })

    it('renders children when provided', () => {
      render(
        <BadgeState status="info" text="Test">
          <span data-testid="child">Child content</span>
        </BadgeState>
      )
      
      expect(screen.getByTestId('child')).toBeInTheDocument()
    })
  })

  describe('Status variants', () => {
    const statuses = ['info', 'success', 'error', 'warning', 'support'] as const

    statuses.forEach(status => {
      it(`renders ${status} status with correct class`, () => {
        render(<BadgeState status={status} text="Test" />)
        
        const container = screen.getByText('Test').closest('.au-badgeState')
        expect(container).toHaveClass(`au-badgeState--${status}`)
      })
    })

    it('renders success status with check icon in icon-only mode', () => {
      const { container } = render(<BadgeState status="success" iconOnly />)
      
      expect(container.querySelector('.au-icon')).toBeInTheDocument()
      expect(container.querySelector('.au-badgeState--icon-only')).toBeInTheDocument()
    })
  })

  describe('Variant modes', () => {
    it('applies regular variant by default', () => {
      render(<BadgeState status="info" text="Test" />)
      
      const container = screen.getByText('Test').closest('.au-badgeState')
      expect(container).toHaveClass('au-badgeState--variant-regular')
    })

    it('applies strong variant when specified', () => {
      render(<BadgeState status="info" text="Test" variant="strong" />)
      
      const container = screen.getByText('Test').closest('.au-badgeState')
      expect(container).toHaveClass('au-badgeState--variant-strong')
    })
  })

  describe('Icon-only mode', () => {
    it('shows only icon when iconOnly is true', () => {
      const { container } = render(<BadgeState status="info" iconOnly />)
      
      expect(container.querySelector('.au-icon')).toBeInTheDocument()
      expect(container).toHaveClass('au-badgeState--icon-only')
      expect(screen.queryByText('text')).not.toBeInTheDocument()
    })

    it('shows text when iconOnly is false', () => {
      render(<BadgeState status="info" text="Test text" iconOnly={false} />)
      
      expect(screen.getByText('Test text')).toBeInTheDocument()
    })
  })

  describe('Number badge mode', () => {
    it('applies border-circle class when isNumberBadge is true', () => {
      render(<BadgeState status="info" text="1" isNumberBadge />)
      
      const container = screen.getByText('1').closest('.au-badgeState')
      expect(container).toHaveClass('au-badgeState--border-circle')
    })

    it('does not apply border-circle class by default', () => {
      render(<BadgeState status="info" text="Test" />)
      
      const container = screen.getByText('Test').closest('.au-badgeState')
      expect(container).not.toHaveClass('au-badgeState--border-circle')
    })
  })

  describe('Combined props scenarios', () => {
    it('handles icon-only with strong variant', () => {
      const { container } = render(
        <BadgeState status="error" iconOnly variant="strong" />
      )
      
      const badgeElement = container.querySelector('.au-badgeState')
      expect(badgeElement).toHaveClass('au-badgeState--icon-only')
      expect(badgeElement).toHaveClass('au-badgeState--variant-strong')
      expect(badgeElement).toHaveClass('au-badgeState--error')
    })

    it('handles number badge with strong variant', () => {
      render(<BadgeState status="success" text="99" isNumberBadge variant="strong" />)
      
      const container = screen.getByText('99').closest('.au-badgeState')
      expect(container).toHaveClass('au-badgeState--border-circle')
      expect(container).toHaveClass('au-badgeState--variant-strong')
      expect(container).toHaveClass('au-badgeState--success')
    })
  })
})

import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BadgeInfo } from '.'
import { IconAirplay } from '@components/icons'

describe('BadgeInfo', () => {
  it('renders text and basic classes based on props', () => {
    render(
      <BadgeInfo status="success" color="secondary" text="hello" />,
    )

    const el = screen.getByText('hello')
    expect(el).toBeInTheDocument()
    const container = el.closest('.au-badgeInfo')
    expect(container).toHaveClass('au-badgeInfo--success')
    expect(container).toHaveClass('au-badgeInfo--color-secondary')
  })

  it('renders customIcon when provided', () => {
    render(
      <div data-testid="badgeInfo">
        <BadgeInfo
          status="neutral"
          text="with icon"
          customIcon={<IconAirplay data-testid="custom" />}
        />
      </div>,
    )

    const wrapper = screen.getByTestId('badgeInfo')
    const iconEl = wrapper.querySelector('.au-icon')
    expect(iconEl).not.toBeNull()
  })

  
})

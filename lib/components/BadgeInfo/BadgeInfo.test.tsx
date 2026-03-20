import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
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

  it('uppercases text when type is badge', () => {
    render(<BadgeInfo status="info" text="badge me" />)
    expect(screen.getByText('BADGE ME')).toBeInTheDocument()
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

  it('renders action button and triggers click', async () => {
    const onClick = vi.fn()
    render(
      <BadgeInfo
        status="neutral"
        text="act"
        actionButton={{ content: 'Do', onClick }}
      />,
    )

    const btn = screen.getByText('Do')
    expect(btn).toBeInTheDocument()
    const user = userEvent.setup()
    await user.click(btn)
    expect(onClick).toHaveBeenCalled()
  })
})

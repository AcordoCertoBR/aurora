import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Tag } from '.'
import { IconAirplay } from '@components/icons'

describe('Tag', () => {
  it('renders text and basic classes based on props', () => {
    render(
      <Tag status="success" size="large" type="read-only" border="rounded" color="secondary" text="hello" />,
    )

    const el = screen.getByText('hello')
    expect(el).toBeInTheDocument()
    const container = el.closest('.au-tag')
    expect(container).toHaveClass('au-tag--success')
    expect(container).toHaveClass('au-tag--size-large')
    expect(container).toHaveClass('au-tag--type-read-only')
    expect(container).toHaveClass('au-tag--border-rounded')
    expect(container).toHaveClass('au-tag--color-secondary')
  })

  it('uppercases text when type is badge', () => {
    render(<Tag status="info" type="badge" text="badge me" />)
    expect(screen.getByText('BADGE ME')).toBeInTheDocument()
  })

  it('renders customIcon when provided', () => {
    render(
      <div data-testid="tag">
        <Tag
          status="neutral"
          text="with icon"
          customIcon={<IconAirplay data-testid="custom" />}
        />
      </div>,
    )

    const wrapper = screen.getByTestId('tag')
    const iconEl = wrapper.querySelector('.au-icon')
    expect(iconEl).not.toBeNull()
  })

  it('renders action button and triggers click', async () => {
    const onClick = vi.fn()
    render(
      <Tag
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

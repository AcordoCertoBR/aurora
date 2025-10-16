import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { NavbarVertical } from './index'

describe('NavbarVertical', () => {
  it('renders items via renderItem and actions/alert slots', () => {
    const data: Array<{ name: string }> = [{ name: 'Home' }, { name: 'Settings' }]
    render(
      <NavbarVertical
        data={data}
        renderItem={(link) => <div key={link.name}>{link.name}</div>}
        renderActions={() => <div>Actions</div>}
        renderAlert={() => <div>Alert</div>}
      />,
    )

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
    expect(screen.getByText('Actions')).toBeInTheDocument()
    expect(screen.getByText('Alert')).toBeInTheDocument()
  })

  it('toggles dropdown open state and applies classes', async () => {
    type NavItem = {
      name: string
      dropdown?: Array<{ name: string; href?: string; active?: boolean }>
    }

    const data: NavItem[] = [
      {
        name: 'Menu',
        dropdown: [
          { name: 'Sub1', href: '/s1' },
          { name: 'Sub2', href: '/s2', active: true },
        ],
      },
    ]

    render(
      <NavbarVertical
        data={data}
        renderItem={(link) => <NavbarVertical.Link {...link} />}
        renderActions={() => <div />}
      />,
    )

    const toggle = screen.getByText('Menu')
    const user = userEvent.setup()
    await user.click(toggle)

    const dropdownLink = screen.getByText('Sub1')
    expect(dropdownLink).toBeInTheDocument()

    const activeSub = screen.getByText('Sub2')
    expect(activeSub.classList.contains('au-navbar-vertical__dropdown-link--is-active')).toBe(true)
  })

  it('calls onClick for non-dropdown link', async () => {
    const onClick = vi.fn()
  const data: Array<{ name: string; onClick: () => void }> = [{ name: 'ClickMe', onClick }]

    render(
      <NavbarVertical
        data={data}
        renderItem={(link) => <NavbarVertical.Link {...link} />}
        renderActions={() => <div />}
      />,
    )

    const user = userEvent.setup()
    const el = screen.getByText('ClickMe')
    await user.click(el)

    expect(onClick).toHaveBeenCalled()
  })
})

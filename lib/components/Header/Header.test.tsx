import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Header } from './index'
import { NavbarDataProps } from './types'

const DummyLogo = () => <span>Logo</span>

describe('Header.Root', () => {
  it('renders with static position by default', () => {
    render(
      <Header.Root>
        <div>content</div>
      </Header.Root>,
    )
    expect(screen.getByRole('banner')).toHaveClass('au-header')
    expect(screen.getByRole('banner')).toHaveClass('au-header--static')
    expect(screen.getByText('content')).toBeInTheDocument()
  })

  it('renders with fixed position', () => {
    render(
      <Header.Root position="fixed">
        <div>fixed</div>
      </Header.Root>,
    )
    expect(screen.getByRole('banner')).toHaveClass('au-header--fixed')
    expect(screen.getByText('fixed')).toBeInTheDocument()
  })
})

describe('Header.Logo', () => {
  it('renders children and mobile/desktop slots', () => {
    render(
      <Header.Logo
        renderMobile={<span>mobile</span>}
        renderDesktop={<span>desktop</span>}>
        <DummyLogo />
      </Header.Logo>,
    )
    expect(screen.getByText('Logo')).toBeInTheDocument()
    expect(screen.getByText('mobile')).toBeInTheDocument()
    expect(screen.getByText('desktop')).toBeInTheDocument()
  })
})

describe('Header.Navbar', () => {
  it('renders nav items using renderItem', () => {
    const data = [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
    ]
    render(
      <Header.Navbar
        data={data}
        renderItem={(item) => <a href={item.href}>{item.name}</a>}
      />,
    )
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByText('Home')).toHaveAttribute('href', '/')
    expect(screen.getByText('About')).toHaveAttribute('href', '/about')
  })
})

describe('Header.NavbarLink', () => {
  it('renders as an anchor when no dropdown and forwards href/title', () => {
    const item = { name: 'Home', href: '/home' }
    render(
      <Header.Navbar
        data={[item]}
        renderItem={(it: NavbarDataProps) => <Header.NavbarLink {...it} />}
      />,
    )
    const link = screen.getByText('Home')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/home')
    expect(link).toHaveAttribute('title', 'Home')
    expect(link).toHaveClass('au-header__navbar-link')
  })

  it('applies active classes when active prop is true', () => {
    const item = { name: 'Active', href: '/a', active: true }
    render(
      <Header.Navbar
        data={[item]}
        renderItem={(it: NavbarDataProps) => <Header.NavbarLink {...it} />}
      />,
    )
    const root = document.querySelector('.au-header__navbar-item')
    const link = screen.getByText('Active')
    expect(root).toHaveClass('au-header__navbar-item--is-active')
    expect(link).toHaveClass('au-header__navbar-link--is-active')
  })

  it('renders dropdown and dropdown items, and handles item onClick', () => {
    const onItemClick = vi.fn()
    const data = {
      name: 'Services',
      dropdown: [
        { name: 'One', href: '/one' },
        { name: 'Two', href: '/two', onClick: onItemClick },
      ],
    }

    render(
      <Header.Navbar
        data={[data as NavbarDataProps]}
        renderItem={(it: NavbarDataProps) => <Header.NavbarLink {...it} />}
      />,
    )

    expect(screen.getByText('Services')).toBeInTheDocument()
    expect(
      document.querySelector('.au-header__navbar-link--is-dropdown'),
    ).toBeTruthy()
    expect(screen.getByText('One')).toHaveAttribute('href', '/one')
    expect(screen.getByText('Two')).toHaveAttribute('href', '/two')

    screen
      .getByText('Two')
      .dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(onItemClick).toHaveBeenCalled()
  })
})

describe('Header.Actions', () => {
  it('renders children inside actions container', () => {
    render(
      <Header.Actions>
        <button>Click</button>
      </Header.Actions>,
    )
    expect(screen.getByText('Click')).toBeInTheDocument()
    expect(document.querySelector('.au-header__actions')).toBeTruthy()
  })

  it('adds divider class when divider prop is true', () => {
    render(
      <Header.Actions divider>
        <span>WithDivider</span>
      </Header.Actions>,
    )
    const el = document.querySelector('.au-header__actions')
    expect(el).toHaveClass('au-header__actions--divider')
    expect(screen.getByText('WithDivider')).toBeInTheDocument()
  })
})

describe('Header.Badges', () => {
  it('renders children inside badges container and has limited width by default', () => {
    render(
      <Header.Badges>
        <span>Badge</span>
      </Header.Badges>,
    )
    const el = document.querySelector('.au-header__badges')
    expect(el).toBeTruthy()
    expect(el).toHaveClass('au-header__badges--limited-width')
    expect(screen.getByText('Badge')).toBeInTheDocument()
  })

  it('removes limited width class when limitBadgeWidth is false', () => {
    render(
      <Header.Badges limitBadgeWidth={false}>
        <span>WideBadge</span>
      </Header.Badges>,
    )
    const el = document.querySelector('.au-header__badges')
    expect(el).toBeTruthy()
    expect(el).not.toHaveClass('au-header__badges--limited-width')
    expect(screen.getByText('WideBadge')).toBeInTheDocument()
  })
})

describe('Header.Button', () => {
  it('renders children and responds to click', () => {
    const onClick = vi.fn()
    render(
      <Header.Button onClick={onClick}>
        <span>Btn</span>
      </Header.Button>,
    )
    const el = screen.getByText('Btn')
    expect(el).toBeInTheDocument()

    document
      .querySelector('.au-header__button')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(onClick).toHaveBeenCalled()
  })
})

describe('Header.Hamburger', () => {
  it('renders the hamburger icon and calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<Header.Hamburger onClick={onClick} />)

    const buttons = document.querySelectorAll('.au-header__hamburger')
    expect(buttons.length).toBeGreaterThanOrEqual(1)

    const target = buttons[1] ?? buttons[0]
    target?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(onClick).toHaveBeenCalled()
  })
})

describe('Header.Navigation', () => {
  it('renders children inside navigation wrapper', () => {
    render(
      <Header.Navigation>
        <nav>NavContent</nav>
      </Header.Navigation>,
    )
    expect(screen.getByText('NavContent')).toBeInTheDocument()
    expect(document.querySelector('.au-header__navigation')).toBeTruthy()
  })
})

describe('Header.Profile', () => {
  it('renders initials and notification/menu icons', () => {
    render(
      <Header.Profile fullName="Jane Doe" notifications={{ visible: true }} />,
    )
    expect(screen.getByText('JD')).toBeInTheDocument()
    expect(
      document.querySelector('.au-header__profile-notifications'),
    ).toBeTruthy()
    expect(document.querySelector('.au-header__profile-menu')).toBeTruthy()
  })

  it('calls onClickNotifications and onClickMenu', () => {
    const onClickNotifications = vi.fn()
    const onClickMenu = vi.fn()
    render(
      <Header.Profile
        fullName="Jane Doe"
        notifications={{ onClick: onClickNotifications }}
        onClickMenu={onClickMenu}
      />,
    )

    document
      .querySelector('.au-header__profile-notifications')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    document
      .querySelector('.au-header__profile-menu-mobile')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    document
      .querySelector('.au-header__profile-menu')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(onClickNotifications).toHaveBeenCalled()
    expect(onClickMenu).toHaveBeenCalled()
  })

  it('renders notification badge when visible is true', () => {
    render(
      <Header.Profile
        fullName="Jane Doe"
        notifications={{ visible: true, count: 5 }}
      />,
    )
    const badge = document.querySelector(
      '.au-header__profile-notifications-badge',
    )
    expect(badge).toBeTruthy()
    expect(badge).toHaveTextContent('5')
  })

  it('renders empty notification badge when count is undefined but hasUnread is true', () => {
    render(
      <Header.Profile
        fullName="Jane Doe"
        notifications={{ visible: true, hasUnread: true }}
      />,
    )
    const badge = document.querySelector(
      '.au-header__profile-notifications-badge',
    )
    expect(badge).toBeTruthy()
    expect(badge).toBeEmptyDOMElement()
  })
})

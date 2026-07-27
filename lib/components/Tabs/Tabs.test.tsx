import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Tabs } from '.'

describe('Tabs', () => {
  const tabs = [
    { tab: 'one', title: 'One', children: <div>one content</div> },
    { tab: 'two', title: 'Two', children: <div>two content</div> },
  ]

  it('renders tab buttons and children', () => {
    render(<Tabs tabs={tabs} />)

    expect(screen.getByRole('tab', { name: 'One' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Two' })).toBeInTheDocument()

    // by default no initial is selected, children are present but wrapped
    expect(document.querySelector('.children-one')).toBeTruthy()
    expect(document.querySelector('.children-two')).toBeTruthy()
  })

  it('respects initialTab and shows its content', () => {
    render(<Tabs tabs={tabs} initialTab="one" />)
    expect(screen.getByText('one content')).toBeInTheDocument()

    const activeTab = screen.getByRole('tab', { name: 'One' })
    expect(activeTab.classList.contains('au-tabs__btns-option--active')).toBe(
      true,
    )
    expect(activeTab).toHaveAttribute('aria-selected', 'true')
  })

  it('hides tabs panel when areTabsHidden is true', () => {
    render(<Tabs tabs={tabs} areTabsHidden />)
    expect(document.querySelector('.au-tabs')).toBeNull()
    expect(document.querySelector('.children-one')).toBeTruthy()
  })

  it('calls onClick and activates tab on click', async () => {
    const onClick = vi.fn()
    render(<Tabs tabs={tabs} onClick={onClick} />)

    const user = userEvent.setup()
    const twoBtn = screen.getByRole('tab', { name: 'Two' })
    await user.click(twoBtn)

    expect(onClick).toHaveBeenCalledWith('two')
    expect(twoBtn.classList.contains('au-tabs__btns-option--active')).toBe(true)
    expect(twoBtn).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('two content')).toBeInTheDocument()
  })

  it('links tabs and panels with ARIA roles and attributes', () => {
    render(<Tabs tabs={tabs} initialTab="one" />)

    expect(screen.getByRole('tablist')).toBeInTheDocument()

    const tabOne = screen.getByRole('tab', { name: 'One' })
    expect(tabOne).toHaveAttribute('aria-controls', 'au-tabpanel-one')

    const panelOne = document.getElementById('au-tabpanel-one')
    expect(panelOne).toHaveAttribute('role', 'tabpanel')
    expect(panelOne).toHaveAttribute('aria-labelledby', 'au-tab-one')
  })

  it('moves focus between tabs with arrow, Home and End keys', async () => {
    render(<Tabs tabs={tabs} initialTab="one" />)

    const user = userEvent.setup()
    const tabOne = screen.getByRole('tab', { name: 'One' })
    const tabTwo = screen.getByRole('tab', { name: 'Two' })

    tabOne.focus()
    await user.keyboard('{ArrowRight}')
    expect(tabTwo).toHaveFocus()

    await user.keyboard('{ArrowRight}')
    expect(tabOne).toHaveFocus()

    await user.keyboard('{End}')
    expect(tabTwo).toHaveFocus()

    await user.keyboard('{Home}')
    expect(tabOne).toHaveFocus()
  })

  it('renders the animated indicator and applies active class correctly', async () => {
    render(<Tabs tabs={tabs} initialTab="one" />)

    const activeTab = document.querySelector('.au-tabs__btns-option--active')
    expect(activeTab).toBeTruthy()
    expect(activeTab?.textContent).toBe('One')

    const indicator = document.querySelector('.au-tabs__btns-indicator')
    expect(indicator).toBeInTheDocument()

    const user = userEvent.setup()
    const secondTab = screen.getByText('Two')
    await user.click(secondTab)

    expect(secondTab.classList.contains('au-tabs__btns-option--active')).toBe(
      true,
    )
  })

  it('calculates the indicator position from the active tab', () => {
    Object.defineProperty(HTMLElement.prototype, 'offsetLeft', {
      configurable: true,
      value: 100,
    })
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 50,
    })

    render(<Tabs tabs={tabs} initialTab="one" />)

    const indicator = document.querySelector(
      '.au-tabs__btns-indicator',
    ) as HTMLElement

    expect(indicator.style.left).toBe('100px')
    expect(indicator.style.width).toBe('50px')
  })
})

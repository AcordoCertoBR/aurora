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

    expect(screen.getByText('One')).toBeInTheDocument()
    expect(screen.getByText('Two')).toBeInTheDocument()

    // by default no initial is selected, children are present but wrapped
    expect(document.querySelector('.children-one')).toBeTruthy()
    expect(document.querySelector('.children-two')).toBeTruthy()
  })

  it('respects initialTab and shows its content', () => {
    render(<Tabs tabs={tabs} initialTab="one" />)
    expect(screen.getByText('one content')).toBeInTheDocument()

    const activeChip = document.querySelector('.au-chip--active')
    expect(activeChip).toBeTruthy()
  })

  it('hides tabs panel when areTabsHidden is true', () => {
    render(<Tabs tabs={tabs} areTabsHidden />)
    expect(document.querySelector('.au-tabs')).toBeNull()
    expect(document.querySelector('.children-one')).toBeTruthy()
  })

  it('calls onClick and activates tab on chip click', async () => {
    const onClick = vi.fn()
    render(<Tabs tabs={tabs} onClick={onClick} />)

    const user = userEvent.setup()
    const twoBtn = screen.getByText('Two')
    await user.click(twoBtn)

    expect(onClick).toHaveBeenCalledWith('two')
    const activeChip = document.querySelector('.au-chip--active')
    expect(activeChip).toBeTruthy()
    expect(screen.getByText('two content')).toBeInTheDocument()
  })

  it('shows label when withLabel is true', () => {
    render(<Tabs tabs={tabs} withLabel />)
    expect(screen.getByText(/Filtrar por/i)).toBeInTheDocument()
  })
})

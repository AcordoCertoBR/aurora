import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { NotificationsBar } from './index'

describe('NotificationsBar', () => {
  it('renders Root with recents and olds', () => {
    const { container } = render(
      <NotificationsBar.Root
        renderRecents={() => <div>Recent</div>}
        renderOlds={() => <div>Old</div>}
      />,
    )

    expect(container.querySelector('.au-notifications-bar')).toBeTruthy()
    expect(screen.getByText('Recent')).toBeInTheDocument()
    expect(screen.getByText('Old')).toBeInTheDocument()
  })

  it('renders a List with title and items via renderItem', () => {
    const data: Array<{ title: string; onClick: () => void }> = [
      { title: 'One', onClick: () => {} },
      { title: 'Two', onClick: () => {} },
    ]

    render(
      <NotificationsBar.List
        title="Section"
        dataSource={data}
        renderItem={(item) => <div key={item.title}>{item.title}</div>}
      />,
    )

    expect(screen.getByText('Section')).toBeInTheDocument()
    expect(screen.getByText('One')).toBeInTheDocument()
    expect(screen.getByText('Two')).toBeInTheDocument()
  })

  it('renders Link and triggers onClick and onDelete', async () => {
    const onClick = vi.fn()
    const onDelete = vi.fn()
    render(
      <NotificationsBar.Link
        title="Item"
        onClick={onClick}
        onDelete={onDelete}
        createdAt="now"
      />,
    )

    const user = userEvent.setup()
    const link = screen.getByText('Item')
    await user.click(link)
    expect(onClick).toHaveBeenCalled()

    const deleteBtn = screen.getByText('Excluir')
    await user.click(deleteBtn)
    expect(onDelete).toHaveBeenCalled()
    expect(screen.getByText('now')).toBeInTheDocument()
  })
})

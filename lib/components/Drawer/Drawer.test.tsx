import { render, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { act } from 'react'
import { Drawer } from './index'
import { renderHook } from '@testing-library/react'
import { useDrawer } from './hooks'

describe('Drawer', () => {
  it('renders correctly when open', () => {
    const { getByText } = render(
      <Drawer
        isOpen={true}
        handleOpen={vi.fn()}
        renderHeader={<h1>Header</h1>}
        renderContent={<p>Drawer Content</p>}
      />,
    )

    expect(getByText('Header')).toBeInTheDocument()
    expect(getByText('Drawer Content')).toBeInTheDocument()
  })

  it('calls handleOpen when the close button is clicked', () => {
    const handleOpenMock = vi.fn()
    const { container } = render(
      <Drawer
        isOpen={true}
        handleOpen={handleOpenMock}
        renderHeader={<h1>Header</h1>}
        renderContent={<p>Drawer Content</p>}
      />,
    )

    const closeButton = container.querySelector('.au-drawer__header-close')
    expect(closeButton).not.toBeNull()

    if (closeButton) {
      fireEvent.click(closeButton)
      expect(handleOpenMock).toHaveBeenCalledTimes(1)
    }
  })
})

describe('useDrawer', () => {
  it('toggles the drawer state correctly', () => {
    const { result } = renderHook(() => useDrawer({ drawer1: false }))

    expect(result.current.drawerOpen.drawer1).toBe(false)

    act(() => {
      result.current.handleOpenDrawer('drawer1')
    })

    expect(result.current.drawerOpen.drawer1).toBe(true)

    act(() => {
      result.current.handleOpenDrawer('drawer1')
    })

    expect(result.current.drawerOpen.drawer1).toBe(false)
  })
})

import { useState } from 'react'

export function useDrawer() {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

  function handleOpenDrawer() {
    setDrawerOpen((prev) => !prev)
  }

  return {
    handleOpenDrawer,
    drawerOpen,
  }
}

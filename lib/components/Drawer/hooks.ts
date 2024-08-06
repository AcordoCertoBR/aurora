import { useState } from 'react'

type UseDrawerProps = Record<string, boolean>

export function useDrawer(props: UseDrawerProps) {
  const [drawerOpen, setDrawerOpen] = useState<UseDrawerProps>(props)

  function handleOpenDrawer(name: string) {
    setDrawerOpen((prev) => {
      return {
        ...prev,
        [name]: !prev[name],
      }
    })
  }

  console.log('drawerOpen', drawerOpen)
  return {
    handleOpenDrawer,
    drawerOpen,
  }
}

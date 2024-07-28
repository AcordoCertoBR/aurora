import { ReactNode } from 'react'

type HeaderNavigationProps = {
  children: ReactNode
}

export const HeaderNavigation = ({ children }: HeaderNavigationProps) => {
  return <nav className="au-header__navigation">{children}</nav>
}

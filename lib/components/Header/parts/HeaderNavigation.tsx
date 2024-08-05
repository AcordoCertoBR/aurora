import { ReactNode } from 'react'

export type HeaderNavigationProps = {
  children: ReactNode | string | JSX.Element | JSX.Element[]
}

export const HeaderNavigation = ({ children }: HeaderNavigationProps) => {
  return <nav className="au-header__navigation">{children}</nav>
}

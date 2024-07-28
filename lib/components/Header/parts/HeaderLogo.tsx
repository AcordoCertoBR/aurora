import { ReactNode } from 'react'

type HeaderLogoProps = {
  children: ReactNode
}

export const HeaderLogo = ({ children }: HeaderLogoProps) => {
  return <div className="au-header__logo">{children}</div>
}

import { ReactNode } from 'react'

export type HeaderLinkProps = {
  children: ReactNode | string | JSX.Element | JSX.Element[]
  onClick: () => void
}

export const HeaderLink = ({ children, onClick }: HeaderLinkProps) => {
  return (
    <div className="au-header__link" onClick={onClick}>
      {children}
    </div>
  )
}

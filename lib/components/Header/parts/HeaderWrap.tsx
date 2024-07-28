import { ReactNode } from 'react'

type HeaderWrapProps = {
  children: ReactNode
}

export const HeaderWrap = ({ children }: HeaderWrapProps) => {
  return (
    <header className="au-header">
      <div className="au-header__container">{children}</div>
    </header>
  )
}

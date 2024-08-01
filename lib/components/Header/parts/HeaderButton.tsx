import { ReactNode } from 'react'

export type HeaderButtonProps = {
  children: ReactNode
  onClick: () => void
}

export const HeaderButton = ({ children, onClick }: HeaderButtonProps) => {
  return (
    <div className="au-header__button" onClick={onClick}>
      {children}
    </div>
  )
}

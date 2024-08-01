import { ReactNode } from 'react'

export type HeaderBadgesProps = {
  children: ReactNode
}

export const HeaderBadges = ({ children }: HeaderBadgesProps) => {
  return <div className="au-header__badges">{children}</div>
}

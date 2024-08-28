import { ReactNode } from 'react'
import { NavbarDataProps } from '../types'

export type HeaderNavbarProps = {
  data: NavbarDataProps[]
  renderItem: (
    item: NavbarDataProps,
  ) => ReactNode | string | JSX.Element | JSX.Element[]
}

export const HeaderNavbar = ({ data, renderItem }: HeaderNavbarProps) => {
  return (
    <nav role="navigation" className="au-header__navbar">
      {data?.map((item) => {
        return renderItem(item)
      })}
    </nav>
  )
}

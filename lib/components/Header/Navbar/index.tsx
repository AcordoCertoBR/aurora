import { ReactNode } from 'react'
import { NavbarDataProps } from '../types'

export type HeaderNavbarProps = {
  data: NavbarDataProps[]
  renderItem: (
    item: NavbarDataProps,
  ) => ReactNode | string | JSX.Element | JSX.Element[]
  'data-testid'?: string
}

export const HeaderNavbar = ({
  data,
  renderItem,
  'data-testid': dataTestId,
}: HeaderNavbarProps) => {
  return (
    <nav role="navigation" className="au-header__navbar" data-testid={dataTestId}>
      {data?.map((item) => {
        return renderItem(item)
      })}
    </nav>
  )
}

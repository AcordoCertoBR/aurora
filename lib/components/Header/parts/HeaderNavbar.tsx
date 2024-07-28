import { ReactNode } from 'react'

type DataProps = {
  name: string
  onClick?: () => void
}

type HeaderNavbarProps = {
  data: DataProps[]
  renderItem: (item: DataProps) => ReactNode
}

export const HeaderNavbar = ({ data, renderItem }: HeaderNavbarProps) => {
  return (
    <nav className="au-header__navbar">
      {data.map((item) => {
        return renderItem(item)
      })}
    </nav>
  )
}

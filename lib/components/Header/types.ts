export type NavbarDataProps = {
  name: string
  onClick?: () => void
  active?: boolean
  dropdown?: NavbarDataProps[]
}

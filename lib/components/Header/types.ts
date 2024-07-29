export type NavbarDataProps = {
  name: string
  onClick?: () => void
  dropdown?: NavbarDataProps[]
}

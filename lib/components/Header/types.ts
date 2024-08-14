export type NavbarDataProps = {
  name: string
  onClick?: () => void
  active?: boolean
  href?: string
  dropdown?: NavbarDataProps[]
}

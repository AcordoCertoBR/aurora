import { Text } from '../../Text'

type HeaderNavbarLinkProps = {
  name: string
  onClick?: () => void
}

export const HeaderNavbarLink = ({ name, onClick }: HeaderNavbarLinkProps) => {
  return (
    <Text
      as="a"
      variant="body-medium"
      weight="light"
      onClick={onClick}
      className="au-header__navbar-link">
      {name}
    </Text>
  )
}

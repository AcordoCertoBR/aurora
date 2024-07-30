import { HeaderActions, HeaderActionsProps } from './parts/HeaderActions'
import { HeaderLink, HeaderLinkProps } from './parts/HeaderLink'
import { HeaderLogo, HeaderLogoProps } from './parts/HeaderLogo'
import { HeaderNavbar, HeaderNavbarProps } from './parts/HeaderNavbar'
import { HeaderProfile, HeaderProfileProps } from './parts/HeaderProfile'
import { HeaderNavbarLink } from './parts/HeaderNavbarLink'
import {
  HeaderNavigation,
  HeaderNavigationProps,
} from './parts/HeaderNavigation'
import { HeaderWrap as Header, HeaderWrapProps } from './parts/HeaderWrap'
import { NavbarDataProps } from './types'

import './styles.scss'

type Components = {
  Root: React.FC<HeaderWrapProps>
  Actions: React.FC<HeaderActionsProps>
  Logo: React.FC<HeaderLogoProps>
  Link: React.FC<HeaderLinkProps>
  Navigation: React.FC<HeaderNavigationProps>
  Navbar: React.FC<HeaderNavbarProps>
  NavbarLink: React.FC<NavbarDataProps>
  HeaderProfile: React.FC<HeaderProfileProps>
}

const components: Components = {
  Root: Header,
  Logo: HeaderLogo,
  Link: HeaderLink,
  Navbar: HeaderNavbar,
  Actions: HeaderActions,
  Navigation: HeaderNavigation,
  NavbarLink: HeaderNavbarLink,
  HeaderProfile: HeaderProfile,
}

Object.keys(components).forEach((key) => {
  const component = components[key as keyof Components]
  component.displayName = `Header.${key}`
})

export default components
export { Header }

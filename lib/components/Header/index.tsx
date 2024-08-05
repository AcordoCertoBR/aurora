import { HeaderActions, HeaderActionsProps } from './parts/HeaderActions'
import { HeaderBadges, HeaderBadgesProps } from './parts/HeaderBadges'
import { HeaderButton, HeaderButtonProps } from './parts/HeaderButton'
import { HeaderLink, HeaderLinkProps } from './parts/HeaderLink'
import { HeaderLogo, HeaderLogoProps } from './parts/HeaderLogo'
import { HeaderNavbar, HeaderNavbarProps } from './parts/HeaderNavbar'
import { HeaderNavbarLink } from './parts/HeaderNavbarLink'
import {
  HeaderNavigation,
  HeaderNavigationProps,
} from './parts/HeaderNavigation'
import { HeaderProfile, HeaderProfileProps } from './parts/HeaderProfile'
import { HeaderWrap as Header, HeaderWrapProps } from './parts/HeaderWrap'
import { NavbarDataProps } from './types'

import './styles.scss'

type Components = {
  Root: React.FC<HeaderWrapProps>
  Actions: React.FC<HeaderActionsProps>
  Badges: React.FC<HeaderBadgesProps>
  Button: React.FC<HeaderButtonProps>
  Link: React.FC<HeaderLinkProps>
  Logo: React.FC<HeaderLogoProps>
  Navbar: React.FC<HeaderNavbarProps>
  NavbarLink: React.FC<NavbarDataProps>
  Navigation: React.FC<HeaderNavigationProps>
  Profile: React.FC<HeaderProfileProps>
}

const components: Components = {
  Root: Header,
  Actions: HeaderActions,
  Badges: HeaderBadges,
  Button: HeaderButton,
  Link: HeaderLink,
  Logo: HeaderLogo,
  Navbar: HeaderNavbar,
  NavbarLink: HeaderNavbarLink,
  Navigation: HeaderNavigation,
  Profile: HeaderProfile,
}

Object.keys(components).forEach((key) => {
  const component = components[key as keyof Components]
  component.displayName = `Header.${key}`
})

export { components as Header }

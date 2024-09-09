import { HeaderActions, HeaderActionsProps } from './parts/HeaderActions'
import { HeaderBadges, HeaderBadgesProps } from './parts/HeaderBadges'
import { HeaderButton, HeaderButtonProps } from './parts/HeaderButton'
import { HeaderHamburger, HeaderHamburgerProps } from './parts/HeaderHamburger'
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
  Actions: React.FC<HeaderActionsProps>
  Badges: React.FC<HeaderBadgesProps>
  Button: React.FC<HeaderButtonProps>
  Hamburger: React.FC<HeaderHamburgerProps>
  Logo: React.FC<HeaderLogoProps>
  Navbar: React.FC<HeaderNavbarProps>
  NavbarLink: React.FC<NavbarDataProps>
  Navigation: React.FC<HeaderNavigationProps>
  Profile: React.FC<HeaderProfileProps>
  Root: React.FC<HeaderWrapProps>
}

const components: Components = {
  Actions: HeaderActions,
  Badges: HeaderBadges,
  Button: HeaderButton,
  Hamburger: HeaderHamburger,
  Logo: HeaderLogo,
  Navbar: HeaderNavbar,
  NavbarLink: HeaderNavbarLink,
  Navigation: HeaderNavigation,
  Profile: HeaderProfile,
  Root: Header,
}

Object.keys(components).forEach((key) => {
  const component = components[key as keyof Components]
  component.displayName = `Header.${key}`
})

export { components as Header }

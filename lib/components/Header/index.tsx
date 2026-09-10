import { HeaderActions, HeaderActionsProps } from './Actions'
import { HeaderBadges, HeaderBadgesProps } from './Badges'
import { HeaderButton, HeaderButtonProps } from './Button'
import { HeaderHamburger, HeaderHamburgerProps } from './Hamburger'
import { HeaderLogo, HeaderLogoProps } from './Logo'
import { HeaderNavbar, HeaderNavbarProps } from './Navbar'
import { HeaderNavbarLink } from './NavbarLink'
import {
  HeaderNavigation,
  HeaderNavigationProps,
} from './Navigation'
import { HeaderProfile, HeaderProfileProps } from './Profile'
import { HeaderWrap as Header, HeaderWrapProps } from './Wrap'
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

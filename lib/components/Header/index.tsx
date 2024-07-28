import { HeaderWrap as Header } from './parts/HeaderWrap'
import { HeaderLogo } from './parts/HeaderLogo'
import { HeaderNavigation } from './parts/HeaderNavigation'
import { HeaderNavbar } from './parts/HeaderNavbar'
import { HeaderNavbarLink } from './parts/HeaderNavbarLink'
import { HeaderNavbarActions } from './parts/HeaderNavbarActions'

import './styles.scss'

export default {
  Logo: HeaderLogo,
  Navigation: HeaderNavigation,
  Navbar: HeaderNavbar,
  NavbarLink: HeaderNavbarLink,
  NavbarActions: HeaderNavbarActions,
}

export { Header }

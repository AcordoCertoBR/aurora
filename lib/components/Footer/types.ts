import { ReactNode } from 'react'
import { certificatesMap } from './data'

export type Link = { title: string; url?: string }

export type CategoryLink = {
  categoryTitle: string
  links: Array<Link>
}

export type SocialLink = {
  instagram?: string
  facebook?: string
  youtube?: string
  linkedin?: string
  tiktok?: string
}

export type AppStores = {
  appstore?: string
  googleplay?: string
}

export type Certificate = keyof typeof certificatesMap

export type FooterProps = {
  logo: ReactNode | JSX.Element | JSX.Element[]
  categoryLinks?: Array<CategoryLink>
  socialLinks: SocialLink
  stores?: AppStores
  address?: string | ReactNode | JSX.Element | JSX.Element[]
  certificates: Array<Certificate>
  copyrights: string | ReactNode | JSX.Element | JSX.Element[]
}

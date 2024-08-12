import { ReactNode } from 'react'

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
}

export type Certificate =
  | 'fintech2022'
  | 'fintech2023'
  | 'pcidss'
  | 'quintessa'
  | 'ra1000'
  | 'reclameaqui'
  | 'scaleup'
  | 'sslblindado'

export type FooterProps = {
  logo: ReactNode | JSX.Element | JSX.Element[]
  categoryLinks?: Array<CategoryLink>
  socialLinks: SocialLink
  address?: string | ReactNode | JSX.Element | JSX.Element[]
  certificates: Array<Certificate>
  notes: string | ReactNode | JSX.Element | JSX.Element[]
  copyrights: string | ReactNode | JSX.Element | JSX.Element[]
}

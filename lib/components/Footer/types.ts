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
}

export type Certificate = keyof typeof certificatesMap

export type FooterProps = {
  logo: ReactNode | JSX.Element | JSX.Element[]
  categoryLinks?: Array<CategoryLink>
  socialLinks: SocialLink
  address?: string | ReactNode | JSX.Element | JSX.Element[]
  certificates: Array<Certificate>
  notes: string | ReactNode | JSX.Element | JSX.Element[]
  copyrights: string | ReactNode | JSX.Element | JSX.Element[]
}

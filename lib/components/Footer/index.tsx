import React from 'react'
import './styles.scss'
import { Footer, FooterProps } from './parts/Footer'
import { FooterLogo, FooterLogoProps } from './parts/FooterLogo'
import { FooterNote, FooterNoteProps } from './parts/FooterNote'
import {
  FooterCertifications,
  FooterCertificationsProps,
} from './parts/FooterCertifications'

type Components = {
  Root: React.FC<FooterProps>
  Logo: React.FC<FooterLogoProps>
  Certifications: React.FC<FooterCertificationsProps>
  Note: React.FC<FooterNoteProps>
}

const components: Components = {
  Root: Footer,
  Logo: FooterLogo,
  Certifications: FooterCertifications,
  Note: FooterNote,
}

Object.keys(components).forEach((key) => {
  const component = components[key as keyof Components]
  component.displayName = `Footer.${key}`
})

export { components as Footer }

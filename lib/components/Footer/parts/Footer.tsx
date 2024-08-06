import { ReactNode } from 'react'

export type FooterProps = {
  children: ReactNode | string | JSX.Element | JSX.Element[]
}

export const Footer = ({ children }: FooterProps) => {
  return <footer className="au-footer">{children}</footer>
}

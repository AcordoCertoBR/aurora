import { ReactNode } from 'react'

export type FooterLogoProps = {
  children: ReactNode | string | JSX.Element | JSX.Element[]
}

export const FooterLogo = ({ children }: FooterLogoProps) => {
  return <div className="au-footer__logo">{children}</div>
}

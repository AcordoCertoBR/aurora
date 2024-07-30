import { ReactNode } from 'react'

type LogoProps = {
  children?: ReactNode
}

export const Logo = ({ children }: LogoProps) => {
  return <div className="au-logo">{children}</div>
}

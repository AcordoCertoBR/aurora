import { ReactNode } from 'react'
import './styles.scss'

type LogoProps = {
  children?: ReactNode
}

export const Logo = ({ children }: LogoProps) => {
  return <div className="au-logo">{children}</div>
}

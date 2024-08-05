import { ReactNode } from 'react'
import './styles.scss'

type LogoProps = {
  children?: ReactNode | string | JSX.Element | JSX.Element[]
}

export const Logo = ({ children }: LogoProps) => {
  return <div className="au-logo">{children}</div>
}

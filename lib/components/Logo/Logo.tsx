import { ReactNode } from 'react'
import './styles.scss'

type LogoProps = {
  children?: ReactNode | string | JSX.Element | JSX.Element[]
  label?: string
}

export const Logo = ({ children, label }: LogoProps) => {
  return (
    <div
      className="au-logo"
      {...(label ? { role: 'img', 'aria-label': label } : {})}>
      {children}
    </div>
  )
}

import { ReactNode } from 'react'
import './styles.scss'

type LogoProps = {
  children?: ReactNode | string | JSX.Element | JSX.Element[]
  label?: string
  'data-testid'?: string
}

/** Props shared by every generated Logo variant wrapper. */
export type LogoVariantProps = {
  'data-testid'?: string
}

export const Logo = ({ children, label, 'data-testid': dataTestId }: LogoProps) => {
  return (
    <div
      className="au-logo"
      data-testid={dataTestId}
      {...(label ? { role: 'img', 'aria-label': label } : {})}>
      {children}
    </div>
  )
}

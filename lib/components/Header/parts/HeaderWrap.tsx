import classNames from 'classnames'
import { ReactNode } from 'react'

export type HeaderWrapProps = {
  position?: 'static' | 'fixed'
  children: ReactNode | string | JSX.Element | JSX.Element[]
}

export const HeaderWrap = ({
  children,
  position = 'static',
}: HeaderWrapProps) => {
  return (
    <header
      role="banner"
      className={classNames('au-header', {
        'au-header--fixed': position === 'fixed',
        'au-header--static': position === 'static',
      })}>
      <div className="au-header__container">{children}</div>
    </header>
  )
}

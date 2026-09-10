import classNames from 'classnames'
import { ReactNode } from 'react'

export type HeaderWrapProps = {
  position?: 'static' | 'fixed'
  children: ReactNode | string | JSX.Element | JSX.Element[]
  'data-testid'?: string
}

export const HeaderWrap = ({
  children,
  position = 'static',
  'data-testid': dataTestId,
}: HeaderWrapProps) => {
  return (
    <header
      role="banner"
      className={classNames('au-header', {
        'au-header--fixed': position === 'fixed',
        'au-header--static': position === 'static',
      })}
      data-testid={dataTestId}>
      <div className="au-header__container">{children}</div>
    </header>
  )
}

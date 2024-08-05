import classNames from 'classnames'
import { ReactNode } from 'react'

export type HeaderActionsProps = {
  children: ReactNode | string | JSX.Element | JSX.Element[]
  divider?: boolean
}

export const HeaderActions = ({ children, divider }: HeaderActionsProps) => {
  return (
    <div
      className={classNames('au-header__actions', {
        'au-header__actions--divider': divider,
      })}>
      {children}
    </div>
  )
}

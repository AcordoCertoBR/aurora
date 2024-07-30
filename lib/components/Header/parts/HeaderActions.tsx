import classNames from 'classnames'
import { ReactNode } from 'react'

export type HeaderActionsProps = {
  children: ReactNode
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

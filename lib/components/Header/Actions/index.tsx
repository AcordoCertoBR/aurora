import classNames from 'classnames'
import { ReactNode } from 'react'

export type HeaderActionsProps = {
  children: ReactNode | string | JSX.Element | JSX.Element[]
  divider?: boolean
  'data-testid'?: string
}

export const HeaderActions = ({
  children,
  divider,
  'data-testid': dataTestId,
}: HeaderActionsProps) => {
  return (
    <div
      className={classNames('au-header__actions', {
        'au-header__actions--divider': divider,
      })}
      data-testid={dataTestId}>
      {children}
    </div>
  )
}

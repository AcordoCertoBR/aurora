import classNames from 'classnames'
import { ReactNode } from 'react'

export type HeaderBadgesProps = {
  children: ReactNode | string | JSX.Element | JSX.Element[]
  limitBadgeWidth?: boolean
  'data-testid'?: string
}

export const HeaderBadges = ({
  children,
  limitBadgeWidth = true,
  'data-testid': dataTestId,
}: HeaderBadgesProps) => {
  const componentClass = classNames('au-header__badges', {
    'au-header__badges--limited-width': limitBadgeWidth,
  })
  return <div className={componentClass} data-testid={dataTestId}>{children}</div>
}

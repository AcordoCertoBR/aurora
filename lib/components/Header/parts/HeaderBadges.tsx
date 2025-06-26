import classNames from 'classnames'
import { ReactNode } from 'react'

export type HeaderBadgesProps = {
  children: ReactNode | string | JSX.Element | JSX.Element[]
  limitBadgeWidth?: boolean
}

export const HeaderBadges = ({
  children,
  limitBadgeWidth = true,
}: HeaderBadgesProps) => {
  const componentClass = classNames('au-header__badges', {
    'au-header__badges--limited-width': limitBadgeWidth,
  })
  return <div className={componentClass}>{children}</div>
}

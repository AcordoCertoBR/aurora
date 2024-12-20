import classNames from 'classnames'
import { ReactNode } from 'react'

export type CardContainerProps = {
  direction: 'column' | 'row'
  alignItems: 'center' | 'start'
  justifyContent: 'center' | 'space-between'
  children: ReactNode
}
export const CardContainer = ({
  direction,
  alignItems,
  justifyContent,
  children,
}: CardContainerProps) => {
  const containerClasses = classNames('au-card__container', {
    [`au-card__container--${direction}`]: direction,
    [`au-card__container--${alignItems}`]: alignItems,
    [`au-card__container--${justifyContent}`]: justifyContent,
  })
  return <div className={containerClasses}>{children}</div>
}

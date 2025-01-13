import classNames from 'classnames'
import { CSSProperties, ReactNode } from 'react'

export type CardContainerProps = {
  direction?: 'column' | 'row'
  alignItems?: 'center' | 'start'
  justifyContent?: 'center' | 'space-between'
  gap?: number
  width?: number
  children: ReactNode
}
export const CardContainer = ({
  direction,
  alignItems,
  justifyContent,
  gap,
  width,
  children,
}: CardContainerProps) => {
  const containerClasses = classNames('au-card__container', {
    [`au-card__container--direction-${direction}`]: direction,
    [`au-card__container--align-items-${alignItems}`]: alignItems,
    [`au-card__container--justify-content-${justifyContent}`]: justifyContent,
  })

  const containerStyle: CSSProperties = {
    gap: `${gap}px`,
    width: `${width}px`
  }
  return (
    <div style={containerStyle} className={containerClasses}>
      {children}
    </div>
  )
}

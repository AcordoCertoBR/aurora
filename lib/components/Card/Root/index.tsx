import classNames from 'classnames'
import { CSSProperties, ReactNode } from 'react'

export type CardRootProps = {
  border?: boolean
  color?: 'primary' | 'secondary'
  width?: number
  height?: number
  maxWidth?: number
  maxHeight?: number
  children: ReactNode
}
export const CardRoot = ({
  border = true,
  color = 'primary',
  width,
  height,
  maxWidth,
  maxHeight,
  children,
}: CardRootProps) => {
  const rootClasses = classNames('au-card__root', {
    'au-card__root--border-none': !border,
    'au-card__root--color-secondary': color === 'secondary',
  })
  const rootSize: CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
    maxWidth: `${maxWidth}px`,
    maxHeight: `${maxHeight}px`
  }

  return (
    <div
      style={rootSize}
      className={rootClasses}>
      {children}
    </div>
  )
}

import classNames from 'classnames'
import { CSSProperties, ReactNode } from 'react'

export type CardRootProps = {
  border?: boolean
  color?: 'primary' | 'secondary'
  width?: number
  height?: number
  maxWidth?: number
  maxHeight?: number
  paddingLess?: boolean;
  hoverShadow?: boolean
  className?: string;
  children: ReactNode
}
export const CardRoot = ({
  border = true,
  color = 'primary',
  width,
  height,
  maxWidth,
  maxHeight,
  hoverShadow,
  paddingLess,
  children,
  className
}: CardRootProps) => {
  const rootClasses = classNames('au-card__root', {
    'au-card__root--border-none': !border,
    'au-card__root--color-secondary': color === 'secondary',
    'au-card__root--with-hover-shadow': !!hoverShadow,
    'au-card__root--paddingless': !!paddingLess,
    [String(className)]: !!className
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

import classNames from 'classnames'
import { ReactNode } from 'react'

export type CardTagProps = {
  color?: 'primary' | 'secondary'
  icon?: ReactNode
  children: ReactNode
}
export const CardTag = ({
  color = 'primary',
  icon,
  children,
}: CardTagProps) => {
  const tagClasses = classNames('au-card__tag', {
    'au-card__tag--primary': color === 'primary',
    'au-card__tag--secondary': color === 'secondary',
  })
  return (
    <div className={tagClasses}>
      <span>{icon}</span>
      <span>{children}</span>
    </div>
  )
}

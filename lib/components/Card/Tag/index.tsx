import classNames from 'classnames'
import { ReactNode } from 'react'

export type CardTagProps = {
  color?: 'primary' | 'secondary'
  icon?: ReactNode
  children: ReactNode
  'data-testid'?: string
}
export const CardTag = ({
  color = 'primary',
  icon,
  children,
  'data-testid': dataTestId,
}: CardTagProps) => {
  const tagClasses = classNames('au-card__tag', {
    'au-card__tag--primary': color === 'primary',
    'au-card__tag--secondary': color === 'secondary',
  })
  return (
    <div className={tagClasses} data-testid={dataTestId}>
      <span aria-hidden="true">{icon}</span>
      <span>{children}</span>
    </div>
  )
}

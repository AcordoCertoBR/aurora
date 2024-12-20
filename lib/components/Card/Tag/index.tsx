import classNames from 'classnames'
import { ReactNode } from 'react'

export type CardTagProps = {
  icon: ReactNode
  text: string
  color: 'primary' | 'secondary'
}
export const CardTag = ({ icon, text, color }: CardTagProps) => {
  const tagClasses = classNames('au-card__tag', {
    'au-card__tag--primary': color === 'primary',
    'au-card__tag--secondary': color === 'secondary',
  })
  return (
    <div className={tagClasses}>
      <div className="au-card__tag__content">
        {icon}
        <strong>{text}</strong>
      </div>
    </div>
  )
}

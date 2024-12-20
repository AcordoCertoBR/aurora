import classNames from 'classnames'
import { ReactNode } from 'react'

export type CardRootProps = {
  border: boolean
  children: ReactNode
}
export const CardRoot = ({ border = true, children }: CardRootProps) => {
  const rootClasses = classNames('au-card__root', {
    'au-card__root--border-none': !border,
  })
  return <div className={rootClasses}>{children}</div>
}

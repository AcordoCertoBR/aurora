import cn from 'classnames'

import './styles.scss'

type ContainerProps = {
  customClass?: string
  children: React.ReactNode
}

export const Container = ({ customClass, children }: ContainerProps) => {
  return (
    <div className={cn('au-container', { [`${customClass}`]: !!customClass })}>
      {children}
    </div>
  )
}

import cn from 'classnames'

import './styles.scss'

type ContainerProps = {
  customClass?: string
  children: React.ReactNode
  'data-testid'?: string
}

export const Container = ({
  customClass,
  children,
  'data-testid': dataTestId,
}: ContainerProps) => {
  return (
    <div
      className={cn('au-container', { [`${customClass}`]: !!customClass })}
      data-testid={dataTestId}>
      {children}
    </div>
  )
}

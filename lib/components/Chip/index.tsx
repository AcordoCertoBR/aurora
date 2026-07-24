import cn from 'classnames'
import { Button } from '@components/Button'
import { IconChevronDown } from '@components/icons'

import './styles.scss'

export type ChipProps = {
  isActive: boolean
  isDisabled?: boolean
  label: string
  icon?: React.ReactNode
  variant?: 'filter' | 'order'
  onClick: () => void
  'data-testid'?: string
}

export const Chip = ({
  onClick,
  label,
  icon,
  isActive,
  isDisabled,
  variant = 'filter',
  'data-testid': dataTestId,
}: ChipProps) => {
  const isOrder = variant === 'order'

  return (
    <Button
      className={cn('au-chip', `au-chip--variant-${variant}`, {
        'au-chip--active': isActive,
        'au-chip--disabled': isDisabled,
      })}
      type="outlined"
      disabled={isDisabled}
      onClick={onClick}
      data-testid={dataTestId}>
      {!isOrder && icon}
      {label}
      {isOrder && <IconChevronDown />}
    </Button>
  )
}

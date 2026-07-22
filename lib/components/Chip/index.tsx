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
}

export const Chip = ({
  onClick,
  label,
  icon,
  isActive,
  isDisabled,
  variant = 'filter',
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
      onClick={onClick}>
      {!isOrder && icon}
      {label}
      {isOrder && <IconChevronDown />}
    </Button>
  )
}

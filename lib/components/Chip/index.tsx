import cn from 'classnames'
import { Button } from '@components/Button'

import './styles.scss'

type ChipProps = {
  isActive: boolean
  isDisabled?: boolean
  label: string
  icon?: React.ReactNode
  onClick: () => void
}

export const Chip = ({
  onClick,
  label,
  icon,
  isActive,
  isDisabled,
}: ChipProps) => {
  return (
    <Button
      className={cn('au-chip', {
        'au-chip--active': isActive,
        'au-chip--disabled': isDisabled,
      })}
      type="outlined"
      disabled={isDisabled}
      onClick={onClick}>
      {icon}
      {label}
    </Button>
  )
}

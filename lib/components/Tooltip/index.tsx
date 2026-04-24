import { useId } from 'react'
import classNames from 'classnames'
import './styles.scss'

export type TooltipProps = {
  text: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  open?: boolean
  children: React.ReactNode
}

export const Tooltip = ({
  text,
  position = 'top',
  open,
  children,
}: TooltipProps) => {
  const tooltipId = useId()

  const tooltipClasses = classNames(
    'tooltip-container',
    `tooltip-${position}`,
    {
      'tooltip-open': open,
    },
  )

  return (
    <div className={tooltipClasses} aria-describedby={tooltipId}>
      {children}
      <div id={tooltipId} className="tooltip" role="tooltip">{text}</div>
    </div>
  )
}

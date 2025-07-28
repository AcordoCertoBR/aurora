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
  const tooltipClasses = classNames(
    'tooltip-container',
    `tooltip-${position}`,
    {
      'tooltip-open': open,
    },
  )

  return (
    <div className={tooltipClasses}>
      {children}
      <div className="tooltip">{text}</div>
    </div>
  )
}

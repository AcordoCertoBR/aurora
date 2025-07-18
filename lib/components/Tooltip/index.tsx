import './styles.scss'

export type TooltipProps = {
  text: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  children: React.ReactNode
}

export const Tooltip = ({ text, position = 'top', children }: TooltipProps) => {
  return (
   <div className={`tooltip-container tooltip-${position}`}>
      {children}
      <div className="tooltip">{text}</div>
    </div>
  )
}

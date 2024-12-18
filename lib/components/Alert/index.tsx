import classNames from 'classnames'
import './styles.scss'
import {
  IconAlertOctagon,
  IconAlertTriangle,
  IconCheck,
  IconInfo,
} from '@components/icons'
import {
  COLOR_ERROR_50,
  COLOR_INFO_50,
  COLOR_SUCCESS_50,
  COLOR_WARNING_50,
} from '@core/tokens'
import { Conditional } from '@components/misc'

export type AlertProps = {
  status?: 'success' | 'error' | 'warning' | 'info'
  type?: 1 | 2
  orientation?: 'horizontal' | 'vertical'
  title?: { content?: string; weight?: 'bold' | 'normal' }
  text?: string
  action?: string
  children?: React.ReactNode
}

export const Alert = ({
  status = 'info',
  type = 1,
  orientation = 'horizontal',
  title,
  text,
  action,
  children,
}: AlertProps) => {
  const statusMap = {
    success: {
      option: 'success',
      icon: <IconCheck rawColor={COLOR_SUCCESS_50} />,
    },
    error: {
      option: 'error',
      icon: <IconAlertOctagon rawColor={COLOR_ERROR_50} />,
    },
    warning: {
      option: 'warning',
      icon: <IconAlertTriangle rawColor={COLOR_WARNING_50} />,
    },
    info: { option: 'info', icon: <IconInfo rawColor={COLOR_INFO_50} /> },
  }

  const alertClasses = classNames('au-alert', {
    [`au-alert--${statusMap[status].option}--type-${type}`]:
      statusMap[status].option,
  })

  return (
    <div className={alertClasses}>
      {statusMap[status].icon}
      <div className={`au-alert__container--${orientation}`}>
        <div>
          <h4 className={`au-alert__title au-alert__title--${title?.weight}`}>
            {title?.content}
          </h4>
          <p className={`au-alert__support-text`}>{text}</p>
        </div>
        {children}
        <Conditional
          condition={!!action}
          renderIf={<button className="au-alert__action-btn">{action}</button>}
        />
      </div>
    </div>
  )
}

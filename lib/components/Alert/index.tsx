import { useState } from 'react'
import classNames from 'classnames'
import {
  IconAlertOctagon,
  IconAlertTriangle,
  IconCheck,
  IconInfo,
  IconX,
} from '@components/icons'
import {
  COLOR_ERROR_50,
  COLOR_INFO_50,
  COLOR_NEUTRAL_70,
  COLOR_SUCCESS_50,
  COLOR_WARNING_50,
} from '@core/tokens'
import { Conditional } from '@components/misc'
import './styles.scss'

export type AlertProps = {
  status?: 'success' | 'error' | 'warning' | 'info'
  type?: 1 | 2
  orientation?: 'horizontal' | 'vertical'
  title?: { content?: string; weight?: 'bold' | 'normal' }
  text?: string
  actionButton?: { content?: string; onClick?: () => void }
  closeButton?: boolean
  children?: React.ReactNode
}

export const Alert = ({
  status = 'info',
  type = 1,
  orientation = 'horizontal',
  title,
  text,
  actionButton,
  closeButton = false,
  children,
}: AlertProps) => {
  const [isClosed, setIsClosed] = useState(false)

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

  if (isClosed) return null

  return (
    <div className={alertClasses}>
      <div className="au-alert__content">
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
            condition={!!actionButton}
            renderIf={
              <button
                className="au-alert__action-btn"
                onClick={actionButton?.onClick}>
                {actionButton?.content}
              </button>
            }
          />
        </div>
      </div>

      <Conditional
        condition={closeButton}
        renderIf={
          <button className="au-alert__close-btn">
            <IconX
              rawColor={COLOR_NEUTRAL_70}
              onClick={() => setIsClosed(true)}
            />
          </button>
        }
      />
    </div>
  )
}

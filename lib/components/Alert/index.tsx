import { useState, useEffect } from 'react'
import classNames from 'classnames'
import {
  IconAlertOctagon,
  IconAlertTriangle,
  IconCheck,
  IconInfo,
  IconX,
  IconClock,
} from '@components/icons'
import {
  COLOR_ERROR_50,
  COLOR_INFO_50,
  COLOR_NEUTRAL_70,
  COLOR_SUCCESS_50,
  COLOR_WARNING_50,
} from '@core/tokens'
import { Conditional } from '@components/misc'
import { Text } from '@components/Text'
import './styles.scss'

export type AlertProps = {
  showIcon?: boolean
  status?: 'success' | 'error' | 'warning' | 'info' | 'timer'
  type?: 1 | 2
  orientation?: 'horizontal' | 'vertical'
  title?: { content?: React.ReactNode; weight?: 'bold' | 'normal' }
  text?: React.ReactNode
  actionButton?: { content?: string; onClick?: () => void }
  closeButton?: boolean
  customIcon?: JSX.Element
  children?: React.ReactNode
  countdown?: number
  onCountdownEnd?: () => void
  onCloseButton?: () => void
}

export const Alert = ({
  showIcon = true,
  status = 'info',
  type = 1,
  orientation = 'horizontal',
  title,
  text,
  actionButton,
  closeButton = false,
  children,
  countdown = 59,
  onCountdownEnd,
  onCloseButton,
  customIcon
}: AlertProps) => {
  const [isClosed, setIsClosed] = useState(false)
  const [timeLeft, setTimeLeft] = useState(countdown)
  const [isCountdownFinished, setIsCountdownFinished] = useState(false)

  useEffect(() => {
    if (status !== 'timer' || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setIsCountdownFinished(true)
          if (onCountdownEnd) onCountdownEnd()
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [status, timeLeft, onCountdownEnd])

  useEffect(() => {
    if (timeLeft > 0) {
      setIsCountdownFinished(false)
    }
  }, [timeLeft])
	
  const handleActionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		
    setTimeLeft(countdown)
    setIsCountdownFinished(false)
    actionButton?.onClick?.()
  }

  const handleCloseButtonClick = () => {
    setIsClosed(true)
    onCloseButton?.()
  }

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
    timer: {
      option: 'timer',
      icon: (
        <div className="au-alert__timer">
          <IconClock rawColor={COLOR_WARNING_50} />
          {!isCountdownFinished && (
            <Text
              className="au-alert__countdown"
              variant="body-small"
              weight="bold">
              {timeLeft}s
            </Text>
          )}
        </div>
      ),
    },
  }

  const alertClasses = classNames('au-alert', {
    [`au-alert--${statusMap[status].option}--type-${type}`]:
      statusMap[status].option,
  })

  if (isClosed) return null

  return (
    <div className={alertClasses}>
      <div className="au-alert__content">
        <Conditional condition={showIcon} renderIf={ customIcon ? customIcon : statusMap[status].icon} />
        <div className={`au-alert__container--${orientation}`}>
          <Conditional
            condition={!!title || !!text}
            renderIf={
              <div>
                <h4
                  className={`au-alert__title au-alert__title--${title?.weight}`}>
                  {title?.content}
                </h4>
                <p className="au-alert__support-text">{text}</p>
              </div>
            }
          />

          {children}
          <Conditional
            condition={
              !!actionButton && (status !== 'timer' || isCountdownFinished)
            }
            renderIf={
              <button
                className="au-alert__action-btn"
								type="button"
                onClick={(e) => handleActionClick(e)}>
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
              onClick={handleCloseButtonClick}
            />
          </button>
        }
      />
    </div>
  )
}

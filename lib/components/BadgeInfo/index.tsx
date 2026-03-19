import classNames from 'classnames'
import {
  IconInfo,
} from '@components/icons'
import {
  COLOR_ERROR_50,
  COLOR_INFO_50,
  COLOR_SUCCESS_50,
  COLOR_WARNING_50,
  COLOR_BRAND_CYAN_50,
  COLOR_NEUTRAL_70,
} from '@core/tokens'
import './styles.scss'
import { Conditional } from '@components/misc'

export type BadgeInfoProps = {
  status: 'info' | 'success' | 'error' | 'warning' | 'progress' | 'neutral'
  color?: 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
  text: string
  children?: React.ReactNode
  customIcon?: string | JSX.Element
  actionButton?: { content?: string; onClick?: () => void }
}

export const BadgeInfo = ({
  status,
  size = 'medium',
  color = 'primary',
  customIcon,
  text,
  children,
  actionButton,
}: BadgeInfoProps) => {
  const statusMap = {
    success: {
      option: 'success',
      icon: <IconInfo rawColor={COLOR_SUCCESS_50} />,
    },
    error: {
      option: 'error',
      icon: <IconInfo rawColor={COLOR_ERROR_50} />,
    },
    warning: {
      option: 'warning',
      icon: <IconInfo rawColor={COLOR_WARNING_50} />,
    },
    info: { 
      option: 'info', 
      icon: <IconInfo rawColor={COLOR_INFO_50} />
    },
    progress: {
      option: 'progress',
      icon: <IconInfo rawColor={COLOR_BRAND_CYAN_50} />,
    },
    neutral: {
      option: 'neutral',
      icon: <IconInfo rawColor={COLOR_NEUTRAL_70} />,
    },
    custom: {
      option: 'custom',
      icon: customIcon,
    },
  }

  const badgeInfoClasses = classNames('au-badgeInfo', {
    [`au-badgeInfo--${statusMap[status].option}`]: statusMap[status].option,
    [`au-badgeInfo--size-${size}`]: !!size,
    [`au-badgeInfo--color-${color}`]: !!color,
  })

  return (
    <div className={badgeInfoClasses}>
      <div className="au-badgeInfo__content">
        <div className="au-badgeInfo__content-icon">
          <Conditional
            condition={!!customIcon}
            renderIf={customIcon}
            renderElse={statusMap[status].icon}
          />
        </div>
        <p className={`au-badgeInfo__content-support-text`}>{text}</p>

        <Conditional
          condition={!!actionButton}
          renderIf={
            <button
              className="au-badgeInfo__action-btn"
              onClick={actionButton?.onClick}>
              {actionButton?.content}
            </button>
          }
        />
      </div>
      {children}
    </div>
  )
}

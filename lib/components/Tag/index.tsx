import classNames from 'classnames'
import {
  IconAlertOctagon,
  IconAlertTriangle,
  IconCheck,
  IconInfo,
  IconSlash
} from '@components/icons'
import {
  COLOR_ERROR_50,
  COLOR_INFO_50,
  COLOR_SUCCESS_50,
  COLOR_WARNING_50,
  COLOR_BRAND_CYAN_50,
  COLOR_NEUTRAL_70
} from '@core/tokens'
import './styles.scss'

export type TagProps = {
  status?: 'info' | 'success' | 'error' | 'warning' | 'support' | 'neutral'
  border?: 'rounded' | 'square'
  type?: 'read-only' | 'badge'
  color?: 'primary' | 'secondary'
  size: 'small' | 'medium' | 'large'
  text: string
  children?: React.ReactNode
}

export const Tag = ({
  status = 'info',
  border = 'rounded',
  type = 'read-only',
  color = 'primary',
  size,
  icon,
  text,
  children,
}: TagProps) => {
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
    support: {
      option: 'support',
      icon: <IconInfo rawColor={COLOR_BRAND_CYAN_50} />
    },
    neutral: {
      option: 'neutral',
      icon: <IconSlash rawColor={COLOR_NEUTRAL_70} />
    }
  }

  const tagClasses = classNames('au-tag', {
    [`au-tag--${statusMap[status].option}--type-${type}`]:
      statusMap[status].option,
  })

  return (
    <div className={tagClasses}>
      {/* <div className="au-tag__content">
        {statusMap[status].icon}
        <div className={`au-tag__container--${orientation}`}>
          <div>
            <h4 className={`au-tag__title au-tag__title--${title?.weight}`}>
              {title?.content}
            </h4>
            <p className={`au-tag__support-text`}>{text}</p>
          </div>
          {children}
        </div>
      </div> */}
    </div>
  )
}

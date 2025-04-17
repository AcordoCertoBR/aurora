import classNames from 'classnames'
import {
  IconAlertOctagon,
  IconAlertTriangle,
  IconCheck,
  IconInfo,
  IconSlash,
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

export type TagProps = {
  status: 'info' | 'success' | 'error' | 'warning' | 'support' | 'neutral'
  border?: 'rounded' | 'square'
  type?: 'read-only' | 'badge'
  color?: 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
  text: string
  children?: React.ReactNode
  customIcon?: string | JSX.Element
}

export const Tag = ({
  status,
  border = 'square',
  size = 'medium',
  type = 'read-only',
  color = 'primary',
  customIcon,
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
      icon: <IconInfo rawColor={COLOR_BRAND_CYAN_50} />,
    },
    neutral: {
      option: 'neutral',
      icon: <IconSlash rawColor={COLOR_NEUTRAL_70} />,
    },
    custom: {
      option: 'custom',
      icon: customIcon,
    },
  }

  const tagClasses = classNames('au-tag', {
    [`au-tag--${statusMap[status].option}`]: statusMap[status].option,
    [`au-tag--size-${size}`]: !!size,
    [`au-tag--type-${type}`]: !!type,
    [`au-tag--border-${border}`]: !!border,
    [`au-tag--color-${color}`]: !!color,
  })

  const isBadgeTag = type === 'badge';
  const supportText = isBadgeTag ? text.toUpperCase() : text

  return (
    <div className={tagClasses}>
      <div className="au-tag__content">
        <Conditional
          condition={!isBadgeTag}
          renderIf={
            <div className="au-tag__content-icon">
              <Conditional condition={!!customIcon} renderIf={customIcon} renderElse={statusMap[status].icon}/>
            </div>
          }
        />
        <p className={`au-tag__content-support-text`}>{supportText}</p>
      </div>
      {children}
    </div>
  )
}

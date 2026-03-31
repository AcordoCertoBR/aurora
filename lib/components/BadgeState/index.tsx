import classNames from 'classnames'
import {
  IconAlertOctagon,
  IconAlertTriangle,
  IconCheck,
  IconMoreHorizontal,
  IconInfo,
} from '@components/icons'
import {
  COLOR_ERROR_50,
  COLOR_INFO_50,
  COLOR_SUCCESS_50,
  COLOR_WARNING_50,
  COLOR_BRAND_CYAN_50,
} from '@core/tokens'

import { IfElse, Else, Then } from '@components/misc'

import './styles.scss'

export type BadgeStateProps = {
  status: 'info' | 'success' | 'error' | 'warning' | 'support'
  isNumberBadge?: boolean
  variant?: 'regular' | 'strong'
  text?: string
  children?: React.ReactNode
  icon?: string | JSX.Element
  iconOnly?: boolean
}

export const BadgeState = ({
  status,
  isNumberBadge = false,
  variant = 'regular',
  iconOnly = false,
  text,
  children,
}: BadgeStateProps) => {
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
      icon: <IconMoreHorizontal rawColor={COLOR_BRAND_CYAN_50} />,
    },
  }

  const badgeStateClasses = classNames('au-badgeState', {
    [`au-badgeState--${statusMap[status].option}`]: statusMap[status].option,
    [`au-badgeState--border-circle`]: !!isNumberBadge,
    [`au-badgeState--icon-only`]: !!iconOnly,
    [`au-badgeState--variant-${variant}`]: !!variant,
  })

  return (
    <div className={badgeStateClasses}>
      <div className="au-badgeState__content">
        <IfElse condition={!!iconOnly}>
          <Then>{statusMap[status].icon}</Then>
          <Else>
            {<p className={`au-badgeState__content-support-text`}>{text}</p>}
          </Else>
        </IfElse>
      </div>
      {children}
    </div>
  )
}

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
  COLOR_NEUTRAL_60,
} from '@core/tokens'

import { IfElse, Else, Then } from '@components/misc'

import './styles.scss'

export type BadgeStateProps = {
  status: 'info' | 'success' | 'error' | 'warning' | 'support' | 'neutral'
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
      label: 'Sucesso',
      icon: <IconCheck rawColor={COLOR_SUCCESS_50} />,
    },
    error: {
      option: 'error',
      label: 'Erro',
      icon: <IconAlertOctagon rawColor={COLOR_ERROR_50} />,
    },
    warning: {
      option: 'warning',
      label: 'Atenção',
      icon: <IconAlertTriangle rawColor={COLOR_WARNING_50} />,
    },
    info: {
      option: 'info',
      label: 'Informação',
      icon: <IconInfo rawColor={COLOR_INFO_50} />,
    },
    support: {
      option: 'support',
      label: 'Mais informações',
      icon: <IconMoreHorizontal rawColor={COLOR_BRAND_CYAN_50} />,
    },
    neutral: {
      option: 'neutral',
      label: 'Neutro',
      icon: <IconMoreHorizontal rawColor={COLOR_NEUTRAL_60} />,
    },
  }

  const badgeStateClasses = classNames('au-badgeState', {
    [`au-badgeState--${statusMap[status].option}`]: statusMap[status].option,
    [`au-badgeState--border-circle`]: !!isNumberBadge,
    [`au-badgeState--icon-only`]: !!iconOnly,
    [`au-badgeState--variant-${variant}`]: !!variant,
  })

  return (
    <div className={badgeStateClasses} {...(iconOnly ? { 'aria-label': statusMap[status].label } : {})}>
      <div className="au-badgeState__content">
        <IfElse condition={!!iconOnly}>
          <Then><span aria-hidden="true">{statusMap[status].icon}</span></Then>
          <Else>
            {<p className={`au-badgeState__content-support-text`}>{text}</p>}
          </Else>
        </IfElse>
      </div>
      {children}
    </div>
  )
}

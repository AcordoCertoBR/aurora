import { ReactNode } from 'react'
import classNames from 'classnames'
import { Text } from '@components/Text'
import './styles.scss'

export type PartnerBannerProps = {
  text: string
  btnText: string
  icon?: ReactNode
  onButtonClick?: () => void
  ariaLabel?: string
  className?: string
}

export const PartnerBanner = ({
  text,
  btnText,
  icon,
  onButtonClick,
  ariaLabel,
  className = '',
}: PartnerBannerProps) => {
  const classes = classNames('au-partner-banner', {
    [`au-partner-banner--with-icon`]: !!icon,
    [className]: !!className,
  })

  return (
    <aside className={classes} aria-label={ariaLabel}>
      {icon && (
        <div className="au-partner-banner__icon" aria-hidden="true">
          {icon}
        </div>
      )}
      <div className="au-partner-banner__content">
        <Text
          as="p"
          variant="body-small"
          color="secondary"
          className="au-partner-banner__text">
          {text}
        </Text>
        <button
          type="button"
          className="au-partner-banner__button"
          onClick={onButtonClick}>
          <Text as="span" variant="body-small" weight="semibold">
            {btnText}
          </Text>
        </button>
      </div>
    </aside>
  )
}

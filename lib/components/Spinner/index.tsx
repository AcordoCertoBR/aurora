import { useId } from 'react'
import classNames from 'classnames'
import { COLOR_BRAND_BLUE_40, COLOR_NEUTRAL_00 } from '@core/tokens'
import './styles.scss'

const SIZE_MAP = {
  small: 16,
  medium: 20,
  large: 32,
}

export type SpinnerProps = {
  /**
   * Token size (Figma: Spinner, ↕ Size). small = 16px, medium = 20px, large = 32px.
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large'
  /** White spinner for colored backgrounds (Figma: Negative). */
  negative?: boolean
  'data-testid'?: string
}

export const Spinner = ({
  size = 'medium',
  negative = false,
  'data-testid': dataTestId,
}: SpinnerProps) => {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const gradientId = `au-spinner-gradient-${uid}`
  const px = SIZE_MAP[size]
  const color = negative ? COLOR_NEUTRAL_00 : COLOR_BRAND_BLUE_40

  const classes = classNames('au-spinner', {
    [`au-spinner--size-${size}`]: !!size,
    'au-spinner--negative': negative,
  })

  return (
    <div
      className={classes}
      style={{ width: px, height: px }}
      role="status"
      aria-live="polite"
      aria-label="Carregando"
      data-testid={dataTestId}>
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        width={px}
        height={px}
        color={color}>
        <defs>
          <linearGradient
            id={gradientId}
            gradientUnits="objectBoundingBox"
            x1="10%"
            y1="0%"
            x2="90%"
            y2="10%">
            <stop offset="0" stopColor={color} stopOpacity="1" />
            <stop offset="1" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <g strokeWidth="7" strokeLinecap="round" fill="none">
          <path stroke={color} d="M60,32 A28,28 0 1 1 4,32" />

          <path d="M60,32 A28,28.5 0 1 0 4,32" stroke={`url(#${gradientId})`} />
        </g>
      </svg>
    </div>
  )
}

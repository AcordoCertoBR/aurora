import { COLOR_BRAND_BLUE_40 } from '@core/tokens'
import './styles.scss'

type SpinnerProps = {
  size: number
  color: string
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 32,
  color = COLOR_BRAND_BLUE_40,
}) => {
  return (
    <div className="spinner">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        width={size}
        height={size}
        color={color}>
        <defs>
          <linearGradient
            id={`ac-loading-${color}`}
            gradientUnits="objectBoundingBox"
            x1="9%"
            y1="0%"
            x2="100%"
            y2="10%">
            <stop offset="0" stop-color={color} stop-opacity="1" />
            <stop offset="1" stop-color={color} stop-opacity="0" />
          </linearGradient>
        </defs>
        <g stroke-width="7" stroke-linecap="round" fill="none">
          <path stroke={color} d="M4,32 c0,15,12,28,28,28c8,0,16-4,21-9" />
          <path
            d="M60,32 C60,16,47.111,4,32,4S4,16,4,32"
            stroke={`url(#ac-loading-${color})`}
          />
        </g>
      </svg>
    </div>
  )
}

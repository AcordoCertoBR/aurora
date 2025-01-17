import './styles.scss'

type SpinnerProps = {
  size: number
  color: string
}

export const Spinner: React.FC<SpinnerProps> = ({ size, color }) => {
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
            x1="10%"
            y1="0%"
            x2="90%"
            y2="10%">
            <stop offset="0" stop-color={color} stop-opacity="1" />
            <stop offset="1" stop-color={color} stop-opacity="0" />
          </linearGradient>
        </defs>
        <g stroke-width="7" stroke-linecap="round" fill="none">
          <path stroke={color} d="M60,32 A28,28 0 1 1 4,32" />

          <path
            d="M60,32 A28,28.5 0 1 0 4,32"
            stroke={`url(#ac-loading-${color})`}
          />
        </g>
      </svg>
    </div>
  )
}
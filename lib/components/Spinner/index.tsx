import './styles.scss'

type SpinnerProps = {
  size: number
  color: string
}

export const Spinner: React.FC<SpinnerProps> = ({ size, color }) => {
  return (
    <div className="au-spinner" style={{ width: size, height: size }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        width={size}
        height={size}
        color={color}>
        <defs>
          <linearGradient
            id={`au-loading-${color}`}
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

          <path
            d="M60,32 A28,28.5 0 1 0 4,32"
            stroke={`url(#au-loading-${color})`}
          />
        </g>
      </svg>
    </div>
  )
}

import classNames from 'classnames'
import './styles.scss'

export type IconSize = 'large' | 'small' | 'default'
export type IconColor = 'dark' | 'info' | 'default'

export type IconProps = {
  size?: IconSize
  color?: IconColor
  rawColor?: string
  className?: string
  onClick?: () => void
}
type BaseIconProps = IconProps & {
  markup?: string
  name?: string
}

const Icon: React.FC<BaseIconProps> = ({
  markup,
  name,
  size,
  color,
  rawColor,
  className,
  onClick,
}: BaseIconProps) => {
  const iconStyle: React.CSSProperties = {
    ...(rawColor && { color: rawColor }),
  }

  const componentClass = classNames('au-icon', {
    [`au-icon--${name?.toLocaleLowerCase()}`]: !!name,
    'au-icon--color-raw': !!rawColor,
    'au-icon--color-dark': color === 'dark',
    'au-icon--color-info': color === 'info',
    'au-icon--size-large': size === 'large',
    'au-icon--size-small': size === 'small',
    [`${className}`]: !!className,
  })

  return (
    <div
      style={iconStyle}
      onClick={onClick}
      className={componentClass}
      dangerouslySetInnerHTML={{
        __html: markup || '',
      }}
    />
  )
}

export default Icon

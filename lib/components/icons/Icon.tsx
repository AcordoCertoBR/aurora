import classNames from 'classnames'
import './styles.scss'

export type IconSize = 'large' | 'medium' | 'small' | 'default'
export type IconColor = 'dark' | 'info' | 'default' | 'success'

export type IconProps = {
  size?: IconSize
  color?: IconColor
  rawColor?: string
  className?: string
  onClick?: () => void
  'data-testid'?: string
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
  'data-testid': dataTestId,
}: BaseIconProps) => {
  const iconStyle: React.CSSProperties = {
    ...(rawColor && { color: rawColor }),
  }

  const componentClass = classNames('au-icon', {
    [`au-icon--${name?.toLocaleLowerCase()}`]: !!name,
    'au-icon--color-raw': !!rawColor,
    'au-icon--color-dark': color === 'dark',
    'au-icon--color-info': color === 'info',
    'au-icon--color-success': color === 'success',
    'au-icon--size-large': size === 'large',
    'au-icon--size-medium': size === 'medium',
    'au-icon--size-small': size === 'small',
    [`${className}`]: !!className,
  })

  return (
    <div
      style={iconStyle}
      onClick={onClick}
      className={componentClass}
      data-testid={dataTestId}
      dangerouslySetInnerHTML={{
        __html: markup || '',
      }}
    />
  )
}

export default Icon

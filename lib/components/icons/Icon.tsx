import classNames from 'classnames'
import './styles.scss'

export type IconSize = 'large' | 'default'
export type IconColor = 'dark' | 'info' | 'default'

type IconProps = {
  iconSize?: IconSize
  iconColor?: IconColor
  iconMarkup?: string
  iconName?: string
  rawColor?: string
}

const Icon: React.FC<IconProps> = ({
  iconMarkup,
  iconName,
  iconSize,
  iconColor,
  rawColor,
}: IconProps) => {
  const iconStyle: React.CSSProperties = {
    ...(rawColor && { color: rawColor }),
  }

  const componentClass = classNames('au-icon', {
    [`au-icon--${iconName?.toLocaleLowerCase()}`]: !!iconName,
    'au-icon--color-raw': !!rawColor,
    'au-icon--color-dark': iconColor === 'dark',
    'au-icon--color-info': iconColor === 'info',
    'au-icon--size-large': iconSize === 'large',
  })

  return (
    <div
      style={iconStyle}
      className={componentClass}
      dangerouslySetInnerHTML={{
        __html: iconMarkup || '',
      }}
    />
  )
}

export default Icon

import classNames from 'classnames'
import './styles.scss'

interface IconProps {
  iconSize?: 'large' | 'default'
  iconColor?: 'dark' | 'default'
  iconMarkup?: string
  iconName?: string
}

const Icon: React.FC<IconProps> = ({
  iconMarkup,
  iconName,
  iconSize,
  iconColor,
}: IconProps) => {
  const componentClass = classNames('au-icon', {
    [`au-icon--${iconName?.toLocaleLowerCase()}`]: !!iconName,
    'au-icon--color-dark': iconColor === 'dark',
    'au-icon--size-large': iconSize === 'large',
  })

  return (
    <div
      className={componentClass}
      dangerouslySetInnerHTML={{
        __html: iconMarkup || '',
      }}
    />
  )
}

export default Icon

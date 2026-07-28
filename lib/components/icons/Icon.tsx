import classNames from 'classnames'
import { useId, useMemo } from 'react'
import './styles.scss'

// SVG ids (gradients, clip-paths) are document-global: two icons with the same
// markup on one page would all resolve `url(#id)` against the first instance,
// inheriting its colors. Suffix every id per instance to keep icons independent.
function _namespaceSvgIds(markup: string, uid: string) {
  return markup
    .replace(
      /(\s)id=(['"])([^'"]+)\2/g,
      (_match, space, quote, id) => `${space}id=${quote}${id}_${uid}${quote}`,
    )
    .replace(/url\(#([^)]+)\)/g, (_match, id) => `url(#${id}_${uid})`)
    .replace(/href=(['"])#([^'"]+)\1/g, (_match, quote, id) => `href=${quote}#${id}_${uid}${quote}`)
}

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

  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const namespacedMarkup = useMemo(
    () => (markup ? _namespaceSvgIds(markup, uid) : ''),
    [markup, uid],
  )

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
        __html: namespacedMarkup,
      }}
    />
  )
}

export default Icon

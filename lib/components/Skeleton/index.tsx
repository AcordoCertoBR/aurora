import classNames from 'classnames'
import { CSSProperties } from 'react'
import './styles.scss'

type SkeletonProps = {
  active?: boolean
  shape?: 'default' | 'square' | 'circle'
  color?: 'primary' | 'secondary'
  block?: boolean
  width?: number
  height?: number
}

export const Skeleton = ({
  active = true,
  shape = 'default',
  color = 'primary',
  block = false,
  height,
  width,
}: SkeletonProps) => {
  const skeletonClasses = classNames('au-skeleton', {
    'au-skeleton--active': active,
    'au-skeleton--shape-square': shape === 'square',
    'au-skeleton--shape-circle': shape === 'circle',
    'au-skeleton--color-secondary': color === 'secondary',
  })

  const skeletonSize: CSSProperties = {
    height: height ? `${height}px` : '28px',
    width: width ? `${width}px` : block ? '100%' : '80px',
  }

  return <div className={skeletonClasses} style={skeletonSize}></div>
}

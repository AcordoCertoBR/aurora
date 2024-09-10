import React from 'react'

import { useLazyImage } from './hooks'

import { LazyImageProps } from './types'

export const LazyImage = ({
  className,
  lazy = true,
  src,
  alt,
  height,
  width,
  draggable = false,
  style,
  onClick,
}: LazyImageProps) => {
  const { imgRef, imageSrc } = useLazyImage({ lazy, src })

  return React.createElement('img', {
    ...(lazy && { ref: imgRef }),

    className,
    ...(lazy && { loading: 'lazy' }),
    src: imageSrc,
    alt,
    height,
    width,
    draggable,
    style,
    onClick,
  })
}

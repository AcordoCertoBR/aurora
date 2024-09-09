import React from 'react'

import { useLazyImage } from './hooks'

import { LazyImageTypes } from './types'

const LazyImage = ({
  className,
  lazy = true,
  src,
  alt,
  height,
  width,
  draggable = false,
  style,
}: LazyImageTypes) => {
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
  })
}

export default LazyImage

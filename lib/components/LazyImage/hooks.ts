import { useCallback, useEffect, useRef, useState } from 'react'
import { UseLazyImageProps } from './types'

export function useLazyImage({ lazy = true, src }: UseLazyImageProps) {
  const [imageSrc, setImageSrc] = useState<string | undefined>(
    lazy ? undefined : src,
  )
  const imgRef = useRef<any>(null)

  const observeIntersection = useCallback(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setImageSrc(src)

          if (imgRef.current) observer.unobserve(imgRef.current)
        }
      })
    })

    if (imgRef.current) observer.observe(imgRef.current)

    return () => {
      if (observer && imgRef.current) observer.disconnect()
    }
  }, [src])

  useEffect(() => {
    if (src !== imageSrc && !lazy) setImageSrc(src)

    const cleanupObserver = lazy ? observeIntersection() : () => {}

    return () => cleanupObserver()
  }, [observeIntersection, lazy])

  return {
    imgRef,
    imageSrc,
  }
}

import { CSSProperties } from 'react'

export type CardImageProps = {
  src: string
  alt?: string
  width?: number
  height?: number
}
export const CardImage = ({ src, alt, width, height }: CardImageProps) => {
  const imageSize: CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
  }

  return (
    <div>
      <img style={imageSize} src={src} alt={alt} />
    </div>
  )
}

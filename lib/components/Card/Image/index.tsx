import { CSSProperties } from 'react'

export type CardImageProps = {
  src: string
  alt?: string
  width?: number
  height?: number
  'data-testid'?: string
}
export const CardImage = ({
  src,
  alt,
  width,
  height,
  'data-testid': dataTestId,
}: CardImageProps) => {
  const imageSize: CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
  }

  return (
    <div data-testid={dataTestId}>
      <img style={imageSize} src={src} alt={alt} />
    </div>
  )
}

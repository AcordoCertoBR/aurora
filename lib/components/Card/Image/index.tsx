export type CardImageProps = {
  src: string
  alt?: string
}
export const CardImage = ({ src, alt }: CardImageProps) => {
  return (
    <div className="au-card__image">
      <img src={src} alt={alt} />
    </div>
  )
}

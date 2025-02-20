import { BREAKPOINT_LG, BREAKPOINT_MD } from "@core/tokens"

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  srcMob?: string
  srcTablet?: string
  srcDesk?: string
}

export const Image = ({ srcMob, srcTablet, srcDesk, ...props }: ImageProps) => {
  return (
    <picture>
      <source media={`(max-width: ${BREAKPOINT_MD})`} srcSet={srcMob} />
      <source media={`(max-width: ${BREAKPOINT_LG})`} srcSet={srcTablet} />
      <img src={srcDesk} {...props} />
    </picture>
  )
}

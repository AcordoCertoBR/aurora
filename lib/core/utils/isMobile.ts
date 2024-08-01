import { isClient } from './isClient'

export function isMobile() {
  if (!isClient()) return
  return !!window.matchMedia('screen and (max-width:767px)').matches
}

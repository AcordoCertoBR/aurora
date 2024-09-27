import { isClient } from './isClient'


//TODO - match with CSS breakpoints
export function isMobile() {
  if (!isClient()) return
  return !!window.matchMedia('screen and (max-width:767px)').matches
}

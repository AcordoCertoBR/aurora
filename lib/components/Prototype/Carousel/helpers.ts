//TODO remove

const isClient = () =>
  !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  )

export function isMobile() {
  if (!isClient()) return
  return !!window.matchMedia('screen and (max-width:767px)').matches
}

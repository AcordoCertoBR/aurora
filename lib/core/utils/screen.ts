export function above(breakpoint: string) {
  return !!window.matchMedia(`screen and (min-width: ${breakpoint})`).matches
}

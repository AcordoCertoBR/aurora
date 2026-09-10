import {
  getEmitFunction,
  getOnFunction,
  getQueryAllFunction,
  getQueryFunction,
} from './factories'
import type { BuilderFunction, ElementControllerOptions } from './types'

const RAN_FLAG = 'auControllerRan'

/**
 * Runs `builderFunction` once for every element marked with
 * `data-element="<fragmentName>"`, with every DOM helper scoped to it.
 */
export function elementController(
  fragmentName: string,
  builderFunction: BuilderFunction,
  options: ElementControllerOptions = {},
) {
  if (!fragmentName || typeof fragmentName !== 'string') {
    throw new TypeError('fragment name is required')
  }

  if (typeof document === 'undefined') return

  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(`[data-element="${fragmentName}"]`),
  )

  const run = (element: HTMLElement) => {
    if (element.dataset[RAN_FLAG]) return
    element.dataset[RAN_FLAG] = 'true'

    builderFunction({
      root: element,
      on: getOnFunction(element),
      query: getQueryFunction(element),
      queryAll: getQueryAllFunction(element),
      emit: getEmitFunction(element),
    })
  }

  const canLazy = options.lazy && typeof IntersectionObserver !== 'undefined'

  if (!canLazy) {
    elements.forEach(run)
    return
  }

  const rootMargin = options.rootMargin ?? '400px'

  elements.forEach((element) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          observer.unobserve(entry.target)
          run(entry.target as HTMLElement)
        })
      },
      { rootMargin },
    )

    observer.observe(element)
  })
}

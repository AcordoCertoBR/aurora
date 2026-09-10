export type ScopedUnsubscribe = () => void

/**
 * Scoped `addEventListener`. Overloaded so the handler receives the concrete
 * event type: `on('click', …)` gets a `MouseEvent`, `on('keydown', …)` a
 * `KeyboardEvent`. The `global:` prefix binds to `window` instead of the root.
 */
export interface ScopedOn {
  <K extends keyof HTMLElementEventMap>(
    eventName: K,
    handler: (event: HTMLElementEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions,
  ): ScopedUnsubscribe
  <K extends keyof WindowEventMap>(
    eventName: `global:${K}`,
    handler: (event: WindowEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions,
  ): ScopedUnsubscribe
  (
    eventName: string,
    handler: (event: Event) => void,
    options?: boolean | AddEventListenerOptions,
  ): ScopedUnsubscribe
}

export type ScopedQuery = <T extends Element = HTMLElement>(
  selector: string,
) => T | null

export type ScopedQueryAll = <T extends Element = HTMLElement>(
  selector: string,
) => T[]

export type ScopedEmit = <T = unknown>(eventName: string, detail?: T) => void

export type ControllerContext = {
  root: HTMLElement
  on: ScopedOn
  query: ScopedQuery
  queryAll: ScopedQueryAll
  emit: ScopedEmit
}

export type BuilderFunction = (context: ControllerContext) => void

export type ElementControllerOptions = {
  /** Defers the builder until the element enters the viewport. */
  lazy?: boolean
  /** `rootMargin` used by the lazy IntersectionObserver. Defaults to `400px`. */
  rootMargin?: string
}

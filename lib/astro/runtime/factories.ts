import type {
  ScopedEmit,
  ScopedOn,
  ScopedQuery,
  ScopedQueryAll,
} from './types'

const GLOBAL_PREFIX = 'global:'

export function getOnFunction(element: HTMLElement): ScopedOn {
  return (eventName, handler, options) => {
    const isGlobal = eventName.startsWith(GLOBAL_PREFIX)
    const target: EventTarget = isGlobal ? window : element
    const name = isGlobal ? eventName.slice(GLOBAL_PREFIX.length) : eventName

    target.addEventListener(name, handler, options)
    return () => target.removeEventListener(name, handler, options)
  }
}

export function getQueryFunction(element: HTMLElement): ScopedQuery {
  return <T extends Element = HTMLElement>(selector: string) =>
    element.querySelector<T>(selector as string) as T | null
}

export function getQueryAllFunction(element: HTMLElement): ScopedQueryAll {
  return <T extends Element = HTMLElement>(selector: string) =>
    Array.from(element.querySelectorAll<T>(selector as string)) as T[]
}

export function getEmitFunction(element: HTMLElement): ScopedEmit {
  return (eventName, detail) => {
    element.dispatchEvent(
      new CustomEvent(eventName, { detail, bubbles: true, composed: true }),
    )
  }
}

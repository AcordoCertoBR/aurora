import { useRef, useState } from 'react'
import { above } from '../../../../core/utils/screen'
import { BREAKPOINT_MD } from '../../../../main'

export function useSegment() {
  const [isListOpen, setIsListOpen] = useState(false)
  const rootEl = useRef<HTMLDivElement>(null)

  function openList() {
    setIsListOpen(true)
    if (above(BREAKPOINT_MD)) {
      document.addEventListener('mousedown', handleLoseFocus)
      document.addEventListener('focusout', handleLoseFocus)
    }
  }

  function closeList() {
    setIsListOpen(false)
    if (above(BREAKPOINT_MD)) {
      document.removeEventListener('mousedown', handleLoseFocus)
      document.removeEventListener('focusout', handleLoseFocus)
    }
  }

  function handleLoseFocus(ev: MouseEvent | FocusEvent) {
    if (!rootEl.current) return

    const clickedOutside =
      !rootEl.current.contains(ev?.relatedTarget as Node) ||
      !rootEl.current.contains(ev.target as Node)

    if (clickedOutside) {
      console.log('clicked')
      closeList()
    }
  }

  return {
    openList,
    closeList,
    isListOpen,
    rootEl
  }
}

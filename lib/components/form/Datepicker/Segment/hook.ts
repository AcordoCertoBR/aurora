import { useRef, useState } from 'react'

import { BREAKPOINT_MD } from '../../../../main'
import { useOutsideClick } from '../../../../core/hooks/useOutsideClick'

export function useSegment() {
  const [isListOpen, setIsListOpen] = useState(false)
  const rootEl = useRef<HTMLDivElement>(null)
  const { listenOutsideClick } = useOutsideClick({
    rootEl,
    breakpoint: BREAKPOINT_MD,
    onLoseFocusCB: closeList,
  })

  function openList() {
    setIsListOpen(true)
    listenOutsideClick()
  }

  function closeList() {
    setIsListOpen(false)
  }

  return {
    openList,
    closeList,
    isListOpen,
    rootEl,
  }
}

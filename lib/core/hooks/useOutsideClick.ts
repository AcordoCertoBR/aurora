import { useState } from 'react'
import { above } from '../utils/screen'

type UseOutsideClickProps = {
  rootEl: React.RefObject<HTMLDivElement>
  breakpoint?: string
  onLoseFocusCB: () => void
}

export function useOutsideClick({
  rootEl,
  breakpoint,
  onLoseFocusCB,
}: UseOutsideClickProps) {
  const [setupListener, setSetupListener] = useState(false)

  function listenOutsideClick() {
    if (breakpoint && !above(breakpoint)) return
    document.addEventListener('mousedown', handleLoseFocus)
    setSetupListener(true)
  }

  function clearOutsideClickListenner() {
    if (setupListener) {
      document.removeEventListener('mousedown', handleLoseFocus)
      setSetupListener(false)
    }
  }

  function handleLoseFocus(ev: MouseEvent | FocusEvent) {
    if (!rootEl.current) return

    const clickedOutside = !rootEl.current.contains(ev.target as Node)

    if (clickedOutside) {
      onLoseFocusCB()
      clearOutsideClickListenner()
    }
  }

  return {
    listenOutsideClick,
  }
}

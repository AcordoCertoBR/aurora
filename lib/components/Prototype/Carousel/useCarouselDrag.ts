import { isMobile } from './helpers'
import { useState } from 'react'

type UseCarouselDragArgs = {
  goPrevious: () => void
  goNext: () => void
}

export function useCarouselDrag({ goPrevious, goNext }: UseCarouselDragArgs) {
  const [isPressing, setIsPressing] = useState(false)
  const [dragStartPosition, setDragStartPosition] = useState(0)

  function handleStartDrag(e: React.MouseEvent<HTMLUListElement, MouseEvent>) {
    if (isMobile()) return
    setIsPressing(true)
    document.addEventListener('mouseup', handleRelease)
    setDragStartPosition(e.clientX)
  }

  function handleRelease() {
    document.removeEventListener('mouseup', handleRelease)
    setIsPressing(false)
    setDragStartPosition(0)
  }

  function handleMouseMove(e: React.MouseEvent<HTMLUListElement, MouseEvent>) {
    if (isMobile() || (!isMobile() && !isPressing)) return

    const currentX = e.clientX
    if (currentX > dragStartPosition) {
      goPrevious()
    } else if (currentX < dragStartPosition) {
      goNext()
    }
  }

  return {
    handleMouseMove,
    handleStartDrag,
  }
}

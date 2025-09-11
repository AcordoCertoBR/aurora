import { useEffect, useRef, useState } from 'react'
import { SnapCarouselResult, useSnapCarousel } from 'react-snap-carousel'
import { useCarouselDrag } from './useCarouselDrag'

type UseCarouselArgs = {
  items: unknown[]
}

export default function useCarousel({ items }: UseCarouselArgs) {
  const {
    scrollRef,
    pages,
    activePageIndex,
    hasPrevPage,
    hasNextPage,
    prev,
    next,
    snapPointIndexes,
    refresh,
  }: SnapCarouselResult = useSnapCarousel({ axis: 'x' })
  const showControls = snapPointIndexes.size > 1
  const [numberOfItems, setNumberOfItems] = useState(items.length)
  const [nextPage, setNextPage] = useState(0)
  const railRef = useRef<HTMLElement | null>(null)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const { handleMouseMove, handleStartDrag } = useCarouselDrag({
    goNext,
    goPrevious,
  })

  useEffect(() => {
    if (items.length !== numberOfItems) {
      refresh()
      setNumberOfItems(items.length)
    }
  }, [items])

  function setRef(el: HTMLElement | null) {
    scrollRef(el)
    railRef.current = el
  }

  function goNext() {
    const nextIndex = activePageIndex + 1
    setNextPage(nextIndex)
    next()
  }

  function goPrevious() {
    setNextPage(activePageIndex === 0 ? activePageIndex : activePageIndex - 1)
    prev()
  }

  return {
    rootRef,
    setRef,
    nextPage,
    pages,
    railRef,
    hasPrevPage,
    hasNextPage,
    goPrevious,
    next,
    goNext,
    snapPointIndexes,
    activePageIndex,
    handleMouseMove,
    handleStartDrag,
    showControls,
  }
}

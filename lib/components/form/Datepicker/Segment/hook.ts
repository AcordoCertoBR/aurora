import { useEffect, useRef, useState } from 'react'
import { BREAKPOINT_MD } from '@core/tokens'
import { useOutsideClick } from '@core/hooks/useOutsideClick'

import { SegmentItem } from '../types'

type UseSegmentProps = {
  options: SegmentItem[]
  currentValue: string | number
  onSelect: (option: SegmentItem) => void
}

export function useSegment({
  options,
  currentValue,
  onSelect,
}: UseSegmentProps) {
  const [isListOpen, setIsListOpen] = useState(false)
  const rootEl = useRef<HTMLDivElement>(null)
  const selectedItem = useRef<HTMLLIElement>(null)
  const currentItem = options.find((item) => item.value === currentValue)
  const { listenOutsideClick } = useOutsideClick({
    rootEl,
    breakpoint: BREAKPOINT_MD,
    onLoseFocusCB: closeList,
  })

  useEffect(() => {
    if (selectedItem.current && isListOpen) {
      selectedItem.current.scrollIntoView({ block: 'center', inline: 'center' })
    }
  }, [isListOpen])

  function openList() {
    setIsListOpen(true)
    listenOutsideClick()
  }

  function closeList() {
    setIsListOpen(false)
  }

  function handleSelectItem(option: SegmentItem) {
    onSelect(option)
    setIsListOpen(false)
  }

  return {
    openList,
    closeList,
    isListOpen,
    rootEl,
    currentItem,
    handleSelectItem,
    selectedItem,
  }
}

import { useState, useEffect, useRef } from 'react'

type UseFieldTextAreaProps = {
  rows?: number
  cols?: number
  horizontalResize?: boolean
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const useFieldTextArea = ({
  rows = 3,
  cols,
  horizontalResize = false,
  onChange,
}: UseFieldTextAreaProps) => {
  const [dimensions, setDimensions] = useState({
    width: cols ? cols * 10 : '100%',
    height: rows * 26,
  })
  const [charCount, setCharCount] = useState(0)
  const isResizing = useRef(false)
  const lastMousePosition = useRef({ x: 0, y: 0 })

  useEffect(() => {
    setDimensions({
      width: cols ? cols * 10 : '100%',
      height: rows * 26,
    })
  }, [rows, cols])

  const handleMouseDown = (e: React.MouseEvent) => {
    isResizing.current = true
    lastMousePosition.current = { x: e.clientX, y: e.clientY }

    if (dimensions.width === '100%') {
      const container = e.currentTarget.closest(
        '.au-field__textarea-container',
      ) as HTMLElement
      setDimensions((prev) => ({
        ...prev,
        width: container ? container.offsetWidth : 300,
      }))
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current) return
    const deltaX = e.clientX - lastMousePosition.current.x
    const deltaY = e.clientY - lastMousePosition.current.y

    setDimensions((prev) => {
      let currentWidth = typeof prev.width === 'number' ? prev.width : 100
      const target = e.currentTarget as HTMLElement | null
      if (target) {
        const container = target.closest(
          '.textarea-container',
        ) as HTMLElement | null
        currentWidth = container ? container.offsetWidth : currentWidth
      }

      return {
        width: horizontalResize
          ? Math.max(100, currentWidth + deltaX)
          : prev.width,
        height: Math.max(50, prev.height + deltaY),
      }
    })

    lastMousePosition.current = { x: e.clientX, y: e.clientY }
  }

  const handleMouseUp = () => {
    isResizing.current = false
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length)
    if (onChange) {
      onChange(e)
    }
  }

  return {
    dimensions,
    charCount,
    handleMouseDown,
    handleInputChange,
  }
}

import React, { useRef, useState, useEffect } from 'react'
import classNames from 'classnames'
import { Text } from '@components/Text'

type FieldTextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  textareaRef?: React.RefObject<HTMLTextAreaElement>
  customClass?: string
  horizontalResize?: boolean
  maxLength?: number
}

export const FieldTextArea: React.FC<FieldTextAreaProps> = ({
  textareaRef,
  customClass,
  rows = 3,
  cols,
  horizontalResize = false,
  maxLength,
  ...props
}) => {
  const [dimensions, setDimensions] = useState({
    width: cols ? cols * 10 : '100%',
    height: rows * 26,
  })
  const [charCount, setCharCount] = useState(0)
  const isResizing = useRef(false)
  const lastMousePosition = useRef({ x: 0, y: 0 })
  const textareaClasses = classNames('au-field__textarea', customClass)

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
    if (props.onChange) {
      props.onChange(e)
    }
  }

  return (
    <div
      className="au-field__textarea-container"
      style={{
        width:
          typeof dimensions.width === 'number'
            ? `${dimensions.width}px`
            : dimensions.width,
        height: `${dimensions.height}px`,
      }}>
      <textarea
        ref={textareaRef}
        className={textareaClasses}
        style={{ width: '100%', height: '100%', resize: 'none' }}
        onChange={handleInputChange}
        maxLength={maxLength}
        {...props}
      />
      {maxLength && (
        <Text variant="caption" className="au-field__char-counter">
          {charCount}/{maxLength}
        </Text>
      )}

      <div className="custom-resize" onMouseDown={handleMouseDown}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="9"
          height="9"
          viewBox="0 0 9 9"
          fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.146447 8.14645C-0.0488155 8.34171 -0.0488155 8.65829 0.146447 8.85355C0.341709 9.04882 0.658291 9.04882 0.853553 8.85355L8.85355 0.853553C9.04882 0.658291 9.04882 0.341708 8.85355 0.146446C8.65829 -0.0488159 8.34171 -0.0488157 8.14645 0.146446L0.146447 8.14645ZM4.14645 8.14645C3.95118 8.34171 3.95118 8.65829 4.14645 8.85355C4.34171 9.04882 4.65829 9.04882 4.85355 8.85355L8.85355 4.85355C9.04882 4.65829 9.04882 4.34171 8.85355 4.14645C8.65829 3.95118 8.34171 3.95118 8.14645 4.14645L4.14645 8.14645Z"
            fill="#454A54"
          />
        </svg>
      </div>
    </div>
  )
}

import React from 'react'
import classNames from 'classnames'
import { Text } from '@components/Text'
import { useFieldTextArea } from './hook'

type FieldTextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  textareaRef?: React.RefObject<HTMLTextAreaElement>
  customClass?: string
  horizontalResize?: boolean
  maxLength?: number
}

export const FieldTextArea = ({
  textareaRef,
  customClass,
  horizontalResize,
  maxLength,
  ...props
}: FieldTextAreaProps) => {
  const { onChange, ...rest } = props as FieldTextAreaProps
  const forwardedOnChange = onChange
    ? (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e)
    : undefined

  const { charCount, handleInputChange } = useFieldTextArea({
    onChange: forwardedOnChange,
  })
  const textareaClasses = classNames('au-field__textarea', customClass, {
    'au-field__textarea--horizontal-resize': horizontalResize,
  })

  return (
    <div className="au-field__textarea-container">
      <textarea
        ref={textareaRef}
        className={textareaClasses}
        maxLength={maxLength}
        {...rest}
        onChange={handleInputChange}
      />
      {maxLength && (
        <Text
          variant="caption"
          className="au-field__char-counter"
          aria-live="polite">
          {charCount}/{maxLength}
        </Text>
      )}
    </div>
  )
}

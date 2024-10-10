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

export const FieldTextArea: React.FC<FieldTextAreaProps> = ({
  textareaRef,
  customClass,
  horizontalResize,
  maxLength,
  ...props
}) => {
  const { charCount } = useFieldTextArea({ onChange: props.onChange })
  const textareaClasses = classNames('au-field__textarea', customClass, {
    'au-field__textarea--horizontal-resize': horizontalResize, // classe para redimensionamento
  })

  return (
    <div className="au-field__textarea-container">
      <textarea
        ref={textareaRef}
        className={textareaClasses}
        maxLength={maxLength}
        {...props}
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

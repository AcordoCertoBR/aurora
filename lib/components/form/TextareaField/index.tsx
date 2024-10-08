import { useState } from 'react'
import { Text } from '@components/Text'
import Field from '../Field'

export type TextAreaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    optional?: boolean
    success?: boolean
    error?: boolean
    errorMessage?: string
    label?: string
    textAreaStyle?: React.CSSProperties
    textareaRef?: React.RefObject<HTMLTextAreaElement>
  }

export const TextAreaField = ({
  optional,
  required,
  success,
  error,
  errorMessage,
  label,
  id,
  disabled,
  style,
  className,
  textAreaStyle,
  textareaRef,
  maxLength,
  ...props
}: TextAreaProps) => {
  const [charCount, setCharCount] = useState(0)

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length)
  }

  return (
    <Field.Root
      style={style}
      customclass={className}
      success={success}
      error={error}
      disabled={disabled}>
      <Field.Label
        text={label}
        id={id}
        required={required}
        optional={optional}
        success={success}
        error={error}
        disabled={disabled}
      />
      <Field.TextArea
        id={id}
        textareaRef={textareaRef}
        disabled={disabled}
        style={textAreaStyle}
        maxLength={maxLength}
        onChange={handleInputChange}
        {...props}
      />
      {maxLength && (
        <Text className="au-field__char-counter">
          {charCount}/{maxLength}
        </Text>
      )}
      <Field.ErrorMessage hasError={!!error} message={errorMessage} />
    </Field.Root>
  )
}

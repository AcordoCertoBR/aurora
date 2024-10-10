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
    horizontalResize?: boolean
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
  horizontalResize,
  ...props
}: TextAreaProps) => {
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
        horizontalResize={horizontalResize}
        {...props}
      />
      <Field.ErrorMessage hasError={!!error} message={errorMessage} />
    </Field.Root>
  )
}

import Field from '../Field'

export type TextAreaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    showOptionalLabel?: boolean
    success?: boolean
    error?: boolean
    errorMessage?: string
    helpMessage?: string
    label?: string
    textAreaStyle?: React.CSSProperties
    textareaRef?: React.RefObject<HTMLTextAreaElement>
    horizontalResize?: boolean
  }

export const TextAreaField = ({
  showOptionalLabel,
  required,
  success,
  error,
  errorMessage,
  helpMessage,
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
        showOptionalLabel={showOptionalLabel}
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
      <Field.Message hasError={!!error} errorMessage={errorMessage} helpMessage={helpMessage} />
    </Field.Root>
  )
}

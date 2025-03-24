import Field from '../Field'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  showOptionalLabel?: boolean
  requiredInput?: boolean
  success?: boolean
  error?: boolean
  errorMessage?: string
  helpMessage?: string
  rightSlot?: React.ReactNode
  label?: string
  inputStyle?: React.CSSProperties
  inputRef?: React.RefObject<HTMLInputElement>
  numericKeypad?: boolean
}

export const InputField = ({
  showOptionalLabel,
  requiredInput,
  success,
  error,
  errorMessage,
  helpMessage,
  label,
  id,
  disabled,
  style,
  className,
  inputStyle,
  rightSlot,
  inputRef,
  numericKeypad,
  ...props
}: InputProps) => {

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
        showOptionalLabel={showOptionalLabel}
        required={requiredInput}
        success={success}
        error={error}
        disabled={disabled}
      />
      <Field.InputHolder rightSideSlot={rightSlot}>
        <Field.Input
          id={id}
          inputRef={inputRef}
          inputMode={numericKeypad ? "numeric" : undefined}
          disabled={disabled}
          style={inputStyle}
          {...props}
        />
      </Field.InputHolder>
      <Field.Message hasError={!!error} errorMessage={errorMessage} helpMessage={helpMessage} />
    </Field.Root>
  )
}

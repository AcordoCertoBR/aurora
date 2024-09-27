import Field from '../Field'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  optional?: boolean
  requiredInput?: boolean
  success?: boolean
  error?: boolean
  errorMessage?: string
  rightSlot?: React.ReactNode
  label?: string
  inputStyle?: React.CSSProperties
  inputRef?: React.RefObject<HTMLInputElement>
}

export const InputField = ({
  optional,
  requiredInput,
  success,
  error,
  errorMessage,
  label,
  id,
  disabled,
  style,
  className,
  inputStyle,
  rightSlot,
  inputRef,
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
        required={requiredInput}
        optional={optional}
        success={success}
        error={error}
        disabled={disabled}
      />
      <Field.InputHolder rightSideSlot={rightSlot}>
        <Field.Input
          id={id}
          inputRef={inputRef}
          disabled={disabled}
          style={inputStyle}
          {...props}
        />
      </Field.InputHolder>
      <Field.ErrorMessage hasError={!!error} message={errorMessage} />
    </Field.Root>
  )
}

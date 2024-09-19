import Field from '../Field'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  optional?: boolean
  requiredInput?: boolean
  success?: boolean
  error?: boolean
  errorMessage?: string
  label?: string
  ref?: React.RefObject<HTMLInputElement>
  inputStyle?: React.CSSProperties
}

export const InputField = ({
  optional,
  requiredInput,
  success,
  error,
  errorMessage,
  label,
  ref,
  id,
  disabled,
  style,
  className,
  inputStyle,
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
      <Field.Input
        id={id}
        ref={ref}
        disabled={disabled}
        style={inputStyle}
        {...props}
      />
      <Field.ErrorMessage hasError={!!error} message={errorMessage} />
    </Field.Root>
  )
}

import Field from '../Field'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  optional?: boolean
  requiredInput?: boolean
  success?: boolean
  error?: boolean
  errorMessage?: string
  label?: string
  ref?: React.RefObject<HTMLInputElement>
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
      <Field.Input id={id} ref={ref} disabled={disabled} {...props} />
      <Field.ErrorMessage hasError={!!error} message={errorMessage} />
    </Field.Root>
  )
}

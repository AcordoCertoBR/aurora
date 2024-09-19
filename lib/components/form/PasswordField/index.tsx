import Field from '../Field'
import { usePasswordField } from './hook'
import './styles.scss'

type PasswordFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  type?: 'password'
  optional?: boolean
  requiredInput?: boolean
  success?: boolean
  error?: boolean
  errorMessage?: string
  label?: string
  ref?: React.RefObject<HTMLInputElement>
}

export const PasswordField = ({
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
}: PasswordFieldProps) => {
  const { fieldType, textButton, changeVisibility } = usePasswordField()

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
      <div className="au-password-field__container">
        <Field.Input
          customclass="au-password-field__input"
          type={fieldType}
          id={id}
          ref={ref}
          disabled={disabled}
          {...props}
        />
        <button
          className="au-password-field__btn"
          onClick={changeVisibility}
          disabled={disabled}>
          {textButton}
        </button>
      </div>
      <Field.ErrorMessage hasError={!!error} message={errorMessage} />
    </Field.Root>
  )
}

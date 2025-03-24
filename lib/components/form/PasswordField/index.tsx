import Field from '../Field'
import { usePasswordField } from './hook'
import './styles.scss'

type PasswordFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  type?: 'password'
  showOptionalLabel?: boolean
  requiredInput?: boolean
  success?: boolean
  error?: boolean
  errorMessage?: string
  label?: string
  inputRef?: React.RefObject<HTMLInputElement>
  numericKeypad?: boolean
}

export const PasswordField = ({
  showOptionalLabel,
  requiredInput,
  success,
  error,
  errorMessage,
  label,
  inputRef,
  id,
  disabled,
  style,
  className,
  numericKeypad,
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
        showOptionalLabel={showOptionalLabel}
        success={success}
        error={error}
        disabled={disabled}
      />
      <div className="au-password-field__container">
        <Field.Input
          customclass="au-password-field__input"
          type={fieldType}
          id={id}
          inputRef={inputRef}
          inputMode={numericKeypad ? "numeric" : undefined}
          disabled={disabled}
          {...props}
        />
        <button
          className="au-password-field__btn"
          onClick={changeVisibility}
          disabled={disabled}
					type="button">
          {textButton}
        </button>
      </div>
      <Field.ErrorMessage hasError={!!error} message={errorMessage} />
    </Field.Root>
  )
}

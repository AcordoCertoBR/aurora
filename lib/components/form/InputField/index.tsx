import { useId } from 'react'
import Field from '../Field'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  showOptionalLabel?: boolean
  requiredInput?: boolean
  success?: boolean
  error?: boolean
  errorMessage?: string
  helpMessage?: string
  rightSlot?: React.ReactNode
  label?: string | React.ReactNode
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
  const generatedErrorId = useId()
  const generatedHelpId = useId()
  const errorId = error && errorMessage ? generatedErrorId : undefined
  const helpId = helpMessage ? generatedHelpId : undefined
  const describedBy = [errorId, helpId].filter(Boolean).join(' ') || undefined

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
          aria-invalid={!!error}
          aria-describedby={describedBy}
          {...props}
        />
      </Field.InputHolder>
      <Field.Message hasError={!!error} errorMessage={errorMessage} helpMessage={helpMessage} errorId={errorId} helpId={helpId} />
    </Field.Root>
  )
}

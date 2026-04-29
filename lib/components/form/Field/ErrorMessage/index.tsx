type ErrorMessageProps = {
  hasError?: boolean
  message?: string
  id?: string
}

export const FieldErrorMessage = ({ hasError, message, id }: ErrorMessageProps) => {
  if (!hasError || !message) return null

  return (
    <p id={id} className="au-field__message au-field__message--error" role="alert">
      {message}
    </p>
  )
}

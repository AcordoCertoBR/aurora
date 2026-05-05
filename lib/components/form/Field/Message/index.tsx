type FieldMessageProps = {
  hasError?: boolean
  errorMessage?: string
  helpMessage?: string
  errorId?: string
  helpId?: string
}

export const FieldMessage = ({ hasError, errorMessage, helpMessage, errorId, helpId }: FieldMessageProps) => {
  if (hasError && errorMessage) {
    return (
      <p id={errorId} className="au-field__message au-field__message--error" role="alert">
        {errorMessage}
      </p>
    )
  }

  if (helpMessage) {
    return <p id={helpId} className="au-field__message">{helpMessage}</p>
  }

  return null
}

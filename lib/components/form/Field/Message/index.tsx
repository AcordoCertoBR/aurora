type FieldMessageProps = {
  hasError?: boolean
  errorMessage?: string
  helpMessage?: string
}

export const FieldMessage = ({ hasError, errorMessage, helpMessage }: FieldMessageProps) => {
  if (hasError && errorMessage) {
    return <p className="au-field__message au-field__message--error">{errorMessage}</p>
  }

  if (helpMessage) {
    return <p className="au-field__message">{helpMessage}</p>
  }

  return null
}

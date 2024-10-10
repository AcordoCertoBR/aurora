import classNames from 'classnames'

type FieldInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  inputRef?: React.RefObject<HTMLInputElement>
  customclass?: string
}

export const FieldInput = ({
  inputRef,
  customclass,
  ...props
}: FieldInputProps) => {
  const inputClasses = classNames('au-field__input', customclass)

  return <input className={inputClasses} ref={inputRef} {...props} />
}

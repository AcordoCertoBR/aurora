import classNames from "classnames"

type FieldInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  inputRef?: React.RefObject<HTMLInputElement>
  customclass?: string
}

export const FieldInput = (props: FieldInputProps) => {
  const { inputRef, customclass } = props

  const inputClasses = classNames("au-field__input", customclass)

  return <input className={inputClasses} ref={inputRef} {...props} />
}

import classNames from "classnames"

type FieldInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  ref?: React.RefObject<HTMLInputElement>
  customclass?: string
}

export const FieldInput = (props: FieldInputProps) => {
  const { ref, customclass } = props

  const inputClasses = classNames("au-field__input", customclass)

  return <input className={inputClasses} ref={ref} {...props} />
}

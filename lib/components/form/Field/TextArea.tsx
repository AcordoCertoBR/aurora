import classNames from 'classnames'

type FieldTextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  textareaRef?: React.RefObject<HTMLTextAreaElement>
  customclass?: string
}

export const FieldTextArea = ({
  textareaRef,
  customclass,
  ...props
}: FieldTextAreaProps) => {
  const textareaClasses = classNames('au-field__textarea', customclass)

  return <textarea className={textareaClasses} ref={textareaRef} {...props} />
}

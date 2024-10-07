import classNames from 'classnames'
import './styles.scss'

type RadioFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  direction?: 'left' | 'right'
  label?: string
  error?: boolean
  type?: 'radio'
}

export const RadioField = ({
  type = 'radio',
  direction = 'left',
  label,
  error,
  id,
  disabled,
  ...props
}: RadioFieldProps) => {
  const radioClasses = classNames('au-radio-field', {
    'au-radio-field--left-direction': direction === 'left',
    'au-radio-field--right-direction': direction === 'right',
    'au-radio-field--disabled': !!disabled,
    'au-radio-field--error': !!error,
  })
  return (
    <div className={radioClasses}>
      <input className="au-radio-field__input" type={type} id={id} disabled={disabled} {...props} />
      <label className="au-radio-field__label" htmlFor={id}>
        {label}
      </label>
    </div>
  )
}

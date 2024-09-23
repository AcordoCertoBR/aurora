import classNames from 'classnames'
import Field from '../Field'

import './styles.scss'

type CheckboxFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error: boolean
  errorMessage: string
}

export const CheckboxField = ({
  label,
  error,
  errorMessage,
  disabled,
}: CheckboxFieldProps) => {
  const checkboxClasses = classNames('au-checkbox', {
    'au-checkbox--error': !!error,
    'au-checkbox--disabled': !!disabled,
  })
  
  return (
    <div className={checkboxClasses}>
      <div>
        <input type="checkbox" />
        <label>{label}</label>
      </div>
      <Field.ErrorMessage hasError={!!error} message={errorMessage} />
    </div>
  )
}

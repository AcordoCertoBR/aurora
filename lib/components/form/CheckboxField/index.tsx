import classNames from 'classnames'
import Field from '../Field'

import './styles.scss'
import { IconCheck } from '../../icons'

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
  id,
  ...props
}: CheckboxFieldProps) => {
  const checkboxClasses = classNames('au-checkbox', {
    'au-checkbox--error': !!error,
    'au-checkbox--disabled': !!disabled,
  })

  return (
    <div className={checkboxClasses}>
      <label htmlFor={id} className="au-checkbox__holder">
        <input
          className="au-checkbox__input"
          type="checkbox"
          id={id}
          {...props}
        />
        <span className="au-checkbox__check">
          <IconCheck rawColor="#fff" />
        </span>
        <span className="au-checkbox__label">
          {label}
        </span>
      </label>
      <Field.ErrorMessage hasError={!!error} message={errorMessage} />
    </div>
  )
}

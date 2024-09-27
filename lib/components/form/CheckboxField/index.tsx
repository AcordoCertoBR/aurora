import classNames from 'classnames'
import Field from '../Field'
import { IconCheck } from '../../icons'
import { COLOR_NEUTRAL_00 } from '../../../main'

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
  id,
  style,
  ...props
}: CheckboxFieldProps) => {
  const checkboxClasses = classNames('au-checkbox', {
    'au-checkbox--error': !!error,
    'au-checkbox--disabled': !!disabled,
  })

  return (
    <div className={checkboxClasses} style={style}>
      <label htmlFor={id} className="au-checkbox__holder">
        <input
          className="au-checkbox__input"
          type="checkbox"
          id={id}
          disabled={disabled}
          {...props}
        />
        <span className="au-checkbox__check">
          <IconCheck rawColor={COLOR_NEUTRAL_00} />
        </span>
        <span className="au-checkbox__label">
          {label}
        </span>
      </label>
      <Field.ErrorMessage hasError={!!error} message={errorMessage} />
    </div>
  )
}

import classNames from 'classnames'
import { COLOR_ERROR_50, COLOR_NEUTRAL_40, COLOR_SUCCESS_50 } from '../../main'
import { IconAlertCircle, IconCheck, IconSlash } from '../icons'
import { Conditional } from '../misc'

import './styles.scss'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  optional?: boolean
  requiredInput?: boolean
  success?: boolean
  error?: boolean
  errorMessage?: string
  label?: string
  ref?: React.MutableRefObject<HTMLInputElement>
}

export const InputField = ({
  optional,
  requiredInput,
  success,
  error,
  errorMessage,
  label,
  ref,
  id,
  disabled,
  style,
  ...props
}: InputProps) => {
  const inputClasses = classNames('au-input', {
    'au-input--disabled': disabled,
    'au-input--error': error,
    'au-input--success': success,
  })

  const statesFlag = [
    { state: 'optional', value: !!optional, icon: <span>(Opcional)</span> },
    {
      state: 'success',
      value: !!success,
      icon: <IconCheck rawColor={COLOR_SUCCESS_50} />,
    },
    {
      state: 'error',
      value: !!error,
      icon: <IconAlertCircle rawColor={COLOR_ERROR_50} />,
    },
    {
      state: 'disabled',
      value: !!disabled,
      icon: <IconSlash rawColor={COLOR_NEUTRAL_40} />,
    },
  ]

  const currentState = statesFlag.find(({ value }) => !!value)

  return (
    <div className={inputClasses} style={style}>
      <div className="au-input__header">
        <Conditional
          condition={!!label}
          renderIf={
            <label htmlFor={id} className="au-input__header-label">
              {label}{' '}
              {requiredInput && (
                <strong className="au-input__header-label--required">*</strong>
              )}
            </label>
          }
        />
        <div className="au-input__header-icon">{currentState?.icon}</div>
      </div>
      <input
        id={id}
        className="au-input__field"
        ref={ref}
        disabled={disabled}
        {...props}
      />
      <Conditional
        condition={!!errorMessage && !!error}
        renderIf={<p className="au-input__error-message">{errorMessage}</p>}
      />
    </div>
  )
}

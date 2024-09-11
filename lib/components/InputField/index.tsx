import classNames from 'classnames'
import { COLOR_ERROR_50, COLOR_NEUTRAL_40, COLOR_SUCCESS_50 } from '../../main'
import { IconAlertCircle, IconCheck, IconSlash } from '../icons'
import { Conditional } from '../misc'

import './styles.scss'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  status?: 'default' | 'success' | 'error'
  optional?: boolean
  errorMessage?: string
  label?: string
  requiredInput?: boolean
  ref?: React.MutableRefObject<HTMLInputElement>
}

export const InputField = ({
  status = 'default',
  optional,
  errorMessage,
  label,
  requiredInput,
  ref,
  disabled,
  style,
  ...props
}: InputProps) => {
  const inputClasses = classNames('au-input', {
    'au-input--disabled': disabled,
    'au-input--error': status === 'error',
    'au-input--success': status === 'success',
  })

  const statesFlag = {
    default: null,
    optional: <span>(Opcional)</span>,
    success: <IconCheck rawColor={COLOR_SUCCESS_50} />,
    error: <IconAlertCircle rawColor={COLOR_ERROR_50} />,
    disabled: <IconSlash rawColor={COLOR_NEUTRAL_40} />,
  }

  const currentState = disabled ? 'disabled' : optional ? 'optional' : status

  return (
    <div className={inputClasses} style={style}>
      <div className="au-input__header">
        <Conditional
          condition={!!label}
          renderIf={
            <label htmlFor="input-text" className="au-input__header-label">
              {label}{' '}
              {requiredInput && (
                <strong className="au-input__header-label--required">*</strong>
              )}
            </label>
          }
        />
        <div className="au-input__header-icon">{statesFlag[currentState]}</div>
      </div>
      <input
        id="input-text"
        className="au-input__field"
        ref={ref}
        disabled={disabled}
        {...props}
      />
      <Conditional
        condition={!!errorMessage && status === 'error'}
        renderIf={<p className="au-input__error-message">{errorMessage}</p>}
      />
    </div>
  )
}

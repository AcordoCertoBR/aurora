import classNames from 'classnames'
import './styles.scss'
import { Conditional } from '../misc'
import { IconAlertCircle, IconCheck, IconSlash } from '../icons'
import { COLOR_ERROR_50, COLOR_NEUTRAL_40, COLOR_SUCCESS_50 } from '../../main'

type InputProps = {
  label?: string
  placeholder?: string
  disabled?: boolean
  status?: 'default' | 'success' | 'error'
  isOptional?: boolean
  errorMessage?: string
}

export const InputText = ({
  label,
  placeholder,
  disabled,
  isOptional,
  status = 'default',
  errorMessage,
}: InputProps) => {
  const inputClasses = classNames('au-input', {
    'au-input--disabled': disabled,
    'au-input--error': status === 'error',
    'au-input--success': status === 'success',
  })

  const icons = {
    default: null,
    optional: <span>(Opcional)</span>,
    success: <IconCheck rawColor={COLOR_SUCCESS_50} />,
    error: <IconAlertCircle rawColor={COLOR_ERROR_50} />,
    disabled: <IconSlash rawColor={COLOR_NEUTRAL_40} />,
  }

  const currentState = disabled ? 'disabled' : isOptional ? 'optional' : status

  return (
    <div className={inputClasses}>
      <div className="au-input__header">
        <Conditional
          condition={!!label}
          renderIf={
            <label htmlFor="input-text" className="au-input__header-label">
              {label}
            </label>
          }
        />
        <div className="au-input__header-icon">{icons[currentState]}</div>
      </div>
      <input
        id="input-text"
        className="au-input__field"
        placeholder={placeholder}
      />
      <p className="au-input__error-message">{errorMessage}</p>
    </div>
  )
}

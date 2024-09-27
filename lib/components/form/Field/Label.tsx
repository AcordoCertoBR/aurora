import { IconAlertCircle, IconCheck, IconSlash } from '../../icons'
import {
  COLOR_ERROR_50,
  COLOR_NEUTRAL_40,
  COLOR_SUCCESS_50,
} from '../../../main'

type FieldLabelProps = {
  id?: string
  text?: string
  required?: boolean
  optional?: boolean
  success?: boolean
  error?: boolean
  disabled?: boolean
}

export const FieldLabel = ({
  id,
  text,
  required,
  optional,
  success,
  error,
  disabled,
}: FieldLabelProps) => {
  if (!text) return null

  const states = [
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

  const currentState = states.find(({ value }) => !!value)

  return (
    <div className="au-field__header">
      <label htmlFor={id} className="au-field__header-label">
        {text}{' '}
        {required && (
          <strong className="au-field__header-label--required">*</strong>
        )}
      </label>
      <div className="au-field__header-icon">{currentState?.icon}</div>
    </div>
  )
}

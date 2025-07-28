import { IconAlertOctagon, IconCheck, IconSlash } from '@components/icons'
import {
  COLOR_ERROR_50,
  COLOR_NEUTRAL_40,
  COLOR_SUCCESS_50,
} from '@core/tokens'

type FieldLabelProps = {
  id?: string
  text?: string | React.ReactNode
  required?: boolean
  success?: boolean
  error?: boolean
  disabled?: boolean
  showOptionalLabel?: boolean
}

export const FieldLabel = ({
  id,
  text,
  required,
  success,
  error,
  disabled,
  showOptionalLabel = true,
}: FieldLabelProps) => {
  if (!text) return null

  const states = [
    {
      state: 'success',
      value: !!success,
      icon: <IconCheck rawColor={COLOR_SUCCESS_50} />,
    },
    {
      state: 'error',
      value: !!error,
      icon: <IconAlertOctagon rawColor={COLOR_ERROR_50} />,
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
        {showOptionalLabel && !required && (
          <span className="au-field__header-label--optional">(Opcional)</span>
        )}
        {!showOptionalLabel && required && (
          <strong className="au-field__header-label--required">*</strong>
        )}
      </label>
      <div className="au-field__header-icon">{currentState?.icon}</div>
    </div>
  )
}

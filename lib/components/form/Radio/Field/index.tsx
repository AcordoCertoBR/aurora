import { useState } from 'react'
import classNames from 'classnames'
import { RadioFieldProps } from '../types'
import './styles.scss'

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

  const getSafeId = (id: RadioFieldProps['id']) => {
    return id ? id : `au-radio-${Math.random()}`
  }
  const [safeId] = useState(getSafeId(id))
  
  return (
    <div className={radioClasses}>
      <input
        className="au-radio-field__input"
        type={type}
        id={safeId}
        disabled={disabled}
        {...props}
      />
      <label className="au-radio-field__label" htmlFor={safeId}>
        {label}
      </label>
    </div>
  )
}

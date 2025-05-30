import { useState } from 'react'
import classNames from 'classnames'
import { IconCheck } from '@components/icons'
import { COLOR_NEUTRAL_00 } from '@core/tokens'
import Field from '../../Field'

import { Conditional } from '@components/misc'

import { CheckboxFieldProps } from '../types'
import './styles.scss'

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

  const getSafeId = (id: CheckboxFieldProps['id']) => {
    return id ? id : `au-checkbox-${Math.random()}`
  }
  const [safeId] = useState(getSafeId(id))

  return (
    <div className={checkboxClasses} style={style}>
      <label htmlFor={safeId} className="au-checkbox__holder">
        <input
          className="au-checkbox__input"
          type="checkbox"
          id={safeId}
          disabled={disabled}
          {...props}
        />
        <span className="au-checkbox__check">
          <IconCheck rawColor={COLOR_NEUTRAL_00} />
        </span>
        <Conditional
          condition={typeof label === 'string'}
          renderIf={
            <span
              className="au-checkbox__label"
              dangerouslySetInnerHTML={{ __html: label || '' }}
            />
          }
          renderElse={
            <span className="au-checkbox__label">
              {label}
            </span>
          }
        />
      </label>
      <Field.ErrorMessage hasError={!!error} message={errorMessage} />
    </div>
  )
}

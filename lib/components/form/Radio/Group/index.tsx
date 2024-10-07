import classNames from 'classnames'
import './styles.scss'
import Field from '@components/form/Field'
import { Conditional } from '@components/misc'
import { Text } from '@components/Text'
import React, { useState } from 'react'
import { RadioField } from '../Field'
import { RadioFieldProps, RadioGroupProps } from '../types'

export const RadioGroup = ({
  name = '',
  defaultValue,
  orientation = 'vertical',
  label,
  error,
  errorMessage,
  children,
  onChange,
  onFocus,
}: RadioGroupProps) => {
  const groupClass = classNames('au-radio-group', {
    'au-radio-group--horizontal': orientation === 'horizontal',
  })

  const getSafeName = (name: string): string => {
    return name ? name : `au-radio-group-${Math.random()}`
  }

  const [safeName] = useState(getSafeName(name))

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const childProps = child.props as RadioFieldProps

      return (
        <RadioField
          name={safeName}
          error={error}
          defaultChecked={defaultValue === childProps.value}
          onChange={onChange}
          onFocus={onFocus}
          {...child.props}
        />
      )
    }
    return child
  })

  return (
    <div className={groupClass}>
      <Conditional
        condition={!!label}
        renderIf={
          <Text variant="body-medium" weight="semibold">
            {label}
          </Text>
        }
      />
      <div className="au-radio-group__fields">{childrenWithProps}</div>
      <Field.ErrorMessage hasError={!!error} message={errorMessage} />
    </div>
  )
}

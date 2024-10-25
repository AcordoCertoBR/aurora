import React from 'react'
import classNames from 'classnames'
import './styles.scss'
import Field from '@components/form/Field'
import { Conditional } from '@components/misc'
import { Text } from '@components/Text'
import { CheckboxField } from '../Field'
import { CheckboxFieldProps, CheckboxGroupProps } from '../types'
import { useCheckboxGroup } from './hook'

export const CheckboxGroup = ({
  name,
  defaultValue,
  orientation = 'vertical',
  label,
  error,
  errorMessage,
  required = false,
  children,
  onChange,
  onFocus,
}: CheckboxGroupProps) => {
  const groupClass = classNames('au-checkbox-group', {
    'au-checkbox-group--horizontal': orientation === 'horizontal',
  })

  const { handleSelectOption, safeName } = useCheckboxGroup({onChange, name})

  const childrenWithProps = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      const childProps = child.props as CheckboxFieldProps

      return (
        <CheckboxField
          name={safeName}
          error={error}
          defaultChecked={defaultValue === childProps.value}
          onChange={(e) =>
            handleSelectOption(e.target.checked, childProps, index)
          }
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
          <Text variant="body-small" weight="semibold" color="secondary">
            {label}{' '}
            {!!required && (
              <span className="au-checkbox-group__label--required">*</span>
            )}
          </Text>
        }
      />
      <div className="au-checkbox-group__fields">{childrenWithProps}</div>
      <Field.ErrorMessage hasError={!!error} message={errorMessage} />
    </div>
  )
}

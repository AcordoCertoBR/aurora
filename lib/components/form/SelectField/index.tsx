import classNames from 'classnames'
import { IconChevronDown, IconSlash, IconCheck } from '@components/icons'
import Field from '../Field'

import { useSelectField } from './hook'
import './styles.scss'

type OptionProps = {
  value: string
  label: string
  disabled?: boolean
}

type SelectFieldProps = React.HTMLAttributes<HTMLDivElement> & {
  label?: string
  options: OptionProps[]
  optional?: boolean
  disabled?: boolean
  required?: boolean
  error?: boolean
  errorMessage?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  name?: string
  register?: (instance: HTMLSelectElement | null) => void
}

export const SelectField = ({
  label,
  options,
  optional,
  error,
  errorMessage,
  disabled,
  required,
  value,
  onChange,
  style,
  className,
  placeholder,
  name,
  register,
  onBlur,
}: SelectFieldProps) => {
  const {
    isDropdownOpen,
    currentValue,
    selectRef,
    selectElementRef,
    toggleDropdown,
    selectOption,
    onKeyDownDropdown,
    setActiveOptionIndex,
    activeOptionIndex,
  } = useSelectField(options, value, onChange, disabled, register)

  const dropdownClasses = classNames('au-field__select', {
    'au-field__select--disabled': disabled,
    'au-field__select--open': isDropdownOpen,
    'au-field__select--required': required,
    'au-field__select--error': error,
    [className!]: className,
  })

  return (
    <Field.Root
      style={style}
      customclass={className}
      error={error}
      disabled={disabled}>
      <Field.Label
        text={label}
        optional={optional}
        required={required}
        error={error}
        disabled={disabled}
      />
      <div className={dropdownClasses}>
        <div
          className="au-field__select-wrapper"
          onClick={toggleDropdown}
          onKeyDown={onKeyDownDropdown}
          tabIndex={disabled ? -1 : 0}
          ref={selectRef}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={isDropdownOpen}
          aria-labelledby="select-label"
          aria-activedescendant={
            activeOptionIndex !== null
              ? options[activeOptionIndex].value
              : undefined
          }
          onBlur={onBlur}>
          <div className="au-field__select-display">
            {options.find((option) => option.value === currentValue)?.label ||
              placeholder ||
              'Selecionar...'}
          </div>
          <div className="au-field__select-icon">
            <IconChevronDown />
          </div>
        </div>
        <ul
          className={classNames('au-field__select-options', {
            'au-field__select-options--open': isDropdownOpen,
          })}
          role="listbox"
          aria-live="polite"
          tabIndex={-1}>
          {options.map((option, index) => (
            <li
              key={option.value}
              className={classNames('au-field__select-option', {
                'au-field__select-option--highlighted':
                  activeOptionIndex === index,
                'au-field__select-option--selected':
                  option.value === currentValue,
                'au-field__select-option--disabled': option.disabled,
              })}
              role="option"
              aria-selected={option.value === currentValue}
              aria-disabled={option.disabled}
              onClick={() => selectOption(option.value, option.disabled)}
              onMouseEnter={() => setActiveOptionIndex(index)}>
              {option.label}
              {option.disabled ? (
                <IconSlash />
              ) : option.value === currentValue ? (
                <IconCheck />
              ) : null}
            </li>
          ))}
        </ul>
        <select
          hidden
          disabled={disabled}
          value={currentValue}
          onChange={(e) => selectOption(e.target.value)}
          ref={selectElementRef}
          name={name}
          onBlur={onBlur}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <Field.ErrorMessage hasError={!!error} message={errorMessage} />
    </Field.Root>
  )
}

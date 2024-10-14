import classNames from 'classnames'
import { IconChevronDown, IconSlash, IconCheck } from '@components/icons'
import Field from '../Field'
import { SelectFieldProps } from './types'
import { useSelectField } from './hook'
import './styles.scss'

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
  autocomplete = false,
  EmptyText = 'Nada encontrado',
}: SelectFieldProps) => {
  const {
    isDropdownOpen,
    selectRef,
    selectElementRef,
    activeOptionRef,
    toggleDropdown,
    selectOption,
    onKeyDownDropdown,
    setActiveOptionIndex,
    activeOptionIndex,
    filteredOptions,
    searchValue,
    selectedOption,
    handleInputChange,
    dropdownMaxHeight,
  } = useSelectField(options, value, onChange, disabled, register, autocomplete)

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
            activeOptionIndex !== null && filteredOptions[activeOptionIndex]
              ? filteredOptions[activeOptionIndex].value
              : undefined
          }
          onBlur={onBlur}>
          <input
            className="au-field__select-input"
            value={searchValue || selectedOption.label}
            placeholder={placeholder || 'Selecionar...'}
            onChange={handleInputChange}
            readOnly={!autocomplete}
            disabled={disabled}
          />
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
          tabIndex={-1}
          style={{ maxHeight: `${dropdownMaxHeight}px`, overflowY: 'auto' }}>
          {filteredOptions.length === 0 ? (
            <li className="au-field__select-option au-field__select-option--empty">
              {EmptyText}
            </li>
          ) : (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                className={classNames('au-field__select-option', {
                  'au-field__select-option--highlighted':
                    activeOptionIndex === index,
                  'au-field__select-option--selected':
                    option.value === selectedOption.value,
                  'au-field__select-option--disabled': option.disabled,
                })}
                ref={activeOptionIndex === index ? activeOptionRef : null}
                role="option"
                aria-selected={option.value === selectedOption.value}
                aria-disabled={option.disabled}
                onClick={() => selectOption(option.value, option.disabled)}
                onMouseEnter={() => setActiveOptionIndex(index)}>
                {option.label}
                {option.disabled ? (
                  <IconSlash />
                ) : option.value === selectedOption.value ? (
                  <IconCheck />
                ) : null}
              </li>
            ))
          )}
        </ul>

        <select
          hidden
          disabled={disabled}
          value={selectedOption.value}
          onChange={(e) => selectOption(e.target.value)}
          ref={selectElementRef}
          name={name}
          onBlur={onBlur}>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <Field.ErrorMessage hasError={!!error} message={errorMessage} />
    </Field.Root>
  )
}

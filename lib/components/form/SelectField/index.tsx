import Field from '../Field'
import classNames from 'classnames'
import { IconChevronDown, IconSlash, IconCheck } from '../../icons'
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
  placeholder?: string
  disabled?: boolean
  value?: string
  onChange?: (value: string) => void
}

export const SelectField = ({
  label,
  options,
  optional,
  disabled,
  value,
  onChange,
  style,
  className,
  placeholder,
}: SelectFieldProps) => {
  const {
    isDropdownOpen,
    currentValue,
    selectRef,
    toggleDropdown,
    selectOption,
    onKeyDownDropdown,
    setActiveOptionIndex,
    activeOptionIndex,
  } = useSelectField(options, value, onChange, disabled)

  const dropdownClasses = classNames('au-field__select', {
    'au-field__select--disabled': disabled,
    'au-field__select--open': isDropdownOpen,
    [className!]: className,
  })

  return (
    <Field.Root style={style} customclass={className} disabled={disabled}>
      <Field.Label text={label} optional={optional} disabled={disabled} />
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
          aria-activedescendant={activeOptionIndex !== null ? options[activeOptionIndex].value : undefined}
        >
          <div className="au-field__select-display">
            {options.find((option) => option.value === currentValue)?.label || placeholder || 'Selecionar...'}
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
          tabIndex={-1}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              className={classNames('au-field__select-option', {
                'au-field__select-option--highlighted': activeOptionIndex === index,
                'au-field__select-option--selected': option.value === currentValue,
                'au-field__select-option--disabled': option.disabled,
              })}
              role="option"
              aria-selected={option.value === currentValue}
              aria-disabled={option.disabled}
              onClick={() => selectOption(option.value, option.disabled)}
              onMouseEnter={() => setActiveOptionIndex(index)}
            >
              {option.label}
              {option.disabled ? <IconSlash /> : option.value === currentValue ? <IconCheck /> : null}
            </li>
          ))}
        </ul>
        <select hidden disabled={disabled} value={currentValue}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </Field.Root>
  )
}

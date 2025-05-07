import classNames from 'classnames'
import {
  IconChevronDown,
  IconSlash,
  IconCheck,
  IconSearch,
} from '@components/icons'
import Field from '../Field'
import { OptionProps, SelectFieldProps } from './types'
import { useSelectField } from './hook'
import './styles.scss'
import { Modal } from '@components/Modal'
import { Text } from '@components/Text'
import { COLOR_NEUTRAL_40 } from '@core/tokens'
import { Conditional } from '@components/misc'
import { createPortal } from 'react-dom'

export const SelectField = ({
  label,
  options,
  showOptionalLabel,
  error,
  errorMessage,
  helpMessage,
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
  fullScreenOptions = false,
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
    handleOnBlur,
    onCloseOptions
  } = useSelectField(
    options,
    value,
    onChange,
    onBlur,
    disabled,
    register,
    autocomplete,
    fullScreenOptions,
  )

  const selectClasses = classNames('au-field__select', {
    'au-field__select--disabled': disabled,
    'au-field__select--open': isDropdownOpen,
    'au-field__select--required': required,
    'au-field__select--error': error,
    [className!]: className,
  })

  const optionsClasses = classNames('au-field__select-options', {
    'au-field__select-options--open': isDropdownOpen,
  })

  const optionClasses = (option: OptionProps, index: number) =>
    classNames('au-field__select-option', {
      'au-field__select-option--highlighted': activeOptionIndex === index,
      'au-field__select-option--selected':
        option.value === selectedOption.value,
      'au-field__select-option--disabled': option.disabled,
    })

  const fullScreenOptionClasses = (option: OptionProps, index: number) =>
    classNames('au-field__fullscreen-options-select-option', {
      'au-field__fullscreen-options-select-option--highlighted':
        activeOptionIndex === index,
      'au-field__fullscreen-options-select-option--selected':
        option.value === selectedOption.value,
      'au-field__fullscreen-options-select-option--disabled': option.disabled,
    })

  return (
    <>
      <Field.Root
        style={style}
        customclass={className}
        error={error}
        disabled={disabled}>
        <Field.Label
          text={label}
          showOptionalLabel={showOptionalLabel}
          required={required}
          error={error}
          disabled={disabled}
        />
        <div className={selectClasses}>
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
            onBlur={handleOnBlur}>
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
          <Conditional
            condition={!fullScreenOptions}
            renderIf={
              <ul
                className={optionsClasses}
                role="listbox"
                aria-live="polite"
                tabIndex={-1}
                style={{
                  maxHeight: `${dropdownMaxHeight}px`,
                  overflowY: 'auto',
                }}>
                {filteredOptions.length === 0 ? (
                  <li className="au-field__select-option au-field__select-option--empty">
                    {EmptyText}
                  </li>
                ) : (
                  filteredOptions.map((option, index) => (
                    <li
                      key={index}
                      className={optionClasses(option, index)}
                      ref={activeOptionIndex === index ? activeOptionRef : null}
                      role="option"
                      aria-selected={option.value === selectedOption.value}
                      aria-disabled={option.disabled}
                      onPointerUp={() =>
                        selectOption(option.value, option.disabled)
                      }
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
            }
          />

          <select
            hidden
            disabled={disabled}
            value={selectedOption.value}
            onChange={(e) => selectOption(e.target.value)}
            ref={selectElementRef}
            name={name}>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <Field.Message
          hasError={!!error}
          errorMessage={errorMessage}
          helpMessage={helpMessage}
        />
      </Field.Root>

      <Conditional
        condition={fullScreenOptions}
        renderIf={
          <>
            {createPortal(
              <Modal
                isOpen={isDropdownOpen}
                onClose={onCloseOptions}
                headerContent={
                  <div>
                    <Text as="label" variant="heading-small" weight="bold">
                      {label}
                    </Text>
                    <div
                      className="au-field__fullscreen-options-select-search-bar"
                      onKeyDown={onKeyDownDropdown}
                      tabIndex={disabled ? -1 : 0}
                      ref={selectRef}
                      role="combobox"
                      aria-haspopup="listbox"
                      aria-expanded={isDropdownOpen}
                      aria-labelledby="select-label"
                      aria-activedescendant={
                        activeOptionIndex !== null &&
                        filteredOptions[activeOptionIndex]
                          ? filteredOptions[activeOptionIndex].value
                          : undefined
                      }
                      onBlur={handleOnBlur}>
                      <input
                        className="au-field__select-input"
                        value={searchValue || selectedOption.label}
                        placeholder={'Buscar'}
                        onChange={handleInputChange}
                        disabled={disabled}
                      />
                      <div className="au-field__select-icon">
                        <IconSearch rawColor={COLOR_NEUTRAL_40} />
                      </div>
                    </div>
                  </div>
                }
                content={
                  <div className="au-field__fullscreen-options-select-options">
                    {filteredOptions.map((option, index) => (
                      <li
                        key={index}
                        className={fullScreenOptionClasses(option, index)}
                        ref={
                          activeOptionIndex === index ? activeOptionRef : null
                        }
                        role="option"
                        aria-selected={option.value === selectedOption.value}
                        aria-disabled={option.disabled}
                        onPointerUp={() =>
                          selectOption(option.value, option.disabled)
                        }
                        onMouseEnter={() => setActiveOptionIndex(index)}>
                        {option.label}
                        {option.disabled ? (
                          <IconSlash />
                        ) : option.value === selectedOption.value ? (
                          <IconCheck />
                        ) : null}
                      </li>
                    ))}
                  </div>
                }
              />,
              document.body,
            )}
          </>
        }
      />
    </>
  )
}

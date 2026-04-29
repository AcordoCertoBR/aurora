import Field from '../Field'
import { useEmailAutocomplete } from './hook'
import classNames from 'classnames'
import './styles.scss'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  showOptionalLabel?: boolean
  requiredInput?: boolean
  success?: boolean
  error?: boolean
  errorMessage?: string
  helpMessage?: string
  rightSlot?: React.ReactNode
  label?: string
  inputStyle?: React.CSSProperties
  inputRef?: React.RefObject<HTMLInputElement>
	onChange?: (value: string) => void;
}

export const EmailField = ({
  showOptionalLabel,
  requiredInput,
  success,
  error,
  errorMessage,
  helpMessage,
  label,
  id,
  disabled,
  style,
  className,
  inputStyle,
  rightSlot,
  inputRef,
  ...props
}: InputProps) => {
  const {
    inputValue,
    suggestions,
    isDropdownOpen,
    handleChange,
    handleSuggestionClick,
  } = useEmailAutocomplete(props.onChange);

  return (
    <Field.Root
      style={style}
      customclass={className}
      success={success}
      error={error}
      disabled={disabled}>
      <Field.Label
        text={label}
        id={id}
        showOptionalLabel={showOptionalLabel}
        required={requiredInput}
        success={success}
        error={error}
        disabled={disabled}
      />
      <Field.InputHolder rightSideSlot={rightSlot}>
        <Field.Input
          id={id}
          type="email"
          inputRef={inputRef}
          value={inputValue}
          disabled={disabled}
          style={inputStyle}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={isDropdownOpen}
          aria-autocomplete="list"
          {...props}
					onChange={handleChange}
        />
        <ul
          className={classNames('au-field__input-autocomplete', {
            'au-field__input-autocomplete--open': isDropdownOpen,
          })}
          tabIndex={-1}
          role="listbox"
          style={{
            overflowY: 'auto',
          }}>
          {suggestions.map((suggestion, index) => (
            <li
              className="au-field__input-option"
              onClick={() => handleSuggestionClick(suggestion)}
              role="option"
              aria-selected={false}
              key={index}>
              {suggestion}
            </li>
          ))}
        </ul>
      </Field.InputHolder>
      <Field.Message
        hasError={!!error}
        errorMessage={errorMessage}
        helpMessage={helpMessage}
      />
    </Field.Root>
  )
}

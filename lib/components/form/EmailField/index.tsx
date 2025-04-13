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
  } = useEmailAutocomplete();

	console.log("nova versão");

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
          {...props}
					onChange={(e) => {
						console.log(e)
						handleChange(e);
					
						console.log(props.onChange)
						if (props.onChange) {
							props.onChange(e);
						}
					}}
        />
        <ul
          className={classNames('au-field__input-autocomplete', {
            'au-field__input-autocomplete--open': isDropdownOpen,
          })}
          tabIndex={-1}
          role="listbox"
          aria-expanded={isDropdownOpen}
          style={{
            overflowY: 'auto',
          }}>
          {suggestions.map((suggestion, index) => (
            <li
              className="au-field__input-option"
              onClick={() => handleSuggestionClick(suggestion)}
              role="option"
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

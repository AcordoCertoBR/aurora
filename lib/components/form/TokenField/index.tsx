import Field from '../Field'
import useTokenField from './hook'
import './styles.scss'

type TokenFieldProps = {
  label?: string
  disabled?: boolean
  success?: boolean
  error?: boolean
  errorMessage?: string
  size?: number
  type?: 'number' | 'password' | 'text'
  style?: React.CSSProperties
  timer?: number
  onChangeTimer?: () => void
  onComplete?: (value: string) => void
  onChange?: (value: string) => void
}

export const TokenField = ({
  label,
  disabled,
  success,
  error,
  errorMessage,
  size = 6,
  type,
  style,
  timer,
  onChangeTimer,
  onComplete,
  onChange,
}: TokenFieldProps) => {
  const { tokenMap, rootElementRef, onChangeNumber, onKeyUpHandler, onPasteNumber } =
    useTokenField({ size, onComplete, onChange, onChangeTimer, timer })

  return (
    <Field.Root
      style={style}
      customclass="au-token-field"
      success={success}
      error={error}
      disabled={disabled}>
      <Field.Label
        text={label}
        success={success}
        error={error}
        disabled={disabled}
      />
      <div ref={rootElementRef} className="au-token-field__container">
        {[...Object.values(tokenMap)].map((_, i) => (
          <div key={`token-digit-${i}`}>
            <Field.Input
              customclass="au-token-field__input"
              type={type || 'number'}
              value={tokenMap[i]}
              disabled={disabled}
              onChange={(e) => onChangeNumber(e, i)}
              onKeyUp={(e) => onKeyUpHandler(e, i)}
              onPaste={(e) => onPasteNumber(e)}
              data-token-i={i}
            />
          </div>
        ))}
      </div>
      <Field.ErrorMessage hasError={error} message={errorMessage} />
    </Field.Root>
  )
}
import classNames from 'classnames'

type FieldRootProps = {
  children: React.ReactNode
  disabled?: boolean
  success?: boolean
  error?: boolean
  style?: React.CSSProperties
  customclass?: string
}

export const FieldRoot = ({
  children,
  disabled,
  success,
  error,
  style,
  customclass,
}: FieldRootProps) => {
  const inputClasses = classNames('au-field', customclass, {
    'au-field--disabled': !!disabled,
    'au-field--success': !!success,
    'au-field--error': !!error,
  })

  return (
    <div className={inputClasses} style={style}>
      {children}
    </div>
  )
}

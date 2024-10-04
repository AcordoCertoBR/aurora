export type OptionProps = {
  value: string
  label: string
  disabled?: boolean
}

export type SelectFieldProps = React.HTMLAttributes<HTMLDivElement> & {
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
  autocomplete?: boolean
  EmptyText?: string
}

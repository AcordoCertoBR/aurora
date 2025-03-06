import { CheckboxField } from './Field'

export type CheckboxFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string | React.ReactNode
  error?: boolean
  errorMessage?: string
}

export type CheckboxGroupProps = {
  children: React.ReactElement<typeof CheckboxField>[]
  name?: string
  defaultValue?: string | number
  orientation?: 'horizontal' | 'vertical'
  label?: string
  error?: boolean
  errorMessage?: string
  required?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onFocus?: React.FocusEventHandler<HTMLInputElement>
}

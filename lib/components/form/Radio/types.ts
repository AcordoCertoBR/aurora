import { RadioField } from './Field'

export type RadioFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  direction?: 'left' | 'right'
  label?: string
  error?: boolean
  type?: 'radio'
}

export type RadioGroupProps = {
  children: React.ReactElement<typeof RadioField>[]
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

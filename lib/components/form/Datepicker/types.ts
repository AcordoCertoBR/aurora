import { InputProps } from '../InputField'

type EventHandler = (value?: Date) => void

export type DatepickerProps = InputProps & {
  calendar?: boolean
  defaultDate?: Date
  style?: React.CSSProperties
  placeholder?: string
  value?: Date
  onChange?: EventHandler
  onBlur?: EventHandler
}

export type UseDatePickerProps = {
  onChange?: EventHandler
  disabled?: boolean
}

import { InputProps } from '../InputField'

type DatepickerMode = 'simple' | 'calendar'
type EventHandler = (value?: Date) => void

export type DatepickerProps = InputProps & {
  mode?: DatepickerMode
  defaultDate?: Date
  style?: React.CSSProperties
  placeholder?: string
  value?: Date
  onChange?: EventHandler
  onBlur?: EventHandler
}

export type UseDatePickerProps = {
  onChange?: EventHandler
}

type DatepickerMode = 'simple' | 'calendar'

export type DatepickerProps = {
  mode?: DatepickerMode
  defaultDate?: Date
  style?: React.CSSProperties
  placeholder?: string
  value?: Date
  onChange?: (value?: Date) => void
  onBlur?: (value: Date) => void
}

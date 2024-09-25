import { InputProps } from '../InputField'

type EventHandler = (value?: Date | null) => void

export type DefaultValue = 'empty' | 'now' | Date

export type FormatAdapter = {
  /** mask typed date  */
  maskDate: (date: string) => string
  /** Validate a string in the format */
  validateFormat: (date: string) => boolean
  /** Validate if is a valid date */
  validate: (date: string) => boolean
  toDate: (dateStr: string) => Date
  toString: (date: Date) => string
  placeholder: string
}

export type DatepickerProps = InputProps & {
  calendar?: boolean
  defaultDate?: Date
  style?: React.CSSProperties
  placeholder?: string
  value?: Date
  onChange?: EventHandler
  onBlur?: EventHandler
  /** Field default value */
  defaultValue?: DefaultValue
  format?: FormatAdapter
  withPortal?: boolean
}

export type SegmentItem = { label: string; value: string | number }

export type UseDatePickerProps = {
  onChange?: EventHandler
  disabled?: boolean
  value?: Date
  defaultValue?: DefaultValue
  format?: FormatAdapter
  placeholder?: string
  onBlur?: EventHandler
}

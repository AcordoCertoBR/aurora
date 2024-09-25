export type EventHandler = (value?: AUCalendarDateShape | null) => void

export type DefaultValue = 'empty' | 'now' | AUCalendarDateShape

export type FormatAdapter = {
  /** mask typed date  */
  maskDate: (date: string) => string
  /** Validate a string in the format */
  validateFormat: (date: string) => boolean
  /** Validate if is a valid date */
  validate: (date: string) => boolean
  toCalendarDate: (dateStr: string) => AUCalendarDateShape
  toString: (date: AUCalendarDateShape) => string
  placeholder: string
}

export type SegmentItem = { label: string; value: number }

export type AUCalendarDateShape = {
  date: number
  month: number
  year: number
}

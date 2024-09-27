export type EventHandler = (value?: AUCalendarDateShape | null) => void

export type DefaultValue = 'empty' | 'now' | AUCalendarDateShape

export type FormatAdapter = {
  maskDate: (date: string) => string
  validateFormat: (date: string) => boolean
  validate: (
    date: string,
    minValue?: AUCalendarDateShape,
    maxValue?: AUCalendarDateShape,
  ) => boolean
  toCalendarDate: (dateStr: string) => AUCalendarDateShape
  toString: (date: AUCalendarDateShape) => string
  placeholder: string
}

export type SegmentItem = { label: string; value: number }

export type AUCalendarDateShape = {
  day: number
  month: number
  year: number
}

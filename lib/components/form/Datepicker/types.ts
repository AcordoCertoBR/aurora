export type EventHandler = (value?: Date | null) => void

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
  minValue?: Date
  maxValue?: Date
}

export type SegmentItem = { label: string; value: number }

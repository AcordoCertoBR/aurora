import { AUCalendarDateShape, DefaultValue, FormatAdapter } from './types'

/**
 * This adapter Handle the input format and convert to a more
 * universal structure, that can be used accross all subcomponents in the datepicker.
 * if we need to support another format like dd-mm-yyyy, we only need to create another adapter
 * following this model
 */
export const DDMMYYYY: FormatAdapter = {
  placeholder: 'DD/MM/YYYY',
  /** Apply DD/MM/YYYY to a field text while typing */
  maskDate(dateStr) {
    let fmtInputDate = dateStr
    fmtInputDate = fmtInputDate.replace(/\D/g, '') // Remove non-numeric characters

    if (fmtInputDate.length > 2) {
      fmtInputDate = `${fmtInputDate.slice(0, 2)}/${fmtInputDate.slice(2)}`
    }
    if (fmtInputDate.length > 5) {
      fmtInputDate = `${fmtInputDate.slice(0, 5)}/${fmtInputDate.slice(5)}`
    }
    return fmtInputDate
  },
  /** Check if a string is on DD/MM/YYYY Format */
  validateFormat(dateStr) {
    const pattern = /^\d{2}\/\d{2}\/\d{4}$/
    return pattern.test(dateStr)
  },
  /** Covert a DD/MM/YYYY to the datepicker date structure */
  toCalendarDate(dateStr): AUCalendarDateShape {
    const [day, month, year] = dateStr.split('/').map(Number)
    return AUCalendarDate(day, month, year)
  },
  /** Covert a Date in the datepicker structure into a DD/MM/YYYY string */
  toString(dateObj: AUCalendarDateShape): string {
    const fmtNumber = (digit: number) =>
      String(digit).length === 1 ? `0${digit}` : String(digit)
    const { day, month, year } = dateObj

    return `${fmtNumber(day)}/${fmtNumber(month)}/${year}`
  },
  /** Check if a DD/MM/YYYY is a valid date */
  validate(dateStr, minValue, maxValue): boolean {
    const [day, month, year] = dateStr.split('/').map(Number)
    const date = new Date(year, month - 1, day)
    const isOlderThanMinDate =
      !!minValue &&
      date < new Date(minValue.year, minValue.month - 1, minValue.day)

    const exceedsMaxDate =
      !!maxValue &&
      date > new Date(maxValue.year, maxValue.month - 1, maxValue.day)

    return (
      date.getDate() === day &&
      date.getMonth() + 1 === month &&
      date.getFullYear() === year &&
      !isOlderThanMinDate &&
      !exceedsMaxDate
    )
  },
}

export function AUCalendarDate(
  day: number,
  month: number,
  year: number,
): AUCalendarDateShape {
  return {
    day,
    month,
    year,
  }
}

export function getDefaultDate(
  defaultDateProp: DefaultValue,
): AUCalendarDateShape | null {
  if (defaultDateProp == 'empty') return null
  if (defaultDateProp === 'now') {
    const now = new Date()
    return AUCalendarDate(now.getDate(), now.getMonth() + 1, now.getFullYear())
  }

  return defaultDateProp
}

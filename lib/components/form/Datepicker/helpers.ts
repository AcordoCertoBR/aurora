import { FormatAdapter } from './types'

export const DDMMYYYY: FormatAdapter = {
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
  validateFormat(dateStr) {
    const pattern = /^\d{2}\/\d{2}\/\d{4}$/
    return pattern.test(dateStr)
  },
  toDate(dateStr) {
    const [day, month, year] = dateStr.split('/').map(Number)
    return new Date(year, month - 1, day)
  },

  validate(dateStr) {
    const [day, month, year] = dateStr.split('/').map(Number)
    const date = new Date(year, month - 1, day)

    return (
      date.getDate() === day &&
      date.getMonth() + 1 === month &&
      date.getFullYear() === year
    )
  },
}

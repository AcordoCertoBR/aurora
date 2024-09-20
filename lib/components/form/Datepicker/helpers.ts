import { FormatAdapter } from './types'

export const DDMMYYYY: FormatAdapter = {
  placeholder: 'DD/MM/YYYY',
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

  toString(date) {
    const fmtNumber = (digit: number) =>
      String(digit).length === 1 ? `0${digit}` : String(digit)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${fmtNumber(day)}/${fmtNumber(month)}/${year}`
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

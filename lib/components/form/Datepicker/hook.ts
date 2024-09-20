import { useEffect, useState } from 'react'
import { UseDatePickerProps } from './types'
import { DDMMYYYY } from './helpers'

export function useDatepicker({
  value,
  defaultValue,
  onChange,
  disabled,
  format = DDMMYYYY,
  placeholder,
}: UseDatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>()
  const [inputDate, setInputDate] = useState('')

  useEffect(() => {
    if (!!value && value instanceof Date) {
      setSelectedDate(value)
      setInputDate(format.toString(value)) // will trigger the effect above
    }
  }, [value])

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const maskedValue = format.maskDate(e.target.value)
    const finishedTypingDate = format.validateFormat(maskedValue)
    setInputDate(maskedValue)

    if (!finishedTypingDate) return

    if (format.validate(inputDate)) {
      const dateObj = format.toDate(inputDate)
      setSelectedDate(dateObj)
      if (onChange) onChange(dateObj)
    } else {
      setSelectedDate(null)
      setInputDate('')
    }
  }

  function showCalendar() {
    if (!disabled) {
      alert('calendar')
    }
  }

  return {
    inputDate,
    handleInputChange,
    showCalendar,
    fmtPlaceholder: placeholder || format.placeholder,
  }
}

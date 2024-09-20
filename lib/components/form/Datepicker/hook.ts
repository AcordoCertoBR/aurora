import { useEffect, useState } from 'react'
import { UseDatePickerProps } from './types'
import { DDMMYYYY } from './helpers'

export function useDatepicker({
  value,
  defaultValue,
  onChange,
  disabled,
  format = DDMMYYYY,
}: UseDatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>()
  const [inputDate, setInputDate] = useState('')

  useEffect(() => {
    const finishedTypingDate = format.validateFormat(inputDate)
    if (!finishedTypingDate) return

    if (format.validate(inputDate)) {
      const dateObj = format.toDate(inputDate)
      setSelectedDate(dateObj)
      if (onChange) onChange(dateObj)
    } else {
      setSelectedDate(null)
      setInputDate('')
    }
  }, [inputDate])

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const maskedValue = format.maskDate(e.target.value)
    setInputDate(maskedValue)
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
  }
}

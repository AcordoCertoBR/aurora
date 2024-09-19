import { useEffect, useState } from 'react'
import { UseDatePickerProps } from './types'

function isDateFmtValid(date: string) {
  const pattern = /^\d{2}\/\d{2}\/\d{4}$/
  return pattern.test(date)
}

function strToDate(stringDate: string) {
  const [day, month, year] = stringDate.split('/').map(Number)
  return new Date(year, month - 1, day)
}

export function useDatepicker({ onChange, disabled }: UseDatePickerProps) {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [date, setDate] = useState('')

  useEffect(() => {
    if (isDateFmtValid(date)) {
      const dateObj = strToDate(date)
      setSelectedDate(dateObj)
      if (onChange) onChange(dateObj)
    }
  }, [date])

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    let inputDate = e.target.value
    inputDate = inputDate.replace(/\D/g, '') // Remove non-numeric characters

    if (inputDate.length > 2) {
      inputDate = `${inputDate.slice(0, 2)}/${inputDate.slice(2)}`
    }
    if (inputDate.length > 5) {
      inputDate = `${inputDate.slice(0, 5)}/${inputDate.slice(5)}`
    }

    setDate(inputDate)
  }

  function showCalendar() {
    if (!disabled) {
      alert('calendar')
    }
  }

  return {
    date,
    handleDateChange,
    showCalendar,
  }
}

import { useState } from 'react'
import { DatepickerProps } from './types'

export function useDatepicker({ ...props }: DatepickerProps) {
  const [date, setDate] = useState('')
  const [presentationalDate, setPresentationalDate] = useState(() => '')

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return {
    ...props,
    date,
    handleDateChange,
  }
}

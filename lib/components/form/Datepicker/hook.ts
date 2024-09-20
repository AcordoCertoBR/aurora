import { useEffect, useState } from 'react'
import { DefaultValue, UseDatePickerProps } from './types'
import { DDMMYYYY } from './helpers'

function getDefaultDate(defaultDateProp: DefaultValue) {
  if (defaultDateProp === 'now') return new Date()
  if (defaultDateProp instanceof Date) return defaultDateProp
  return null
}

export function useDatepicker({
  value,
  defaultValue = 'empty',
  onChange,
  disabled,
  format = DDMMYYYY,
  placeholder,
  onBlur,
}: UseDatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>()
  const [inputDate, setInputDate] = useState('')
  const [alareadySetDefaultValue, setAlreadySetDefaultValue] = useState(false)

  useEffect(() => {
    if (!!value && value instanceof Date) {
      setSelectedDate(value)
      setInputDate(format.toString(value))
    }
  }, [value])

  useEffect(() => {
    if (!defaultValue || alareadySetDefaultValue) return
    const parsedDefaultDate = getDefaultDate(defaultValue)
    setSelectedDate(parsedDefaultDate)
    setInputDate(parsedDefaultDate ? format.toString(parsedDefaultDate) : '')
    setAlreadySetDefaultValue(true)
  }, [defaultValue])

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

  function handleInputBlur() {
    // hide calendar on desk

    if (onBlur) {
      onBlur(selectedDate)
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
    handleInputBlur,
    showCalendar,
    fmtPlaceholder: placeholder || format.placeholder,
  }
}

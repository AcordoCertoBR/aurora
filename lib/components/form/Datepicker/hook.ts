import { useEffect, useRef, useState } from 'react'

import {
  AUCalendarDateShape,
  DefaultValue,
  EventHandler,
  FormatAdapter,
} from './types'
import { DDMMYYYY, getDefaultDate } from './helpers'

type UseDatePickerProps = {
  onChange?: EventHandler
  disabled?: boolean
  value?: AUCalendarDateShape
  defaultValue?: DefaultValue
  format?: FormatAdapter
  placeholder?: string
  onBlur?: EventHandler
  minValue: AUCalendarDateShape
  maxValue: AUCalendarDateShape
}

export function useDatepicker({
  value,
  defaultValue = 'empty',
  onChange,
  disabled,
  format = DDMMYYYY,
  placeholder,
  onBlur,
  minValue,
  maxValue,
}: UseDatePickerProps) {
  const [inputDate, setInputDate] = useState('')
  const [selectedDate, setSelectedDate] = useState<AUCalendarDateShape | null>(
    null,
  )

  const [alareadySetDefaultValue, setAlreadySetDefaultValue] = useState(false)
  const [isCalendarVisible, setIsCalendarVisible] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!!value && value.day) {
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

    const isDateValid = format.validate(maskedValue, minValue, maxValue)
    const newFieldValue = isDateValid
      ? format.toCalendarDate(maskedValue)
      : null
    setSelectedDate(newFieldValue)
    if (onChange) onChange(newFieldValue)

    if (!isDateValid) setInputDate('')
  }

  function handleInputBlur() {
    if (onBlur) {
      onBlur(selectedDate)
    }
  }

  function toggleCalendar() {
    if (!isCalendarVisible && disabled) return
    inputRef.current && inputRef.current.focus()
    setIsCalendarVisible(!isCalendarVisible)
  }

  function closeCalendar() {
    setIsCalendarVisible(false)
  }

  function updateDateFromCalendar(pickerDate: AUCalendarDateShape) {
    setSelectedDate(pickerDate)
    setInputDate(format.toString(pickerDate))
  }

  return {
    inputDate,
    handleInputChange,
    handleInputBlur,
    toggleCalendar,
    closeCalendar,
    isCalendarVisible,
    fmtPlaceholder: placeholder || format.placeholder,
    inputRef,
    selectedDate,
    setSelectedDate,
    updateDateFromCalendar
  }
}

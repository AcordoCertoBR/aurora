import { useEffect, useMemo, useRef, useState } from 'react'
import { CalendarDate } from '@internationalized/date'
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
  const [selectedDate, setSelectedDate] = useState<AUCalendarDateShape | null>()

  const pickerFormattedDate = useMemo(() => {
    if (!selectedDate) return null
    const { date, month, year } = selectedDate
    return new CalendarDate(year, month, date)
  }, [selectedDate])

  const [alareadySetDefaultValue, setAlreadySetDefaultValue] = useState(false)
  const [isCalendarVisible, setIsCalendarVisible] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const usedMinValue = new CalendarDate(
    minValue.year,
    minValue.month,
    minValue.date,
  )
  const usedMaxValue = new CalendarDate(
    maxValue.year,
    maxValue.month,
    maxValue.date,
  )

  useEffect(() => {
    if (!!value && value.date) {
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

    const isDateValid = format.validate(maskedValue)
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
    // TODO separate as open/close
    if (!isCalendarVisible && disabled) return
    inputRef.current && inputRef.current.focus()
    setIsCalendarVisible(!isCalendarVisible)
  }

  return {
    inputDate,
    handleInputChange,
    handleInputBlur,
    toggleCalendar,
    isCalendarVisible,
    fmtPlaceholder: placeholder || format.placeholder,
    inputRef,
    usedMaxValue,
    usedMinValue,
    pickerFormattedDate,
    setSelectedDate
  }
}

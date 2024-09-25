import { useEffect, useRef, useState } from 'react'
import { CalendarDate } from '@internationalized/date'
import { DefaultValue, EventHandler, FormatAdapter } from './types'
import { dateToPickerFormat, DDMMYYYY } from './helpers'
import { isMobile } from '../../../core/utils/isMobile'

type UseDatePickerProps = {
  onChange?: EventHandler
  disabled?: boolean
  value?: Date
  defaultValue?: DefaultValue
  format?: FormatAdapter
  placeholder?: string
  onBlur?: EventHandler
  minValue?: Date
  maxValue?: Date
}

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
  minValue,
  maxValue,
}: UseDatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>()
  const [inputDate, setInputDate] = useState('')
  const [alareadySetDefaultValue, setAlreadySetDefaultValue] = useState(false)
  const [isCalendarVisible, setIsCalendarVisible] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const usedMinValue = minValue
    ? dateToPickerFormat(minValue)
    : new CalendarDate(1900, 1, 1)
  const usedMaxValue = maxValue
    ? dateToPickerFormat(maxValue)
    : new CalendarDate(2100, 12, 31)

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
    if (!isMobile() && isCalendarVisible) {
      //TODO adjust scree size
      /* toggleCalendar() */
    }

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
  }
}

import { useEffect, useMemo, useRef, useState } from 'react'
import { BREAKPOINT_MD } from '@core/tokens'

import {
  AUCalendarDateShape,
  DefaultValue,
  EventHandler,
  FormatAdapter,
} from './types'
import { DDMMYYYY, getDefaultDate } from './helpers'
import { above } from '@core/utils/screen'
import { useOutsideClick } from '@core/hooks/useOutsideClick'

type UseDatePickerProps = {
  onChange?: EventHandler
  disabled?: boolean
  value?: AUCalendarDateShape | null
  defaultValue?: DefaultValue
  format?: FormatAdapter
  placeholder?: string
  onBlur?: EventHandler
  onFocus?: React.FocusEventHandler<HTMLInputElement>
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
  onFocus,
}: UseDatePickerProps) {
  const rootEl = useRef<HTMLDivElement>(null)
  const { listenOutsideClick } = useOutsideClick({
    rootEl,
    breakpoint: BREAKPOINT_MD,
    onLoseFocusCB: closeCalendar,
  })
  const [inputDate, setInputDate] = useState('')
  const [selectedDate, setSelectedDate] = useState<AUCalendarDateShape | null>(
    null,
  )

  const [alareadySetDefaultValue, setAlreadySetDefaultValue] = useState(false)
  const [isCalendarVisible, setIsCalendarVisible] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const shouldDisableManualInput = useMemo(() => !above(BREAKPOINT_MD), [])

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

  function handleInputFocus(
    event: React.FocusEvent<HTMLInputElement, Element>,
  ) {
    if (!isCalendarVisible && disabled) return

    listenOutsideClick()
    setIsCalendarVisible(true)
    if (onFocus) onFocus(event)
  }

  function handleCalendarClick() {
    inputRef.current?.focus()
  }

  function handleInputBlur() {
    if (onBlur) {
      onBlur(selectedDate)
    }
  }

  function closeCalendar() {
    setIsCalendarVisible(false)
  }

  function updateDateFromCalendar(pickerDate: AUCalendarDateShape) {
    setSelectedDate(pickerDate)
    setInputDate(format.toString(pickerDate))
    if (onChange) onChange(pickerDate)
  }

  return {
    inputDate,
    handleInputChange,
    handleInputBlur,
    closeCalendar,
    isCalendarVisible,
    fmtPlaceholder: placeholder || format.placeholder,
    inputRef,
    selectedDate,
    setSelectedDate,
    updateDateFromCalendar,
    rootEl,
    handleCalendarClick,
    handleInputFocus,
    shouldDisableManualInput,
  }
}

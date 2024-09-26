import { useEffect, useRef, useState } from 'react'
import { CalendarDate } from '@internationalized/date'

import { BREAKPOINT_MD } from '../../../../main'
import { above } from '../../../../core/utils/screen'
import { AUCalendarDate } from '../helpers'
import { AUCalendarDateShape } from '../types'

type UseCalendarProps = {
  minValue: AUCalendarDateShape
  maxValue: AUCalendarDateShape
  value?: AUCalendarDateShape | null
  onClose: () => void
  onChange: (date: AUCalendarDateShape) => void
}

export function useCalendar({
  onChange,
  onClose,
  minValue,
  maxValue,
  value,
}: UseCalendarProps) {
  const rootEl = useRef<HTMLDivElement>(null)
  const [enteredAnimation, setEnteredAnimation] = useState(false)
  const [calendarInternalState, setCalendarInternalState] =
    useState<CalendarDate>()

  const usedMinValue = new CalendarDate(
    minValue.year,
    minValue.month,
    minValue.day,
  )
  const usedMaxValue = new CalendarDate(
    maxValue.year,
    maxValue.month,
    maxValue.day,
  )

  useEffect(() => {
    if (!value) return
    const { day, month, year } = value
    setCalendarInternalState(new CalendarDate(year, month, day))
  }, [value])

  useEffect(() => {
    const t = setTimeout(() => {
      setEnteredAnimation(true)
    }, 100)
    return () => {
      clearTimeout(t)
    }
  }, [])

  function fmtWeekday(day: string) {
    const capitalized = `${day.charAt(0).toUpperCase()}${day.slice(1)}`
    return capitalized.replace('.', '')
  }

  function animatedOnClose() {
    setEnteredAnimation(false)
    const t = setTimeout(() => {
      clearTimeout(t)
      onClose()
    }, 200)
  }

  function triggerChange(date: CalendarDate) {
    const { day, month, year } = date
    onChange(AUCalendarDate(day, month, year))
    animatedOnClose()
  }

  function calendarChange(date: CalendarDate) {
    setCalendarInternalState(date)
    if (!above(BREAKPOINT_MD)) return
    triggerChange(date)
  }

  function actionChange() {
    if (calendarInternalState) {
      triggerChange(calendarInternalState)
    }
  }

  return {
    actionChange,
    calendarChange,
    fmtWeekday,
    usedMaxValue,
    usedMinValue,
    rootEl,
    calendarInternalState,
    animatedOnClose,
    enteredAnimation,
  }
}

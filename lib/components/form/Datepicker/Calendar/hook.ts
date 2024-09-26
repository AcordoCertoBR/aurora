import { useEffect, useRef, useState } from 'react'
import { CalendarDate } from '@internationalized/date'
import { useOutsideClick } from '../../../../core/hooks/useOutsideClick'
import { BREAKPOINT_MD } from '../../../../main'
import { above } from '../../../../core/utils/screen'
import { AUCalendarDate } from '../helpers'
import { AUCalendarDateShape } from '../types'

type UseCalendarProps = {
  minValue: AUCalendarDateShape
  isVisible: boolean
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
  isVisible,
}: UseCalendarProps) {
  const rootEl = useRef<HTMLDivElement>(null)
  const [calendarInternalState, setCalendarInternalState] =
    useState<CalendarDate>()
  const { listenOutsideClick } = useOutsideClick({
    rootEl,
    breakpoint: BREAKPOINT_MD,
    onLoseFocusCB: onClose,
  })

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
    if (isVisible) {
      listenOutsideClick()
    }
  }, [isVisible])

  const fmtWeekday = (day: string) => {
    const capitalized = `${day.charAt(0).toUpperCase()}${day.slice(1)}`
    return capitalized.replace('.', '')
  }

  function triggerChange(date: CalendarDate) {
    const { day, month, year } = date
    onChange(AUCalendarDate(day, month, year))
    onClose()
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
    calendarInternalState
  }
}

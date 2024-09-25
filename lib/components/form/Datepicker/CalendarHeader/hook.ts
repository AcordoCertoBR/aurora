import { useContext, useEffect, useState } from 'react'
import { CalendarStateContext } from 'react-aria-components'
import { CalendarDate } from '@internationalized/date'
import { SegmentItem } from '../types'

export function useCalendarHeader() {
  const {
    focusNextPage,
    focusPreviousPage,
    setFocusedDate,
    focusedDate,
    minValue,
    maxValue,
    /* ...calendar */
  } = useContext(CalendarStateContext)

  const [yearsOptions, setYearsOptions] = useState<SegmentItem[]>([])

  useEffect(() => {
    setYearsOptions(getYearsRange(minValue?.year, maxValue?.year))
  }, [minValue, maxValue])

  function handleFocusNewMonth(month: SegmentItem) {
    const monthNumber = month.value
    const focusedDay = focusedDate.day
    const focusedYear = focusedDate.year
    setFocusedDate(new CalendarDate(focusedYear, monthNumber, focusedDay))
  }

  function handleFocusNewYear(selectedOption: SegmentItem) {
    const focusedDay = focusedDate.day
    const focusedMonth = focusedDate.month
    const newYear = selectedOption.value
    setFocusedDate(new CalendarDate(newYear, focusedMonth, focusedDay))
  }

  return {
    focusNextPage,
    focusPreviousPage,
    handleFocusNewMonth,
    handleFocusNewYear,
    focusedDate,
    yearsOptions,
  }
}

function getYearsRange(minYear: number = 1900, maxYear: number = 2100) {
  const items: SegmentItem[] = []

  for (let i = minYear; i <= maxYear; i++) {
    items.push({ label: String(i), value: i })
  }

  return items
}

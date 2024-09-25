import { useContext } from 'react'
import { CalendarStateContext } from 'react-aria-components'
import { CalendarDate } from '@internationalized/date'
import { SegmentItem } from '../types'

export function useCalendarHeader() {
  const {
    focusNextPage,
    focusPreviousPage,
    setFocusedDate,
    focusedDate,
    /* ...calendar */
  } = useContext(CalendarStateContext)

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
    focusedDate
  }
}

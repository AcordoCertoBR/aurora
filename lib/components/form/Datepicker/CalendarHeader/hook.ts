import { useContext, useEffect, useMemo } from 'react'
import { CalendarStateContext } from 'react-aria-components'
import { CalendarDate } from '@internationalized/date'
import { SegmentItem } from '../types'

type UseCalendarHeaderProps = {
  defaultFocusDate?: CalendarDate
}

export function useCalendarHeader({
  defaultFocusDate,
}: UseCalendarHeaderProps) {
  const {
    focusNextPage,
    focusPreviousPage,
    setFocusedDate,
    focusedDate,
    minValue,
    maxValue,
  } = useContext(CalendarStateContext)

  const yearsOptions = useMemo(() => {
    const minYear = minValue?.year || 1900
    const maxYear = maxValue?.year || 2100
    const items: SegmentItem[] = []

    for (let i = minYear; i <= maxYear; i++) {
      items.push({ label: String(i), value: i })
    }

    return items
  }, [minValue, maxValue])

  const monthsOptions = useMemo(
    () =>
      [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
      ].map((label, idx) => ({ label, value: idx + 1 })),
    [],
  )

  useEffect(() => {
    if (defaultFocusDate) {
      setFocusedDate(defaultFocusDate)
    }
  }, [defaultFocusDate])

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
    monthsOptions,
  }
}

import { useContext } from 'react'
import { CalendarStateContext } from 'react-aria-components'
import { CalendarDate } from '@internationalized/date'
import { IconChevronLeft, IconChevronRight } from '../../../icons'
import { Segment } from '../Segment'

import { months } from './constants'
import { SegmentItem } from '../types'
import './styles.scss'

export const CalendarHeader = () => {
  const {
    focusNextPage,
    focusPreviousPage,
    setFocusedDate,
    focusedDate,
    ...calendar
  } = useContext(CalendarStateContext)

  function handleFocusNewMonth(month: SegmentItem) {
    const monthNumber = month.value as number
    const focusedDay = focusedDate.day
    const focusedYear = focusedDate.year
    setFocusedDate(new CalendarDate(focusedYear, monthNumber, focusedDay))
  }

  console.log({ calendar })
  return (
    <div className="au-datepicker__header" aria-label="Anterior">
      <button
        className="au-datepicker__header-navigation-btn"
        onClick={focusPreviousPage}>
        <IconChevronLeft />
      </button>
      <div className="au-datepicker__header-segments">
        <Segment
          currentValue={focusedDate.month}
          mobileTitle="Escolha o mês"
          onSelect={handleFocusNewMonth}
          options={months}
        />
        <Segment
          currentValue={2020}
          mobileTitle="Escolha o ano"
          onSelect={() => {}}
          options={[
            { label: '2020', value: 2020 },
            { label: '2020', value: 2020 },
            { label: '2020', value: 2020 },
            { label: '2020', value: 2020 },
          ]}
        />
      </div>
      <button
        className="au-datepicker__header-navigation-btn"
        aria-label="Próximo"
        onClick={focusNextPage}>
        <IconChevronRight />
      </button>
    </div>
  )
}

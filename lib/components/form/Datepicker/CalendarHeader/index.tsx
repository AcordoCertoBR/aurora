import { IconChevronLeft, IconChevronRight } from '../../../icons'
import { Segment } from '../Segment'

import { months } from './constants'
import { useCalendarHeader } from './hook'

import './styles.scss'

export const CalendarHeader = () => {
  const {
    focusNextPage,
    focusPreviousPage,
    focusedDate,
    handleFocusNewMonth,
    yearsOptions,
    handleFocusNewYear,
  } = useCalendarHeader()

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
          currentValue={focusedDate.year}
          mobileTitle="Escolha o ano"
          onSelect={handleFocusNewYear}
          options={yearsOptions}
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

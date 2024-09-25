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
    /* handleFocusNewYear, */
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
          onSelect={handleFocusNewMonth}
          options={[
            { label: '2019', value: 2019 },
            { label: '2020', value: 2020 },
            { label: '2020', value: 2020 },
            { label: '2024', value: 2024 },
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

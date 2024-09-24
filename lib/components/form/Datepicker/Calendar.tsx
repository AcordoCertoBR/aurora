import classNames from 'classnames'
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  Heading,
} from 'react-aria-components'

type DatepickerCalendarProps = {
  isVisible: boolean
  toggleCalendar: () => void
}

export const DatepickerCalendar = ({
  isVisible,
  toggleCalendar,
}: DatepickerCalendarProps) => {
  const componentClass = classNames('au-datepicker__calendar', {
    'au-datepicker__calendar--visible': isVisible,
  })
  return (
    <div className={componentClass}>
      <div
        className="au-datepicker__calendar-backdrop"
        onClick={toggleCalendar}
      />
      <div className="au-datepicker__calendar-card">
        <Calendar>
          <Button slot="previous">◀</Button>
          <Heading />
          <Button slot="next">▶</Button>
          <CalendarGrid>{(date) => <CalendarCell date={date} />}</CalendarGrid>
        </Calendar>
      </div>
    </div>
  )
}

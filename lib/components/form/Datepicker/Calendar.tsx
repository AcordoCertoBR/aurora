import classNames from 'classnames'

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
      <div className="au-datepicker__calendar-card"></div>
    </div>
  )
}

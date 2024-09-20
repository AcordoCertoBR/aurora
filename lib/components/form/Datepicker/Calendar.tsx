import classNames from 'classnames'

type DatepickerCalendarProps = {
  isVisible: boolean
}

export const DatepickerCalendar = ({ isVisible }: DatepickerCalendarProps) => {
  const componentClass = classNames('au-datepicker__calendar', {
    'au-datepicker__calendar--visible': isVisible,
  })
  return <div className={componentClass}>potato</div>
}

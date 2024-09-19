import { DatePicker } from 'react-aria-components'
import { InputField } from '../InputField'
import { DatepickerProps } from './types'
import { useDatepicker } from './hook'
import './styles.scss'
import { IconCalendar } from '../../icons'

export const Datepicker = ({
  mode = 'calendar',
  placeholder = 'DD/MM/YYYY',
  disabled,
  onChange,
  ...props
}: DatepickerProps) => {
  const { date, handleDateChange } = useDatepicker({ onChange })
  const isCalendar = mode === 'calendar'

  console.log(mode)

  return (
    <div className="au-datepicker">
      <DatePicker>
        <InputField
          className="au-datepicker__input"
          {...props}
          maxLength={10}
          value={date}
          disabled={disabled}
          onChange={handleDateChange}
          placeholder={placeholder}
        />
      </DatePicker>
      {isCalendar && (
        <div className="au-datepicker__calendar-holder">
          <IconCalendar />
        </div>
      )}
    </div>
  )
}

// TODO - implement as a different field
export const RangePicker = () => {
  return <p></p>
}

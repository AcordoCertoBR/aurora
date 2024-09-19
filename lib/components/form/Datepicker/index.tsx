import { DatePicker } from 'react-aria-components'
import { InputField } from '../InputField'
import { DatepickerProps } from './types'
import { useDatepicker } from './hook'
import './styles.scss'
import { IconCalendar } from '../../icons'
import { COLOR_NEUTRAL_40 } from '../../../main'

export const Datepicker = ({
  calendar = true,
  placeholder = 'DD/MM/YYYY',
  disabled,
  onChange,
  ...props
}: DatepickerProps) => {
  const { date, handleDateChange, showCalendar } = useDatepicker({ onChange })

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
          rightSlot={
            calendar && (
              <div
                className="au-datepicker__calendar-holder"
                style={{ color: 'red' }}
                onClick={showCalendar}>
                <IconCalendar
                  rawColor={disabled ? COLOR_NEUTRAL_40 : undefined}
                />
              </div>
            )
          }
        />
      </DatePicker>
    </div>
  )
}

// TODO - implement as a different field
export const RangePicker = () => {
  return <p></p>
}

import { DatePicker } from 'react-aria-components'
import { InputField } from '../InputField'
import { DatepickerProps } from './types'
import { IconCalendar } from '../../icons'
import { COLOR_NEUTRAL_40 } from '../../../main'
import { DatepickerCalendar } from './Calendar'
import { CalendarDate } from '@internationalized/date'

import { useDatepicker } from './hook'
import './styles.scss'

export const Datepicker = ({
  calendar = true,
  placeholder,
  disabled,
  onChange,
  value,
  defaultValue,
  onBlur,
  ...props
}: DatepickerProps) => {
  const {
    inputDate,
    handleInputChange,
    handleInputBlur,
    toggleCalendar,
    isCalendarVisible,
    fmtPlaceholder,
    inputRef,
  } = useDatepicker({
    onChange,
    value,
    defaultValue,
    placeholder,
    onBlur,
  })

  return (
    <div className="au-datepicker">
      <DatePicker
        value={new CalendarDate(2000, 1, 29)}
        onChange={(date) => console.log(date)}>
        <InputField
          className="au-datepicker__input"
          {...props}
          maxLength={10}
          value={inputDate}
          inputRef={inputRef}
          onBlur={handleInputBlur}
          disabled={disabled}
          onChange={handleInputChange}
          placeholder={fmtPlaceholder}
          rightSlot={
            calendar && (
              <div
                className="au-datepicker__calendar-holder"
                style={{ color: 'red' }}
                onClick={toggleCalendar}>
                <IconCalendar
                  rawColor={disabled ? COLOR_NEUTRAL_40 : undefined}
                />
              </div>
            )
          }
        />
        {calendar && (
          <DatepickerCalendar
            isVisible={isCalendarVisible}
            toggleCalendar={toggleCalendar}
          />
        )}
      </DatePicker>
    </div>
  )
}

// TODO - implement as a different field
export const RangePicker = () => {
  return <p></p>
}
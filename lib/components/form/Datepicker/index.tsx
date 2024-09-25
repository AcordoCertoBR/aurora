import { useState } from 'react'
import { DatePicker, DateValue } from 'react-aria-components'
import { CalendarDate } from '@internationalized/date'
import { InputField } from '../InputField'
import { InputProps } from '../InputField'
import { IconCalendar } from '../../icons'
import { COLOR_NEUTRAL_40 } from '../../../main'
import { DatepickerCalendar } from './Calendar'

import { useDatepicker } from './hook'
import './styles.scss'
import { DefaultValue, EventHandler, FormatAdapter } from './types'
import { dateToPickerFormat } from './helpers'

type DatepickerProps = InputProps & {
  calendar?: boolean
  defaultDate?: Date
  style?: React.CSSProperties
  placeholder?: string
  value?: Date
  onChange?: EventHandler
  onBlur?: EventHandler
  /** Field default value */
  defaultValue?: DefaultValue
  format?: FormatAdapter
  withPortal?: boolean
  minValue?: Date
  maxValue?: Date
}

export const Datepicker = ({
  calendar = true,
  placeholder,
  disabled,
  onChange,
  value,
  defaultValue,
  onBlur,
  withPortal = true,
  minValue = new Date('1900-01-01'),
  maxValue = new Date('2100-12-31'),
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

  console.log({ minValue, maxValue })
  const [pickerState, setPickerState] = useState<CalendarDate | DateValue>()
  /* new CalendarDate(2000, 1, 29), */

  return (
    <div className="au-datepicker">
      <DatePicker
        value={pickerState}
        minValue={minValue && dateToPickerFormat(minValue)}
        maxValue={maxValue && dateToPickerFormat(maxValue)}
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
            withPortal={withPortal}
            hasSelectedDate={!!pickerState}
            toggleCalendar={toggleCalendar}
            onChange={(date) => setPickerState(date)}
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

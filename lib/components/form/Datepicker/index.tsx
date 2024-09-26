import { InputField } from '../InputField'
import { InputProps } from '../InputField'
import { IconCalendar } from '../../icons'
import { COLOR_NEUTRAL_40 } from '../../../main'
import { DatepickerCalendar } from './Calendar'

import {
  AUCalendarDateShape,
  DefaultValue,
  EventHandler,
  FormatAdapter,
} from './types'

import { AUCalendarDate } from './helpers'
import { useDatepicker } from './hook'
import './styles.scss'

type DatepickerFieldProps = InputProps & {
  calendar?: boolean
  defaultDate?: AUCalendarDateShape
  style?: React.CSSProperties
  placeholder?: string
  value?: AUCalendarDateShape
  onChange?: EventHandler
  onBlur?: EventHandler
  /** Field default value */
  defaultValue?: DefaultValue
  format?: FormatAdapter
  withPortal?: boolean
  minValue?: AUCalendarDateShape
  maxValue?: AUCalendarDateShape
}

export const DatepickerField = ({
  calendar = true,
  placeholder,
  disabled,
  onChange,
  value,
  defaultValue,
  onBlur,
  withPortal = true,
  minValue = AUCalendarDate(1, 1, 1900),
  maxValue = AUCalendarDate(31, 12, 2100),
  ...props
}: DatepickerFieldProps) => {
  const {
    inputDate,
    handleInputChange,
    handleInputBlur,
    toggleCalendar,
    closeCalendar,
    isCalendarVisible,
    fmtPlaceholder,
    inputRef,
    selectedDate,
    updateDateFromCalendar,
  } = useDatepicker({
    onChange,
    value,
    defaultValue,
    placeholder,
    minValue,
    maxValue,
    onBlur,
  })

  return (
    <div className="au-datepicker">
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
          onClose={closeCalendar}
          minValue={minValue}
          maxValue={maxValue}
          value={selectedDate}
          onChange={updateDateFromCalendar}
        />
      )}
    </div>
  )
}

// TODO - implement as a different field
export const RangePicker = () => {
  return <p></p>
}

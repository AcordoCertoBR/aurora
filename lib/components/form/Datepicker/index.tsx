import { COLOR_NEUTRAL_40 } from '@core/tokens'
import { IconCalendar } from '@components/icons'
import { InputField } from '../InputField'
import { InputProps } from '../InputField'
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

type DatepickerFieldProps = Omit<InputProps, 'value' | 'onChange'> & {
  /** Use calendar dialog to pick date */
  calendar?: boolean
  placeholder?: string
  value?: AUCalendarDateShape | null
  onChange?: EventHandler
  onBlur?: EventHandler
  /** Default date to use the datepicker as an uncontrolled component */
  defaultValue?: DefaultValue
  /** Adapter to modify input behavior - default to DD/MM/YYYY adapter */
  format?: FormatAdapter
  /** Makes the calendar dialog the top z-indexed item on page */
  withPortal?: boolean
  /** min allowed date, defaults to 1900-01-01 */
  minValue?: AUCalendarDateShape
  /** max allowed date, defaults to 2100-12-31 */
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
  onFocus,
  ...props
}: DatepickerFieldProps) => {
  const {
    inputDate,
    handleInputChange,
    handleInputBlur,
    closeCalendar,
    isCalendarVisible,
    fmtPlaceholder,
    inputRef,
    selectedDate,
    updateDateFromCalendar,
    rootEl,
    handleCalendarClick,
    handleInputFocus,
    isMobileInputWithCalendar,
  } = useDatepicker({
    onChange,
    value,
    defaultValue,
    placeholder,
    minValue,
    maxValue,
    onBlur,
    onFocus,
    calendar,
    disabled,
  })

  return (
    <div className="au-datepicker" onClick={() => console.log("heheheh")} ref={rootEl}>
      <InputField
        className="au-datepicker__input"
        {...props}
        maxLength={10}
        value={inputDate}
        type="text"
        inputRef={inputRef}
        onBlur={handleInputBlur}
        disabled={disabled}
        inputMode={isMobileInputWithCalendar ? 'none' : undefined}
        onChange={handleInputChange}
        placeholder={fmtPlaceholder}
        onFocus={handleInputFocus}
        rightSlot={
          calendar && (
            <div
              className="au-datepicker__calendar-holder"
              onClick={handleCalendarClick}>
              <IconCalendar
                rawColor={disabled ? COLOR_NEUTRAL_40 : undefined}
              />
            </div>
          )
        }
      />
      {calendar && (
        <DatepickerCalendar
          withPortal={withPortal}
          isVisible={isCalendarVisible}
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

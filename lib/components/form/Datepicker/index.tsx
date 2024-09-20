import { DatePicker } from 'react-aria-components'
import { InputField } from '../InputField'
import { DatepickerProps } from './types'
import { useDatepicker } from './hook'
import './styles.scss'
import { IconCalendar } from '../../icons'
import { COLOR_NEUTRAL_40 } from '../../../main'

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
    showCalendar,
    fmtPlaceholder,
  } = useDatepicker({
    onChange,
    value,
    defaultValue,
    placeholder,
    onBlur,
  })

  return (
    <div className="au-datepicker" onBlur={handleInputBlur}>
      <DatePicker>
        <InputField
          className="au-datepicker__input"
          {...props}
          maxLength={10}
          value={inputDate}
          disabled={disabled}
          onChange={handleInputChange}
          placeholder={fmtPlaceholder}
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

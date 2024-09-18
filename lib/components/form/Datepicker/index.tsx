import { DatePicker } from 'react-aria-components'
import { InputField } from '../InputField'
import { DatepickerProps } from './types'
import { useDatepicker } from './hook'
import './styles.scss'

export const Datepicker = (props: DatepickerProps) => {
  const {
    mode = 'calendar',
    placeholder = 'DD/MM/YYYY',
    style = {},
    date,
    handleDateChange,
  } = useDatepicker(props)

  console.log(mode)
  return (
    <div className="au-datepicker">
      <DatePicker>
        <InputField
          className="au-datepicker__input"
          style={style}
          label="lala"
          maxLength={10}
          value={date}
          onChange={handleDateChange}
          placeholder={placeholder}
        />
      </DatePicker>
    </div>
  )
}

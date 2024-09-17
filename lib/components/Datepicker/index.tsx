import { DatePicker } from 'react-aria-components'
import './styles.scss'

type DatepickerMode = 'simple' | 'calendar'

type DatepickerProps = {
  mode?: DatepickerMode
  defaultDate?: Date
}

export const Datepicker = ({ mode = 'calendar' }: DatepickerProps) => {
  return <DatePicker>
    <input type='date' />
  </DatePicker>
}

import { DatePicker } from 'react-aria-components'
import './styles.scss'

type DatepickerProps = {
  teste: string
}

export const Datepicker = ({ teste = 'lala' }: DatepickerProps) => {
  return <DatePicker>{teste}</DatePicker>
}

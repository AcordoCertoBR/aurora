import { useContext } from 'react'
import { CalendarStateContext } from 'react-aria-components'
import { IconChevronLeft, IconChevronRight } from '../../icons'
import { Segment } from './Segment'

type CalendarHeaderprops = {
  color?: string
}

export const CalendarHeader = ({ color }: CalendarHeaderprops) => {
  const { focusNextPage, focusPreviousPage } = useContext(CalendarStateContext)

  return (
    <div className="au-datepicker__header" aria-label="Anterior">
      <button
        className="au-datepicker__navigation-btn"
        onClick={focusPreviousPage}>
        <IconChevronLeft />
      </button>
      <div>
        <Segment
          currentItem={{ label: 'Janeiro', value: 1 }}
          mobileTitle="Escolha o mês"
          options={[
            { label: 'Janeiro', value: 1 },
            { label: 'Fevereiro', value: 2 },
            { label: 'Março', value: 3 },
            { label: 'Março', value: 3 },
            { label: 'Março', value: 3 },
            { label: 'Março', value: 3 },
            { label: 'Março', value: 3 },
            { label: 'Março', value: 3 },
            { label: 'Março', value: 3 },
            { label: 'Março', value: 3 },
            { label: 'Março', value: 3 },
            { label: 'Março', value: 3 },
          ]}
        />
      </div>
      <button
        className="au-datepicker__navigation-btn"
        aria-label="Próximo"
        onClick={focusNextPage}>
        <IconChevronRight />
      </button>
    </div>
  )
}

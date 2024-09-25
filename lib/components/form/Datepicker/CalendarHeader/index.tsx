import { useContext } from 'react'
import { CalendarStateContext } from 'react-aria-components'
import { IconChevronLeft, IconChevronRight } from '../../../icons'
import { Segment } from '../Segment'

import "./styles.scss"

type CalendarHeaderprops = {
  color?: string
}

// TODO portal for mobile version

export const CalendarHeader = ({ color }: CalendarHeaderprops) => {
  const { focusNextPage, focusPreviousPage } = useContext(CalendarStateContext)
  console.log(color)
  return (
    <div className="au-datepicker__header" aria-label="Anterior">
      <button
        className="au-datepicker__header-navigation-btn"
        onClick={focusPreviousPage}>
        <IconChevronLeft />
      </button>
      <div className="au-datepicker__header-segments">
        <Segment
          currentItem={{ label: 'Janeiro', value: 1 }}
          mobileTitle="Escolha o mês"
          onSelect={() => {}}
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
        <Segment
          currentItem={{ label: '2020', value: 2020 }}
          mobileTitle="Escolha o ano"
          onSelect={() => {}}
          options={[
            { label: '2020', value: 2020 },
            { label: '2020', value: 2020 },
            { label: '2020', value: 2020 },
            { label: '2020', value: 2020 },
          ]}
        />
      </div>
      <button
        className="au-datepicker__header-navigation-btn"
        aria-label="Próximo"
        onClick={focusNextPage}>
        <IconChevronRight />
      </button>
    </div>
  )
}

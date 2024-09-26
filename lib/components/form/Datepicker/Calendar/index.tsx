import classNames from 'classnames'
import {
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
} from 'react-aria-components'
import { CalendarHeader } from '../CalendarHeader'
import { PortalHolder } from '../PortalHolder'

import { Button } from '../../../Button'
import { AUCalendarDateShape } from '../types'

import { useCalendar } from './hook'
import './styles.scss'

type DatepickerCalendarProps = {
  isVisible: boolean
  withPortal?: boolean
  minValue: AUCalendarDateShape
  maxValue: AUCalendarDateShape
  value?: AUCalendarDateShape | null
  onClose: () => void
  onChange: (date: AUCalendarDateShape) => void
}

export const DatepickerCalendar = ({
  isVisible,
  onClose,
  withPortal,
  minValue,
  maxValue,
  value,
  onChange,
}: DatepickerCalendarProps) => {
  const {
    rootEl,
    usedMaxValue,
    usedMinValue,
    calendarInternalState,
    calendarChange,
    fmtWeekday,
    actionChange,
  } = useCalendar({
    onChange,
    onClose,
    minValue,
    maxValue,
    value,
  })

  const componentClass = classNames('au-datepicker__calendar', {
    'au-datepicker__calendar--visible': isVisible,
  })

  return (
    <PortalHolder withPortal={withPortal}>
      <div className={componentClass} ref={rootEl}>
        <div className="au-datepicker__calendar-backdrop" onClick={onClose} />
        <div className="au-datepicker__calendar-card">
          <Calendar
            autoFocus
            className="au-datepicker__calendar-base"
            minValue={usedMinValue}
            maxValue={usedMaxValue}
            value={calendarInternalState}
            onChange={calendarChange}>
            <CalendarHeader defaultFocusDate={calendarInternalState} />
            <CalendarGrid
              className="au-datepicker__calendar-grid"
              weekdayStyle="short">
              <CalendarGridHeader>
                {(day) => (
                  <CalendarHeaderCell className="au-datepicker__calendar-weekday">
                    {fmtWeekday(day)}
                  </CalendarHeaderCell>
                )}
              </CalendarGridHeader>
              <CalendarGridBody>
                {(date) => (
                  <CalendarCell
                    className="au-datepicker__calendar-day"
                    date={date}
                  />
                )}
              </CalendarGridBody>
            </CalendarGrid>
          </Calendar>
          <div className="au-datepicker__calendar-actions-dock">
            <Button
              type="outlined"
              className="au-datepicker__calendar-cancel"
              expand="x"
              onClick={onClose}>
              Cancelar
            </Button>
            <Button
              disabled={!calendarInternalState}
              onClick={actionChange}
              expand="x">
              Confirmar
            </Button>
          </div>
        </div>
      </div>
    </PortalHolder>
  )
}

import classNames from 'classnames'
import {
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
} from 'react-aria-components'
import { Button } from '@components/Button'
import { CalendarHeader } from '../CalendarHeader'
import { PortalHolder } from '../PortalHolder'


import { AUCalendarDateShape } from '../types'
import { useCalendar } from './hook'
import './styles.scss'

type DatepickerCalendarProps = {
  withPortal?: boolean
  minValue: AUCalendarDateShape
  maxValue: AUCalendarDateShape
  value?: AUCalendarDateShape | null
  onClose: () => void
  onChange: (date: AUCalendarDateShape) => void
  isVisible: boolean
}

export const DatepickerCalendar = ({
  onClose,
  withPortal,
  minValue,
  maxValue,
  value,
  onChange,
  isVisible,
}: DatepickerCalendarProps) => {
  const {
    rootEl,
    usedMaxValue,
    usedMinValue,
    calendarInternalState,
    calendarChange,
    fmtWeekday,
    actionChange,
    enteredAnimation,
    delayedIsVisible,
  } = useCalendar({
    onChange,
    onClose,
    minValue,
    maxValue,
    value,
    isVisible,
  })

  const componentClass = classNames('au-datepicker__calendar', {
    'au-datepicker__calendar--visible': enteredAnimation,
  })

  if (!delayedIsVisible) return

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

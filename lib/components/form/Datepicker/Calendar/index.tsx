import { useEffect, useMemo, useRef } from 'react'
import classNames from 'classnames'
import {
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
} from 'react-aria-components'
import { CalendarDate } from '@internationalized/date'
import { CalendarHeader } from '../CalendarHeader'
import { PortalHolder } from '../PortalHolder'
import { useOutsideClick } from '../../../../core/hooks/useOutsideClick'
import { BREAKPOINT_MD } from '../../../../main'
import { Button } from '../../../Button'

import './styles.scss'
import { AUCalendarDateShape } from '../types'

type DatepickerCalendarProps = {
  isVisible: boolean
  toggleCalendar: () => void
  withPortal?: boolean
  minValue: AUCalendarDateShape
  maxValue: AUCalendarDateShape
  value?: AUCalendarDateShape | null
  onChange: (date: AUCalendarDateShape) => void
}

export const DatepickerCalendar = ({
  isVisible,
  toggleCalendar,
  withPortal,
  minValue,
  maxValue,
  value,
}: DatepickerCalendarProps) => {
  const rootEl = useRef<HTMLDivElement>(null)
  const { listenOutsideClick } = useOutsideClick({
    rootEl,
    breakpoint: BREAKPOINT_MD,
    onLoseFocusCB: toggleCalendar,
  })

  const usedMinValue = new CalendarDate(
    minValue.year,
    minValue.month,
    minValue.date,
  )
  const usedMaxValue = new CalendarDate(
    maxValue.year,
    maxValue.month,
    maxValue.date,
  )

  const calendarFormattedDate = useMemo(() => {
    if (!value) return null
    const { date, month, year } = value
    return new CalendarDate(year, month, date)
  }, [value])

  const componentClass = classNames('au-datepicker__calendar', {
    'au-datepicker__calendar--visible': isVisible,
  })

  useEffect(() => {
    if (isVisible) {
      listenOutsideClick()
    }
  }, [isVisible])

  const fmtWeekday = (day: string) => {
    const capitalized = `${day.charAt(0).toUpperCase()}${day.slice(1)}`
    return capitalized.replace('.', '')
  }

  return (
    <PortalHolder withPortal={withPortal}>
      <div className={componentClass} ref={rootEl}>
        <div
          className="au-datepicker__calendar-backdrop"
          onClick={toggleCalendar}
        />
        <div className="au-datepicker__calendar-card">
          <Calendar
            className="au-datepicker__calendar-base"
            minValue={usedMinValue}
            maxValue={usedMaxValue}
            value={calendarFormattedDate}>
            <CalendarHeader />
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
              onClick={toggleCalendar}>
              Cancelar
            </Button>
            <Button disabled={!calendarFormattedDate} expand="x">
              Confirmar
            </Button>
          </div>
        </div>
      </div>
    </PortalHolder>
  )
}

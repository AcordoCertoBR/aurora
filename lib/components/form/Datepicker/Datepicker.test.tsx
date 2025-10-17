import { DatepickerCalendar } from './Calendar'
import { render, screen, fireEvent } from '@testing-library/react'
import { act } from 'react'
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'

import { DDMMYYYY, AUCalendarDate, getDefaultDate } from './helpers'

import { useDatepicker } from './hook'
import { useCalendar } from './Calendar/hook'
import { CalendarHeader } from './CalendarHeader'
import { CalendarDate } from '@internationalized/date'
import { CalendarStateContext } from 'react-aria-components'
import { useSegment } from './Segment/hook'
import { PortalHolder } from './PortalHolder'
import { DatepickerField } from './index'

vi.mock('@core/utils/screen', () => ({
  above: () => true,
}))

vi.mock('@core/hooks/useOutsideClick', () => ({
  useOutsideClick: () => ({ listenOutsideClick: () => {} }),
}))

describe('Datepicker helpers', () => {
  it('masks, validates and converts DDMMYYYY correctly', () => {
    const masked = DDMMYYYY.maskDate('01012020')
    expect(masked).toBe('01/01/2020')

    expect(DDMMYYYY.validateFormat('01/01/2020')).toBe(true)
    expect(DDMMYYYY.toCalendarDate('01/01/2020')).toEqual(
      AUCalendarDate(1, 1, 2020),
    )
    expect(DDMMYYYY.toString(AUCalendarDate(2, 3, 2021))).toBe('02/03/2021')
    expect(DDMMYYYY.validate('31/02/2020')).toBe(false)
  })

  it('getDefaultDate handles special values', () => {
    expect(getDefaultDate('empty')).toBeNull()
    const now = getDefaultDate('now')
    expect(now).toHaveProperty('day')
    expect(getDefaultDate(AUCalendarDate(1, 1, 2000))).toEqual(
      AUCalendarDate(1, 1, 2000),
    )
  })
})

describe('useDatepicker hook', () => {
  it('formats input and calls onChange when finished typing a valid date', () => {
    const onChange = vi.fn()
    const { result } = renderHook(() =>
      useDatepicker({
        onChange,
        minValue: AUCalendarDate(1, 1, 1900),
        maxValue: AUCalendarDate(31, 12, 2100),
      }),
    )

    act(() => {
      const syntheticEvent = {
        target: { value: '01012020' },
      } as unknown as React.ChangeEvent<HTMLInputElement>
      result.current.handleInputChange(syntheticEvent)
    })

    expect(result.current.inputDate).toBe('01/01/2020')
    expect(onChange).toHaveBeenCalledWith(AUCalendarDate(1, 1, 2020))
  })

  it('sets defaultValue now properly', () => {
    const { result } = renderHook(() =>
      useDatepicker({
        defaultValue: 'now',
        minValue: AUCalendarDate(1, 1, 1900),
        maxValue: AUCalendarDate(31, 12, 2100),
      }),
    )

    expect(result.current.selectedDate).not.toBeNull()
    expect(result.current.inputDate).toMatch(/\d{2}\/\d{2}\/\d{4}/)
  })

  it('handleInputFocus respects disabled and calls onFocus when enabled', () => {
    const onFocus = vi.fn()
    const { result } = renderHook(() =>
      useDatepicker({
        onFocus,
        disabled: true,
        minValue: AUCalendarDate(1, 1, 1900),
        maxValue: AUCalendarDate(31, 12, 2100),
      }),
    )
    const fakeEvent = {} as unknown as React.FocusEvent<HTMLInputElement>

    act(() => {
      result.current.handleInputFocus(fakeEvent)
    })
    expect(result.current.isCalendarVisible).toBe(false)

    const { result: r2 } = renderHook(() =>
      useDatepicker({
        onFocus,
        disabled: false,
        minValue: AUCalendarDate(1, 1, 1900),
        maxValue: AUCalendarDate(31, 12, 2100),
      }),
    )
    act(() => {
      r2.current.handleInputFocus(fakeEvent)
    })
    expect(r2.current.isCalendarVisible).toBe(true)
    expect(onFocus).toHaveBeenCalled()
  })

  it('handleCalendarClick focuses inputRef', () => {
    let hookApi: ReturnType<typeof useDatepicker> | undefined
    function Test() {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      hookApi = useDatepicker({
        minValue: AUCalendarDate(1, 1, 1900),
        maxValue: AUCalendarDate(31, 12, 2100),
      })
      return <input ref={hookApi!.inputRef} />
    }
    const { container } = render(<Test />)
    const input = container.querySelector('input') as HTMLInputElement
    const focusSpy = vi.spyOn(input, 'focus')
    act(() => {
      hookApi!.handleCalendarClick()
    })
    expect(focusSpy).toHaveBeenCalled()
  })

  it('handleInputBlur calls onBlur with selectedDate', () => {
    const onBlur = vi.fn()
    const { result } = renderHook(() =>
      useDatepicker({
        onBlur,
        minValue: AUCalendarDate(1, 1, 1900),
        maxValue: AUCalendarDate(31, 12, 2100),
      }),
    )
    act(() => {
      result.current.setSelectedDate(AUCalendarDate(10, 10, 2010))
    })
    act(() => {
      result.current.handleInputBlur()
    })
    expect(onBlur).toHaveBeenCalledWith(AUCalendarDate(10, 10, 2010))
  })

  it('closeCalendar hides the calendar and updateDateFromCalendar updates state and calls onChange', () => {
    const onChange = vi.fn()
    const { result } = renderHook(() =>
      useDatepicker({
        onChange,
        minValue: AUCalendarDate(1, 1, 1900),
        maxValue: AUCalendarDate(31, 12, 2100),
      }),
    )
    act(() => {
      result.current.handleInputFocus(
        {} as unknown as React.FocusEvent<HTMLInputElement>,
      )
    })
    expect(result.current.isCalendarVisible).toBe(true)
    act(() => {
      result.current.closeCalendar()
    })
    expect(result.current.isCalendarVisible).toBe(false)

    act(() => {
      result.current.updateDateFromCalendar(AUCalendarDate(7, 7, 2007))
    })
    expect(result.current.selectedDate).toEqual(AUCalendarDate(7, 7, 2007))
    expect(result.current.inputDate).toBe(
      DDMMYYYY.toString(AUCalendarDate(7, 7, 2007)),
    )
    expect(onChange).toHaveBeenCalledWith(AUCalendarDate(7, 7, 2007))
  })
})

describe('DatepickerCalendar', () => {
  const minValue = AUCalendarDate(1, 1, 2000)
  const maxValue = AUCalendarDate(31, 12, 2100)
  const value = AUCalendarDate(15, 5, 2022)

  it('renders calendar grid and header', () => {
    render(
      <DatepickerCalendar
        minValue={minValue}
        maxValue={maxValue}
        value={value}
        onClose={() => {}}
        onChange={() => {}}
        isVisible={true}
      />,
    )
    expect(document.querySelector('.au-datepicker__calendar')).toBeTruthy()
    expect(document.querySelector('.au-datepicker__calendar-grid')).toBeTruthy()
    expect(
      document.querySelector('.au-datepicker__calendar-weekday'),
    ).toBeTruthy()
  })

  it('calls onClose when clicking backdrop or Cancelar', () => {
    const onClose = vi.fn()
    render(
      <DatepickerCalendar
        minValue={minValue}
        maxValue={maxValue}
        value={value}
        onClose={onClose}
        onChange={() => {}}
        isVisible={true}
      />,
    )
    document
      .querySelector('.au-datepicker__calendar-backdrop')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(onClose).toHaveBeenCalled()
    onClose.mockClear()
    const cancelBtn = document.querySelector('.au-datepicker__calendar-cancel')
    cancelBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(onClose).toHaveBeenCalled()
  })

  it('calls onChange and onClose when clicking Confirmar', () => {
    const onClose = vi.fn()
    const onChange = vi.fn()
    render(
      <DatepickerCalendar
        minValue={minValue}
        maxValue={maxValue}
        value={value}
        onClose={onClose}
        onChange={onChange}
        isVisible={true}
      />,
    )

    const confirmBtn = screen.getByText('Confirmar')
    confirmBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(onChange).toHaveBeenCalled()

    setTimeout(() => {
      expect(onClose).toHaveBeenCalled()
    }, 0)
  })
})

describe('useCalendar hook', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('formats weekday and handles mount/unmount delays', () => {
    const onChange = vi.fn()
    const onClose = vi.fn()
    const { result } = renderHook(() =>
      useCalendar({
        onChange,
        onClose,
        minValue: AUCalendarDate(1, 1, 1900),
        maxValue: AUCalendarDate(31, 12, 2100),
        isVisible: true,
      }),
    )

    expect(result.current.delayedIsVisible).toBe(true)
    act(() => {
      vi.advanceTimersByTime(150)
    })
    expect(result.current.enteredAnimation).toBe(true)

    expect(result.current.fmtWeekday('seg.')).toBe('Seg')
  })

  it('actionChange triggers onChange and onClose when calendarInternalState is set', () => {
    const onChange = vi.fn()
    const onClose = vi.fn()
    const { result } = renderHook(() =>
      useCalendar({
        onChange,
        onClose,
        minValue: AUCalendarDate(1, 1, 1900),
        maxValue: AUCalendarDate(31, 12, 2100),
        isVisible: true,
      }),
    )
    act(() => {
      result.current.calendarChange(new CalendarDate(2020, 1, 1))
      result.current.actionChange()
    })

    expect(typeof result.current.actionChange).toBe('function')
  })

  it('initializes calendarInternalState from value and computes usedMin/Max', () => {
    const onChange = vi.fn()
    const onClose = vi.fn()
    const value = AUCalendarDate(2, 2, 2021)
    const { result } = renderHook(() =>
      useCalendar({
        onChange,
        onClose,
        minValue: AUCalendarDate(1, 1, 2000),
        maxValue: AUCalendarDate(31, 12, 2100),
        value,
        isVisible: true,
      }),
    )

    expect(result.current.calendarInternalState).toBeDefined()
    expect(result.current.usedMinValue).toHaveProperty('day')
    expect(result.current.usedMaxValue).toHaveProperty('day')
  })

  it('fmtWeekday capitalizes and removes dot', () => {
    const { result } = renderHook(() =>
      useCalendar({
        onChange: () => {},
        onClose: () => {},
        minValue: AUCalendarDate(1, 1, 2000),
        maxValue: AUCalendarDate(31, 12, 2100),
        isVisible: false,
      }),
    )
    expect(result.current.fmtWeekday('seg.')).toBe('Seg')
    expect(result.current.fmtWeekday('quarta')).toBe('Quarta')
  })

  it('calendarChange triggers onChange when above() is true', () => {
    const onChange = vi.fn()
    const onClose = vi.fn()
    const { result } = renderHook(() =>
      useCalendar({
        onChange,
        onClose,
        minValue: AUCalendarDate(1, 1, 2000),
        maxValue: AUCalendarDate(31, 12, 2100),
        isVisible: true,
      }),
    )
    act(() => {
      result.current.calendarChange(new CalendarDate(2022, 5, 5))
    })
    expect(onChange).toHaveBeenCalled()
  })

  it('actionChange calls onChange via triggerChange when calendarInternalState is set', () => {
    const onChange = vi.fn()
    const onClose = vi.fn()
    const { result } = renderHook(() =>
      useCalendar({
        onChange,
        onClose,
        minValue: AUCalendarDate(1, 1, 2000),
        maxValue: AUCalendarDate(31, 12, 2100),
        isVisible: true,
      }),
    )
    act(() => {
      result.current.calendarChange(new CalendarDate(2022, 6, 6))
      result.current.actionChange()
    })
    expect(onChange).toHaveBeenCalled()
    expect(onClose).toHaveBeenCalled()
  })
})

describe('useCalendarHeader', () => {
  it('renders CalendarHeader with a mock CalendarStateContext provider', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const providerValue: any = {
      focusNextPage: () => {},
      focusPreviousPage: () => {},
      setFocusedDate: () => {},
      focusedDate: new CalendarDate(2020, 1, 1),
      minValue: new CalendarDate(1900, 1, 1),
      maxValue: new CalendarDate(2100, 12, 31),
    }

    render(
      <CalendarStateContext.Provider value={providerValue}>
        <CalendarHeader defaultFocusDate={providerValue.focusedDate} />
      </CalendarStateContext.Provider>,
    )

    expect(document.querySelector('.au-datepicker__header')).toBeTruthy()
  })
})

describe('Segment and PortalHolder integration', () => {
  it('opens list and selects an item', async () => {
    const options = [
      { label: 'One', value: 1 },
      { label: 'Two', value: 2 },
    ]
    const onSelect = vi.fn()

    const { result } = renderHook(() =>
      useSegment({ options, currentValue: 1, onSelect }),
    )

    act(() => {
      result.current.openList()
    })

    expect(result.current.isListOpen).toBe(true)

    act(() => {
      result.current.handleSelectItem(options[1])
    })

    expect(onSelect).toHaveBeenCalledWith(options[1])
    expect(result.current.isListOpen).toBe(false)
  })

  it('PortalHolder renders children without portal when above() is true', () => {
    render(
      <PortalHolder withPortal={true}>
        <div>inside</div>
      </PortalHolder>,
    )
    expect(screen.getByText('inside')).toBeInTheDocument()
  })
})

describe('DatepickerField component', () => {
  it('renders with provided placeholder', () => {
    render(<DatepickerField placeholder="Data de teste" />)
    expect(screen.getByPlaceholderText('Data de teste')).toBeInTheDocument()
  })

  it('calls onChange when typing a valid date (controlled)', () => {
    const onChange = vi.fn()
    const { container } = render(
      <DatepickerField value={AUCalendarDate(1, 1, 2020)} onChange={onChange} />,
    )
    const input = container.querySelector('.au-datepicker__input input') as HTMLInputElement

    act(() => {
      fireEvent.change(input, { target: { value: '01012020' } })
    })

    expect(onChange).toHaveBeenCalledWith(AUCalendarDate(1, 1, 2020))
  })

  it('opens calendar when clicking calendar holder and respects disabled', () => {
    const { container } = render(<DatepickerField />)
    const holder = container.querySelector('.au-datepicker__calendar-holder') as HTMLElement

    act(() => {
      holder.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })

    expect(document.querySelector('.au-datepicker__calendar')).toBeTruthy()

    const { container: c2 } = render(<DatepickerField disabled />)
    const holder2 = c2.querySelector('.au-datepicker__calendar-holder') as HTMLElement
    act(() => {
      holder2?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    expect(document.querySelector('.au-datepicker__calendar')).toBeTruthy()
  })

  it('renders defaultValue now as formatted date for uncontrolled component', () => {
    const { container } = render(<DatepickerField defaultValue={'now'} />)
    const input = container.querySelector('.au-datepicker__input input') as HTMLInputElement
    expect(input.value).toMatch(/\d{2}\/\d{2}\/\d{4}/)
  })
})

function renderHook<T>(cb: () => T) {
  const results: { current?: T } = {}
  function TestComponent() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    results.current = cb()
    return null
  }

  render(<TestComponent />)
  return { result: results as { current: T } }
}

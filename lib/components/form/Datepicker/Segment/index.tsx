import classNames from 'classnames'
import { IconChevronDown, IconChevronLeft, IconX } from '@components/icons'

import { useSegment } from './hook'
import { SegmentItem } from '../types'
import './styles.scss'

type SegmentProps = {
  mobileTitle: string
  options: SegmentItem[]
  onSelect: (option: SegmentItem) => void
  currentValue: string | number
  minValue?: Date
  maxValue?: Date
}

export const Segment = ({
  currentValue,
  options,
  mobileTitle,
  onSelect,
}: SegmentProps) => {
  const {
    rootEl,
    isListOpen,
    openList,
    closeList,
    currentItem,
    handleSelectItem,
    selectedItem,
  } = useSegment({
    options,
    currentValue,
    onSelect,
  })

  return (
    <div
      ref={rootEl}
      tabIndex={0}
      className={classNames('au-datepicker__segment', {
        'au-datepicker__segment--open': isListOpen,
      })}>
      <div className="au-datepicker__segment-input" onClick={openList}>
        {currentItem?.label}
        <IconChevronDown />
      </div>
      <div className="au-datepicker__segment-list-holder">
        <div className="au-datepicker__segment-list-header">
          <div onClick={closeList}>
            <IconChevronLeft />
          </div>
          <h4 className="au-datepicker__segment-title">{mobileTitle}</h4>
          <div onClick={closeList}>
            <IconX />
          </div>
        </div>
        <ul className="au-datepicker__segment-list">
          {options.map((option, idx) => {
            const isSelectedItem = option.value === currentValue
            return (
              <li
                key={`au-datepicker-segment-li-${option.value}-${idx}`}
                onClick={() => handleSelectItem(option)}
                ref={isSelectedItem ? selectedItem : null}
                className={classNames('au-datepicker__segment-list-item', {
                  'au-datepicker__segment-list-item--active': isSelectedItem,
                })}>
                {option.label}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

import classNames from 'classnames'
import { IconChevronDown, IconChevronLeft, IconX } from '../../../icons'

import './styles.scss'
import { useSegment } from './hook'
import { SegmentItem } from '../types'

type SegmentProps = {
  mobileTitle: string
  options: SegmentItem[]
  onSelect: (option: SegmentItem) => void
  currentValue: string | number
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
          {options.map((option, idx) => (
            <li
              key={`au-datepicker-segment-li-${option.value}-${idx}`}
              onClick={() => handleSelectItem(option)}
              className={classNames('au-datepicker__segment-list-item', {
                'au-datepicker__segment-list-item--active':
                  option.value === currentValue,
              })}>
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

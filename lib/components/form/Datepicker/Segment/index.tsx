// TODO - use select field

import classNames from 'classnames'
import { IconChevronDown, IconChevronLeft, IconX } from '../../../icons'

import './styles.scss'
import { useSegment } from './hook'

type SegmentItem = { label: string; value: string | number }

type SegmentProps = {
  mobileTitle: string
  options: SegmentItem[]
  onSelect: (option: SegmentItem) => void
  currentItem: SegmentItem
}

export const Segment = ({
  currentItem,
  options,
  mobileTitle,
  onSelect,
}: SegmentProps) => {
  const { rootEl, isListOpen, openList, closeList } = useSegment()

  return (
    <div
      ref={rootEl}
      tabIndex={0}
      className={classNames('au-datepicker__segment', {
        'au-datepicker__segment--open': isListOpen,
      })}>
      <div className="au-datepicker__segment-input" onClick={openList}>
        {currentItem.label}
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
              onClick={() => onSelect(option)}
              className="au-datepicker__segment-list-item">
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

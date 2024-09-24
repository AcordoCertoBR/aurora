// TODO - use select field

import { useState } from 'react'
import { IconChevronDown, IconChevronLeft, IconX } from '../../icons'
import classNames from 'classnames'

type SegmentItem = { label: string; value: string | number }

type SegmentProps = {
  mobileTitle: string
  options: SegmentItem[]
  onSelect?: (option: SegmentItem) => void
  currentItem: SegmentItem
}

export const Segment = ({
  currentItem,
  options,
  mobileTitle,
}: SegmentProps) => {
  const [isListOpen, setIsListOpen] = useState(false)

  function toggleList() {
    setIsListOpen(!isListOpen)
  }

  return (
    <div
      className={classNames('au-datepicker__segment', {
        'au-datepicker__segment--open': isListOpen,
      })}>
      <div className="au-datepicker__segment-input" onClick={toggleList}>
        {currentItem.label}
        <IconChevronDown />
      </div>
      <div className="au-datepicker__segment-list-holder">
        <div className="au-datepicker__segment-list-header">
          <div onClick={toggleList}>
            <IconChevronLeft />
          </div>
          <h4 className="au-datepicker__segment-title">{mobileTitle}</h4>
          <div onClick={toggleList}>
            <IconX />
          </div>
        </div>
        <ul className="au-datepicker__segment-list">
          {options.map((option) => (
            <li
              key={`au-datepicker-segment-li-${option.value}`}
              className="au-datepicker__segment-list-item">
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

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
      className={classNames('au-datepicker__segment', {
        'au-datepicker__segment--open': isListOpen,
      })}>
      <button
        type="button"
        className="au-datepicker__segment-input"
        onClick={openList}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isListOpen}>
        {currentItem?.label}
        <IconChevronDown aria-hidden="true" />
      </button>
      <div className="au-datepicker__segment-list-holder">
        <div className="au-datepicker__segment-list-header">
          <button type="button" onClick={closeList} aria-label="Voltar">
            <IconChevronLeft aria-hidden="true" />
          </button>
          <h4 className="au-datepicker__segment-title">{mobileTitle}</h4>
          <button type="button" onClick={closeList} aria-label="Fechar">
            <IconX aria-hidden="true" />
          </button>
        </div>
        <ul className="au-datepicker__segment-list" role="listbox">
          {options.map((option, idx) => {
            const isSelectedItem = option.value === currentValue
            return (
              <li
                key={`au-datepicker-segment-li-${option.value}-${idx}`}
                onClick={() => handleSelectItem(option)}
                ref={isSelectedItem ? selectedItem : null}
                role="option"
                aria-selected={isSelectedItem}
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

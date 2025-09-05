/**
 * Carousel Component
 * 
 * @requires react-snap-carousel
 * This component requires the 'react-snap-carousel' package to be installed.
 * Install it using: npm install react-snap-carousel
 */

import classNames from 'classnames'
import { Scrollbar } from './Scrollbar'
import { Pagination } from './Pagination'
import useCarousel from './useCarousel'
import { CarouselProps } from './types'

import { Button } from '@components/Button'
import { Conditional } from '@components/misc'
import { IconChevronLeft, IconChevronRight } from '@components/icons'

import './styles.scss'

export const Carousel = ({
  items,
  type,
  mobileText = '',
  draggable = true,
}: CarouselProps) => {
  const {
    rootRef,
    setRef,
    snapPointIndexes,
    activePageIndex,
    pages,
    hasPrevPage,
    goPrevious,
    hasNextPage,
    goNext,
    handleStartDrag,
    handleMouseMove,
    showControls,
  } = useCarousel({
    items,
  })

  const cl = classNames('au-carousel', { 'au-carousel--draggable': draggable })
  return (
    <div className={cl} ref={rootRef}>
      <ul
        className="au-carousel__rail"
        ref={setRef}
        onMouseDown={draggable ? handleStartDrag : undefined}
        onMouseMove={draggable ? handleMouseMove : undefined}>
        {items.map((item, i) => {
          const key = `au-${item.key || i}`
          return (
            <li
              className={classNames('au-carousel__item', {
                'au-carousel__item--snap': snapPointIndexes.has(i),
              })}
              data-key={key}
              key={key}>
              {item}
            </li>
          )
        })}
      </ul>

      <Conditional
        condition={showControls}
        renderIf={
          <div className="au-carousel__actions">
            {type === 'scrollbar' && (
              <Scrollbar pageToEnterIndex={activePageIndex} pages={pages} />
            )}

            {type === 'pages' && (
              <Pagination
                pageToEnterIndex={activePageIndex}
                pages={pages}
                mobileText={mobileText}
              />
            )}

            <div
              className={classNames('au-carousel__btns', {
                'au-carousel__btns--pages': type === 'pages',
              })}>
              <Button
                round
                type="outlined"
                disabled={!hasPrevPage}
                onClick={goPrevious}>
                <IconChevronLeft />
              </Button>
              <Button
                round
                type="outlined"
                disabled={!hasNextPage}
                onClick={goNext}>
                <IconChevronRight />
              </Button>
            </div>
          </div>
        }
      />
    </div>
  )
}

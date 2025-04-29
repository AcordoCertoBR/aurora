import classNames from 'classnames'
import { Scrollbar } from './Scrollbar'
import { Pagination } from './Pagination'

import useCarousel from './useCarousel'
import { CarouselProps } from './types'

import './styles.scss'
import { Conditional } from '@components/misc'
import { Button } from '@components/Button'
import { IconChevronLeft, IconChevronRight } from '@components/icons'

export const Carousel = ({ items, type, mobileText = '' }: CarouselProps) => {
  const {
    rootRef,
    setRef,
    snapPointIndexes,
    activePageIndex,
    //nextPage,
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
  return (
    <div className="au-carousel" ref={rootRef}>
      <ul
        className="au-carousel__rail"
        ref={setRef}
        onMouseDown={handleStartDrag}
        onMouseMove={handleMouseMove}>
        {items.map((item, i) => {
          return (
            <li
              className={classNames('au-carousel__item', {
                'au-carousel__item--snap': snapPointIndexes.has(i),
              })}
              key={`au-${item.key || i}`}>
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

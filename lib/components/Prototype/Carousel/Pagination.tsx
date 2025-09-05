import { Conditional } from '@components/misc'
import { isMobile } from './helpers'
import { Text } from '@components/Text'

type PaginationProps = {
  pages: number[][]
  pageToEnterIndex: number
  mobileText: string
}

export const Pagination = ({
  pageToEnterIndex,
  pages,
  mobileText,
}: PaginationProps) => {
  return (
    <div className="au-carousel__pagination">
      <Text color="secondary" weight="regular">
        <Conditional
          condition={!isMobile()}
          renderIf={'Página'}
          renderElse={mobileText}
        />{' '}
        <b>
          {pageToEnterIndex + 1} de {pages.length}
        </b>
      </Text>
    </div>
  )
}

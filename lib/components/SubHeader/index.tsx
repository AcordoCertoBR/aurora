import { IconChevronLeft, IconHelpCircle } from '../icons/default'

import { Container } from '@components/Container'
import { Text } from '@components/Text'
import { Button } from '@components/Button'

import classNames from 'classnames'

import './styles.scss'

type SubHeaderProps = {
  title: string
  handleReturn: () => void
  handleHelpInfo?: () => void
}

export const SubHeader = ({
  title,
  handleReturn,
  handleHelpInfo,
}: SubHeaderProps) => {
  return (
    <div
      className={classNames('au-sub-header', {
        'au-sub-header--with-help': handleHelpInfo,
      })}>
      <Container customClass="au-sub-header__container">
        <Button
          className="au-sub-header__button"
          onClick={handleReturn}
          type="ghost">
          <IconChevronLeft />
        </Button>
        <Text
          className="au-sub-header__title"
          variant="heading-micro"
          variantDesk="heading-small"
          weight="bold"
          as="div">
          {title}
        </Text>
        {handleHelpInfo && (
          <Button
            className="au-sub-header__button"
            onClick={handleHelpInfo}
            type="ghost">
            <IconHelpCircle />
          </Button>
        )}
      </Container>
    </div>
  )
}

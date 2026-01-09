import { IconChevronLeft, IconHelpCircle } from '../icons/default'

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
      <Button
        className="au-sub-header__button"
        onClick={handleReturn}
        type="ghost">
        <IconChevronLeft />
      </Button>
      <Text
        className="au-sub-header__title"
        variant="heading-micro"
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
    </div>
  )
}

import { IconChevronLeft, IconHelpCircle } from '../icons/default'

import { Text } from '@components/Text'
import { Button } from '@components/Button'

import classNames from 'classnames'

import './styles.scss'

type BreadcrumbProps = {
  title: string
  handleReturn: () => void
  handleHelpInfo?: () => void
}

export const Breadcrumb = ({
  title,
  handleReturn,
  handleHelpInfo,
}: BreadcrumbProps) => {
  return (
    <div
      className={classNames('au-breadcrumb', {
        'au-breadcrumb--with-help': handleHelpInfo,
      })}>
      <Button
        className="au-breadcrumb__button"
        onClick={handleReturn}
        type="ghost">
        <IconChevronLeft />
      </Button>
      <Text
        className="au-breadcrumb__title"
        variant="heading-micro"
        weight="bold"
        as="div">
        {title}
      </Text>
      {handleHelpInfo && (
        <Button
          className="au-breadcrumb__button"
          onClick={handleHelpInfo}
          type="ghost">
          <IconHelpCircle />
        </Button>
      )}
    </div>
  )
}

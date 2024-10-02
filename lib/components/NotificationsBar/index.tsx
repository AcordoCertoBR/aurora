import { ReactNode } from 'react'
import { Text } from '../Text'
import { Conditional } from '../misc'
import './styles.scss'

type NotificationsBarWrapProps = {
  renderRecents?: () => ReactNode | string | JSX.Element | JSX.Element[]
  renderOlds?: () => ReactNode | string | JSX.Element | JSX.Element[]
}

type NotificationsBarListProps = {
  title: string
  dataSource: NotificationBarListDataProps[]
  renderItem: (
    item: NotificationBarListDataProps,
    idx?: number
  ) => ReactNode | string | JSX.Element | JSX.Element[]
}

type NotificationBarListDataProps = {
  title: string
  Icon?: ReactNode | string | JSX.Element | JSX.Element[]
  onClick: () => void
  onDelete?: () => void
  createdAt?: string
}

type NotificationsBarLinkProps = {
  title: string
  onClick: () => void
  onDelete?: () => void
  Icon?: ReactNode | string | JSX.Element | JSX.Element[]
  createdAt?: string
}

export const NotificationsBarWrap = ({
  renderRecents,
  renderOlds,
}: NotificationsBarWrapProps) => {
  return (
    <div className="au-notifications-bar">
      {renderRecents && renderRecents()}
      {renderOlds && renderOlds()}
    </div>
  )
}

export const NotificationsBarList = ({
  title,
  dataSource,
  renderItem,
}: NotificationsBarListProps) => {
  return (
    <div className="au-notifications-bar__section">
      <Text as="h3" variant="body-medium" weight="bold">
        {title}
      </Text>
      <div className="au-notifications-bar__list">
        {dataSource?.map((item, idx) => renderItem(item, idx))}
      </div>
    </div>
  )
}

export const NotificationsBarLink = ({
  Icon,
  onClick,
  title,
  createdAt,
  onDelete,
}: NotificationsBarLinkProps) => {
  return (
    <div className="au-notifications-bar__item">
      <Text
        as="a"
        variant="body-medium"
        weight="regular"
        className="au-notifications-bar__link"
        onClick={onClick}>
        <Conditional condition={!!Icon} renderIf={Icon} />
        {title}
      </Text>
      <div className="au-notifications-bar__actions">
        <Text as="span" variant="body-small">
          {createdAt}
        </Text>
        <Conditional
          condition={!!onDelete}
          renderIf={
            <Text
              as="a"
              variant="body-small"
              weight="semibold"
              onClick={onDelete}>
              Excluir
            </Text>
          }
        />
      </div>
    </div>
  )
}

const components = {
  Root: NotificationsBarWrap,
  List: NotificationsBarList,
  Link: NotificationsBarLink,
}

export { components as NotificationsBar }

import { ReactNode, useId } from 'react'
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
  isUnread?: boolean
}

export const NotificationsBarWrap = ({
  renderRecents,
  renderOlds,
}: NotificationsBarWrapProps) => {
  return (
    <div className="au-notifications-bar" role="region" aria-label="Notificações">
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
  isUnread,
}: NotificationsBarLinkProps) => {
  const timestampId = useId()

  return (
    <div className="au-notifications-bar__item">
      <button
        type="button"
        className="au-notifications-bar__link"
        onClick={onClick}
        aria-describedby={createdAt ? timestampId : undefined}>
        {Icon && <span aria-hidden="true">{Icon}</span>}
        <Text as="span" variant="body-medium" weight="regular">
          {isUnread && <span className="au-sr-only">não lida — </span>}
          {title}
        </Text>
      </button>
      <div className="au-notifications-bar__actions">
        <Text as="span" id={timestampId} variant="body-small">
          {createdAt}
        </Text>
        <Conditional
          condition={!!onDelete}
          renderIf={
            <button
              type="button"
              className="au-notifications-bar__delete-btn"
              aria-label={`Excluir: ${title}`}
              onClick={onDelete}>
              <Text as="span" variant="body-small" weight="semibold">
                Excluir
              </Text>
            </button>
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

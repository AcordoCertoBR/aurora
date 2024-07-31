import classNames from 'classnames'
import { ReactNode } from 'react'
import { Text } from '../Text'
import { IconChevronDown, IconChevronUp } from '../icons/default'
import { Conditional } from '../misc'
import './styles.scss'

type NavbarVerticalDataProps = {
  name: string
  Icon?: ReactNode
  onClick: () => void
  dropdown?: NavbarVerticalDataProps[]
  active?: boolean
}

type NavbarVerticalProps = {
  data: NavbarVerticalDataProps[]
  renderItem: (link: NavbarVerticalDataProps) => ReactNode
  renderActions: () => ReactNode
}

export const NavbarVertical = ({
  data,
  renderItem,
  renderActions,
}: NavbarVerticalProps) => {
  return (
    <div className="au-navbar-vertical">
      {data?.map((link) => {
        return renderItem(link)
      })}
      <div className="au-navbar-vertical__actions">{renderActions()}</div>
    </div>
  )
}

const NavbarVerticalLink = ({
  name,
  onClick,
  Icon,
  dropdown,
  active = false,
}: NavbarVerticalDataProps) => {
  return (
    <Text
      as="a"
      variant="heading-micro"
      weight="light"
      className={classNames('au-navbar-vertical__link', {
        'is-active': active,
      })}
      onClick={onClick}>
      <Conditional condition={!!Icon} renderIf={Icon} />
      {name}

      <Conditional
        condition={!!dropdown?.length}
        renderIf={
          <>
            <Conditional condition={!!active} renderIf={<IconChevronUp />} />
            <Conditional condition={!active} renderIf={<IconChevronDown />} />
            <div className="au-navbar-vertical__dropdown">
              {dropdown?.map((item) => {
                return (
                  <Text
                    as="a"
                    variant="heading-micro"
                    weight="light"
                    className={classNames('au-navbar-vertical__dropdown-link', {
                      'is-active': item.active,
                    })}
                    title={item.name}>
                    {item.name}
                  </Text>
                )
              })}
            </div>
          </>
        }
      />
    </Text>
  )
}

NavbarVertical.Link = NavbarVerticalLink

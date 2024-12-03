import classNames from 'classnames'
import { ReactNode, useState } from 'react'
import { Text } from '../Text'
import { IconChevronDown, IconChevronUp } from '../icons/default'
import { Conditional } from '../misc'

import './styles.scss'

type NavbarVerticalDataProps = {
  name: string
  Icon?: ReactNode | string | JSX.Element | JSX.Element[]
  onClick: () => void
  dropdown?: NavbarVerticalDataProps[]
  active?: boolean
}

type NavbarVerticalProps = {
  data: NavbarVerticalDataProps[]
  renderItem: (
    link: NavbarVerticalDataProps,
  ) => ReactNode | string | JSX.Element | JSX.Element[]
  renderActions: () => ReactNode | string | JSX.Element | JSX.Element[]
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
  const [open, setOpen] = useState<boolean>(active)

  function handleClick() {
    if (dropdown) {
      setOpen((prev) => !prev)
    } else {
      onClick()
    }
  }

  return (
    <Text
      as="a"
      variant="heading-micro"
      weight="light"
      className={classNames('au-navbar-vertical__link', {
        [`au-navbar-vertical__link--is-active`]: active,
        [`au-navbar-vertical__link--is-open`]: open,
      })}
      onClick={handleClick}>
      <Conditional condition={!!Icon} renderIf={Icon} />
      {name}

      <Conditional
        condition={!!dropdown?.length}
        renderIf={
          <>
            <Conditional condition={!!open} renderIf={<IconChevronUp />} />
            <Conditional condition={!open} renderIf={<IconChevronDown />} />
            <div className="au-navbar-vertical__dropdown">
              {dropdown?.map((item) => {
                return (
                  <Text
                    key={item.name}
                    as="a"
                    variant="heading-micro"
                    weight="light"
                    onClick={onClick}
                    className={classNames('au-navbar-vertical__dropdown-link', {
                      'au-navbar-vertical__dropdown-link--is-active':
                        item.active,
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

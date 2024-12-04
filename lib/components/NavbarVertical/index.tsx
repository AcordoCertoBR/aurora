import classNames from 'classnames'
import { ReactNode, useState } from 'react'
import { Text } from '../Text'
import { IconChevronDown, IconChevronUp } from '../icons/default'
import { Conditional } from '../misc'

import './styles.scss'

type NavbarVerticalDataProps = {
  name: string
  Icon?: ReactNode | string | JSX.Element | JSX.Element[]
  onClick?: () => void
  dropdown?: NavbarVerticalDataProps[]
  active?: boolean
  href?: string
}

type NavbarVerticalProps = {
  data: NavbarVerticalDataProps[]
  renderItem: (
    link: NavbarVerticalDataProps,
    idx?: number
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
      {data?.map((link, idx) => {
        return renderItem(link, idx)
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
  href,
  active = false,
}: NavbarVerticalDataProps) => {
  const [open, setOpen] = useState<boolean>(active)

  function handleClick(ev: React.MouseEvent) {
    if (dropdown) {
      setOpen((prev) => !prev)
    } else if(onClick) {
      ev.preventDefault()
      onClick()
    }
  }

  return (
    <Text
      as={dropdown ? 'p' : 'a'}
      href={href}
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
              {dropdown?.map((item, idx) => {
                return (
                  <Text
                    key={`${item.name}-${idx}`}
                    as="a"
                    href={item.href}
                    variant="heading-micro"
                    weight="light"
                    className={classNames('au-navbar-vertical__dropdown-link', {
                      'au-navbar-vertical__dropdown-link--is-active':
                        item.active,
                    })}
                    title={item.name}
                    onClick={item.onClick}>
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

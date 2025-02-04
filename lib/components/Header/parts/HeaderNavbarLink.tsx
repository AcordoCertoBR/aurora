import classNames from 'classnames'
import { Text } from '@components/Text'
import { IconChevronDown, IconChevronLeft } from '@components/icons/default'
import { Conditional } from '@components/misc'
import { NavbarDataProps } from '../types'

export const HeaderNavbarLink = (navItem: NavbarDataProps) => {
  const { name, dropdown, active, href } = navItem
  const isDropdown = !!dropdown && dropdown.length

  function handleItemClick(item: NavbarDataProps, ev: React.MouseEvent) {
    if (item.onClick) {
      ev.preventDefault()
      item.onClick()
    }
  }

  return (
    <Text
      as={isDropdown ? 'div' : 'a'}
      variant="heading-micro"
      weight="light"
      href={href}
      onClick={(ev) => handleItemClick(navItem, ev)}
      title={name}
      className={classNames('au-header__navbar-link', {
        'au-header__navbar-link--is-dropdown': dropdown,
        'au-header__navbar-link--is-active': active,
      })}>
      {name}

      <Conditional
        condition={!!dropdown?.length}
        renderIf={
          <>
            <IconChevronDown />
            <div className="au-header__dropdown">
              {dropdown?.map((item) => {
                return (
                  <Text
                    key={item.name}
                    as="a"
                    variant="heading-micro"
                    href={item.href}
                    onClick={(ev) => handleItemClick(item, ev)}
                    weight="light"
                    className={classNames('au-header__dropdown-link', {
                      'au-header__dropdown-link--is-active': item.active,
                    })}
                    title={item.name}>
                    {item.name}
                    <Conditional
                      condition={!!item.active}
                      renderIf={<IconChevronLeft />}
                    />
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

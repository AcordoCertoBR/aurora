import { useState, useId } from 'react'
import classNames from 'classnames'
import { Text } from '@components/Text'
import { IconChevronDown } from '@components/icons/default'
import { Conditional } from '@components/misc'
import { NavbarDataProps } from '../types'

export const HeaderNavbarLink = (navItem: NavbarDataProps) => {
  const { name, dropdown, active, href } = navItem
  const isDropdown = !!dropdown && dropdown.length
  const [isOpen, setIsOpen] = useState(false)
  const dropdownId = useId()

  function handleItemClick(item: NavbarDataProps, ev: React.MouseEvent) {
    if (item.onClick) {
      ev.preventDefault()
      item.onClick()
    }
  }

  const handleDropdownOpen = () => isDropdown && setIsOpen(true)
  const handleDropdownClose = () => isDropdown && setIsOpen(false)
  const handleDropdownBlur = (ev: React.FocusEvent<HTMLDivElement>) => {
    if (isDropdown && !ev.currentTarget.contains(ev.relatedTarget as Node)) {
      setIsOpen(false)
    }
  }

  return (
    <div
      className={classNames('au-header__navbar-item', {
        'au-header__navbar-item--is-dropdown': dropdown,
        'au-header__navbar-item--is-active': active,
        'au-header__navbar-item--is-open': isOpen,
      })}
      onMouseEnter={handleDropdownOpen}
      onMouseLeave={handleDropdownClose}
      onFocus={handleDropdownOpen}
      onBlur={handleDropdownBlur}>
      {isDropdown ? (
        <button
          type="button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-controls={dropdownId}
          title={name}
          onClick={(ev) => handleItemClick(navItem, ev)}
          className={classNames('au-header__navbar-link', 'au-header__navbar-link--is-dropdown', {
            'au-header__navbar-link--is-active': active,
          })}>
          <Text as="span" variant="heading-micro" weight="light">
            {name}
          </Text>
          <IconChevronDown aria-hidden="true" />
        </button>
      ) : (
        <Text
          as="a"
          variant="heading-micro"
          weight="light"
          href={href}
          onClick={(ev) => handleItemClick(navItem, ev)}
          title={name}
          className={classNames('au-header__navbar-link', {
            'au-header__navbar-link--is-active': active,
          })}>
          {name}
        </Text>
      )}

      <Conditional
        condition={!!dropdown?.length}
        renderIf={
          <div id={dropdownId} className="au-header__dropdown" aria-hidden={!isOpen}>
            {dropdown?.map((item) => {
              return (
                <Text
                  key={item.name}
                  as="a"
                  variant="heading-micro"
                  href={item.href}
                  onClick={(ev) => handleItemClick(item, ev)}
                  weight="light"
                  tabIndex={isOpen ? undefined : -1}
                  className={classNames('au-header__dropdown-link', {
                    'au-header__dropdown-link--is-active': item.active,
                  })}
                  title={item.name}>
                  {item.name}
                </Text>
              )
            })}
          </div>
        }
      />
    </div>
  )
}

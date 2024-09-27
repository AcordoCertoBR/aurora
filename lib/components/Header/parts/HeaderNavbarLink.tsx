import classNames from 'classnames'
import { Text } from '../../Text'
import { IconChevronDown, IconChevronLeft } from '../../icons/default'
import { Conditional } from '../../misc'
import { NavbarDataProps } from '../types'

export const HeaderNavbarLink = ({
  name,
  onClick,
  dropdown,
  active,
}: NavbarDataProps) => {
  return (
    <Text
      as="a"
      variant="heading-micro"
      weight="light"
      onClick={onClick}
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

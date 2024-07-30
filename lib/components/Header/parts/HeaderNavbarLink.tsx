import classNames from 'classnames'
import { Text } from '../../Text'
import { IconChevronDown } from '../../icons/default'
import { Conditional } from '../../misc'
import { NavbarDataProps } from '../types'

export const HeaderNavbarLink = ({
  name,
  onClick,
  dropdown,
}: NavbarDataProps) => {
  return (
    <Text
      as="a"
      variant="body-medium"
      weight="light"
      onClick={onClick}
      className={classNames('au-header__navbar-link', {
        'is-dropdown': dropdown,
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
                    as="a"
                    variant="body-medium"
                    weight="light"
                    className="au-header__dropdown-link"
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

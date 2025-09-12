import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { If } from '@components/misc'
import { Button } from '@components/Button'

import './styles.scss'
import { Text } from '@components/Text'

export type TabsProps = {
  tabs: TabItemProps[]
  areTabsHidden?: boolean
  initialTab?: string
  withLabel?: boolean
  rightSlotChildren?: React.ReactNode
  onClick?: (value: string) => void
}

export type TabItemProps = {
  tab: string
  title: string
  children?: React.ReactElement
  icon?: React.ReactNode
}

export const Tabs = ({
  tabs,
  initialTab,
  onClick,
  areTabsHidden,
  rightSlotChildren,
  withLabel = false,
}: TabsProps) => {
  const [isClicked, setIsClicked] = useState(false)
  const [currButton, setCurrButton] = useState(initialTab ?? '')
  const [activeTab, setActiveTab] = useState(initialTab)

  useEffect(() => {
    setActiveTab(initialTab)
  }, [initialTab])

  const handleClick = (item: TabItemProps) => {
    onClick && onClick(item.tab)
    setCurrButton(item.tab)
    setActiveTab(item.tab)
    setIsClicked(true)
  }

  const buttonClass = (item: TabItemProps) => {
    const isActive =
      (isClicked && item.tab === currButton) || activeTab === item.tab
    return classNames('au-tabs__button', {
      active: isActive,
    })
  }

  return (
    <>
      <If condition={!areTabsHidden}>
        <div className="au-tabs">
          <div className="au-tabs__container">
            <div className="au-tabs__left-panel">
              <If condition={!!withLabel}>
                <Text
                  color="secondary"
                  variant="body-small"
                  className="au-tabs__label">
                  Filtrar por:{' '}
                </Text>
              </If>
              <div className="au-tabs__btns">
                {tabs.map((item: TabItemProps) => {
                  return (
                    <Button
                      key={`au-tabs-${item.tab}`}
                      className={buttonClass(item)}
                      type="outlined"
                      onClick={() => handleClick(item)}>
                      {item.icon}
                      {item.title}
                    </Button>
                  )
                })}
              </div>
            </div>
            <If condition={!!rightSlotChildren}>{rightSlotChildren}</If>
          </div>
        </div>
      </If>

      {tabs.map(({ children, tab }: TabItemProps) => {
        return (
          <div
            className={`au-tabs__children children-${tab}`}
            key={`au-tabs-${tab}`}>
            <If condition={currButton === tab || activeTab === tab}>
              {children}
            </If>
          </div>
        )
      })}
    </>
  )
}

export default Tabs

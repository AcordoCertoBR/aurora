import { useEffect, useState, useRef } from 'react'
import { If, Switch, Case } from '@components/misc'
import { Text } from '@components/Text'
import { Chip } from '@components/Chip'

import classNames from 'classnames'

import './styles.scss'

export type TabsProps = {
  tabs: TabItemProps[]
  type?: 1 | 2
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
  type = 1,
  initialTab,
  onClick,
  areTabsHidden,
  rightSlotChildren,
  withLabel = false,
}: TabsProps) => {
  const [isClicked, setIsClicked] = useState(false)
  const [currButton, setCurrButton] = useState(initialTab ?? '')
  const [activeTab, setActiveTab] = useState(initialTab)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })

  const tabsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setActiveTab(initialTab)
  }, [initialTab])

  useEffect(() => {
    if (activeTab && type === 2) {
      const container = tabsRef.current
      if (container) {
        const activeElement = container.querySelector(
          '.au-tabs__btns-option--active',
        ) as HTMLElement

        if (activeElement) {
          setIndicatorStyle({
            left: activeElement.offsetLeft,
            width: activeElement.offsetWidth,
          })
        }
      }
    }
  }, [activeTab, tabs, type])

  const handleClick = (item: TabItemProps) => {
    onClick && onClick(item.tab)
    setCurrButton(item.tab)
    setActiveTab(item.tab)
    setIsClicked(true)
  }

  return (
    <>
      <If condition={!areTabsHidden}>
        <div
          className={classNames('au-tabs', {
            [`au-tabs--type-${type}`]: !!type,
          })}>
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
              <div className="au-tabs__btns" ref={tabsRef}>
                {tabs.map((item: TabItemProps) => {
                  return (
                    <Switch>
                      <Case condition={type === 1}>
                        <Chip
                          label={item.title}
                          icon={item.icon}
                          isActive={
                            (isClicked && item.tab === currButton) ||
                            activeTab === item.tab
                          }
                          onClick={() => handleClick(item)}
                        />
                      </Case>
                      <Case condition={type === 2}>
                        <div
                          className={classNames('au-tabs__btns-option', {
                            'au-tabs__btns-option--active':
                              activeTab === item.tab,
                          })}
                          onClick={() => handleClick(item)}>
                          {item.title}
                        </div>
                      </Case>
                    </Switch>
                  )
                })}
                <If condition={type === 2}>
                  <div
                    className="au-tabs__btns-indicator"
                    style={{
                      left: `${indicatorStyle.left}px`,
                      width: `${indicatorStyle.width}px`,
                    }}
                  />
                </If>
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

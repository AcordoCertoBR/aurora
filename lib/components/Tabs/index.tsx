import classNames from 'classnames'
import { Conditional } from '@components/misc'
import { Button } from '@components/Button'
import { useEffect, useState } from 'react'
import './styles.scss'

export type TabsProps = {
  tabs: TabItemProps[]
  areTabsHidden?: boolean
  initialTab?: string
  onClick: (value: string) => void
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
}: TabsProps) => {
  const [isClicked, setIsClicked] = useState(false)
  const [currButton, setCurrButton] = useState(initialTab ?? '')
  const [activeTab, setActiveTab] = useState(initialTab)

  useEffect(() => {
    setActiveTab(initialTab)
  }, [initialTab])

  const handleClick = (item: TabItemProps) => {
    onClick(item.tab)
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
      <Conditional
        condition={!areTabsHidden}
        renderIf={
          <div className="au-tabs">
            <div className="au-tabs__container">
              {tabs.map((item: TabItemProps) => {
                return (
                  <Button
                    key={`au-tabs-${item.tab}`}
                    className={buttonClass(item)}
                    type={'outlined'}
                    onClick={() => handleClick(item)}>
                    {item.icon}
                    {item.title}
                  </Button>
                )
              })}
            </div>
          </div>
        }
        renderElse={null}
      />

      {tabs.map(({ children, tab }: TabItemProps) => {
        return (
          <div
            className={`au-tabs__children children-${tab}`}
            key={`au-tabs-${tab}`}>
            <Conditional
              condition={currButton === tab || activeTab === tab}
              renderIf={children}
            />
          </div>
        )
      })}
    </>
  )
}

export default Tabs

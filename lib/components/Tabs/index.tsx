import { useEffect, useState, useRef } from 'react'
import { If } from '@components/misc'

import classNames from 'classnames'

import './styles.scss'

export type TabsProps = {
  tabs: TabItemProps[]
  /** Hides the tab bar and renders only the active panel. Not mapped in Figma. */
  areTabsHidden?: boolean
  initialTab?: string
  /** Content rendered at the right side of the tab bar. Not mapped in Figma. */
  rightSlotChildren?: React.ReactNode
  onClick?: (value: string) => void
  'data-testid'?: string
}

export type TabItemProps = {
  tab: string
  title: string
  children?: React.ReactElement
}

export const Tabs = ({
  tabs,
  initialTab,
  onClick,
  areTabsHidden,
  rightSlotChildren,
  'data-testid': dataTestId,
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState(initialTab)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })

  const tabsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setActiveTab(initialTab)
  }, [initialTab])

  useEffect(() => {
    const container = tabsRef.current
    if (activeTab && container) {
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
  }, [activeTab, tabs])

  const handleClick = (item: TabItemProps) => {
    onClick && onClick(item.tab)
    setActiveTab(item.tab)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return

    const container = tabsRef.current
    if (!container) return

    const tabButtons = Array.from(
      container.querySelectorAll<HTMLButtonElement>('[role="tab"]'),
    )
    const currentIndex = tabButtons.indexOf(
      document.activeElement as HTMLButtonElement,
    )
    if (currentIndex === -1) return

    event.preventDefault()

    const lastIndex = tabButtons.length - 1
    const nextIndex = {
      ArrowLeft: currentIndex === 0 ? lastIndex : currentIndex - 1,
      ArrowRight: currentIndex === lastIndex ? 0 : currentIndex + 1,
      Home: 0,
      End: lastIndex,
    }[event.key as 'ArrowLeft' | 'ArrowRight' | 'Home' | 'End']

    tabButtons[nextIndex]?.focus()
  }

  const focusableTab = activeTab ?? tabs[0]?.tab

  return (
    <>
      <If condition={!areTabsHidden}>
        <div className="au-tabs" data-testid={dataTestId}>
          <div className="au-tabs__container">
            <div
              className="au-tabs__btns"
              role="tablist"
              ref={tabsRef}
              onKeyDown={handleKeyDown}>
              {tabs.map((item: TabItemProps) => (
                <button
                  key={item.tab}
                  type="button"
                  role="tab"
                  id={`au-tab-${item.tab}`}
                  aria-selected={activeTab === item.tab}
                  aria-controls={`au-tabpanel-${item.tab}`}
                  tabIndex={item.tab === focusableTab ? 0 : -1}
                  className={classNames('au-tabs__btns-option', {
                    'au-tabs__btns-option--active': activeTab === item.tab,
                  })}
                  onClick={() => handleClick(item)}>
                  {item.title}
                </button>
              ))}
              <div
                className="au-tabs__btns-indicator"
                aria-hidden="true"
                style={{
                  left: `${indicatorStyle.left}px`,
                  width: `${indicatorStyle.width}px`,
                }}
              />
            </div>
            <If condition={!!rightSlotChildren}>{rightSlotChildren}</If>
          </div>
        </div>
      </If>

      {tabs.map(({ children, tab }: TabItemProps) => {
        return (
          <div
            role="tabpanel"
            id={`au-tabpanel-${tab}`}
            aria-labelledby={`au-tab-${tab}`}
            className={`au-tabs__children children-${tab}`}
            key={`au-tabs-${tab}`}>
            <If condition={activeTab === tab}>{children}</If>
          </div>
        )
      })}
    </>
  )
}

export default Tabs

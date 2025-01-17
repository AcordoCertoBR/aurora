import classNames from 'classnames';
import { Conditional } from '@components/misc';
import { Button } from '@components/Button';
import { useState } from 'react';
import './styles.scss';

export interface TabsProps {
  tabs: TabProps[];
  areTabsHidden?: boolean;
  initialTab?: string;
  onClick: (value: string) => void;
}

interface TabProps {
  tab: string;
  title: string;
  children?: React.ReactElement;
}

export const Tabs = ({ tabs, initialTab, onClick, areTabsHidden }: TabsProps) => {

  const [isClicked, setIsClicked] = useState(false);
  const [currButton, setCurrButton] = useState(initialTab ?? '')
  const [activeTab, setActiveTab] = useState(initialTab)

  const handleClick = (item: TabProps) => {
    onClick(item.tab)
    setCurrButton(item.tab)
    setActiveTab(item.tab)
    setIsClicked(true);
  };

  const buttonClass = (item: TabProps) => {
    const isActive = isClicked && item.tab === currButton || activeTab === item.tab
    return classNames('au-tabs__button', {
      'active': isActive
    });
  };

  return (
    <>
      {!areTabsHidden ? <div className="tabs">
        <div className="au-tabs__container">
          {tabs.map((item: TabProps) => {
            return (
              <Button key={`au-tabs-${item.tab}`}  className={buttonClass(item)}
               type={'outlined'} onClick={() => handleClick(item)}>
                {item.title}
              </Button>
            );
          })}
        </div>
      </div> : null}

      {tabs.map(({ children, tab }: TabProps) => {
        return (
          <div className={`au-tabs__children children-${tab}`} key={`au-tabs-${tab}`}>
            <Conditional condition={currButton === tab || activeTab === tab} renderIf={children} />
          </div>
        );
      })}
    </>
  );
};

export default Tabs;

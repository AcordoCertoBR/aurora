import classNames from 'classnames';
import { Conditional } from '@components/misc';
import { Button } from '@components/Button';
import './styles.scss';

export interface TabsProps {
  tabs: TabProps[];
  isVisibleHeaderTabs?: boolean;
  activeTab: string;
  onClick: (value: string) => void;
}

interface TabProps {
  tab: string;
  title: string;
  children?: React.ReactElement;
}

export const Tabs = ({ tabs, activeTab, onClick, isVisibleHeaderTabs }: TabsProps) => {
  return (
    <>
      {!isVisibleHeaderTabs ? <div className="tabs">
        <div className="au-tabs__container">
          {tabs.map(({ tab, title }: TabProps) => {
            return (
              <Button key={`au-tabs-${tab}`}  className={classNames('au-tabs__button', {
                  "active": activeTab === tab,
                })}
               type={'outlined'} onClick={() => onClick(tab)}>
                {title}
              </Button>
            );
          })}
        </div>
      </div> : null}

      {tabs.map(({ children, tab }: TabProps) => {
        return (
          <div key={`au-tabs-${tab}`}>
            <Conditional condition={activeTab === tab} renderIf={children} />
          </div>
        );
      })}
    </>
  );
};

export default Tabs;

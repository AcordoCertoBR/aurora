import { Button } from '@components/Button'
import { useState } from 'react'
import classNames from 'classnames'
import './styles.scss'

type ContentItem = {
   title: string;  category: string; onClick: () => void; type?: 'primary' | 'outlined' | 'ghost' 
}

export type FilterProps = {
  content: ContentItem []
}

export const Filter= ({
  content
}: FilterProps) => {

  const [isClicked, setIsClicked] = useState(false);
  const [currBut, setCurBut] = useState('')

   const handleClick = (item: ContentItem) => {
        setIsClicked(true);
        setCurBut(item.category)
        item.onClick()
    };
const buttonClass = (item: ContentItem) => {
    const isActive = isClicked && item.category === currBut
    return classNames('au-filter__btn', {
      'btn-clicked': isActive
    });
  };

  return (
    <div className="au-filter">
      {content?.map((item) => {
       
          return (
            <div>
            <Button className={buttonClass(item)} type={item.type ?? 'primary'} onClick={() => handleClick(item)} key={`item-${item}`}>
              {item.title}
            </Button>
            </div>
          )
        })}
    </div>
  )
}

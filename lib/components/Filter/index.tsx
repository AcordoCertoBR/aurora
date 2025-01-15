import { Button } from '@components/Button'
import { useState } from 'react'
import classNames from 'classnames'
import './styles.scss'

export type FilterProps = {
  content: { title: string;  onClick: () => void; type?: 'primary' | 'outlined' | 'ghost' } []
}



export const Filter= ({
  content
}: FilterProps) => {

const [isClicked, setIsClicked] = useState(false);
  const buttonClass = classNames('au-filter__btn', {
      'btn-clicked': isClicked
    })

  return (
    <div className="au-filter">
      {content?.map((item) => {
        const handleClick = () => {
          setIsClicked(!isClicked);
          item.onClick()
        };
          return (
            <Button className={buttonClass} type={item.type ?? 'primary'} onClick={handleClick} key={`item-${item}`}>
              {item.title}
            </Button>
          )
        })}
    </div>
  )
}

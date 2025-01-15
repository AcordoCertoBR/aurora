import { Button } from '@components/Button'
import './styles.scss'

export type FilterProps = {
  content: { title: string;  onClick: () => void; type?: 'primary' | 'outlined' | 'ghost' } []
}

export const Filter= ({
  content
}: FilterProps) => {

  return (
    <div className="au-filter">
      {content?.map((item) => {
          return (
            <Button type={item.type ?? 'primary'} onClick={item.onClick}>
              {item.title}
            </Button>
          )
        })}
    </div>
  )
}

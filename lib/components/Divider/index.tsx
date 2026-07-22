import classNames from 'classnames'
import './styles.scss'

export type DividerProps = {
  borderWidth?: 1 | 2
  state?: 'visible' | 'invisible'
}

export const Divider = ({
  borderWidth = 1,
  state = 'visible',
}: DividerProps) => {
  const classes = classNames('au-divider', {
    [`au-divider--width-${borderWidth}`]: !!borderWidth,
    'au-divider--invisible': state === 'invisible',
  })

  return <hr className={classes} />
}

import classNames from 'classnames'
import React, { ReactNode } from 'react'
import './styles.scss'

export type LinkButtonProps = (
  | {
      as: 'a'
      href: string
      target?: string
    }
  | {
      as?: 'button'
      href?: never
      target?: never
    }
) & {
  children?: ReactNode
  /**
   * Token size (Figma: Link Button, Size). small = 14px text / 16px icons,
   * medium = 16px / 20px, large = 20px / 20px.
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large'
  /** Icon rendered before the label (Figma: Left Icon + Switch Icon Left). */
  iconLeft?: ReactNode
  /** Icon rendered after the label (Figma: Right Icon + Switch Icon Right). */
  iconRight?: ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  className?: string
  'data-testid'?: string
}

export const LinkButton = ({
  as,
  href,
  target,
  children = 'Link',
  size = 'medium',
  iconLeft,
  iconRight,
  onClick,
  disabled = false,
  className,
  'data-testid': dataTestId,
}: LinkButtonProps) => {
  const classes = classNames(
    'au-link-button',
    {
      [`au-link-button--size-${size}`]: !!size,
      'au-link-button--disabled': disabled,
    },
    className,
  )

  const content = (
    <>
      {iconLeft && (
        <span className="au-link-button__icon" aria-hidden="true">
          {iconLeft}
        </span>
      )}
      {children}
      {iconRight && (
        <span className="au-link-button__icon" aria-hidden="true">
          {iconRight}
        </span>
      )}
    </>
  )

  if (as === 'a') {
    return (
      <a
        className={classes}
        href={href}
        target={target}
        data-testid={dataTestId}>
        {content}
      </a>
    )
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      disabled={disabled}
      data-testid={dataTestId}>
      {content}
    </button>
  )
}

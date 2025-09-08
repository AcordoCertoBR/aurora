import React, { ReactNode, useEffect, useRef } from 'react'
import classNames from 'classnames'
import { Conditional } from '../misc/Conditional'
import { IconLoader } from '../icons/default'
import './styles.scss'

type ButtonProps = (
  | {
      as: 'a'
      href: string
    }
  | {
      as?: 'button'
      href?: never
    }
) & {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  onEnabled?: () => void
  children?: ReactNode | string | JSX.Element | JSX.Element[]
  color?: 'default'
  disabled?: boolean
  expand?: 'x'
  htmlType?: 'button' | 'submit' | 'reset'
  loading?: boolean
  size?: 'large' | 'medium'
  type?: 'primary' | 'outlined' | 'ghost' | 'link'
  target?: string
  negative?: boolean
  btnText?: boolean
  round?: boolean
  className?: string
  borderWidth?: string
  elementRef?: React.RefObject<HTMLButtonElement | HTMLAnchorElement>
}

export const Button: React.FC<ButtonProps> = ({
  as,
  children = 'Button component',
  color = 'default',
  disabled = false,
  expand,
  href,
  htmlType = 'button',
  loading = false,
  onClick,
  onEnabled,
  size = 'medium',
  type = 'primary',
  target,
  negative = false,
  btnText = false,
  round = false,
  className,
  borderWidth = 'medium',
  elementRef,
  ...props
}) => {
  const wasDisabledRef = useRef<boolean | undefined>(undefined)

  useEffect(() => {
    const isCurrentlyEnabled = !disabled && !loading
    const wasDisabledPreviously = wasDisabledRef.current
    const isFirstRender = wasDisabledPreviously === undefined

    if (
      isCurrentlyEnabled &&
      (isFirstRender || wasDisabledPreviously === true) &&
      onEnabled
    ) {
      onEnabled()
    }

    wasDisabledRef.current = disabled || loading
  }, [disabled, loading, onEnabled])

  const buttonClasses = classNames('au-btn', {
    [`au-btn--type-${type}`]: !!type,
    [`au-btn--size-${size}`]: !!size,
    [`au-btn--expand-${expand}`]: !!expand,
    [`au-btn--color-${color}`]: !!color,
    'au-btn--negative': !!negative,
    'au-btn--disabled': !!disabled,
    'au-btn--loading': !!loading,
    [`au-btn--round-${size}`]: !!round,
    'btn-text': !!btnText,
    [`au-btn--border-${borderWidth}`]: !!borderWidth,
    [className ?? '']: typeof className === 'string',
  })

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (!disabled && !!onClick) onClick(e)
  }

  if (as === 'a') {
    return (
      <a
        className={buttonClasses}
        href={href}
        target={target}
        ref={elementRef as React.RefObject<HTMLAnchorElement>}
        {...props}>
        {children}
      </a>
    )
  }

  return (
    <button
      className={buttonClasses}
      onClick={handleClick}
      type={htmlType}
      ref={elementRef as React.RefObject<HTMLButtonElement>}
      disabled={disabled || loading}
      {...props}>
      <Conditional
        condition={loading}
        renderIf={<IconLoader />}
        renderElse={children}
      />
    </button>
  )
}

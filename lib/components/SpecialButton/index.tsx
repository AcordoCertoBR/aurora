import classNames from 'classnames'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import {
  IconArrowRight,
  IconCheck,
  IconLoader,
  IconSlash,
} from '../icons/default'
import { Conditional } from '../misc/Conditional'
import './styles.scss'

const KNOB_SIZE = 40
const TRACK_PADDING = 4
const CONFIRM_THRESHOLD = 0.85

export type SpecialButtonProps = {
  /**
   * Interaction mode: 'press' is hold-to-confirm (Figma: Press Button),
   * 'slider' is swipe-to-confirm (Figma: Swipe Button).
   * @default 'press'
   */
  type?: 'press' | 'slider'
  children?: ReactNode
  /** Called once when the interaction completes (hold finished / knob dragged to the end). */
  onConfirm?: () => void
  disabled?: boolean
  loading?: boolean
  /**
   * Controlled success state. The component also enters success on its own
   * right after a completed interaction.
   */
  success?: boolean
  /**
   * Press only — time in milliseconds the user must keep pressing to confirm.
   * @default 1500
   */
  holdDuration?: number
  /** Press only — stretches the button to fill the container width. */
  expand?: 'x'
  /** Slider only — visual variant (Figma: Swipe Button, ◇ Type Primary | Secondary). */
  variant?: 'primary' | 'secondary'
  /** Slider only — renders an empty skeleton placeholder. */
  skeleton?: boolean
  /**
   * Slider only — accessible label for the draggable knob. Pressing Enter or
   * Space on the focused knob confirms directly (keyboard alternative to the
   * swipe gesture).
   */
  knobAriaLabel?: string
  'data-testid'?: string
}

const _PressButton = ({
  children = 'Hold to confirm',
  onConfirm,
  holdDuration = 1500,
  disabled = false,
  loading = false,
  success = false,
  expand,
  'data-testid': dataTestId,
}: SpecialButtonProps) => {
  const [holding, setHolding] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const timerRef = useRef<number>()

  const isSuccess = success || confirmed
  const isInteractive = !disabled && !loading && !isSuccess

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  function _startHold() {
    if (!isInteractive || holding) return
    setHolding(true)
    timerRef.current = window.setTimeout(() => {
      setHolding(false)
      setConfirmed(true)
      if (onConfirm) onConfirm()
    }, holdDuration)
  }

  function _cancelHold() {
    if (!holding) return
    window.clearTimeout(timerRef.current)
    setHolding(false)
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if ((event.key === 'Enter' || event.key === ' ') && !event.repeat) {
      event.preventDefault()
      _startHold()
    }
  }

  function handleKeyUp(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'Enter' || event.key === ' ') _cancelHold()
  }

  const classes = classNames('au-special-button', 'au-special-button--type-press', {
    'au-special-button--holding': holding,
    'au-special-button--disabled': disabled,
    'au-special-button--loading': loading,
    'au-special-button--success': isSuccess,
    [`au-special-button--expand-${expand}`]: !!expand,
  })

  return (
    <button
      type="button"
      className={classes}
      style={
        {
          '--au-special-button-duration': `${holdDuration}ms`,
        } as React.CSSProperties
      }
      disabled={disabled || loading}
      aria-busy={loading}
      onPointerDown={_startHold}
      onPointerUp={_cancelHold}
      onPointerLeave={_cancelHold}
      onPointerCancel={_cancelHold}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      data-testid={dataTestId}>
      <span className="au-special-button__fill" aria-hidden="true" />
      <Conditional
        condition={loading}
        renderIf={<IconLoader />}
        renderElse={
          <span className="au-special-button__label">
            {disabled && <IconSlash aria-hidden="true" />}
            {children}
          </span>
        }
      />
    </button>
  )
}

const _SliderButton = ({
  children = 'Slide to action',
  onConfirm,
  variant = 'primary',
  disabled = false,
  loading = false,
  success = false,
  skeleton = false,
  knobAriaLabel = 'Arraste para confirmar',
  'data-testid': dataTestId,
}: SpecialButtonProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const startXRef = useRef(0)
  const [dragging, setDragging] = useState(false)
  const [dragX, setDragX] = useState(0)
  const [confirmed, setConfirmed] = useState(false)

  const isSuccess = success || confirmed
  const isInteractive = !disabled && !loading && !isSuccess && !skeleton

  function _maxDrag() {
    const container = containerRef.current
    if (!container) return 0
    return container.clientWidth - KNOB_SIZE - TRACK_PADDING * 2
  }

  function _confirm() {
    setConfirmed(true)
    if (onConfirm) onConfirm()
  }

  function handlePointerDown(event: React.PointerEvent<HTMLButtonElement>) {
    if (!isInteractive) return
    setDragging(true)
    startXRef.current = event.clientX
    event.currentTarget.setPointerCapture?.(event.pointerId)
  }

  function handlePointerMove(event: React.PointerEvent<HTMLButtonElement>) {
    if (!dragging) return
    const delta = event.clientX - startXRef.current
    setDragX(Math.min(Math.max(delta, 0), _maxDrag()))
  }

  function handlePointerEnd() {
    if (!dragging) return
    setDragging(false)
    const max = _maxDrag()
    if (max > 0 && dragX >= max * CONFIRM_THRESHOLD) _confirm()
    setDragX(0)
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (!isInteractive) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      _confirm()
    }
  }

  const classes = classNames(
    'au-special-button',
    'au-special-button--type-slider',
    {
      [`au-special-button--variant-${variant}`]: !!variant,
      'au-special-button--dragging': dragging,
      'au-special-button--disabled': disabled,
      'au-special-button--loading': loading,
      'au-special-button--success': isSuccess,
      'au-special-button--skeleton': skeleton,
    },
  )

  function _renderKnobIcon() {
    if (isSuccess) return <IconCheck aria-hidden="true" />
    if (disabled) return <IconSlash aria-hidden="true" />
    return <IconArrowRight aria-hidden="true" />
  }

  return (
    <div ref={containerRef} className={classes} data-testid={dataTestId}>
      {loading && <IconLoader />}
      {!loading && !skeleton && (
        <>
          <span className="au-special-button__label">{children}</span>
          <button
            type="button"
            className="au-special-button__knob"
            aria-label={knobAriaLabel}
            disabled={disabled}
            style={
              dragX > 0 ? { transform: `translateX(${dragX}px)` } : undefined
            }
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
            onKeyDown={handleKeyDown}>
            {_renderKnobIcon()}
          </button>
        </>
      )}
    </div>
  )
}

export const SpecialButton = ({ type = 'press', ...props }: SpecialButtonProps) => {
  if (type === 'slider') return <_SliderButton {...props} />
  return <_PressButton {...props} />
}

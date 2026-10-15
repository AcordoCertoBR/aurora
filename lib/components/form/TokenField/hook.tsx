import { useState, useEffect, useRef } from 'react'

type UseTokenInputProps = {
  size: number
  onComplete?: (token: string) => void
  onChange?: (value: string) => void
  onChangeTimer?: (time: number) => void
  timer?: number | null
}

function inputtedValueIsValid(value: unknown) {
  const numberValue = Number(value)
  const isNaN = Number.isNaN(numberValue)
  return !isNaN
}

export const useTokenField = ({
  size,
  onComplete,
  onChange,
  onChangeTimer,
  timer = null,
}: UseTokenInputProps) => {
  const rootElementRef = useRef<HTMLDivElement | null>(null)
  const [tokenMap, setTokenMap] = useState(_getDefaultTokens())
  const [timerTime, setTimerTime] = useState<number | null>(timer)

  useEffect(_handleValueEvents, [tokenMap])
  useEffect(_handleStartTimer, [timer])
  useEffect(_handleTimerUpdate, [timerTime])

  function _handleValueEvents() {
    const tokenValueArray =
      Object.keys(tokenMap).map((key) => tokenMap[key]) || []
    const stringField = tokenValueArray.join('')
    const isTokenValid = stringField.length === size
    if (onChange) onChange(stringField)

    if (!!isTokenValid && !!onComplete) {
      onComplete(stringField)
    }
  }

  function _handleStartTimer() {
    let interval: NodeJS.Timeout

    if (timer) {
      interval = setInterval(() => {
        setTimerTime((currentTime) => {
          if (!currentTime) return null
          const reachedTheLimit = currentTime === 0
          if (reachedTheLimit) {
            return timer
          } else {
            return currentTime - 1
          }
        })
      }, 1000)

      if (interval) {
        return () => clearInterval(interval)
      }
    }
  }

  function _handleTimerUpdate() {
    if (onChangeTimer && timerTime) onChangeTimer(timerTime)

    if (timerTime === 0) {
      setTokenMap(_getDefaultTokens())
      _resetFocus()
    }
  }

  function _getDefaultTokens() {
    return [...Array(size)].reduce((acc, _, i) => ({ ...acc, [i]: '' }), {})
  }

  function _goToNextInput(i: number) {
    const nextItem = rootElementRef?.current?.querySelector<HTMLInputElement>(
      `[data-token-i='${i + 1}']`,
    )
    if (nextItem) nextItem.focus()
  }

  // Keeps only the digits, so a code copied as "123 456" still fills in.
  function _fillTokens(raw: string) {
    const digits = raw.replace(/\D/g, '').slice(0, size).split('')
    setTokenMap({ ..._getDefaultTokens(), ...digits })
    _goToNextInput(digits.length - 1)
  }

  function _resetFocus() {
    const firstItem =
      rootElementRef.current?.querySelector<HTMLInputElement>(
        `[data-token-i='0']`,
      )
    firstItem?.focus()
  }

  function onKeyUpHandler(e: React.KeyboardEvent<HTMLInputElement>, i: number) {
    const hasBackspacePressed = e.which === 8 || e.key === 'Backspace'
    if (hasBackspacePressed) {
      const previousItem =
        rootElementRef?.current?.querySelector<HTMLInputElement>(
          `[data-token-i='${i - 1}']`,
        )
      const currentItem =
        rootElementRef?.current?.querySelector<HTMLInputElement>(
          `[data-token-i='${i}']`,
        )

      setTokenMap({ ...tokenMap, [i]: '' })
      if (!!previousItem && !currentItem?.value) previousItem.focus()
    }
  }

  function onChangeNumber(e: React.ChangeEvent<HTMLInputElement>, i: number) {
    e.preventDefault()
    let value = e?.target?.value

    // On mobile the `one-time-code` autofill and the keyboard clipboard
    // suggestion put the whole code in one input as a change, not a paste.
    if (value.replace(/\D/g, '').length >= size) {
      _fillTokens(value)
      return
    }

    const isNumberValid = inputtedValueIsValid(value)
    const isEmpty = value === ''

    if (isNumberValid) {
      let firstEmptyIndex = Object.keys(tokenMap).findIndex(
        (index) => tokenMap[index] === '',
      )

      if (value.length > 1) {
        firstEmptyIndex = firstEmptyIndex - 1
        value = value[value.length - 1]
      }

      if (firstEmptyIndex < 0) {
        if (value) {
          setTokenMap({ ...tokenMap, [i]: value })
        }

        return
      }

      setTokenMap({ ...tokenMap, [firstEmptyIndex]: value })
      if (!isEmpty) _goToNextInput(firstEmptyIndex)
    }
  }

  function onPasteNumber(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault()
    _fillTokens(e.clipboardData.getData('text'))
  }

  return {
    onKeyUpHandler,
    onChangeNumber,
    onPasteNumber,
    tokenMap,
    rootElementRef,
  }
}

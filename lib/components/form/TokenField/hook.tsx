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
    const value = e.clipboardData.getData('Text')
    const isNumberValid = inputtedValueIsValid(value)

    if (isNumberValid) {
      const arrValue = value.split('').slice(0, size)
      setTokenMap({ ..._getDefaultTokens(), ...arrValue })

      _goToNextInput(arrValue.length - 1)
    } else {
      setTokenMap(_getDefaultTokens())
    }
  }

  return {
    onKeyUpHandler,
    onChangeNumber,
    onPasteNumber,
    tokenMap,
    rootElementRef,
  }
}

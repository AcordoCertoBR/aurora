import { useState, useRef } from 'react'

type OptionProps = {
  value: string
  disabled?: boolean
}

export const useSelectField = (
  options: OptionProps[],
  initialValue?: string,
  onChange?: (value: string) => void,
  disabled?: boolean,
) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [currentValue, setCurrentValue] = useState<string>(initialValue || '')
  const [activeOptionIndex, setActiveOptionIndex] = useState<number | null>(
    null,
  )
  const selectRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    if (disabled) return
    setIsDropdownOpen((prev) => !prev)
    setActiveOptionIndex(null)
    if (selectRef.current) {
      selectRef.current.focus()
    }
  }

  const selectOption = (optionValue: string, optionDisabled?: boolean) => {
    if (optionDisabled || disabled) return

    setCurrentValue(optionValue)
    setIsDropdownOpen(false)
    if (onChange) {
      onChange(optionValue)
    }
  }

  const _findNextAvailableIndex = (
    currentIndex: number,
    direction: 'down' | 'up',
  ): number => {
    const directionStep = direction === 'down' ? 1 : -1
    let nextIndex =
      (currentIndex + directionStep + options.length) % options.length

    while (options[nextIndex]?.disabled) {
      nextIndex = (nextIndex + directionStep + options.length) % options.length
    }

    return nextIndex
  }

  const onKeyDownDropdown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return

    const _actions: Record<string, () => void> = {
      Enter: () => {
        if (!isDropdownOpen) {
          toggleDropdown()
          return
        }
        if (
          activeOptionIndex !== null &&
          !options[activeOptionIndex].disabled
        ) {
          e.preventDefault()
          selectOption(options[activeOptionIndex].value)
        }
      },
      ArrowDown: () => {
        e.preventDefault()
        setActiveOptionIndex((prev) =>
          _findNextAvailableIndex(prev !== null ? prev : -1, 'down'),
        )
        if (!isDropdownOpen) toggleDropdown()
      },
      ArrowUp: () => {
        e.preventDefault()
        setActiveOptionIndex((prev) =>
          _findNextAvailableIndex(prev !== null ? prev : options.length, 'up'),
        )
        if (!isDropdownOpen) toggleDropdown()
      },
      Escape: () => {
        setIsDropdownOpen(false)
      },
    }

    if (_actions[e.key]) {
      _actions[e.key]()
    }
  }

  return {
    isDropdownOpen,
    currentValue,
    selectRef,
    toggleDropdown,
    selectOption,
    onKeyDownDropdown,
    setActiveOptionIndex,
    activeOptionIndex,
  }
}

import { useState, useRef, useEffect } from 'react'

type OptionProps = {
  value: string
  disabled?: boolean
}

export const useSelectField = (
  options: OptionProps[],
  initialValue?: string,
  onChange?: (value: string) => void,
  disabled?: boolean,
  register?: (instance: HTMLSelectElement | null) => void,
) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [currentValue, setCurrentValue] = useState<string>(initialValue || '')
  const [activeOptionIndex, setActiveOptionIndex] = useState<number | null>(
    null,
  )
  const selectRef = useRef<HTMLDivElement>(null)
  const selectElementRef = useRef<HTMLSelectElement>(null)

  useEffect(() => {
    if (initialValue) {
      setCurrentValue(initialValue)
    }
  }, [initialValue])

  useEffect(() => {
    if (register && selectElementRef.current) {
      register(selectElementRef.current)
    }
  }, [register])

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev)
    setActiveOptionIndex(null)
    if (selectRef.current) {
      selectRef.current.focus()
    }
  }

  const selectOption = (optionValue: string, optionDisabled?: boolean) => {
    if (optionDisabled) return

    setCurrentValue(optionValue)
    setIsDropdownOpen(false)

    if (onChange) {
      onChange(optionValue)
    }
  }

  const _findNextAvailableIndex = (
    currentIndex: number,
    direction: 'down' | 'up',
  ) => {
    const step = direction === 'down' ? 1 : -1
    let nextIndex = (currentIndex + step + options.length) % options.length

    while (options[nextIndex]?.disabled) {
      nextIndex = (nextIndex + step + options.length) % options.length
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
          selectOption(
            options[activeOptionIndex].value,
            options[activeOptionIndex].disabled,
          )
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
    selectElementRef,
    toggleDropdown,
    selectOption,
    onKeyDownDropdown,
    setActiveOptionIndex,
    activeOptionIndex,
  }
}

import { useState, useRef, useEffect } from 'react'
import { OptionProps } from './types'

export const useSelectField = (
  options: OptionProps[],
  initialValue?: string,
  onChange?: (value: string) => void,
  onBlur?: React.FocusEventHandler,
  disabled?: boolean,
  register?: (instance: HTMLSelectElement | null) => void,
  autocomplete: boolean = false,
) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<OptionProps>({
    value: initialValue || '',
    label: initialValue
      ? options.find((option) => option.value === initialValue)?.label || ''
      : '',
  })
  const [activeOptionIndex, setActiveOptionIndex] = useState<number | null>(
    null,
  )
  const [dropdownMaxHeight, setDropdownMaxHeight] = useState<number>(0)
  const selectRef = useRef<HTMLDivElement>(null)
  const selectElementRef = useRef<HTMLSelectElement>(null)
  const [searchValue, setSearchValue] = useState<string>('')
  const activeOptionRef = useRef<HTMLLIElement | null>(null)

  const filteredOptions = autocomplete
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase()),
      )
    : options

  useEffect(() => {
    if (initialValue) {
      const option = options.find((option) => option.value === initialValue)
      if (option) {
        setSelectedOption({ value: option.value, label: option.label })
      }
    }
  }, [initialValue, options])

  useEffect(() => {
    if (register && selectElementRef.current) {
      register(selectElementRef.current)
    }
  }, [register])

  useEffect(() => {
    if (activeOptionRef.current) {
      activeOptionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }
  }, [activeOptionIndex])

  useEffect(() => {
    const handleClickOutside = (event: PointerEvent) => {
      const isClickedOutside =
        selectRef.current &&
        !selectRef.current.contains(event.target as Node) &&
        activeOptionRef.current

      if (isClickedOutside) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('pointerup', handleClickOutside)
    } else {
      document.removeEventListener('pointerup', handleClickOutside)
    }

    return () => {
      document.removeEventListener('pointerup', handleClickOutside)
    }
  }, [isDropdownOpen])

  const toggleDropdown = () => {
    if (!isDropdownOpen && selectRef.current) {
      const { bottom } = selectRef.current.getBoundingClientRect()
      let totalPadding = 0
      let parentElement: HTMLElement | null = selectRef.current.parentElement

      while (parentElement) {
        const parentPaddingBottom = parseFloat(
          window.getComputedStyle(parentElement).paddingBottom || '0',
        )
        totalPadding += parentPaddingBottom
        parentElement = parentElement.parentElement
      }

      const availableSpaceBelow = window.innerHeight - bottom - totalPadding
      const minDropdownHeight = 212
      const calculatedHeight = Math.max(availableSpaceBelow, minDropdownHeight)

      setDropdownMaxHeight(calculatedHeight)
    }

    setIsDropdownOpen((prev) => {
      if (!prev) {
        const selectedIndex = options.findIndex(
          (option) => option.value === selectedOption.value,
        )
        setActiveOptionIndex(selectedIndex !== -1 ? selectedIndex : null)
      }
      return !prev
    })
  }

  const _findNextAvailableIndex = (
    currentIndex: number,
    direction: 'down' | 'up',
  ) => {
    const step = direction === 'down' ? 1 : -1
    let nextIndex =
      (currentIndex + step + filteredOptions.length) % filteredOptions.length

    while (filteredOptions[nextIndex]?.disabled) {
      nextIndex =
        (nextIndex + step + filteredOptions.length) % filteredOptions.length
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
          !filteredOptions[activeOptionIndex].disabled
        ) {
          e.preventDefault()
          selectOption(
            filteredOptions[activeOptionIndex].value,
            filteredOptions[activeOptionIndex].disabled,
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
          _findNextAvailableIndex(
            prev !== null ? prev : filteredOptions.length,
            'up',
          ),
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

  const selectOption = (optionValue: string, optionDisabled?: boolean) => {
    if (optionDisabled) return

    const option = options.find((option) => option.value === optionValue)
    if (option) {
      setSelectedOption({ value: option.value, label: option.label })
    }

    setActiveOptionIndex(null)
    setSearchValue('')
    setTimeout(() => setIsDropdownOpen(false), 500)

    if (onChange) {
      onChange(optionValue)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)

    if (onChange) {
      onChange(value)
    }

    if (value === '') {
      setSelectedOption({ value: '', label: '' })
    }

    if (!isDropdownOpen) {
      setIsDropdownOpen(true)
    }
  }

  const handleOnBlur = (event?: React.FocusEvent<Element>) => {
    if (onBlur) {
      setTimeout(() => {
        const getOptionByLabel = (label: string) =>
          options.find((option) => option.label === label)

        const elementValue = (event?.target as HTMLInputElement).value
        const selectedOptionFromElement = getOptionByLabel(elementValue)

        const targetValue = selectedOption?.value
          ? selectedOption
          : selectedOptionFromElement || { value: elementValue, label: '' }

        onBlur({
          ...event,
          target: targetValue,
        } as React.FocusEvent<Element> & {
          target: OptionProps
        })
      }, 200)
    }
  }

  return {
    isDropdownOpen,
    selectRef,
    activeOptionRef,
    selectElementRef,
    toggleDropdown,
    selectOption,
    onKeyDownDropdown,
    setActiveOptionIndex,
    activeOptionIndex,
    filteredOptions,
    searchValue,
    setSearchValue,
    handleInputChange,
    dropdownMaxHeight,
    selectedOption,
    setSelectedOption,
    handleOnBlur,
  }
}

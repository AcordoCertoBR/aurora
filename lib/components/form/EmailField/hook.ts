import { useEffect, useState } from 'react'

const emailDomains = [
  'gmail.com',
  'hotmail.com',
  'yahoo.com',
  'outlook.com',
  'yahoo.com.br',
  'uol.com.br',
  'ig.com.br',
  'terra.com.br',
  'aol.com',
  'live.com',
  'msn.com',
]

export const useEmailAutocomplete = (propsOnChange?: (value: string) => void) => {
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  useEffect(() => {
    setActiveIndex(-1)
  }, [suggestions])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    setInputValue(value)
		if(propsOnChange) propsOnChange(value);

    const atIndex = value.indexOf('@');
		let filteredDomains: string[] = [];

    if (atIndex > -1) {
      const domainPart = value.slice(atIndex + 1)
      filteredDomains = emailDomains.filter((domain) =>
        domain.startsWith(domainPart),
      )
      setSuggestions(filteredDomains)
      setIsDropdownOpen(filteredDomains.length > 0)
    } else {
      setSuggestions([])
      setIsDropdownOpen(false)
    }

    if (filteredDomains.some(domain => value.endsWith(domain))) {
      setIsDropdownOpen(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    const atIndex = inputValue.indexOf('@')
    if (atIndex > -1) {
			const completedEmailValue = inputValue.slice(0, atIndex + 1) + suggestion;
      setInputValue(completedEmailValue);
			if(propsOnChange) propsOnChange(completedEmailValue);
    }
    setSuggestions([])
    setIsDropdownOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isDropdownOpen || suggestions.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((prev) => (prev + 1) % suggestions.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((prev) =>
        prev <= 0 ? suggestions.length - 1 : prev - 1,
      )
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault()
      handleSuggestionClick(suggestions[activeIndex])
    } else if (e.key === 'Escape') {
      setIsDropdownOpen(false)
    }
  }

  return {
    inputValue,
    setInputValue,
    suggestions,
    isDropdownOpen,
    activeIndex,
    handleChange,
    handleSuggestionClick,
    handleKeyDown,
  }
}

import { useState } from 'react'

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (inputValue === value) return
    setInputValue(value)

    const atIndex = value.indexOf('@')
    if (atIndex > -1) {
      const domainPart = value.slice(atIndex + 1)
      const filteredDomains = emailDomains.filter((domain) =>
        domain.startsWith(domainPart),
      )
      setSuggestions(filteredDomains)
      setIsDropdownOpen(filteredDomains.length > 0)
    } else {
      setSuggestions([])
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

  return {
    inputValue,
    setInputValue,
    suggestions,
    isDropdownOpen,
    handleChange,
    handleSuggestionClick,
  }
}

import { useState } from 'react'

type UseFieldTextAreaProps = {
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const useFieldTextArea = ({ onChange }: UseFieldTextAreaProps) => {
  const [charCount, setCharCount] = useState(0)

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length)
    if (onChange) onChange(e)
  }

  return {
    charCount,
    handleInputChange,
  }
}

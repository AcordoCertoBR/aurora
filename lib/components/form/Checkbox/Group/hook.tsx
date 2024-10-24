import { useEffect, useState } from 'react'
import { CheckboxFieldProps } from '../types'

type UseCheckboxGroupProps = {
  name?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export const useCheckboxGroup = ({ onChange, name }: UseCheckboxGroupProps) => {
  const getSafeName = (name?: string): string => {
    return name ? name : `au-checkbox-group-${Math.random()}`
  }
  const [safeName] = useState(getSafeName(name))

  const [selectedOptions, setSelectedOptions] = useState([{}])

  function handleSelectOption(
    checked: boolean,
    option: CheckboxFieldProps,
    index: number,
  ) {
    setSelectedOptions({
      ...selectedOptions,
      [index]: checked ? option : false,
    })
  }

  useEffect(() => {
    const returnResponse = Object.values(selectedOptions).filter(
      (item) => !!item,
    )

    if (onChange) {
      const event = {
        target: {
          checked: returnResponse,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>

      onChange(event)
    }
  }, [selectedOptions])

  return {
    handleSelectOption,
    safeName,
  }
}

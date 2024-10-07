import { RadioField } from './Field'
import { RadioGroup } from './Group'
import { RadioFieldProps, RadioGroupProps } from './types'

type Components = {
  Field: React.FC<RadioFieldProps>
  Group: React.FC<RadioGroupProps>
}

const components: Components = {
  Field: RadioField,
  Group: RadioGroup,
}

Object.keys(components).forEach((key) => {
  const component = components[key as keyof Components]
  component.displayName = `Radio.${key}`
})

export { components as Radio }

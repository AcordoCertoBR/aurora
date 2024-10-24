import { CheckboxField } from './Field'
import { CheckboxGroup } from './Group'
import { CheckboxFieldProps, CheckboxGroupProps } from './types'

type Components = {
  Field: React.FC<CheckboxFieldProps>
  Group: React.FC<CheckboxGroupProps>
}

const components: Components = {
  Field: CheckboxField,
  Group: CheckboxGroup,
}

Object.keys(components).forEach((key) => {
  const component = components[key as keyof Components]
  component.displayName = `Checkbox.${key}`
})

export { components as Checkbox }

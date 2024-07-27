export interface ConditionalProps {
  condition: boolean
  renderIf: any
  renderElse?: any
}

export const Conditional = ({
  condition,
  renderIf,
  renderElse = null,
}: ConditionalProps) => {
  return condition ? renderIf : renderElse
}

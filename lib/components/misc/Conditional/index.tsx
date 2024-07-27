export interface ConditionalProps {
  condition: boolean
  renderIf: any
  renderElse?: any
}

const Conditional = ({
  condition,
  renderIf,
  renderElse = null,
}: ConditionalProps) => {
  return condition ? renderIf : renderElse
}

export default Conditional

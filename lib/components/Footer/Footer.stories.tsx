import { Meta, StoryObj } from '@storybook/react'
import { LogoPrimaryCP } from '../Logo'
import { Footer } from './index'
import { Text } from '../Text'

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Footer>

export const Default: Story = {
  args: {
    logo: <LogoPrimaryCP />,
    notes: (
      <Text as="h2" variant="body-medium" weight="regular">
        As informações apresentadas nos relatórios de auto consulta, tais como:
        score, negativação e verificação de consultas realizadas no CPF são
        originárias do SCPC - banco de dados de proteção ao crédito administrado
        pela BOA VISTA SERVIÇOS S.A. inscrita no CNPJ nº 11.725.176/0001-27 -,
        empresa do Grupo Equifax.
      </Text>
    ),
    certificates: ['sslblindado', 'reclameaqui', 'pcidss'],
    copyrights: (
      <Text as="h2" variant="body-medium" weight="regular">
        © 2024 Consumidor Positivo Ltda. - Todos os direitos reservados
      </Text>
    ),
  },
}

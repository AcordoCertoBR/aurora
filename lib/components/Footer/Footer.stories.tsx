import { Meta, StoryObj } from '@storybook/react'
import { LogoPrimaryCP } from '../Logo'
import { Footer } from './index'
import { Text } from '../Text'

const meta: Meta<typeof Footer.Root> = {
  title: 'Components/Footer',
  component: Footer.Root,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Footer.Root>

export const Default: Story = {
  args: {
    children: (
      <>
        <Footer.Logo children={<LogoPrimaryCP />} />
        <Footer.Certifications
          certificates={['sslblindado', 'reclameaqui', 'pcidss']}>
          <Text as="h2" variant="body-medium" weight="regular">
            Consumidor Positivo Ltda.
            <br />
            CNPJ: 30.247.128/0001-15
          </Text>
        </Footer.Certifications>
        <Footer.Note>
          <Text as="h2" variant="body-medium" weight="regular">
            © 2024 Consumidor Positivo Ltda. - Todos os direitos reservados
          </Text>
        </Footer.Note>
      </>
    ),
  },
}

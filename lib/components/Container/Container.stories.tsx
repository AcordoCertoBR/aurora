import type { Meta, StoryObj } from '@storybook/react'
import { Container } from './index'
import { Text } from '@components/Text'

const meta: Meta<typeof Container> = {
  title: 'Components/Container',
  component: Container,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#f1f1f1' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof Container>

export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: '20px', backgroundColor: '#ffffff', border: '1px dashed #ccc' }}>
        <Text>Conteúdo dentro do Container</Text>
      </div>
    ),
  },
}

export const WithCustomClass: Story = {
  args: {
    customClass: 'custom-container-class',
    children: (
      <div style={{ padding: '20px', backgroundColor: '#f8f9fa', border: '1px dashed #007bff' }}>
        <Text>Container com classe personalizada</Text>
      </div>
    ),
  },
}

export const WithMultipleElements: Story = {
  args: {
    children: (
      <div>
        <div style={{ padding: '10px', backgroundColor: '#e9ecef', marginBottom: '10px' }}>
          <Text>Primeiro elemento</Text>
        </div>
        <div style={{ padding: '10px', backgroundColor: '#dee2e6', marginBottom: '10px' }}>
          <Text>Segundo elemento</Text>
        </div>
        <div style={{ padding: '10px', backgroundColor: '#ced4da' }}>
          <Text>Terceiro elemento</Text>
        </div>
      </div>
    ),
  },
}

export const WithLongContent: Story = {
  args: {
    children: (
      <div style={{ padding: '20px', backgroundColor: '#ffffff' }}>
        <Text>
          Este é um exemplo de Container com conteúdo mais longo para demonstrar como o 
          componente se comporta com diferentes quantidades de texto e elementos. 
          O Container deve se adaptar ao conteúdo mantendo sua estrutura e estilos.
        </Text>
        <br />
        <br />
        <Text>
          Aqui temos mais um parágrafo para mostrar como múltiplos elementos de texto
          são organizados dentro do Container component.
        </Text>
      </div>
    ),
  },
}

export const Nested: Story = {
  args: {
    children: (
      <Container customClass="inner-container">
        <div style={{ padding: '15px', backgroundColor: '#fff3cd', border: '1px solid #ffeaa7' }}>
          <Text>Container aninhado - útil para layouts complexos</Text>
        </div>
      </Container>
    ),
  },
}

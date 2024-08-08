import { Meta, StoryObj } from '@storybook/react'
import { LogoPrimaryCP } from '../Logo'
import { Footer } from './index'

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
    links: [
      {
        category: 'Quem Somos',
        items: [
          {
            name: 'Sobre o Consumidor Positivo',
            url: 'https://google.com',
          },
          {
            name: 'Termos e Políticas',
            url: 'https://google.com',
          },
          {
            name: 'Blog',
            url: 'https://google.com',
          },
          {
            name: 'Evite fraudes',
            url: 'https://google.com',
          },
        ],
      },
      {
        category: 'Nossas soluções',
        items: [
          {
            name: 'Cartões de Crédito',
            url: 'https://google.com',
          },
          {
            name: 'Score',
            url: 'https://google.com',
          },
          {
            name: 'Acordo Certo',
            url: 'https://google.com',
          },
          {
            name: 'Cadastro Positivo',
            url: 'https://google.com',
          },
          {
            name: 'Consultar CPF Grátis',
            url: 'https://google.com',
          },
        ],
      },
      {
        category: 'Blog',
        items: [
          {
            name: 'Página Inicial',
            url: 'https://google.com',
          },
          {
            name: 'Educação Financeira',
            url: 'https://google.com',
          },
          {
            name: 'Score',
            url: 'https://google.com',
          },
          {
            name: 'Cartão de Crédito',
            url: 'https://google.com',
          },
          {
            name: 'Empréstimos',
            url: 'https://google.com',
          },
        ],
      },
      {
        category: 'Contato',
        items: [
          {
            name: 'Fale Conosco',
            url: 'https://google.com',
          },
          {
            name: 'Central de Ajuda',
            url: 'https://google.com',
          },
          {
            name: '3003 - 0201 ( Das 8h às 20h )',
          },
          {
            name: '0800 727 0201 ( Cadastro Positivo )',
          },
        ],
      },
    ],
    socials: {
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
      youtube: 'https://youtube.com',
      linkedin: 'https://linkedin.com',
    },
    address:
      'Rua Cardeal Arcoverde nº 2365, Conjuntos. 81 a 84, Sala 03, Bairro: Pinheiros, na cidade de São Paulo, Estado de São Paulo, CEP 05407-003',
    notes:
      'As informações apresentadas nos relatórios de auto consulta, tais como: score, negativação e verificação de consultas realizadas no CPF são originárias do SCPC - banco de dados de proteção ao crédito administrado pela BOA VISTA SERVIÇOS S.A. inscrita no CNPJ nº 11.725.176/0001-27 -, empresa do Grupo Equifax.',
    certificates: ['sslblindado', 'reclameaqui', 'pcidss'],
    copyrights:
      '© 2024 Consumidor Positivo Ltda.- Todos os direitos reservados',
  },
}

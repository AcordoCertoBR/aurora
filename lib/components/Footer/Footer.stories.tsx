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

export const LoggedOut: Story = {
  args: {
    logo: <LogoPrimaryCP />,
    categoryLinks: [
      {
        categoryTitle: 'Quem Somos',
        links: [
          {
            title: 'Sobre o Consumidor Positivo',
            url: 'https://google.com',
          },
          {
            title: 'Termos e Políticas',
            url: 'https://google.com',
          },
          {
            title: 'Blog',
            url: 'https://google.com',
          },
          {
            title: 'Evite fraudes',
            url: 'https://google.com',
          },
        ],
      },
      {
        categoryTitle: 'Nossas soluções',
        links: [
          {
            title: 'Cartões de Crédito',
            url: 'https://google.com',
          },
          {
            title: 'Score',
            url: 'https://google.com',
          },
          {
            title: 'Acordo Certo',
            url: 'https://google.com',
          },
          {
            title: 'Cadastro Positivo',
            url: 'https://google.com',
          },
          {
            title: 'Consultar CPF Grátis',
            url: 'https://google.com',
          },
        ],
      },
      {
        categoryTitle: 'Blog',
        links: [
          {
            title: 'Página Inicial',
            url: 'https://google.com',
          },
          {
            title: 'Educação Financeira',
            url: 'https://google.com',
          },
          {
            title: 'Score',
            url: 'https://google.com',
          },
          {
            title: 'Cartão de Crédito',
            url: 'https://google.com',
          },
          {
            title: 'Empréstimos',
            url: 'https://google.com',
          },
        ],
      },
      {
        categoryTitle: 'Contato',
        links: [
          {
            title: 'Fale Conosco',
            url: 'https://google.com',
          },
          {
            title: 'Central de Ajuda',
            url: 'https://google.com',
          },
          {
            title: '3003 - 0201 ( Das 8h às 20h )',
          },
          {
            title: '0800 727 0201 ( Cadastro Positivo )',
          },
        ],
      },
    ],
    socialLinks: {
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

export const LoggedIn: Story = {
  args: {
    logo: <LogoPrimaryCP />,
    socialLinks: {
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
      youtube: 'https://youtube.com',
      linkedin: 'https://linkedin.com',
    },
    notes:
      'As informações apresentadas nos relatórios de auto consulta, tais como: score, negativação e verificação de consultas realizadas no CPF são originárias do SCPC - banco de dados de proteção ao crédito administrado pela BOA VISTA SERVIÇOS S.A. inscrita no CNPJ nº 11.725.176/0001-27 -, empresa do Grupo Equifax.',
    certificates: ['sslblindado', 'reclameaqui', 'pcidss'],
    copyrights: `© Copyright 2024 Consumidor Positivo Ltda. Todos os direitos reservados / CNPJ: 30.247.128/0001-15`,
  },
}

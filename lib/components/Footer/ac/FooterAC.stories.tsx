import { Meta, StoryObj } from '@storybook/react'
import { LogoTertiaryAC } from '../../Logo'
import { Footer } from '../index'

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer/AC',
  component: Footer,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Footer>

export const LoggedOut: Story = {
  args: {
    logo: <LogoTertiaryAC />,
    categoryLinks: [
      {
        categoryTitle: 'Institucional',
        links: [
          {
            title: 'Como Funciona',
            url: 'https://google.com',
          },
          {
            title: 'Quems Somos',
            url: 'https://google.com',
          },
          {
            title: 'Parcerias',
            url: 'https://google.com',
          },
          {
            title: 'Blog',
            url: 'https://google.com',
          },
          {
            title: 'Vagas',
            url: 'https://google.com',
          },
          {
            title: 'Políticas do Site',
            url: 'https://google.com',
          },
          {
            title: 'Mapa do Site',
            url: 'https://google.com',
          },
          {
            title: 'Hub de Guias',
            url: 'https://google.com',
          },
        ],
      },
      {
        categoryTitle: 'Serviços',
        links: [
          {
            title: 'Consultar Score',
            url: 'https://google.com',
          },
          {
            title: 'Consultar CPF',
            url: 'https://google.com',
          },
          {
            title: 'Monitorar CPF',
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
            title: 'Minhas Finanças',
            url: 'https://google.com',
          },
          {
            title: 'Score',
            url: 'https://google.com',
          },
          {
            title: 'Negociar Dívidas',
            url: 'https://google.com',
          },
          {
            title: 'Empréstimos',
            url: 'https://google.com',
          },
          {
            title: 'Devo, Não Nego',
            url: 'https://google.com',
          },
        ],
      },
      {
        categoryTitle: 'Contato',
        links: [
          {
            title: 'FAQ',
            url: 'https://google.com',
          },
          {
            title: 'Fale Conosco',
            url: 'https://google.com',
          },
          {
            title: 'Bloqueio de Contato',
            url: 'https://google.com',
          },
        ],
      },
    ],
    socialLinks: {
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com',
      youtube: 'https://youtube.com',
      tiktok: 'https://tiktok.com',
    },
    stores: {
      googleplay: 'https://play.google.com',
      appstore: 'https://appstore.com',
    },
    cnpj: '30.247.128/0001-15',
    address:
      'Rua Cardeal Arcoverde nº 2365, Conjuntos. 81 a 84, Sala 03, Bairro: Pinheiros, na cidade de São Paulo, Estado de São Paulo, CEP 05407-003',
    certificates: ['ra1000', 'fintech2023', 'fintech2022', 'scaleup', 'quintessa'],
    copyrights:
      '© 2025 Consumidor Positivo Ltda. - Todos os direitos reservados',
  },
}

export const LoggedIn: Story = {
  args: {
    logo: <LogoTertiaryAC />,
    socialLinks: {
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
      youtube: 'https://youtube.com',
      linkedin: 'https://linkedin.com',
    },
    certificates: ['ra1000', 'fintech2023', 'fintech2022', 'scaleup', 'quintessa'],
    copyrights: (
      <>
        © Copyright 2025 Consumidor Positivo Ltda. <br />
        Todos os direitos reservados / CNPJ: 30.247.128/0001-15
      </>
    ),
  },
}

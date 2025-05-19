import { Meta, StoryObj } from '@storybook/react'
import { LogoPrimaryCP } from '../../Logo'
import { Footer } from '../index'

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer/CP',
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
        categoryTitle: 'Institucional',
        links: [
          {
            title: 'Sobre a Consumidor Positivo',
            url: 'https://google.com',
          },
          {
            title: 'Sobre a Acordo Certo',
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
        categoryTitle: 'Nossas soluções',
        links: [
          {
            title: 'Cartões de Crédito',
            url: 'https://google.com',
          },
          {
            title: 'Empréstimos',
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
            title: '3003 - 0201 (Das 8h às 20h)',
          },
          {
            title: (
              <>
                0800 727 0201 <br />
                (Cadastro Positivo)
              </>
            ),
          },
        ],
      },
    ],
    socialLinks: {
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
      youtube: 'https://youtube.com',
    },
    stores: {
      googleplay: 'https://play.google.com',
      appstore: 'https://appstore.com',
    },
    cnpj: '30.247.128/0001-15',
    address:
      'Rua Cardeal Arcoverde nº 2365, Conjuntos. 81 a 84, Sala 03, Bairro: Pinheiros, na cidade de São Paulo, Estado de São Paulo, CEP 05407-003',
    companyOverview: 'A Consumidor Positivo é uma joint venture entre a Boa Vista Serviços S.A. (CNPJ 11.725.176/0001-27) e RV TECHNOLOGY, LLC (21.688.316/0001-98). Somos uma plataforma digital que atua como Correspondente Bancário para facilitar o processo de contratação de produtos de crédito e débito. Como Correspondente Bancário, seguimos as diretrizes da Resolução nº 3.954 do Banco Central do Brasil.',
    certificates: ['sslblindado', 'reclameaqui', 'pcidss'],
    copyrights:
      '© 2025 Consumidor Positivo Ltda. - Todos os direitos reservados',
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
    certificates: ['sslblindado', 'reclameaqui', 'pcidss'],
    copyrights: (
      <>
        © Copyright 2025 Consumidor Positivo Ltda. <br />
        Todos os direitos reservados / CNPJ: 30.247.128/0001-15
      </>
    ),
  },
}

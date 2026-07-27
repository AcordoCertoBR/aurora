import { Meta, StoryObj } from '@storybook/react'
import { TabsProps } from '.'
import { Tabs } from '.'

const meta: Meta<TabsProps> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#f1f1f1' }],
    },
  },
}

export default meta

type Story = StoryObj<TabsProps>

export const Default: Story = {
  args: {
    tabs: [
      {
        title: 'Dívidas',
        tab: 'debts',
        children: (
          <div>
            <h3>Dívidas</h3>
            <p>Visualize todas as dívidas encontradas no seu CPF.</p>
          </div>
        ),
      },
      {
        title: 'Acordos',
        tab: 'agreements',
        children: (
          <div>
            <h3>Acordos</h3>
            <p>Acompanhe os acordos em andamento.</p>
          </div>
        ),
      },
      {
        title: 'Contas',
        tab: 'bills',
        children: (
          <div>
            <h3>Contas</h3>
            <p>Veja suas contas cadastradas.</p>
          </div>
        ),
      },
      {
        title: 'Score',
        tab: 'score',
        children: (
          <div>
            <h3>Score</h3>
            <p>Consulte a evolução do seu score.</p>
          </div>
        ),
      },
    ],
    initialTab: 'debts',
    onClick: (tab) => {
      console.log('Tab clicada:', tab)
    },
  },
}

export const WithRightSlot: Story = {
  args: {
    tabs: [
      {
        title: 'Dashboard',
        tab: 'dashboard',
        children: (
          <div>
            <h3>Dashboard Principal</h3>
            <p>Visão geral dos dados e métricas importantes.</p>
          </div>
        ),
      },
      {
        title: 'Vendas',
        tab: 'sales',
        children: (
          <div>
            <h3>Relatório de Vendas</h3>
            <p>Acompanhe o desempenho das vendas em tempo real.</p>
          </div>
        ),
      },
    ],
    initialTab: 'dashboard',
    rightSlotChildren: (
      <button
        style={{
          padding: '6px 12px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '12px',
          cursor: 'pointer',
        }}>
        + Novo
      </button>
    ),
    onClick: (tab) => {
      console.log('Tab clicada:', tab)
    },
  },
}

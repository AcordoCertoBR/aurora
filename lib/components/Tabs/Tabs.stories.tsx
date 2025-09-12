import { Meta, StoryObj } from '@storybook/react'
import { TabsProps } from '.'
import { Tabs } from '.'
import { LogoBadgetAC } from '@components/Logo'
import { LogoBadgetCP } from '@components/Logo'
import { LogoPrimaryNegativeAC } from '@components/Logo'
import { IconCheckCircle } from '@components/icons'

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

export const CustomContent: Story = {
  args: {
    tabs: [
    {
      title: 'Logo do AC',
      tab: 'tab 1',
      icon: <IconCheckCircle />,
      children: <LogoBadgetAC/>
    },
    {
      title: 'Logo do CP',
      tab: 'tab 2',
      children: <LogoBadgetCP/>
    },
    {
      title: 'Logo do AC Negativo',
      tab: 'tab 3',
      children: <LogoPrimaryNegativeAC/>
    },
  ],
  initialTab: 'tab 1',
  onClick: () => {
    console.log('tab clicked');
  },
  },
}

export const WithLabel: Story = {
  args: {
    tabs: [
      {
        title: 'Todos',
        tab: 'all',
        children: (
          <div style={{ padding: '20px' }}>
            <h3>Todos os Itens</h3>
            <p>Visualize todos os itens disponíveis no sistema.</p>
          </div>
        )
      },
      {
        title: 'Ativos',
        tab: 'active',
        children: (
          <div style={{ padding: '20px' }}>
            <h3>Itens Ativos</h3>
            <p>Lista apenas os itens que estão atualmente ativos.</p>
          </div>
        )
      },
      {
        title: 'Inativos',
        tab: 'inactive',
        children: (
          <div style={{ padding: '20px' }}>
            <h3>Itens Inativos</h3>
            <p>Visualize os itens que foram desativados.</p>
          </div>
        )
      },
    ],
    initialTab: 'all',
    withLabel: true,
    onClick: (tab) => {
      console.log('Tab clicada:', tab);
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
          <div style={{ padding: '20px' }}>
            <h3>Dashboard Principal</h3>
            <p>Visão geral dos dados e métricas importantes.</p>
          </div>
        )
      },
      {
        title: 'Vendas',
        tab: 'sales',
        children: (
          <div style={{ padding: '20px' }}>
            <h3>Relatório de Vendas</h3>
            <p>Acompanhe o desempenho das vendas em tempo real.</p>
          </div>
        )
      },
      {
        title: 'Clientes',
        tab: 'customers',
        children: (
          <div style={{ padding: '20px' }}>
            <h3>Gestão de Clientes</h3>
            <p>Visualize e gerencie informações dos clientes.</p>
          </div>
        )
      },
    ],
    initialTab: 'dashboard',
    rightSlotChildren: (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px'
      }}>
        <button style={{
          padding: '6px 12px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '12px',
          cursor: 'pointer'
        }}>
          + Novo
        </button>
        <button style={{
          padding: '6px 8px',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '12px',
          cursor: 'pointer'
        }}>
          ⚙️
        </button>
      </div>
    ),
    onClick: (tab) => {
      console.log('Tab clicada:', tab);
    },
  },
}

export const WithLabelAndRightSlot: Story = {
  args: {
    tabs: [
      {
        title: 'Projetos',
        tab: 'projects',
        children: (
          <div style={{ padding: '20px' }}>
            <h3>Meus Projetos</h3>
            <p>Lista de todos os projetos ativos e em desenvolvimento.</p>
          </div>
        )
      },
      {
        title: 'Arquivados',
        tab: 'archived',
        children: (
          <div style={{ padding: '20px' }}>
            <h3>Projetos Arquivados</h3>
            <p>Visualize projetos que foram arquivados.</p>
          </div>
        )
      },
      {
        title: 'Favoritos',
        tab: 'favorites',
        children: (
          <div style={{ padding: '20px' }}>
            <h3>Projetos Favoritos</h3>
            <p>Seus projetos marcados como favoritos.</p>
          </div>
        )
      },
    ],
    initialTab: 'projects',
    withLabel: true,
    rightSlotChildren: (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px'
      }}>
        <button style={{
          padding: '6px 12px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '12px',
          cursor: 'pointer'
        }}>
          + Novo Projeto
        </button>
        <button style={{
          padding: '4px 8px',
          backgroundColor: 'transparent',
          border: '1px solid #dee2e6',
          borderRadius: '4px',
          fontSize: '12px',
          cursor: 'pointer'
        }}>
          ⚙️ Configurações
        </button>
      </div>
    ),
    onClick: (tab) => {
      console.log('Tab clicada:', tab);
    },
  },
}

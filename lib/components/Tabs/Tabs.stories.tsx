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

export const WithHeaderChildren: Story = {
  args: {
    tabs: [
      {
        title: 'Configurações',
        tab: 'config',
        icon: <IconCheckCircle />,
        children: (
          <div style={{ padding: '20px' }}>
            <h3>Configurações do Sistema</h3>
            <p>Aqui você pode alterar as configurações gerais do sistema.</p>
          </div>
        )
      },
      {
        title: 'Usuários',
        tab: 'users',
        children: (
          <div style={{ padding: '20px' }}>
            <h3>Gerenciar Usuários</h3>
            <p>Lista e gerenciamento de usuários do sistema.</p>
          </div>
        )
      },
      {
        title: 'Relatórios',
        tab: 'reports',
        children: (
          <div style={{ padding: '20px' }}>
            <h3>Relatórios</h3>
            <p>Visualize e exporte relatórios do sistema.</p>
          </div>
        )
      },
    ],
    initialTab: 'config',
    headerChildren: (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px',
        padding: '8px 16px',
        backgroundColor: '#f8f9fa',
        borderRadius: '6px',
        border: '1px solid #e9ecef'
      }}>
        <span style={{ fontSize: '14px', fontWeight: '500' }}>
          Admin Panel
        </span>
        <div style={{ 
          width: '8px', 
          height: '8px', 
          backgroundColor: '#28a745', 
          borderRadius: '50%' 
        }} />
        <span style={{ fontSize: '12px', color: '#6c757d' }}>
          Online
        </span>
      </div>
    ),
    onClick: (tab) => {
      console.log('Tab clicada:', tab);
    },
  },
}

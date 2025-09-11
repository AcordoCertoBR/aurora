import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Conditional, If, Switch, Case, Default } from './index'
import { Button } from '../Button'
import { Text } from '../Text'

const meta: Meta = {
  title: 'Utilities/Conditional Components',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Componentes utilitários para renderização condicional. 

**Nota**: O componente \`Conditional\` está deprecado. Use os componentes do react-if (\`If\`, \`Switch\`, \`Case\`, \`Default\`) para novos desenvolvimentos.
        `,
      },
    },
  },
}

export default meta

type Story = StoryObj

// Stories para If (react-if)
export const IfComponent: Story = {
  render: () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    
    return (
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Button onClick={() => setIsLoggedIn(!isLoggedIn)}>
          {isLoggedIn ? 'Logout' : 'Login'}
        </Button>
        
        <If condition={isLoggedIn}>
          <Text>🎉 Bem-vindo! Você está logado.</Text>
        </If>
        
        <If condition={!isLoggedIn}>
          <Text>🔒 Faça login para continuar.</Text>
        </If>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Componente If do react-if para renderização condicional simples.',
      },
    },
  },
}

// Stories para Switch/Case/Default
export const SwitchCaseDefault: Story = {
  name: 'Switch/Case/Default',
  render: () => {
    const [userRole, setUserRole] = useState<'admin' | 'user' | 'guest'>('guest')
    
    return (
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button onClick={() => setUserRole('admin')}>
            Set Admin
          </Button>
          <Button onClick={() => setUserRole('user')}>
            Set User
          </Button>
          <Button onClick={() => setUserRole('guest')}>
            Set Guest
          </Button>
        </div>
        
        <Text>Usuário atual: <strong>{userRole}</strong></Text>
        
        <Switch>
          <Case condition={userRole === 'admin'}>
            <div style={{ padding: '16px', backgroundColor: '#fef3c7', borderRadius: '8px' }}>
              <Text>👑 Acesso de Administrador</Text>
              <Text>Você tem acesso completo ao sistema.</Text>
            </div>
          </Case>
          
          <Case condition={userRole === 'user'}>
            <div style={{ padding: '16px', backgroundColor: '#dbeafe', borderRadius: '8px' }}>
              <Text>👤 Acesso de Usuário</Text>
              <Text>Você tem acesso limitado ao sistema.</Text>
            </div>
          </Case>
          
          <Default>
            <div style={{ padding: '16px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
              <Text>🔒 Visitante</Text>
              <Text>Faça login para acessar mais funcionalidades.</Text>
            </div>
          </Default>
        </Switch>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Componentes Switch, Case e Default do react-if para múltiplas condições. Equivalente ao switch/case do JavaScript.',
      },
    },
  },
}

// Stories para Switch sem Default
export const SwitchWithoutDefault: Story = {
  render: () => {
    const [notification, setNotification] = useState<'success' | 'error' | null>(null)
    
    return (
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button onClick={() => setNotification('success')}>
            Mostrar Sucesso
          </Button>
          <Button onClick={() => setNotification('error')}>
            Mostrar Erro
          </Button>
          <Button onClick={() => setNotification(null)}>
            Limpar
          </Button>
        </div>
        
        <Text>Estado atual: <strong>{notification || 'nenhum'}</strong></Text>
        
        {/* Switch sem Default - só renderiza algo se houver uma condição verdadeira */}
        <Switch>
          <Case condition={notification === 'success'}>
            <div style={{ 
              padding: '16px', 
              backgroundColor: '#f0fdf4', 
              borderRadius: '8px',
              border: '1px solid #22c55e'
            }}>
              <Text style={{ color: '#16a34a' }}>✅ Operação realizada com sucesso!</Text>
            </div>
          </Case>
          
          <Case condition={notification === 'error'}>
            <div style={{ 
              padding: '16px', 
              backgroundColor: '#fef2f2', 
              borderRadius: '8px',
              border: '1px solid #ef4444'
            }}>
              <Text style={{ color: '#dc2626' }}>❌ Ocorreu um erro na operação!</Text>
            </div>
          </Case>
        </Switch>
        
        <Text style={{ fontSize: '14px', color: '#6b7280' }}>
          💡 Quando não há Default, nada é renderizado se nenhuma condição for verdadeira.
        </Text>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Exemplo de Switch sem Default. Útil quando você só quer renderizar algo em condições específicas, sem um caso padrão.',
      },
    },
  },
}

// Story combinando múltiplos padrões
export const CombinedExample: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    
    const simulateApiCall = () => {
      setIsLoading(true)
      setError(null)
      setData(null)
      
      setTimeout(() => {
        const success = Math.random() > 0.3
        setIsLoading(false)
        
        if (success) {
          setData('Dados carregados com sucesso! 🎉')
        } else {
          setError('Erro ao carregar os dados. 😞')
        }
      }, 2000)
    }
    
    return (
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Button onClick={simulateApiCall} disabled={isLoading}>
          {isLoading ? 'Carregando...' : 'Simular Chamada da API'}
        </Button>
        
        <Switch>
          <Case condition={isLoading}>
            <div style={{ 
              padding: '16px', 
              backgroundColor: '#f0f9ff', 
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{ 
                width: '16px', 
                height: '16px', 
                border: '2px solid #3b82f6',
                borderTop: '2px solid transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              <Text>Carregando dados...</Text>
            </div>
          </Case>
          
          <Case condition={!!error}>
            <div style={{ padding: '16px', backgroundColor: '#fef2f2', borderRadius: '8px' }}>
              <Text style={{ color: '#dc2626' }}>{error}</Text>
            </div>
          </Case>
          
          <Case condition={!!data}>
            <div style={{ padding: '16px', backgroundColor: '#f0fdf4', borderRadius: '8px' }}>
              <Text style={{ color: '#16a34a' }}>{data}</Text>
            </div>
          </Case>
          
          <Default>
            <div style={{ padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
              <Text>Clique no botão para carregar os dados.</Text>
            </div>
          </Default>
        </Switch>
        
        <If condition={!isLoading && (data || error)}>
          <Button 
            onClick={() => {
              setData(null)
              setError(null)
            }}
          >
            Limpar
          </Button>
        </If>
        
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Exemplo combinando If e Switch/Case/Default para simular estados de carregamento, sucesso e erro.',
      },
    },
  },
}

// Stories para Conditional (deprecado) - movido para o final
export const ConditionalDeprecated: Story = {
  name: 'Conditional (Deprecated)',
  render: () => {
    const [showContent, setShowContent] = useState(true)
    
    return (
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ 
          padding: '12px', 
          backgroundColor: '#fef3c7', 
          borderRadius: '8px',
          border: '1px solid #f59e0b',
          marginBottom: '16px'
        }}>
          <Text style={{ color: '#d97706', fontWeight: 'bold' }}>
            ⚠️ DEPRECADO: Este componente será removido em versões futuras. 
            Use os componentes do react-if (If, Switch, Case, Default) para novos projetos.
          </Text>
        </div>
        
        <Button onClick={() => setShowContent(!showContent)}>
          Toggle Content
        </Button>
        
        <Conditional
          condition={showContent}
          renderIf={<Text>✅ Conteúdo está visível!</Text>}
          renderElse={<Text>❌ Conteúdo está oculto!</Text>}
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Exemplo do componente Conditional deprecado. Use os componentes do react-if para novos projetos.',
      },
    },
  },
}
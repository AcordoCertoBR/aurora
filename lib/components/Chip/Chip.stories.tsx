import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Chip } from './index'
import {
  IconStar,
  IconTag,
  IconUser,
  IconHeart,
  IconCalendar,
  IconTrendingUp,
} from '@components/icons'

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
O componente Chip é usado para exibir informações compactas e interativas, como tags, filtros ou categorias. 
Ele suporta estados ativo/inativo e pode incluir ícones para melhor representação visual.
        `,
      },
    },
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: 'white' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof Chip>

// Story básica - Chip Ativo
export const Active: Story = {
  args: {
    label: 'Ativo',
    isActive: true,
    onClick: () => console.log('Chip clicado'),
  },
}

// Story básica - Chip Inativo
export const Inactive: Story = {
  args: {
    label: 'Inativo',
    isActive: false,
    onClick: () => console.log('Chip clicado'),
  },
}

// Story com ícone - Ativo
export const WithIconActive: Story = {
  args: {
    label: 'Favoritos',
    icon: <IconStar />,
    isActive: true,
    onClick: () => console.log('Chip com ícone clicado'),
  },
}

// Story com ícone - Inativo
export const WithIconInactive: Story = {
  args: {
    label: 'Categorias',
    icon: <IconTag />,
    isActive: false,
    onClick: () => console.log('Chip com ícone clicado'),
  },
}

// Story - Chip Desabilitado (Ativo)
export const DisabledActive: Story = {
  args: {
    label: 'Desabilitado Ativo',
    isActive: true,
    isDisabled: true,
    onClick: () => console.log('Chip desabilitado clicado'),
  },
}

// Story - Chip Desabilitado (Inativo)
export const DisabledInactive: Story = {
  args: {
    label: 'Desabilitado Inativo',
    isActive: false,
    isDisabled: true,
    onClick: () => console.log('Chip desabilitado clicado'),
  },
}

// Story - Chip Desabilitado com Ícone (Ativo)
export const DisabledWithIconActive: Story = {
  args: {
    label: 'Bloqueado',
    icon: <IconStar />,
    isActive: true,
    isDisabled: true,
    onClick: () => console.log('Chip desabilitado com ícone clicado'),
  },
}

// Story - Chip Desabilitado com Ícone (Inativo)
export const DisabledWithIconInactive: Story = {
  args: {
    label: 'Indisponível',
    icon: <IconTag />,
    isActive: false,
    isDisabled: true,
    onClick: () => console.log('Chip desabilitado com ícone clicado'),
  },
}

// Story interativa - Toggle
export const Interactive: Story = {
  render: () => {
    const [isActive, setIsActive] = useState(false)

    return (
      <Chip
        label={isActive ? 'Ativado' : 'Desativado'}
        icon={<IconHeart />}
        isActive={isActive}
        onClick={() => setIsActive(!isActive)}
      />
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Exemplo de chip interativo que alterna entre estados ativo e inativo ao ser clicado.',
      },
    },
  },
}

// Story com múltiplos chips - Filtros
export const MultipleFilters: Story = {
  render: () => {
    const [activeFilters, setActiveFilters] = useState<string[]>(['todos'])

    const filters = [
      { id: 'todos', label: 'Todos', icon: null },
      { id: 'usuarios', label: 'Usuários', icon: <IconUser /> },
      { id: 'eventos', label: 'Eventos', icon: <IconCalendar /> },
      { id: 'trending', label: 'Em Alta', icon: <IconTrendingUp /> },
      { id: 'favoritos', label: 'Favoritos', icon: <IconStar /> },
    ]

    const handleFilterClick = (filterId: string) => {
      setActiveFilters((prev) =>
        prev.includes(filterId)
          ? prev.filter((id) => id !== filterId)
          : [...prev, filterId],
      )
    }

    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          padding: '16px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
        }}>
        <div
          style={{
            width: '100%',
            marginBottom: '8px',
            fontSize: '14px',
            fontWeight: '500',
            color: '#6c757d',
          }}>
          Filtros ativos: {activeFilters.join(', ')}
        </div>

        {filters.map((filter) => (
          <Chip
            key={filter.id}
            label={filter.label}
            icon={filter.icon}
            isActive={activeFilters.includes(filter.id)}
            onClick={() => handleFilterClick(filter.id)}
          />
        ))}
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Exemplo de múltiplos chips usados como filtros. Permite seleção múltipla e mostra os filtros ativos.',
      },
    },
  },
}

// Story com múltiplos chips - Seleção única
export const SingleSelection: Story = {
  render: () => {
    const [selectedCategory, setSelectedCategory] = useState('design')

    const categories = [
      { id: 'design', label: 'Design' },
      { id: 'development', label: 'Desenvolvimento' },
      { id: 'marketing', label: 'Marketing' },
      { id: 'sales', label: 'Vendas' },
      { id: 'support', label: 'Suporte' },
    ]

    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          padding: '16px',
        }}>
        <div
          style={{
            width: '100%',
            marginBottom: '12px',
            fontSize: '16px',
            fontWeight: '500',
          }}>
          Selecione uma categoria:
        </div>

        {categories.map((category) => (
          <Chip
            key={category.id}
            label={category.label}
            isActive={selectedCategory === category.id}
            onClick={() => setSelectedCategory(category.id)}
          />
        ))}

        <div
          style={{
            width: '100%',
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#e7f3ff',
            borderRadius: '6px',
            fontSize: '14px',
            color: '#0066cc',
          }}>
          Categoria selecionada:{' '}
          <strong>
            {categories.find((c) => c.id === selectedCategory)?.label}
          </strong>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Exemplo de chips para seleção única (radio button). Apenas um chip pode estar ativo por vez.',
      },
    },
  },
}

// Story com diferentes tamanhos/estilos
export const Variants: Story = {
  render: () => {
    const [activeChips, setActiveChips] = useState<string[]>(['chip1'])

    const toggleChip = (chipId: string) => {
      setActiveChips((prev) =>
        prev.includes(chipId)
          ? prev.filter((id) => id !== chipId)
          : [...prev, chipId],
      )
    }

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          padding: '16px',
        }}>
        <div>
          <h4 style={{ marginBottom: '12px', color: '#495057' }}>
            Chips com Ícones
          </h4>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Chip
              label="Usuários"
              icon={<IconUser />}
              isActive={activeChips.includes('chip1')}
              onClick={() => toggleChip('chip1')}
            />
            <Chip
              label="Calendário"
              icon={<IconCalendar />}
              isActive={activeChips.includes('chip2')}
              onClick={() => toggleChip('chip2')}
            />
            <Chip
              label="Favoritos"
              icon={<IconHeart />}
              isActive={activeChips.includes('chip3')}
              onClick={() => toggleChip('chip3')}
            />
          </div>
        </div>

        <div>
          <h4 style={{ marginBottom: '12px', color: '#495057' }}>
            Chips sem Ícones
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <Chip
              label="Todos"
              isActive={activeChips.includes('chip4')}
              onClick={() => toggleChip('chip4')}
            />
            <Chip
              label="Recentes"
              isActive={activeChips.includes('chip5')}
              onClick={() => toggleChip('chip5')}
            />
            <Chip
              label="Arquivados"
              isActive={activeChips.includes('chip6')}
              onClick={() => toggleChip('chip6')}
            />
            <Chip
              label="Compartilhados"
              isActive={activeChips.includes('chip7')}
              onClick={() => toggleChip('chip7')}
            />
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Diferentes variações do componente Chip, com e sem ícones, demonstrando casos de uso variados.',
      },
    },
  },
}

// Story demonstrando todos os estados
export const AllStates: Story = {
  render: () => {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: '24px',
        padding: '20px'
      }}>
        <div>
          <h4 style={{ marginBottom: '12px', color: '#495057' }}>Estados Básicos</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <Chip
              label="Ativo"
              isActive={true}
              onClick={() => console.log('Ativo clicado')}
            />
            <Chip
              label="Inativo"
              isActive={false}
              onClick={() => console.log('Inativo clicado')}
            />
            <Chip
              label="Desabilitado Ativo"
              isActive={true}
              isDisabled={true}
              onClick={() => console.log('Desabilitado ativo clicado')}
            />
            <Chip
              label="Desabilitado Inativo"
              isActive={false}
              isDisabled={true}
              onClick={() => console.log('Desabilitado inativo clicado')}
            />
          </div>
        </div>
        
        <div>
          <h4 style={{ marginBottom: '12px', color: '#495057' }}>Com Ícones</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <Chip
              label="Favorito Ativo"
              icon={<IconHeart />}
              isActive={true}
              onClick={() => console.log('Favorito ativo clicado')}
            />
            <Chip
              label="Favorito Inativo"
              icon={<IconHeart />}
              isActive={false}
              onClick={() => console.log('Favorito inativo clicado')}
            />
            <Chip
              label="Usuário Bloqueado"
              icon={<IconUser />}
              isActive={true}
              isDisabled={true}
              onClick={() => console.log('Usuário bloqueado clicado')}
            />
            <Chip
              label="Tag Indisponível"
              icon={<IconTag />}
              isActive={false}
              isDisabled={true}
              onClick={() => console.log('Tag indisponível clicado')}
            />
          </div>
        </div>
        
        <div style={{
          padding: '16px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <h5 style={{ margin: '0 0 8px 0', color: '#495057' }}>Estados do Componente:</h5>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#6c757d' }}>
            <li><strong>Ativo:</strong> Chip selecionado e interativo</li>
            <li><strong>Inativo:</strong> Chip não selecionado mas interativo</li>
            <li><strong>Desabilitado Ativo:</strong> Chip selecionado mas não interativo</li>
            <li><strong>Desabilitado Inativo:</strong> Chip não selecionado e não interativo</li>
          </ul>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstração completa de todos os estados possíveis do componente Chip: ativo, inativo, desabilitado (com e sem ícones).',
      },
    },
  },
}

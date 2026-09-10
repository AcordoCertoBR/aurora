# Componentes Astro

Aurora publica dois formatos do mesmo componente: o React (`@consumidor-positivo/aurora`) e o Astro (`@consumidor-positivo/aurora/astro/<Nome>/index.astro`). O formato Astro segue as convenções do monorepo das páginas públicas, com uma diferença deliberada: o controller não fica num arquivo separado, ele mora dentro do próprio `.astro`.

## Por que existe

As páginas públicas (`www.acordocerto.com.br`, `www.consumidorpositivo.com.br`) são estáticas. Usar o componente React ali custa uma island (`client:load`), e os campos de formulário da Aurora sequer sobrevivem ao SSR do Astro porque tocam `document` durante a renderização. O resultado prático é que o time acaba reimplementando botão, texto e tabs localmente, e a marca sai de sincronia.

O formato Astro entrega a mesma marcação e o mesmo CSS com zero JavaScript quando o componente não tem comportamento, e com um controller enxuto quando tem.

## Onde os arquivos moram

O `.astro` fica na pasta do próprio componente, ao lado do `index.tsx` e do `styles.scss` que ele reaproveita:

```
lib/components/Button/
  index.tsx        # React
  index.astro      # Astro
  styles.scss      # compartilhado pelos dois
  Button.test.tsx
```

Subcomponentes seguem a mesma regra (`lib/components/Tabs/TabPanel/index.astro`).

## O que é publicado

O passo `npm run build:astro` roda depois do `vite build` e copia cada `lib/components/<caminho>/index.astro` para `dist/astro/<caminho>/index.astro`. O runtime compartilhado é um entry normal do Vite e sai em `dist/astro/runtime/`.

No `package.json`:

```json
"./astro/runtime": {
  "import": "./dist/astro/runtime/index.es.js",
  "types": "./dist/astro/runtime/index.d.ts"
},
"./astro/*": "./dist/astro/*"
```

O consumidor importa com o caminho completo, extensão inclusa, igual ao que o monorepo das páginas públicas já faz internamente:

```astro
---
import Button from '@consumidor-positivo/aurora/astro/Button/index.astro'
import Tabs from '@consumidor-positivo/aurora/astro/Tabs/index.astro'
import TabPanel from '@consumidor-positivo/aurora/astro/Tabs/TabPanel/index.astro'
---
```

## Estilo: o mesmo SCSS, sem configuração no consumidor

No repo, o `.astro` importa o SCSS do componente:

```astro
---
import './styles.scss'
---
```

`scripts/build-astro/index.ts` reescreve esse import na cópia que vai para o `dist`, apontando para o CSS que o Vite já compilou para o componente React:

```astro
---
import '../../components/Button/styles.css'
---
```

Isso é o que evita exigir do consumidor injetar `variables.scss` e `mixins.scss` no `additionalData` do Sass. O CSS chega com os tokens já resolvidos, e um app que use as duas versões do mesmo componente carrega a mesma folha uma vez só.

Se um `.astro` não tiver `styles.scss` ao lado (caso do `TabPanel`, que herda o estilo do pai), o import é removido na cópia.

## Controller inline

Componentes com comportamento usam `elementController`, o mesmo padrão do monorepo das páginas públicas, servido por `@consumidor-positivo/aurora/astro/runtime`. A diferença é que aqui ele fica no `<script>` do próprio `.astro`, não num `controller.ts` irmão:

```astro
<div data-element="au-tabs" data-active-tab={activeTab}>
  <slot />
</div>

<script>
  import { elementController } from '@consumidor-positivo/aurora/astro/runtime'

  elementController('au-tabs', ({ root, query, queryAll, on, emit }) => {
    // root     = o elemento com data-element="au-tabs"
    // on       = listener escopado ao root; prefixo 'global:' mira o window
    // query    = querySelector escopado
    // queryAll = querySelectorAll escopado, já como array
    // emit     = CustomEvent que borbulha a partir do root
  })
</script>
```

O nome passado para `elementController` tem que bater com o `data-element` da marcação. Sem o par, o controller nunca roda.

O runtime da Aurora é um port do runtime dos sites públicos com duas adições:

- `on` devolve uma função de unsubscribe.
- o builder roda no máximo uma vez por elemento (marca `data-au-controller-ran`), então o mesmo componente usado em duas páginas ou reimportado não duplica listener.

`elementController('nome', builder, { lazy: true, rootMargin: '200px' })` adia o builder até o elemento entrar na viewport.

## Adicionando um componente novo

1. Escreva `lib/components/<Nome>/index.astro` espelhando as classes que o `index.tsx` gera. As classes `au-*` são o contrato; se as duas versões divergirem, o CSS deixa de servir para as duas.
2. Importe `./styles.scss` no frontmatter.
3. Se precisar de comportamento, adicione o `<script>` com `elementController` e um `data-element` na raiz.
4. Rode `npm run build` e valide num app Astro de verdade (ver **Como verificar** abaixo).
5. Commit como `feat:` — é contrato público novo.

## Como verificar

`npm run build:astro` valida a sintaxe de cada `.astro` com `@astrojs/compiler` e falha o build se houver erro. Isso não cobre renderização. Para mudanças não triviais, monte um projeto Astro descartável e instale o **tarball**:

```bash
npm run build
npm pack --pack-destination /tmp/smoke
cd /tmp/smoke && npm install ./consumidor-positivo-aurora-<versao>.tgz
npx astro build && npx astro preview
```

## Gotchas

- **Instalar via `file:` não funciona.** Com `npm install file:../aurora` o Astro resolve o `.astro` fora da raiz do projeto e quebra os `<script>` hoisted com `No cached compile metadata found`. Sempre teste com `npm pack` + tarball.
- **Atributo booleano `false` some.** O Astro não renderiza `aria-selected={false}`. Onde o valor `"false"` importa para acessibilidade, passe a string: `aria-selected={ativo ? 'true' : 'false'}`.
- **`set:html` não pode ser condicional.** A diretiva sempre substitui o conteúdo, então um `set:html={undefined}` apaga o `<slot />`. `Text` resolve isso ramificando a tag inteira (`lib/components/Text/index.astro:60`).
- **`Tabs` exige `active` explícito no painel inicial.** O Astro não sabe qual painel corresponde ao `initialTab` na hora de renderizar o `TabPanel`, e resolver isso só no controller causaria flash de todos os painéis abertos. O consumidor marca `<TabPanel tab="x" active>`.
- **`Tabs` renderiza todos os painéis**, escondendo os inativos com o atributo `hidden`, enquanto a versão React monta só o ativo. Conteúdo pesado em aba secundária pesa no HTML.
- **`Button` em Astro não tem `loading`.** O spinner é um componente React de ícone; enquanto os ícones não tiverem versão Astro, o estado de carregamento fica de fora.
- **`.au-tabs-root` só existe no Astro.** É o `display: contents` que junta a barra e os painéis sob um único root de controller sem criar caixa no layout (`lib/components/Tabs/styles.scss:79`).

## Cobertura atual

| Componente | Comportamento |
|---|---|
| `Button` | estático |
| `Text` | estático |
| `Tabs` + `Tabs/TabPanel` | controller inline |

O resto da biblioteca ainda é só React. Converter é incremental: cada componente novo é um `.astro` a mais na pasta que já existe.

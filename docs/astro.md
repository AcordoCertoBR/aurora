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

Um `.astro` não passa por bundler: o Rollup não sabe parseá-lo, e compilá-lo aqui amarraria o pacote ao runtime interno de uma versão específica do Astro. O formato é publicado como **source**, e quem compila é o Astro do consumidor.

Por isso não existe um entry do Vite para eles. O `vite.config.ts` copia cada `lib/components/<caminho>/index.astro` para `astro/<caminho>/index.astro` com o `viteStaticCopy`, que já estava no config, no hook `writeBundle` (ou seja, depois do CSS já estar escrito). O runtime compartilhado, esse sim, é um entry normal do Vite e sai em `dist/astro/runtime/`.

Os `.astro` ficam em `astro/` na **raiz do pacote**, fora do `dist`, e é o `astro` no `files` que os publica. O motivo está no gotcha do `moduleResolution` abaixo: para os dois resolvedores concordarem, o caminho físico tem que ser igual ao caminho exportado. Como o `astro/` é gerado no build, ele está no `.gitignore` e o `npm run build` roda `rimraf astro` antes do Vite.

No `package.json`:

```json
"./astro/runtime": {
  "types": "./dist/astro/runtime/index.d.ts",
  "import": "./dist/astro/runtime/index.es.js"
},
"./astro/*": "./astro/*"
```

O runtime continua saindo no `dist` porque é um bundle de verdade. Para que ele também tenha caminho físico, o build copia `lib/astro/runtime/package.proxy.json` para `astro/runtime/package.json` — uma pasta-proxy com `main`/`types` apontando de volta para o `dist`, que é o que o resolvedor antigo sabe ler.

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

O `transform` do `viteStaticCopy` (`pointAstroStylesToBuiltCss`, em `vite.config.ts`) reescreve esse import na cópia publicada, apontando para o CSS que o Vite já compilou para o componente React:

```astro
---
import '../../dist/components/Button/styles.css'
---
```

Isso é o que evita exigir do consumidor injetar `variables.scss` e `mixins.scss` no `additionalData` do Sass. O CSS chega com os tokens já resolvidos, e um app que use as duas versões do mesmo componente carrega a mesma folha uma vez só.

A reescrita vale para **qualquer** import relativo de `.scss`, não só o `./styles.scss` do próprio componente: o `getStylesheetMap()` monta o de-para lendo os entries do Vite (fonte `<pasta do entry>/styles.scss` → `dist/components/<entry>/styles.css`). É assim que o `Icon` Astro, que mora em `lib/components/Icon/`, alcança o CSS de `lib/components/icons/styles.scss`, emitido como `dist/components/Icon/styles.css`. Import sem contrapartida emitida (caso do `TabPanel`, que herda o estilo do pai) é removido na cópia.

### O reset global

O reset (`box-sizing: border-box`, margens zeradas, fonte do body) mora no `GlobalStyles.scss` e viaja dentro do `dist/main.es.js`, o entry React. Uma página feita só com componentes Astro nunca importa esse entry e, sem o reset, o `padding` dos containers estoura a largura da viewport. Por isso o `globalStyles` é um entry próprio e o CSS dele é exportado sozinho:

```astro
---
import '@consumidor-positivo/aurora/global.css'
---
```

São 480 bytes, uma vez por página. Quem já usa componentes React da Aurora na mesma página não precisa: o reset já veio junto.

## Sem props de callback

O React expõe `onClick`, `onClickMenu`, `renderItem`. Astro renderiza em build time e não tem props de função, então a versão Astro entrega marcação e estado inicial, e o comportamento que é do **app** fica com o app:

```astro
<HeaderHamburger id="abrir-menu" controls="menu-mobile" />

<script>
  document.getElementById('abrir-menu')?.addEventListener('click', abrirDrawer)
</script>
```

Todas as props HTML passam adiante (`id`, `data-*`, `aria-*`, `class`), então o gancho é sempre um atributo. O `Header.Profile` já vem com `data-au-header-profile="notifications"` e `="menu"` para dispensar o `id`. O que é comportamento **do componente** continua embutido: o dropdown do `Header.NavbarLink` tem controller próprio.

O `Header.Navbar` também troca o `renderItem` do React por `data`: ele renderiza o `NavbarLink` sozinho, e o slot default fica para item customizado.

## Ícones

O `npm run icons` gera, para cada SVG de `lib/assets/icons/<coleção>/`, duas coisas na mesma pasta de saída: o componente React (`IconChevronDown.tsx`) e o Astro (`IconChevronDown.astro`). Os dois saem do mesmo markup, então não há como um divergir do outro.

```astro
---
import IconChevronDown from '@consumidor-positivo/aurora/astro/icons/default/IconChevronDown.astro'
---

<IconChevronDown size="large" color="success" />
```

O `.astro` gerado é uma casca: ele passa o markup para o `Icon` (`lib/components/Icon/index.astro`), o primitivo escrito à mão que renderiza o `div.au-icon` com as classes de `size`, `color`, `rawColor` e nome. As props são as mesmas do React, menos `onClick`.

O primitivo continua exportado (`@consumidor-positivo/aurora/astro/Icon/index.astro`) para quem precisar renderizar um SVG que não está na biblioteca:

```astro
<Icon markup={SVG_DO_PARCEIRO} name="IconParceiro" />
```

São 327 arquivos `.astro` no pacote (uns 600 kB de source). Como não passam por bundler, só pesa no build de quem importa.

## Tipagem

`astro check` roda no repo (`npm run check:astro`) e no CI, e é o que impede um `.astro` quebrado de passar. Três coisas que ele obriga:

**As props usam `HTMLAttributes` do `astro/types`, não um índice `[key: string]: unknown`.** Com o índice, `sizee="large"` passa batido; com `HTMLAttributes`, o consumidor ganha `id`, `data-*`, `aria-*` e `class` tipados de verdade e erra no que não existe. Onde a prop da Aurora colide com o atributo HTML, `Omit` resolve:

```ts
import type { HTMLAttributes } from 'astro/types'

export type Props = Omit<HTMLAttributes<'button'>, 'type' | 'disabled'> &
  AuroraButtonProps
```

**O `<script>` é TypeScript.** O Astro type-checa o conteúdo da tag, então `event.target.closest(...)` e `event.key` não compilam sem narrowing. O runtime ajuda: `on` é sobrecarregado por nome de evento, então `on('keydown', (event) => event.key)` já recebe um `KeyboardEvent`.

**O import do runtime resolve pelo source, não pelo `dist`.** O `tsconfig.json` mapeia `@consumidor-positivo/aurora/astro/runtime` para `lib/astro/runtime`, senão o check dependeria de um `dist` recém-buildado para ver os tipos certos.

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
4. Rode `npm run check:astro` e valide num app Astro de verdade (ver **Como verificar** abaixo). A cópia para o `dist` é automática: o glob do `viteStaticCopy` pega qualquer `index.astro` sob `lib/components/`.
5. Commit como `feat:` — é contrato público novo.

## Como verificar

`npm run check:astro` (`astro check`) é o gate: faz parse e type check completos, incluindo o conteúdo dos `<script>`. Roda no CI.

Ele não cobre renderização. Para mudanças não triviais, monte um projeto Astro descartável e instale o **tarball**:

```bash
npm run build
npm pack --pack-destination /tmp/smoke
cd /tmp/smoke && npm install ./consumidor-positivo-aurora-<versao>.tgz
npx astro check && npx astro build && npx astro preview
```

Rodar `astro check` do lado do consumidor é o único jeito de saber que os tipos publicados chegaram inteiros: o check dentro do repo usa o alias para o source e não passa pelo campo `exports`.

## Gotchas

- **No `exports`, a condição `types` vem antes de `import`.** O TypeScript para na primeira condição que casa; com `import` na frente, o subpath resolve o `.js` e o consumidor recebe `any` com o erro "could not be resolved when respecting package.json exports". O campo `types` da raiz não cobre subpath.
- **Consumidor em `moduleResolution: "node"` (node10) ignora o `exports`.** É o caso do monorepo das páginas públicas (`tsconfig.base.json`). O TypeScript resolve o specifier como caminho físico e o Vite resolve pelo `exports`, então os dois só concordam se o arquivo estiver fisicamente em `astro/<caminho>/index.astro`. Com os `.astro` dentro do `dist`, o `astro check` acusa `Cannot find module` e trocar o import para `.../dist/astro/...` inverte o erro: aí é o Vite que quebra com `Missing "./dist/astro/..." specifier in package`.
- **`npm link` (ou `file:`) não serve para testar.** O Vite resolve o symlink para o caminho real, então o `.astro` passa a ser compilado de fora do projeto do consumidor: o `astro check` acusa `is not under 'rootDir'` e o build quebra em `Rollup failed to resolve import "@consumidor-positivo/aurora/astro/runtime"`, porque a resolução do `<script>` parte do repo da Aurora, onde o pacote não existe. Sempre teste com `npm pack` + tarball.
- **Atributo booleano `false` some.** O Astro não renderiza `aria-selected={false}`. Onde o valor `"false"` importa para acessibilidade, passe a string: `aria-selected={ativo ? 'true' : 'false'}`.
- **`set:html` não pode ser condicional.** A diretiva sempre substitui o conteúdo, então um `set:html={undefined}` apaga o `<slot />`. `Text` resolve isso ramificando a tag inteira (`lib/components/Text/index.astro:59`).
- **`Tabs` exige `active` explícito no painel inicial.** O Astro não sabe qual painel corresponde ao `initialTab` na hora de renderizar o `TabPanel`, e resolver isso só no controller causaria flash de todos os painéis abertos. O consumidor marca `<TabPanel tab="x" active>`.
- **`Tabs` renderiza todos os painéis**, escondendo os inativos com o atributo `hidden`, enquanto a versão React monta só o ativo. Conteúdo pesado em aba secundária pesa no HTML.
- **`Button` em Astro não tem `loading`.** O spinner é um componente React de ícone; enquanto os ícones não tiverem versão Astro, o estado de carregamento fica de fora.
- **`@deprecated` numa prop marca a prop inteira.** O `Button` React usa `@deprecated` no `type` para desencorajar só o valor `'link'`, e o efeito é um aviso em toda chamada de `<Button type="primary">`. A versão Astro descreve a restrição em texto em vez de usar a tag. O React continua com o aviso falso.
- **Os ícones Astro não isolam ids de SVG.** O React sufixa `id`/`url(#…)` por instância (usa `useId`); o `Icon` Astro insere o markup como veio. Só importa para ícone que define id (o do YouTube define): duas instâncias do mesmo ícone na mesma página compartilhariam o id.
- **Os dados do Footer estão duplicados.** `lib/components/Footer/data.tsx` é JSX e não vai no pacote publicado, então o `Footer/index.astro` repete os mapas de certificado, loja e rede social. Mudou URL de certificado, mude nos dois.
- **O Footer troca `isMobile()` por breakpoint de CSS.** O React decide em runtime (`max-width: 767px`) onde renderizar o bloco de lojas e se a faixa de certificados leva borda. Saída estática não decide nada em runtime: o bloco de lojas vai nas duas posições e o `au-footer-full__stores-slot--mobile|--desktop` esconde uma com `display`, no breakpoint de 1024px, que é onde o resto do layout do footer já vira desktop.
- **`Header` e `Footer` recebem a logo por slot.** A logo é componente React por marca (`Logo/ac`, `Logo/cp`); no Astro, o consumidor passa a própria marcação (`<slot name="logo">` no Footer, slot default no `Header.Logo`).
- **`.au-tabs-root` só existe no Astro.** É o `display: contents` que junta a barra e os painéis sob um único root de controller sem criar caixa no layout (`lib/components/Tabs/styles.scss:79`).

## Cobertura atual

| Componente | Comportamento |
|---|---|
| `Button` | estático |
| `Text` | estático |
| `Icon` | estático (recebe o markup do SVG) |
| `Tabs` + `Tabs/TabPanel` | controller inline |
| `Header` (`Logo`, `Navigation`, `Navbar`, `NavbarLink`, `Actions`, `Badges`, `Button`, `Hamburger`, `Profile`) | estático, menos o dropdown do `NavbarLink` |
| `Footer` | estático |

O resto da biblioteca ainda é só React. Converter é incremental: cada componente novo é um `.astro` a mais na pasta que já existe.

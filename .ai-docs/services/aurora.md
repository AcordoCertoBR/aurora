# Aurora — Design System — `aurora`

> **Audiência:** design, produto, PMs e times de front-end que consomem a biblioteca; agentes investigando.
> **Técnico (como mexer):** `CLAUDE.md` na raiz · **Código:** `lib/` · **Explorador visual:** Storybook
>
> _Documento inicial gerado pelo setup de IA (`cp-repo-setup`). Aprofundar com a skill `/cp-ai-doc`._

## Em uma frase
Aurora é a biblioteca de componentes de interface compartilhada entre **Consumidor Positivo** e **Acordo Certo** — o lugar único onde vivem botões, formulários, cabeçalhos e os tokens de marca das duas BUs.

## O que esse serviço faz
Padroniza a aparência e o comportamento das telas das duas marcas. Em vez de cada app reimplementar um botão ou um campo de formulário, todos instalam o pacote `@consumidor-positivo/aurora` e usam os mesmos componentes. Isso garante consistência visual, acessibilidade e velocidade: uma melhoria feita aqui chega a todos os produtos que atualizam a versão.

Aurora entrega três coisas:
- **Componentes** reutilizáveis de UI (Button, Card, Tabs, formulários, Header/Footer, etc.).
- **Tokens de design** (cores, tipografia, espaçamento) que codificam a identidade visual de cada marca.
- **Ícones** padronizados.

## Quando ele "roda" (gatilhos)
| Gatilho | O que acontece |
|---|---|
| Um app consumidor instala/atualiza o pacote | Passa a usar os componentes/tokens da versão escolhida |
| Um PR com `feat`/`fix` é mergeado na `main` | Sai uma nova versão no npm automaticamente (release-please) e o Storybook é republicado |
| Designer/dev abre o Storybook | Vê a documentação viva: como cada componente se parece e se comporta |

Aurora não tem "produção" própria — ela executa **dentro** dos apps que a instalam.

## O que entra e o que produz
- **Entra:** decisões de design (tokens, novos componentes, ajustes de marca) e correções.
- **Produz:** um pacote npm versionado + um site de documentação (Storybook) hospedado.

## Decisões de negócio embutidas
- **Duas marcas, uma base:** componentes com variação de marca (ex.: Footer, Logo) têm versões `cp/` e `ac/`. A escolha de marca é do app consumidor.
- **Contrato é compromisso:** mudar props, classes CSS (`au-`) ou tokens públicos **quebra** os apps que dependem deles. Por isso o versionamento é semântico e automático pelos commits.
- **Acessibilidade como padrão:** há auditoria de acessibilidade (skill `/accessibility-audit`, critérios WCAG 2.1 AA).
- **Bundle enxuto:** componentes que exigem dependências pesadas (ex.: Carousel → `react-snap-carousel`) são opcionais e não entram por padrão.

## Cenários comuns
- **"Quero um componente novo no design system"** → é criado seguindo o padrão (skill `/create-component`), documentado no Storybook e publicado numa nova versão.
- **"O botão mudou de cor sem avisar"** → provavelmente o app atualizou a versão de Aurora; o que mudou está no `CHANGELOG.md`.
- **"Posso usar Aurora no meu app novo?"** → sim, `npm install @consumidor-positivo/aurora`; ver README e Storybook.

## Limitações e dívidas técnicas relevantes pro negócio
- Componentes em `lib/components/Prototype/` são **experimentais** (ex.: Carousel) e exigem dependências extras.
- Alguns exports estão marcados para depreciação no código (ex.: `Conditional`).
- _(A preencher com `/cp-ai-doc` conforme o time priorizar.)_

## Como se conecta a outros sistemas
```
        ┌──────────────────────────────┐
        │   Aurora (este repo)          │
        │   componentes · tokens · ícones│
        └───────────────┬──────────────┘
                        │ publicado no npm
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
   Site Consumidor   Site Acordo     Outros front-ends
     Positivo          Certo          das duas BUs
```

## Onde investigar mais
- Técnico / como contribuir: `CLAUDE.md` (raiz).
- Como o repo é observado / debug: `docs/observability.md`.
- Documentação visual: Storybook (`npm run storybook` ou o build publicado).
- Padrões e desenvolvimento com IA: `lib/docs/Patterns.mdx`, `lib/docs/DevelopingWithAI.mdx`.

## Histórico de mudanças relevantes
- 2026-06-30 — Documento inicial criado no setup de IA do repo (`cp-repo-setup`).

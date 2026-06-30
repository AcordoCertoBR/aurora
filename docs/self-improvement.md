# Protocolo de auto-melhoria do setup

> O setup de IA deste repo não é um evento único — é um sistema vivo que melhora conforme os devs trabalham. Este protocolo define **o que dispara uma melhoria, quem a faz e como ela não apodrece**. Dois níveis: o repo se mantém verdadeiro (drift-closing) e a própria skill `cp-repo-setup` fica melhor (org-level).

## Nível 1 — o repo se mantém verdadeiro (drift-closing)

| Gatilho (quando) | Ação | Onde |
|---|---|---|
| PR muda a API/comportamento visível de um componente (props, classes `au-`, tokens públicos) | Atualizar o `CLAUDE.md` raiz e, se visível ao negócio/design, `.ai-docs/services/aurora.md` + changelog | `CLAUDE.md`, `.ai-docs/services/` |
| Criou/alterou uma skill em `.claude/skills/` | Atualizar `lib/docs/DevelopingWithAI.mdx` com a seção da skill (há hook `PostToolUse` que lembra) | `lib/docs/DevelopingWithAI.mdx` |
| Descoberta de gotcha / tech-debt | Registrar com `file:line` | `CLAUDE.md` raiz |
| Doc contradiz o código | Corrigir o doc (verificar contra o source SEMPRE antes de confiar) | onde estiver |
| Mudança não-trivial / missão (Shape Up) | Criar/atualizar registro de missão | `.ai-docs/missions/` |
| Mudou tooling de build/tokens/icons | Refletir em `CLAUDE.md` (seção Prebuild) | `CLAUDE.md` raiz |

**Mecanismos que sustentam isso (instalados pelo setup):**
1. **Descoberta nativa:** repo de 1 serviço — o `CLAUDE.md` raiz já é a camada técnica e carrega no startup. Não há `CLAUDE.md` aninhado por componente (a árvore de componentes é homogênea; o padrão vive no raiz + nas skills `/create-component`, `/token-audit`, `/accessibility-audit`).
2. **Hook de skill:** `PostToolUse` em `.claude/settings.json` lembra de atualizar `DevelopingWithAI.mdx` quando um novo `SKILL.md` é escrito.
3. **Checklist no fim da sessão:** se a sessão mexeu em componente/API, o agente revisa este protocolo antes de fechar — atualizou os docs que precisava?
4. **Auditoria sob demanda:** rodar a varredura (abaixo) periodicamente.

## Nível 2 — a skill `cp-repo-setup` melhora (org-level)

Quando o setup encontra um padrão que **não cobre bem** (stack nova, estrutura diferente, tooling novo), ele não improvisa em silêncio:
- **Registra o gap** em `docs/setup-gaps.md` neste repo **e** sinaliza para o brain (`AcordoCertoBR/claude-org-context`, via issue ou PR) para que a org-skill `cp-repo-setup` seja melhorada centralmente.
- Assim cada repo que passa pelo setup **alimenta o próximo** — a skill evolui com o uso real, não por adivinhação.

> Exemplo concreto deste repo: o template de `observability.md` da `cp-repo-setup` assume um serviço de runtime (Datadog/AWS Lambda/Databricks). Aurora é uma **lib publicada no npm** sem runtime próprio — o `docs/observability.md` foi adaptado para essa realidade. Esse é exatamente o tipo de gap que vale registrar para a skill cobrir "biblioteca/pacote publicado" nativamente.

## Auditoria (o que a varredura checa)
- Componentes exportados em `lib/main.ts` cuja API mudou sem reflexo no `CLAUDE.md`/`.ai-docs`.
- `.ai-docs/services/aurora.md` desatualizado vs. comportamento atual (amostra: datas de mudança vs. `git log`).
- `.ai-docs/missions/` com `ttl_review` vencido → sugerir arquivar.
- Skills em `.claude/skills/` sem seção correspondente em `lib/docs/DevelopingWithAI.mdx`.
- Referências `file:line` que não existem mais (doc apodrecido).
- Gaps acumulados em `setup-gaps.md` ainda não levados ao brain.

Saída: lista de melhorias propostas. Nunca aplica destrutivamente sem confirmação.

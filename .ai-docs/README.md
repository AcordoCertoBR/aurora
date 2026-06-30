# `.ai-docs/` — documentação viva para humanos e agentes

Docs em **linguagem de negócio**, lidas por não-técnicos (design, produto, PMs, times consumidores) via o MCP `github-readonly` no Claude.ai, e por agentes que investigam o repo. Complementa (não substitui) o `CLAUDE.md` raiz (técnico) e `docs/` (referência longa).

## Dois eixos

- **`services/<serviço>.md`** — DURÁVEL: o que o sistema faz e por quê. Pareado 1:1 com a camada técnica (aqui: o `CLAUDE.md` raiz). Formato de seções de negócio. Atualiza quando o comportamento/contrato visível muda. Neste repo, o "serviço" é o próprio design system → `services/aurora.md`.
- **`missions/<missão>.md`** — TIME-BOUND: missões (Shape Up) e mudanças não-triviais em voo. O elo entre o pitch (Notion) e o que foi feito. Tem `ttl_review` e é podado/arquivado depois (3 meses pontual / 6 missão).

## Regras
- Linguagem de negócio, português, 1–3 páginas. Termo técnico só com explicação.
- `missions/` **linka** o pitch no Notion — não duplica o contrato.
- Self-improvement: PR que muda comportamento/contrato visível → atualiza o doc + changelog (ver `docs/self-improvement.md`).
- Para criar/aprofundar um doc de serviço, use a skill `/cp-ai-doc`.

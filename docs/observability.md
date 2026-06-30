# Observabilidade & debug — Aurora

> Mapa de **onde olhar** quando algo quebra. É fino de propósito: aponta, não duplica.
>
> ⚠️ **Aurora é uma biblioteca publicada no npm, não um serviço de runtime.** Ela não tem processo próprio em produção, não loga em Datadog, não escreve em Databricks e não roda em Lambda/EKS. O código de Aurora executa **dentro dos apps consumidores** (sites cp/ac e demais front-ends). Logo, a "observabilidade" aqui é sobre **o pacote publicado, a documentação visual (Storybook) e o CI** — e, quando um componente quebra em produção, a investigação acontece **no app consumidor**, reproduzindo em Storybook.

## Superfícies reais deste repo

### Pacote publicado (npm)
- `@consumidor-positivo/aurora` — publicado automaticamente no merge para `main` quando o release-please cria um release (ver `.github/workflows/release.yml`).
- Para saber o que está em produção: a versão **pinada no `package.json` de cada app consumidor** é a fonte da verdade — não a `main` daqui. Um bug "em produção" pode ser uma versão antiga pinada.
- Histórico de versões: `CHANGELOG.md` (gerado pelo release-please a partir dos commits convencionais).

### Storybook (documentação visual / explorador)
- Build estático deployado em **S3 + CloudFront** no release (`release.yml`, job `publish`). É a referência viva de como cada componente deve parecer/comportar.
- Primeira parada para reproduzir um bug visual ou de interação: rodar `npm run storybook` local ou abrir o Storybook publicado.
- **Regressão visual:** `@chromatic-com/storybook` está nas devDeps → Chromatic pode rodar snapshots visuais. _(TODO: confirmar se o projeto Chromatic está ativo e onde ver os diffs.)_

### CI (GitHub Actions)
- `aurora-tests.yml` — em todo PR para `main`: `npm run prebuild` + `npm run test:coverage`. Falha aqui = não mergeia.
- `release.yml` — no merge para `main`: release-please (versão + changelog) → `npm publish` → build + deploy do Storybook (S3/CloudFront).
- Artefato de coverage fica retido 14 dias no run do CI.

## Investigações comuns (playbook)

| Sintoma | Onde olhar primeiro | Como |
|---|---|---|
| "Componente quebrado em produção no site cp/ac" | Versão de `@consumidor-positivo/aurora` pinada **no app consumidor** + o RUM/observabilidade **daquele app** | Confirme a versão instalada; reproduza no Storybook dessa versão. O bug pode não existir na `main`. |
| "Visual diferente do esperado" | Storybook (local ou publicado) + tokens | `npm run storybook`; cheque se é token (`/token-audit`) ou CSS hardcoded. |
| "Quebrou depois de atualizar a lib" | `CHANGELOG.md` + diff de versões | Procure `feat!`/`BREAKING CHANGE` ou mudança de props/classes `au-`/tokens entre as versões. |
| "Token/ícone não aparece" | Geração no prebuild | Rode `npm run prebuild`; nunca edite `lib/core/tokens/.cache/` nem `lib/components/icons/` à mão. |
| "Publish não saiu" | `release.yml` run | release-please só publica se criou release — e só cria com commit `feat`/`fix`/etc. na `main`. Cheque o tipo dos commits. |

## Infra
- Único recurso AWS deste repo: o **bucket S3 + CloudFront** que hospeda o Storybook estático (deploy no `release.yml`). Não há Lambda/EKS/fila.
- ⚠️ **Convenção da org:** infra, dashboards e alertas Datadog moram no repo `infrastructure` como **Terraform** (centralizado) — ver `cp-conventions`. _(TODO: confirmar se o bucket/distribution do Storybook está versionado em Terraform no `infrastructure` ou foi criado manualmente.)_

## Orientação ao agente (como investigar a partir deste repo)
- Para bug **de runtime em produção**: a causa raiz raramente está na `main` daqui — comece pela **versão pinada e pela observabilidade do app consumidor**, depois reproduza em Storybook.
- Para bug **de build/publish**: comece pelos runs de `aurora-tests.yml` / `release.yml` e pelos commits convencionais.
- **Read-only por padrão.** Cite a fonte (run de CI, versão npm, story) na conclusão.
- Datadog / AWS-runtime / Databricks: **N/A para esta lib** — não finja que existe.

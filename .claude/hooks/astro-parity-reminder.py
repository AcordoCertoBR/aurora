#!/usr/bin/env python3
"""PostToolUse hook (Edit/Write/MultiEdit): when one format of an Aurora
component is edited, remind the agent that the other format must follow.
Every visual component has a React `index.tsx` and an Astro `index.astro`
that render the same DOM (docs/astro.md, "Paridade com o React"); the
pairing test in lib/astro/parity/pairing.test.ts fails when one side is
missing, but nothing else notices when one side changes and the other stays."""
import json
import os
import re
import sys

REACT_FILES = {"index.tsx", "hooks.ts", "types.ts"}


def main():
    try:
        data = json.load(sys.stdin)
    except Exception:
        return
    path = data.get("tool_input", {}).get("file_path", "")
    match = re.search(r"(lib/components/(?!icons/|Logo/)(.+?))/([^/]+)$", path)
    if not match:
        return
    folder, name, base = match.group(1), match.group(2), match.group(3)
    root = os.path.dirname(path[: match.start(1)]) if match.start(1) else ""
    folder_abs = os.path.join(root, folder) if root else folder
    react = os.path.join(folder_abs, "index.tsx")
    astro = os.path.join(folder_abs, "index.astro")

    if base in REACT_FILES:
        if os.path.exists(astro):
            msg = (
                f"Componente `{name}` tem versão Astro em `{folder}/index.astro`. "
                "A regra é paridade exata (docs/astro.md, Paridade com o React): se a mudança "
                "altera marcação, classes `au-`, atributos, texto ou comportamento, aplique a mesma "
                "mudança no `index.astro` (incluindo o controller no `<script>`) e confira com "
                "`npm run check:astro` e no playground (`npm run playground:astro`)."
            )
        elif base == "index.tsx":
            msg = (
                f"`{folder}/index.tsx` não tem `index.astro` ao lado. Todo componente visual "
                "precisa da versão Astro (o teste `lib/astro/parity/pairing.test.ts` falha sem ela). "
                "Se o arquivo renderiza marcação, crie o `index.astro` (docs/astro.md, Adicionando um "
                "componente novo) e uma página em `playground/src/pages/components/`; se é utilitário "
                "React-only, registre em `REACT_ONLY` no teste com o motivo."
            )
        else:
            return
    elif base == "index.astro":
        if os.path.exists(react):
            msg = (
                f"Componente `{name}` tem versão React em `{folder}/index.tsx`. A regra é paridade "
                "exata (docs/astro.md): se a mudança altera marcação, classes `au-`, atributos, texto "
                "ou comportamento, aplique a mesma mudança no React (e no `hooks.ts`, se houver) e "
                "rode o teste do componente."
            )
        else:
            msg = (
                f"`{folder}/index.astro` sem `index.tsx` ao lado. Se o React correspondente vive em "
                "outro arquivo, mapeie em `ASTRO_COUNTERPART` em `lib/astro/parity/pairing.test.ts` "
                "e aplique a mesma mudança lá."
            )
    else:
        return

    print(
        json.dumps(
            {
                "hookSpecificOutput": {
                    "hookEventName": "PostToolUse",
                    "additionalContext": msg,
                }
            }
        )
    )


if __name__ == "__main__":
    main()

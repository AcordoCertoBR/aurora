---
name: gitmoji-commit
description: A commit message generator that uses gitmojis to make your commits more fun and expressive
---

## Context

- Current git status: !`git status`
- Current git diff: !`git diff HEAD`
- Current branch: !`git branch --show-current`
- Recent commits: !`git log --oneline -5`

## Your task

Based on the above changes, create a single git commit using Conventional Commits standard with a gitmoji that best represents the changes made. The commit message should be concise yet descriptive of the changes.
The format should be: `<type>: <gitmoji>: <description>`. Do not include the angle brackets in the actual commit message. Do not include co-authors or any additional information in the commit message. Only provide the commit message itself.

Where:

- `<type>` is the type of change (e.g., feat, fix, docs, style, refactor, test, chore)
- `<gitmoji>` is an emoji that represents the type of change (e.g., ✨ for new features, 🐛 for bug fixes, etc.)
- `<description>` is a brief description of the change

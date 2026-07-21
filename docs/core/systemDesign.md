---
name: System Design
relation: index.md → core/
description: Architecture overview and system design documentation
type: Enforce
---

# System Design

## Project architecture

This is a **React + TypeScript** single-page application built with Vite. The architecture follows a **module-based** pattern where each route is encapsulated in its own module directory under `src/modules/`.

## Module architecture

```
src/modules/{moduleName}/
├── {moduleName}.tsx       — Page component (React + TypeScript)
├── css/{moduleName}.css   — Page styles
├── {moduleName}.json      — Static data consumed by the page
├── components/            — Reusable UI components (module-scoped, optional)
├── services/              — API calls and business logic (optional)
└── data/                  — Static data files (optional, for multi-page modules)
```

Pages may also live in `services/` when they serve as route-level page components with data-fetching logic. Sub-pages can be nested inside a parent module directory (e.g., `profile/settings/`).

## Key principles

- **Module hierarchy.** Each route is a top-level module. Sub-pages may be sibling modules with parent-prefixed names (e.g., `profileSettings/`) or nested inside the parent (e.g., `profile/settings/`).
- **Data from JSON.** Every page reads its data from a co-located JSON file. No hardcoded data in components.
- **Separation of concerns.** UI lives in `components/`, logic lives in `services/`. Pages orchestrate both.

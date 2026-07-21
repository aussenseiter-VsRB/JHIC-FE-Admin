---
name: Documentation Index
relation: README.md
description: Master table of contents with section-specific rules and folder structure overview
type: Enforce
---

# Documentation Index

## Structure

```
docs/
├── core/                   # System-wide ground truth (all Enforce)
│   ├── systemDesign.md     — Architecture and system design
│   ├── design.md           — Design decisions and rationale
│   ├── codingPrinciple.md  — Code standards and conventions
│   └── SKILLS.md           — Agent skills and subagent reference
└── modules/                # Module patterns (Enforce rules + editable examples)
    ├── RULES.md            — Module creation rules (Enforce)
    ├── docsRules.md        — Module documentation boilerplate (Enforce)
    └── examples/           — Example modules (editable, NOT real docs)
        ├── profile/        — Example module with components/ and services/
        ├── profileEdit/    — Example sub-module (parent-named convention)
        └── profileSettings/ — Example sub-module (parent-named convention)
```

## Section-specific rules

### docs/core/

- All `type: Enforce`. Read these before any architectural or coding decisions.
- `systemDesign.md` takes precedence over all other docs for architecture questions.
- `design.md` records past decisions — do not contradict them without updating the file.

### docs/modules/

- `RULES.md` is `type: Enforce`. All modules must follow its rules.
- `docsRules.md` is `type: Enforce`. It is the boilerplate template for writing module documentation. Use it whenever you document a new module.
- `examples/` contains example modules (`profile/`, `profileEdit/`, `profileSettings/`). These are `type: editable` pattern references, NOT real documentation. Do not treat them as project docs.
- Create new modules at the same level as `examples/`, not inside it.

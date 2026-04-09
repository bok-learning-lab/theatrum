# theatrum-stage

A Next.js display layer for selected content from the Theatrum (the personal memory wiki at `~/theatrum/`). Built and maintained by Madeleine Woods (Assistant Director, AI Initiatives, Bok Center Learning Lab) as part of the Summer 2026 prototyping work the Theatrum is itself part of. **theatrum-stage is not the Theatrum.** It is a *display layer* whose content is curated from the Theatrum upstream and published here.

## What this project is

theatrum-stage is the first real *consumer* of the Theatrum at `~/theatrum/`. The Theatrum is a personal memory wiki organized around eight gates and a small set of page types (sources, figures, concepts, motifs, stances, encounters, methods, transcripts, reports); it accumulates substantive intellectual material that may eventually feed into projects, talks, courses, and writing. theatrum-stage is the first such project: a public-facing website where selected Theatrum material is displayed in a form a visitor can read.

The deeper purpose of theatrum-stage, while it remains small, is to serve as a **meta-test of whether the Theatrum is doing its job as a substrate for other projects**. If the work of moving content from the Theatrum into theatrum-stage is straightforward and the resulting display is coherent and useful, that is evidence the Theatrum's design choices are sound. If the work is friction-heavy or the display is incoherent, that is information about what the Theatrum needs to fix upstream.

## The two Theatrums on disk

There are two related directories on Madeleine's machine that share the name "Theatrum." A Claude session opening this repo needs to know which one it is in and how the two are related.

- **`~/theatrum/`** — the Theatrum proper. The personal memory wiki, with its sources, figures, concepts, motifs, stances, encounters, methods, transcripts, reports, queue, log, and vocabularies. The full schema lives at `~/theatrum/THEATRUM.md`. **This is the upstream content source.**
- **`~/Development/theatrum-stage/`** — *this repo*. The Next.js frontend display layer. **This is the downstream display.** Content lives in `_content/` here, having been *manually moved* from the upstream Theatrum by Madeleine.

Both are real and both are called "theatrum" in their folder names. The original Theatrum on the machine is the substantive intellectual work; theatrum-stage is the first published face of it.

## The cardinal rule: manual, ask-to-display

**Do not auto-sync between `~/theatrum/` and `~/Development/theatrum-stage/_content/`.** Do not write scripts to copy files between them. Do not propose symlinks. **Content moves from upstream to downstream only when Madeleine explicitly asks for it.**

When Madeleine asks for something to be moved, the work is: find the file in `~/theatrum/`, copy its contents (or a reviewed version of its contents) into the appropriate `_content/` subdirectory, adjust frontmatter or formatting if the page needs to render correctly, and stop. Do not also copy adjacent files unless asked. Do not also update the queue or the index in the Theatrum unless asked. The two repos are intentionally separate, and most of the substantive curatorial decisions happen at the moment of the move.

## Repository structure

```text
_content/         # MDX/markdown content (each subfolder = route)
  docs/           # Currently the only seeded route
_context/         # Project context, not published as content
  ll/             # Learning Lab proto-Theatrum documents (see below)
  dev/            # Development context (currently empty)
apps/
  interface/      # Next.js application (Tailwind v4, shadcn/ui, MDX)
packages/         # Shared packages, if any
```

## What is already in this repo

- **`_content/docs/`** has seed files (`index.md`, `getting-started.md`) and a `_meta.json`. These are placeholders from the template; they will likely be replaced with real Theatrum-derived content over time.
- **`_context/ll/`** contains four Learning Lab documents that are part of the *proto-Theatrum* — material that predates and inspired the current Theatrum project: a 2017 Learning Lab pitch, a 2021 Learning Lab story, the Brenner et al. (2020) paper on partners in student-centered learning, and a piece by Kuzmick et al. on the Learning Lab as an experiment. **These are queued for ingest into the Theatrum proper at `~/theatrum/`** (see `~/theatrum/queue.md` under the Learning Lab proto-Theatrum section). For now they live here as project context for theatrum-stage's eventual About or History sections, and they can also be cited from the Theatrum once the formal ingest happens.
- **`_context/dev/`** is currently empty (besides a `.DS_Store`).
- The standard Next.js + Tailwind + shadcn + MDX scaffolding in `apps/interface/`.

## Public/private boundary

theatrum-stage is intended to be a **public website**. Most of the substantive material in the Theatrum is publishable in principle, and the working assumption for this project is *public unless flagged otherwise*. Madeleine will name the small number of things she does not want public when it comes time to move them.

The handful of Theatrum page types that should never be moved into `_content/` without an explicit Madeleine call:

- **`transcripts/`** — captured private conversations
- **`reports/`** — internal Bok Center work products prepared for specific audiences
- **Working memory files** at `~/.claude/projects/-Users-madeleinewoods-Development/memory/`
- **`queue.md`, `log.md`** — working infrastructure files
- **Anything labeled `seedling` whose substantive claims have not been verified yet** — early-stage material where the Theatrum-side synthesis is still provisional

Everything else — `motifs/`, `stances/`, `figures/`, `concepts/`, `methods/`, `sources/` syntheses, `encounters/`, `vocabularies/`, the `THEATRUM.md` schema document itself — is publishable in principle and the question for any given piece is just whether Madeleine has asked for it yet.

## Madeleine's role and the Bok Center context

Madeleine is **Assistant Director, AI Initiatives at the Learning Lab at Harvard's Derek Bok Center for Teaching and Learning**. The Theatrum is part of her Summer 2026 prototyping work for Bok Center faculty workshops on AI-assisted course design. theatrum-stage is the first project where the Theatrum is being treated as a *substrate for downstream work*, which is the relationship the Summer 2026 workshops will eventually teach Harvard faculty to set up between their own accumulated materials and new courses they design with AI assistance.

If a session needs more context on Madeleine's role, the Theatrum, or the Bok Center work: see `~/.claude/projects/-Users-madeleinewoods-Development/memory/MEMORY.md` and the two memory files it points at (`madeleine-bok-center-role.md` and `theatrum-as-bok-prototype.md`).

## Tech stack

- **pnpm** — package manager (monorepo workspaces)
- **Next.js** — React framework
- **Tailwind CSS v4** — utility-first CSS
- **shadcn/ui** — component library (Radix UI primitives)
- **MDX** — markdown with JSX for content with custom components

## Working in this repo

### Code conventions
- Use `pnpm` for all package management (not npm or yarn)
- Prefer simple, readable solutions over abstraction
- Comment *why*, not just *what*

### Adding shadcn/ui components
```bash
cd apps/interface
pnpm dlx shadcn@latest add button card dialog input
```

### Adding content
- Markdown/MDX files go in `_content/[folder-name]/`
- Each folder becomes a route (e.g., `_content/docs/` → `/docs`)
- Use `_meta.json` to control navigation order
- MDX files support custom components imported via `mdx-components.tsx`
- **Reminder: content here is curated from `~/theatrum/`. Do not author new substantive content here that should live in the Theatrum upstream.** If a session is tempted to write a real essay or stance directly into `_content/`, the right move is to write it in the Theatrum first and then move a curated version downstream.

### Commands
- `pnpm dev` — start the development server
- `pnpm build` — build for production
- `pnpm lint` — run linting

## Open questions

- **What `_content/` routes should exist beyond `docs/`?** Likely candidates eventually include `motifs/`, `stances/`, `figures/`, and possibly an `about/` or `history/` route built from the Learning Lab proto-Theatrum documents in `_context/ll/` once they have been ingested into the Theatrum proper. Held until Madeleine decides what the first published content slice should be.
- **What does the navigation look like?** The `_meta.json` convention from the template handles intra-route ordering, but the top-level navigation across routes is not yet designed. Held until there is enough content to need it.
- **Visual / typographic identity.** The default shadcn theme is a starting point but the Theatrum's visual register is not yet decided. Held.
- **Deployment.** Where does theatrum-stage actually live as a public website? Held until there is enough content to deploy.

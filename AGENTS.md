# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js 15 App Router site. Route files live in `src/app`, with dynamic pages such as `src/app/blogs/[slug]/page.tsx` and API routes in `src/app/api`. Shared UI lives in `src/components`; reusable shadcn/Radix primitives are in `src/components/ui`. Page-specific content sections are grouped under `src/sections`, while `src/lib` contains API clients, utilities, typed data, and TypeScript declarations. Static assets are served from `public/assets/images`, `public/assets/icons`, and `public/assets/videos`. Custom fonts are in `src/app/fonts`.

## Build, Test, and Development Commands

- `npm run dev`: start the local Next.js development server on `http://localhost:3000`.
- `npm run build`: create a production build and run framework-level checks.
- `npm run start`: serve the last production build locally.
- `npm run lint`: run Next.js ESLint rules from `eslint.config.mjs`.

Use `npm install` after dependency changes. This repository uses `package-lock.json`, so prefer npm over yarn, pnpm, or bun.

## Coding Style & Naming Conventions

Use TypeScript and React function components. Keep two-space indentation, double quotes, and semicolons to match existing files. Prefer the `@/*` path alias for imports from `src`, for example `@/components/Navbar`. Name route folders with lowercase URL segments, React components in PascalCase, hooks as `use-*.ts`, and utility modules with descriptive lowercase names. Keep section components close to their page under `src/sections/<page>`.

## Testing Guidelines

No test runner or test script is currently configured. Before submitting changes, run `npm run lint` and `npm run build`. If adding tests later, colocate them near the feature or use a `__tests__` folder, and name files `*.test.ts` or `*.test.tsx`. Focus coverage on API fetch helpers, metadata helpers, and interactive client components.

## Commit & Pull Request Guidelines

Recent commits use short imperative messages such as `Update index.ts`, `update message wa`, and scoped SEO fixes like `SEO: add location keyword`. Keep subjects concise and action-focused. For pull requests, include a summary, affected routes or components, verification commands run, linked issues when available, and screenshots for visible UI changes.

## Security & Configuration Tips

Public API access is centralized in `src/lib/api/index.ts`; avoid scattering base URLs. Do not commit secrets or private tokens. Analytics and pixel IDs are currently embedded in `src/app/layout.tsx`; document any production changes in the PR.

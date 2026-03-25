# Contributing to Social Post Engine

Thanks for your interest in contributing!

## Development Setup

1. **Prerequisites**: Node.js 22+, pnpm 9+
2. Clone the repo and install dependencies:
   ```bash
   git clone https://github.com/johnumarattil/social-post-engine.git
   cd social-post-engine
   pnpm install
   ```
3. Copy the example configs:
   ```bash
   cp brand.config.example.ts brand.config.ts
   cp .env.example .env
   ```
4. Build all packages:
   ```bash
   pnpm build
   ```
5. Verify image generation works:
   ```bash
   pnpm generate --platform linkedin --title "Test" --theme light
   ```

## Project Structure

- `packages/shared/` — Shared types, themes, dimensions, brand config loader
- `packages/post-generator/` — Image generation templates (Canvacord + JSX)
- `packages/agents/` — Autopublish automation (Playwright browser control)

## Pull Request Guidelines

- Keep PRs focused — one feature or fix per PR
- Run `pnpm build` before submitting to verify everything compiles
- If adding a new layout, follow the pattern in existing layouts under `packages/post-generator/src/templates/linkedin-layouts/`
- If modifying brand-configurable values, add them to the `BrandConfig` type in `packages/shared/src/brand-config.ts`

## Adding a New Layout

1. Create your layout `.tsx` file in `packages/post-generator/src/templates/linkedin-layouts/`
2. Register it in the layout index file
3. Add any layout-specific data schema to `packages/shared/src/layout-schemas.ts`
4. Test with: `pnpm generate --platform linkedin --layout your-layout --title "Test"`

## Code Style

- TypeScript strict mode
- No default exports
- Prefer functions over classes where possible

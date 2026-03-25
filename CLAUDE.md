# social-post-engine

Social media post image generator + browser-based auto-publisher. All brand-specific values come from `brand.config.ts`.

## Project Structure

```
social-post-engine/
├── brand.config.ts               # User's brand config (gitignored)
├── brand.config.example.ts       # Demo config with WahResume values
├── packages/shared/              # Shared design tokens (themes, dimensions)
│   └── src/
│       ├── index.ts              # Barrel export
│       ├── themes.ts             # Theme type + light preset + getTheme()
│       ├── dimensions.ts         # Platform dimension map
│       ├── brand-config.ts       # BrandConfig type definition
│       └── load-brand-config.ts  # Config loader (reads brand.config.ts)
├── packages/post-generator/      # Image generation library + CLI (Canvacord)
│   └── src/
│       ├── index.ts              # Public API: generatePostImage()
│       ├── cli.ts                # CLI entry point
│       ├── types.ts              # Shared types
│       ├── brand.ts              # Brand helpers (getLogo, getBrandName, getBrandWebsite)
│       ├── themes.ts             # Re-exports from @social-post-engine/shared
│       └── templates/            # Platform-specific JSX templates
│           ├── linkedin.tsx      # 1080x1080
│           ├── twitter.tsx       # 1200x675
│           ├── instagram.tsx     # 1080x1080
│           ├── instagram-story.tsx  # 1080x1920
│           ├── linkedin-layouts/ # Layout variants (checklist, before-after, etc.)
│           └── instagram-layouts/
├── packages/agents/              # Automation system
│   └── src/
│       ├── types.ts              # PendingPost, PostStore types
│       ├── store.ts              # JSON store read/write
│       ├── ai-providers.ts       # Shared AI provider fallback (Perplexity/Gemini)
│       ├── caption.ts            # Hashtag wrapping (uses brand config)
│       ├── brand-voice.ts        # LinkedIn brand voice (customize for your brand)
│       ├── instagram-brand-voice.ts  # Instagram brand voice
│       ├── instagram-caption.ts  # Instagram-optimized caption generation
│       ├── instagram-publisher.ts # Playwright Instagram browser automation
│       ├── linkedin-publisher.ts  # Playwright LinkedIn browser automation
│       ├── generate.ts           # execSync wrappers for image gen
│       └── cli/
│           ├── publish.ts        # Print pending posts
│           ├── mark-published.ts # Mark a post+platform as published
│           ├── add-post.ts       # Add a post to the queue
│           ├── autopublish.ts    # LinkedIn autopublish orchestrator
│           ├── autopublish-instagram.ts  # Instagram autopublish orchestrator
│           └── status.ts         # View all posts in the store
├── config/                       # systemd service templates + timer files
├── data/                         # Pending posts JSON store (gitignored)
└── posts/                        # Generated images (gitignored)
```

## Generating Images

```bash
pnpm generate --platform linkedin --title "Your Title" --theme light

# All options:
#   --platform   linkedin | twitter | instagram | instagram-story
#   --title      Required
#   --subtitle   Optional
#   --author     Optional
#   --date       Optional
#   --theme      light (default)
#   --accent     Hex color override (e.g. #ff6600)
#   --layout     Layout variant (linkedin-profile, before-after, checklist, etc.)
#   --layout-data JSON string with layout-specific content
#   --format     png | jpeg | webp
#   --output     Custom output path
```

## Brand Configuration

All brand values come from `brand.config.ts` at project root. Copy `brand.config.example.ts` to get started.

Key config fields:
- `brand.name` — displayed on generated images
- `brand.website` — shown in image footers
- `brand.logoDataUri` — logo as data URI
- `linkedin.showcaseId` — LinkedIn page ID for autopublish
- `captions.*` — hashtag configuration
- `autopublish.*` — queue thresholds

## Agent System

Agents share a local JSON store (`data/pending-posts.json`).

### Agent Commands

```bash
pnpm agent:autopublish              # Seed queue + publish 1 LinkedIn post
pnpm agent:autopublish --seed-only  # Seed only
pnpm agent:autopublish-instagram    # Instagram equivalent
pnpm agent:status                   # View all posts
pnpm agent:publish                  # Print pending posts
pnpm agent:mark-published --id <uuid> --platform <platform>
pnpm agent:add-post --title "..." --caption "..." --platforms "linkedin" --images "/path.png"
pnpm agent:health                   # Check LinkedIn session
```

## Scheduled Services (systemd)

```bash
bash config/install-systemd.sh
# Installs timers: LinkedIn 3x/day, Instagram 2x/day
```

### If LinkedIn/Instagram session expires

Run with `AUTOPUBLISH_HEADLESS=false` to re-login manually in the browser.

## Layout Design Change Pipeline

When modifying any layout template in `packages/post-generator/src/templates/linkedin-layouts/`:

1. Edit the `.tsx` layout file
2. Generate a verification image:
   ```bash
   pnpm generate --platform linkedin --layout <layout-name> --title "Test Title" --output output/verify/<layout-name>.png
   ```
3. Read the generated PNG to verify the design renders correctly
4. Test edge cases with varying text lengths

### Layout-Specific Data Schemas

| Layout | `--layout-data` JSON |
|---|---|
| `checklist` | `{"items":[{"text":"...","checked":true/false},...]}` (4 items) |
| `grid-points` | `{"points":[{"label":"...","description":"..."},...]}` (4 items) |
| `myth-reality` | `{"myth":"...","reality":"..."}` |
| `before-after` | `{"beforePoints":[...],"afterPoints":[...],"resumeJobTitle":"..."}` |
| `linkedin-profile` | `{"profileName":"...","headline":"...","location":"...","aboutSnippet":"..."}` |
| `accent-sidebar` | `{"title1":"...","sub1":"...","title2":"...","sub2":"..."}` |
| `stat-highlight` | `{"stats":[{"value":"75%","label":"...","description":"..."},...],"source":"..."}` |
| `chart` | `{"chartType":"bar","items":[{"label":"...","value":number,"highlight":true/false},...],"source":"..."}` |

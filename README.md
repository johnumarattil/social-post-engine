# Social Post Engine

Branded social media image generator + browser-based auto-publisher. Generate professional post images from templates, then automatically publish them to LinkedIn and Instagram on a schedule.

Ships with [WahResume](https://wahresume.com) brand values as a working demo — swap in your own brand by editing `brand.config.ts`.

## What It Does

1. **Generates branded images** — 8 layout templates (checklist, before/after, stat highlights, charts, etc.) rendered via Canvacord JSX
2. **Writes AI captions** — Uses Gemini or Perplexity to generate platform-optimized captions with your brand voice
3. **Auto-publishes** — Playwright-based browser automation posts to LinkedIn and Instagram on systemd timers
4. **Manages a post queue** — Seeds topics, generates images, and publishes FIFO from a local JSON store

## Quick Start

```bash
# Prerequisites: Node.js 22+, pnpm 9+
git clone https://github.com/your-org/social-post-engine.git
cd social-post-engine

# Configure your brand
cp brand.config.example.ts brand.config.ts  # Edit with your brand values
cp .env.example .env                         # Add your API keys

# Install and build
pnpm install
pnpm build

# Generate a test image
pnpm generate --platform linkedin --title "Your First Post" --theme light
```

## Brand Configuration

All brand-specific values live in `brand.config.ts` (gitignored). Copy the example and customize:

```typescript
export const config: BrandConfig = {
  brand: {
    name: "YourBrand",
    website: "yourbrand.com",
    logoDataUri: "data:image/svg+xml;base64,...",
  },
  linkedin: {
    showcaseId: "your-linkedin-page-id",
  },
  captions: {
    brandHashtag: "#YourBrand",
    categoryHashtags: { /* ... */ },
    maxHashtags: 3,
  },
  autopublish: {
    linkedin: { queueMin: 10, seedBatch: 90 },
    instagram: { queueMin: 10, seedBatch: 120 },
  },
};
```

Additional customization files (ship as examples, edit directly):
- `packages/agents/src/brand-voice.ts` — LinkedIn caption tone, structure, examples
- `packages/agents/src/instagram-brand-voice.ts` — Instagram caption style + hashtag pools
- `packages/agents/src/preset-topics.ts` — Curated topic list for auto-seeding

## Generating Images

```bash
pnpm generate --platform linkedin --title "Your Title" --theme light

# Options:
#   --platform   linkedin | twitter | instagram | instagram-story
#   --title      Required
#   --subtitle   Optional
#   --layout     linkedin-profile | before-after | checklist | myth-reality |
#                accent-sidebar | grid-points | stat-highlight | chart
#   --layout-data  JSON string with layout-specific content
#   --theme      light (default)
#   --accent     Hex color override
#   --format     png | jpeg | webp
#   --output     Custom output path
```

## Auto-Publishing

### First-Time Browser Login

```bash
# LinkedIn
AUTOPUBLISH_HEADLESS=false pnpm agent:autopublish
# Log in manually in the browser window. Session saved in browser-data/.

# Instagram
AUTOPUBLISH_HEADLESS=false pnpm agent:autopublish-instagram
```

### Manual Run

```bash
pnpm agent:autopublish              # Seed queue + publish 1 LinkedIn post
pnpm agent:autopublish --seed-only  # Seed only, no publish
pnpm agent:autopublish-instagram    # Seed queue + publish 1 Instagram post
```

### Scheduled (systemd)

```bash
bash config/install-systemd.sh
# Installs timers for LinkedIn (3x/day) and Instagram (2x/day)
```

## Architecture

```
social-post-engine/
├── brand.config.ts              # Your brand config (gitignored)
├── brand.config.example.ts      # Demo config (WahResume)
├── packages/
│   ├── shared/                  # Themes, dimensions, brand config types
│   ├── post-generator/          # Image generation (Canvacord JSX templates)
│   └── agents/                  # Queue management + browser autopublish
├── config/                      # systemd service/timer templates
├── data/                        # Post queue JSON store (gitignored)
├── posts/                       # Generated images (gitignored)
└── browser-data/                # Playwright login sessions (gitignored)
```

## Agent Commands

```bash
pnpm agent:status              # View all posts in the queue
pnpm agent:publish             # Print pending posts
pnpm agent:mark-published --id <uuid> --platform <platform>
pnpm agent:add-post --title "..." --caption "..." --platforms "linkedin" --images "/path.png"
pnpm agent:health              # Check LinkedIn session validity
pnpm agent:regen-captions      # Regenerate captions for pending posts
```

## License

MIT

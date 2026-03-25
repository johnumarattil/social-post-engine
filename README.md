# Social Post Engine

Branded social media image generator + browser-based auto-publisher.

Generate professional post images from JSX templates, write AI-powered captions, and automatically publish to LinkedIn and Instagram on a schedule — all driven by a single brand config file.

Ships with [WahResume](https://wahresume.com) brand values as a working demo. Swap in your own brand by editing `brand.config.ts`.

---

## Features

- **8+ layout templates** — Checklist, before/after, stat highlights, charts, myth vs reality, LinkedIn profile, mini resume, and more. Rendered via [Canvacord](https://github.com/neplextech/canvacord) JSX.
- **Multi-platform output** — LinkedIn (1080x1080), Twitter (1200x675), Instagram (1080x1080), and Instagram Story (1080x1920).
- **AI-generated captions** — Uses Gemini or Perplexity to write platform-optimized captions in your brand voice.
- **Browser autopublish** — Playwright-based automation posts to LinkedIn and Instagram. No API tokens needed — just a logged-in browser session.
- **Post queue** — Seeds topics, generates images, and publishes FIFO from a local JSON store. Runs unattended on systemd timers.
- **Fully white-label** — Every brand-specific value (name, logo, colors, hashtags, voice) comes from config. Zero hardcoded branding in the engine.

---

## Quick Start

### Prerequisites

- Node.js 22+
- pnpm 9+

### Setup

```bash
git clone https://github.com/johnumarattil/social-post-engine.git
cd social-post-engine

# Configure your brand
cp brand.config.example.ts brand.config.ts   # Edit with your brand values
cp .env.example .env                          # Add your API keys

# Install and build
pnpm install
pnpm build

# Generate your first image
pnpm generate --platform linkedin --title "Your First Post" --theme light
```

Generated images are saved to the `posts/` directory.

---

## Brand Configuration

All brand-specific values live in `brand.config.ts` (gitignored). Copy the example to get started:

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
    categoryHashtags: {
      "job-search": ["#JobSearch", "#CareerTips"],
      "resume-writing": ["#Resume", "#ResumeTips"],
    },
    maxHashtags: 3,
  },
  autopublish: {
    linkedin: { queueMin: 10, seedBatch: 90 },
    instagram: { queueMin: 10, seedBatch: 120 },
  },
};
```

### Additional customization

| File | Purpose |
|------|---------|
| `packages/agents/src/brand-voice.ts` | LinkedIn caption tone, structure, and examples |
| `packages/agents/src/instagram-brand-voice.ts` | Instagram caption style and hashtag pools |
| `packages/agents/src/preset-topics.ts` | Curated topic list for queue auto-seeding |

---

## Generating Images

```bash
pnpm generate --platform linkedin --title "Your Title" --theme light
```

### Options

| Flag | Values | Default |
|------|--------|---------|
| `--platform` | `linkedin` `twitter` `instagram` `instagram-story` | *required* |
| `--title` | Any string | *required* |
| `--subtitle` | Any string | — |
| `--layout` | See layout table below | — |
| `--layout-data` | JSON string (layout-specific) | — |
| `--theme` | `light` | `light` |
| `--accent` | Hex color (e.g. `#ff6600`) | — |
| `--format` | `png` `jpeg` `webp` | `png` |
| `--output` | Custom file path | `posts/` |

### Layouts

| Layout | Description | `--layout-data` schema |
|--------|-------------|----------------------|
| `checklist` | Checkmark list | `{"items":[{"text":"...","checked":true},...]}` |
| `grid-points` | 4-point grid | `{"points":[{"label":"...","description":"..."},...]}`  |
| `myth-reality` | Myth vs fact | `{"myth":"...","reality":"..."}` |
| `before-after` | Before/after comparison | `{"beforePoints":[...],"afterPoints":[...],"resumeJobTitle":"..."}` |
| `linkedin-profile` | Profile card mockup | `{"profileName":"...","headline":"...","location":"...","aboutSnippet":"..."}` |
| `accent-sidebar` | Two-column with accent bar | `{"title1":"...","sub1":"...","title2":"...","sub2":"..."}` |
| `stat-highlight` | Big number stats | `{"stats":[{"value":"75%","label":"...","description":"..."}],"source":"..."}` |
| `chart` | Bar/column chart | `{"chartType":"bar","items":[{"label":"...","value":42,"highlight":true}],"source":"..."}` |

---

## Auto-Publishing

### First-time browser login

Autopublish uses Playwright to control a real browser. On first run, log in manually:

```bash
# LinkedIn
AUTOPUBLISH_HEADLESS=false pnpm agent:autopublish

# Instagram
AUTOPUBLISH_HEADLESS=false pnpm agent:autopublish-instagram
```

Log in through the browser window that opens. Your session is saved in `browser-data/` for future headless runs.

### Manual run

```bash
pnpm agent:autopublish                # Seed queue + publish 1 LinkedIn post
pnpm agent:autopublish --seed-only    # Seed only, skip publishing
pnpm agent:autopublish-instagram      # Seed queue + publish 1 Instagram post
```

### Scheduled (systemd)

```bash
bash config/install-systemd.sh
```

Installs timers for LinkedIn (3x/day) and Instagram (2x/day). Runs fully unattended once the browser session is saved.

> If a session expires, re-run with `AUTOPUBLISH_HEADLESS=false` to log in again.

---

## Agent Commands

| Command | Description |
|---------|-------------|
| `pnpm agent:status` | View all posts in the queue |
| `pnpm agent:publish` | Print pending posts |
| `pnpm agent:add-post --title "..." --caption "..." --platforms "linkedin" --images "/path.png"` | Add a post manually |
| `pnpm agent:mark-published --id <uuid> --platform <platform>` | Mark a post as published |
| `pnpm agent:regen-captions` | Regenerate captions for pending posts |
| `pnpm agent:health` | Check LinkedIn session validity |

---

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

### Packages

| Package | Description |
|---------|-------------|
| `@social-post-engine/shared` | Design tokens (themes, dimensions), `BrandConfig` type, config loader |
| `@social-post-engine/post-generator` | Image generation library + CLI. JSX templates render to PNG/JPEG/WebP via Canvacord |
| `@social-post-engine/agents` | AI caption generation, topic seeding, post queue (JSON store), Playwright browser automation |

### How autopublish works

1. **Topic seeding** — AI generates a batch of post topics based on your brand voice and preset topics
2. **Image generation** — Each topic gets a branded image from the template library
3. **Caption writing** — AI writes a platform-optimized caption with your hashtags and tone
4. **Queue storage** — Posts are saved to `data/pending-posts.json` with status tracking
5. **Publishing** — Playwright opens a headless browser, navigates to LinkedIn/Instagram, and creates the post
6. **Scheduling** — systemd timers trigger the publish cycle throughout the day

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | One of these | Google Gemini API key for caption generation |
| `PERPLEXITY_API_KEY` | required | Perplexity API key (fallback provider) |
| `AUTOPUBLISH_HEADLESS` | No | Set to `false` to see the browser during publish (for debugging/login) |

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup, PR guidelines, and how to add new layouts.

## License

[MIT](LICENSE)

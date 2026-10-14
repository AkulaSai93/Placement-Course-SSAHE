# uGSOT Catalyst — Section Components

Next.js 14 (App Router) + Tailwind recreation of five sections from
https://sot.upgrad.com/catalyst

## Components

| File | Section |
| --- | --- |
| `components/Hero.jsx` | Hero — headline, sub-copy, dual CTAs, "Built by people who've worked at" logo marquee |
| `components/Curriculum.jsx` | "A Curriculum Built Around How Engineers Actually Learn." — 4-semester accordion with projects + subjects (client component) |
| `components/Certificate.jsx` | "Earn a Completion Certificate" — dark→light gradient with sample certificate |
| `components/Faculty.jsx` | "Taught by Experienced Tech and Academic Minds" — two auto-scrolling faculty rows |
| `components/Legacy.jsx` | "Built on upGrad's Legacy. Designed for the Future of Tech." — stat grid |

## Run

```bash
npm install
npm run dev
```

## Design tokens (`tailwind.config.js`)

- `ink` `#0A0708` — page background
- `ink-soft` `#1B1B1F` — legacy section
- `ink-900` `#0A0A0B` — text on light
- `brand` `#E6161F` — upGrad red accent
- `lime` `#D7FF5F` — secondary accent
- `mist` `#F3F4F6` — light section background

Fonts fall back to system sans. To match the live site exactly, self-host
**Neue Montreal** (display) and **Plus Jakarta Sans** (body) and point
`--font-display` / `--font-sans` in `app/globals.css` at them.

Images on the live site (faculty headshots, partner logos) are not included —
cards use generated initial tiles and logo wordmarks as placeholders.

# cmm.dev

A personal portfolio site styled as a classic 1-bit Macintosh desktop, built
from the 1987 Apple Human Interface Guidelines. All content lives in plain
HTML, so people, search engines, and LLMs can all read it easily. See
[docs/DESIGN.md](docs/DESIGN.md) for the full design write-up, and
[/llms.txt](public/llms.txt) for a plain-text summary of the site.

## Stack

- Vite 6 + TypeScript
- Plain HTML and CSS, no runtime dependencies
- A small TypeScript file (`src/main.ts`) adds window behavior on top of
  content that already works without it

## Development

```bash
bun install
bun run dev
bun run build
bun run typecheck
```

## Deploy

Pushes to `main` deploy two ways. GitHub Actions
(`.github/workflows/deploy.yml`) builds the site and sends `dist/` to
Cloudflare Pages. Cloudflare's Workers Builds Git integration reads
`wrangler.jsonc` and deploys the same `dist/` as static assets. To deploy by
hand, run `bun run build` and then `bun run deploy`.

## Keyboard Navigation

| Key | Window |
|-----|--------|
| `h` / `Esc` | Home |
| `p` | Projects |
| `a` | About |
| `v` | Viz |

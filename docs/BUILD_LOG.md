# CMM.dev Build Log

Full build log — gridland TUI portfolio site, from plan to Cloudflare Pages deployment. Framework issues, ASCII art exploration, braille portraits, and infrastructure decisions.

## What We Built

Terminal-style engineering portfolio at **cmm.dev** using the [gridland](https://github.com/thoughtfulllc/gridland) TUI framework — React components rendered as a terminal UI on HTML5 Canvas. Three screens (Home, Projects, About) with keyboard navigation, Nord color palette, and a braille dot-matrix portrait.

**Repo:** `miqcie/Cmm.dev` (GitHub)
**Live:** `https://cmm-dev.pages.dev/` (Cloudflare Pages)
**Custom domain:** `cmm.dev` (DNS propagating as of 2026-03-29)

## Timeline

### Session 1: Plan to PR

**Started from:** PR #1 (merged) contained only a plan file at `.claude/plans/gridland-portfolio-plan.md`. No code.

**Key discovery:** The plan referenced `@gridland/ui` for themed components — but `@gridland/ui` isn't published to npm. Only `@gridland/web` (0.2.53) and `@gridland/utils` (0.2.53) exist. Had to use raw primitives (`<box>`, `<text>`, `<span>`, `<a>`) and write our own JSX type declarations.

**Implementation:**
- Scaffolded Vite 6 + React 19 + TypeScript project
- Built 3 screens: Home (ASCII art banner + tagline), Projects (two-column card grid with 8 repos), About (bio + career + links)
- App shell with `useKeyboard` for `h`/`p`/`a`/`Escape` navigation
- Status bar highlighting active screen

**Bio copy evolution:** The original plan said "Staff-level engineering with a bias toward shipping." Chris pushed back — he's never been a traditional engineer. After reviewing all GitHub repos, LinkedIn, and personal preferences file, landed on **"Practitioner Who Builds"** — a cybersecurity compliance consultant who writes the automation, not just the policy.

### ASCII Art Portrait Exploration

Went through multiple approaches for a portrait on the About page:

1. **jp2a with `#%@*+` charset** — unreadable blob, no tonal range on monospace grid
2. **jp2a default charset** (`W`, `N`, `K`, `x`, `o`, `l`, `:`) — much better, face recognizable at 35 chars wide
3. **chafa braille from photo** — braille characters (`⠀⠁⣿`) give 8 "pixels" per cell (2x4 dot grid). But the gilt moulding behind Chris in the photo created background noise
4. **rembg background removal + chafa braille** — cleaner but still noisy from the photo's tonal complexity
5. **Minimalist icon + chafa braille** — a bold black-and-white illustrated portrait from the Caldris brand kit. High contrast + clean lines = perfect braille conversion. This is what shipped.

**Lesson:** Braille characters work for terminal art because each cell is a 2x4 dot grid, giving 8x the resolution of traditional ASCII art where each character is a single "pixel." But the source image matters more than the conversion — clean line art > noisy photos every time.

### Framework Issues Filed

**[thoughtfulllc/gridland#38](https://github.com/thoughtfulllc/gridland/issues/38) — Missing JSX type declarations**

`@gridland/web` doesn't ship type declarations for custom elements (`box`, `text`, `span`, `a`, etc.). Consumers must write their own `.d.ts`. Worse, `text`, `span`, and `a` conflict with React 19's built-in `IntrinsicElements` — interface merging fails because the property types are incompatible. Results in 48+ TypeScript errors. Workaround: remove `tsc` from build script (Vite compiles without type-checking).

**[thoughtfulllc/gridland#39](https://github.com/thoughtfulllc/gridland/issues/39) — Production build fails without esnext target**

`yoga-layout` (bundled by gridland) uses top-level `await`, which fails against Vite's default browser targets. Requires `build.target: "esnext"` in vite config. The gridland vite plugin should either set this automatically or document it.

### PR Review

Ran code-reviewer and code-simplifier agents in parallel.

**Critical fix:** Changed `"build": "tsc && vite build"` to `"build": "vite build"` with a separate `"typecheck"` script. TSC fails due to the gridland type issue above.

**Important fix:** Added modifier key guard to keyboard handler — `if (event.ctrl || event.meta || event.shift) return` — prevents navigation when user is doing Cmd+C, Ctrl+F, etc.

**Verified:** Gridland's `<a href>` actually works on canvas — the renderer has a `linkRegistry` that maps cells to URLs and uses `window.open()` on click. Links are functional, not decorative.

### Session 2: Cloudflare Pages Deployment

**Hosting decision:** Compared GitHub Pages, Vercel, Cloudflare Pages, Netlify. Chose Cloudflare Pages as a stepping stone — free static hosting now, with Workers/KV/WAF/R2 available later when the GRC platform needs infrastructure.

**Cloudflare MCP setup:**
- Installed `@cloudflare/mcp-server-cloudflare` — failed to connect
- Root cause: the MCP server requires the `run` subcommand (`npx -y @cloudflare/mcp-server-cloudflare run`), not bare invocation
- Fixed the config, but used Wrangler CLI + curl for this session rather than restart

**Deployment steps:**
1. Created Pages project via `wrangler pages project create cmm-dev`
2. Deployed `dist/` via `wrangler pages deploy dist --project-name cmm-dev`
3. Added cmm.dev zone in Cloudflare dashboard (API token lacked `zone.create` permission)
4. Cloudflare auto-imported DNS: MX records (Porkbun email forwarding), TXT records (SPF, DKIM, DMARC, Apple verification)
5. Deleted old Porkbun parking records (A records pointing to 44.227.x.x, CNAMEs to pixie.porkbun.com)
6. Updated Porkbun nameservers to `cosmin.ns.cloudflare.com` + `sreeni.ns.cloudflare.com` via Porkbun MCP
7. Added `cmm.dev` + `www.cmm.dev` as custom domains on Pages project via Cloudflare API
8. Set up GitHub Actions workflow for auto-deploy on push to main
9. Configured `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` as GitHub repo secrets

**Email preservation:** Verified MX, SPF, DKIM, DMARC records survived the nameserver migration. The `sig1._domainkey` iCloud CNAME was noted as missing from the import but deferred since iCloud email setup can be redone.

## Key Decisions

| Decision | Rationale |
|----------|-----------|
| Raw gridland primitives over `@gridland/ui` | `@gridland/ui` not on npm |
| Skip `tsc` in build | Gridland JSX type conflicts with React 19 are a framework bug, not our code |
| "Practitioner Who Builds" tagline | Grounded in actual background — not an engineer by training, learned to build through practice |
| Braille portrait from minimalist icon | Photo-based approaches too noisy; bold line art converts cleanly |
| Cloudflare Pages over GitHub Pages | Stepping stone to Workers/KV for future GRC platform |
| Direct upload + GitHub Actions | Cleaner than Cloudflare's GitHub integration for repo ownership control |

## Open Items

- Cloudflare API token needs `zone.create` permission for future zone management
- Cloudflare MCP server needs restart to activate (`run` subcommand fix applied)
- `sig1._domainkey` CNAME for iCloud DKIM not imported — redo if iCloud email needed
- PR review suggestions (NAV_ITEMS extraction, links array, alignment hack) are polish for a future pass

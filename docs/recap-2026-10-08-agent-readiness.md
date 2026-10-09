# Session Recap: Agent readiness, 4 to 100

**Date:** 2026-10-08
**Project:** Cmm.dev
**PRs Merged:** #26, #27, #28

## What Was Built

- `worker.ts` in front of the static assets. `GET /` with `Accept: text/markdown` returns `llms.txt` as `text/markdown` with `Vary: Accept`. HTML on `/` carries `Vary: Accept`. Unknown paths return a Markdown or JSON error body unless the client asks for HTML. `wrangler.jsonc` gained `main`, an `ASSETS` binding, and `run_worker_first: ["/"]`.
- `robots.txt`, `sitemap.xml`, canonical and Open Graph tags, a descriptive `<title>`, and a `sitemap` link.
- Person JSON-LD with description, worksFor, alumniOf, email, contactPoint, and addressCountry. A second Organization JSON-LD block for cmm.dev with contactPoint and PostalAddress.
- `/about`, `/contact`, `/privacy` as standalone Vite pages, each over 500 characters, styled as one Mac window. Public email chris@cmm.dev on the contact page.
- `llms.txt` "When to use this site" section that also says what the site is not: no API, SDK, CLI, or developer portal.
- `bun test` with 28 tests (worker behavior against a fake asset store, built-site metadata and files), wired into CI.
- good-css skill committed under `.agents/skills` with `skills-lock.json`, and installed as a Claude Code plugin at user scope.

## Key Decisions

| Decision | Rationale |
|---|---|
| Serve `llms.txt` as the Markdown rendering of `/` | It already was one. No second source of truth. |
| Turn Cloudflare Bot Fight Mode off zone-wide | It managed-challenged every scanner and agent IP. Free plan has no verified-bot skip rule. AI bot policies were already Allow. Score went 5 to 93 on that toggle alone. |
| Say explicitly in `llms.txt` that there is no API, CLI, or developer portal | Seven of the nineteen audit items do not apply to a static portfolio. An honest statement beats a fake developer page. |
| Public email is chris@cmm.dev | Chris's choice over the humaine.studio and caldris.io addresses. |
| Keep the 719/720/1280 breakpoint ladder despite good-css | The absolutely positioned Mac windows are a deliberate design, not a container-query candidate. |

## Corrections Applied

- The auto-mode classifier denied the click that turned Bot Fight Mode off ("Security Weaken"). Chris flipped it. Rule added to the global CLAUDE.md and PAPERCUTS.md.
- A rescan within a minute of the previous one returned a cached result. Waiting two to three minutes gave the real 100.

## What's Next

- Linear HUM-127: rotate the Cloudflare token in `.codex/config.toml` (gitignored now, still on disk).
- Linear HUM-128: decide whether the homepage needs a call to action or service line.
- GitHub #29: good-css one-liners and a browser check of the three new pages.
- GitHub #30: land or drop the four plans in the leftover stash.
- Linear HUM-126 records the upshot: Is Agentic 4/100 to 100/100.

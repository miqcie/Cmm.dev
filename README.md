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

Keep Cloudflare credentials in 1Password. Do not put API tokens in GitHub
secrets, the repo, logs, PRs, or chat.

Pushes to `main` deploy through Cloudflare's Workers Builds Git integration,
which reads `wrangler.jsonc`, runs `bun run build`, and uploads `dist/` as
static assets. That path authenticates inside Cloudflare; it does not need a
token in GitHub.

GitHub Actions (`.github/workflows/ci.yml`) typechecks and builds on pull
requests and on `main`. An optional Wrangler/Workers deploy job
(`.github/workflows/deploy.yml`) can run the same `wrangler deploy` as
`wrangler.jsonc`. It is not Cloudflare Pages.

### Local deploy (1Password CLI)

1. Install [1Password CLI](https://developer.1password.com/docs/cli/get-started/).
2. Sign in. With the desktop app, `op` uses that session. Otherwise:

   ```bash
   eval "$(op signin)"
   ```

3. Build and deploy. `deploy:op` injects `CLOUDFLARE_API_TOKEN` from the
   committed secret reference in `.env.op`:

   ```bash
   bun run build
   bun run deploy:op
   ```

That maps `op://Developer Vault/Cloudflare Workers API/credential` into
Wrangler's environment for the duration of the process. Plain `bun run deploy`
still works if `CLOUDFLARE_API_TOKEN` is already in your environment (for
example Workers Builds).

### GitHub Actions deploy (optional)

Actions must not store `CLOUDFLARE_API_TOKEN`. Give the workflow a 1Password
identity that can read **Developer Vault**, then `1password/load-secrets-action`
resolves the same `.env.op` reference.

Create a [service account](https://developer.1password.com/docs/service-accounts/)
with access to Developer Vault and add **only** `OP_SERVICE_ACCOUNT_TOKEN` as a
GitHub Actions secret.

Until that secret exists, the deploy job skips so CI stays green. Workers
Builds remains the production path. After you add the service account, both
Workers Builds and Actions would deploy on `main` — turn one off if you do not
want two deploys.

Alternatives to a service account (still no Cloudflare token in GitHub):

- **Connect:** `OP_CONNECT_HOST` and `OP_CONNECT_TOKEN` (same `.env.op` refs)
- **Workload identity / OIDC:** `OP_WORKLOAD_ID`, `OP_ENVIRONMENT_ID`, and
  `OP_INTEGRATION_KEY`. That path loads every variable in the 1Password
  Environment (it does not use `.env.op`), so the Environment must define
  `CLOUDFLARE_API_TOKEN`. The deploy workflow already requests
  `id-token: write`.

### Wrangler shell plugin (`Token` vs `credential`)

`op plugin init wrangler` looks for a field named **`Token`**. This item is an
API credential whose field is **`credential`**. Do not paste the token to
rename it.

This repo maps `credential` → `CLOUDFLARE_API_TOKEN` via `.env.op` and
`bun run deploy:op`, so you can leave the field name as-is. If you want the
shell plugin instead, rename the field label to `Token` in 1Password (a label
change, not a re-paste) and update the last path segment in `.env.op` to
match. Adding a second field named `Token` also works; mapping is enough for
the scripts in this repo.

## Keyboard Navigation

| Key | Window |
|-----|--------|
| `h` / `Esc` | Home |
| `p` | Projects |
| `a` | About |
| `v` | Viz |

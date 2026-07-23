# Session Recap: Harmonize cmm.dev with GTM positioning

**Date:** 2026-07-23
**Project:** Cmm.dev
**PRs Merged:** #17

## What Was Built

Congruency pass ahead of the 1Password Director, GTM Engineering referral: cmm.dev now matches the resume and GitHub profile end to end. Home description covers both halves of the work ("compliance engines for clients, revenue systems for my own pipeline"), the projects list reflects reality (gilfoyle renamed with 21★, cal-attio-sync and nightscout-clock added, two stale entries dropped), the DWP title matches the resume verbatim, and the Focus line ends in "GTM Engineering." Deployed via the existing GitHub Actions → Cloudflare Pages flow; live bundle verified by grepping the served JS for the new strings.

Companion work outside this repo: miqcie/miqcie profile README published (five pinned repos curated), completing the chain resume → github.com/miqcie → cmm.dev → live artifacts.

## Key Decisions

| Decision | Rationale |
|---|---|
| Widen positioning, don't pivot it | cmm.dev serves Eagle Ridge too; "GRC practitioner who also builds revenue systems" is true; a GTM-only rebrand would be pandering |
| Keep "Practitioner Who Builds" tagline and the "missing middle" bio | Already congruent with the deterministic-vs-creative governance thesis — best expression of it anywhere |
| Hardcode star counts | Ponytail: a fetch-at-build-time star counter is speculative machinery for a number that changes monthly |

## Corrections Applied

- DWP title mismatch ("Dir. of AI & Strategic Ops" vs resume's "Director, Digital & Business Transformation") — the kind of inconsistency a diligent hiring manager catches
- Stale gilfoyle-tech-reviewer link (repo renamed; old URL only worked via redirect)

## What's Next

- Home page polish (bead chrismcconnell-he53 — Chris flagged post-harmonization layout issues; get specifics)
- Discovery wiring (bead chrismcconnell-g1h9 — LinkedIn website field, eagleridge.io cross-link, PostHog referral visibility)

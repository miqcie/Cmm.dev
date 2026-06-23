# Session Recap: Messi Penalty Placement Viz

**Date:** 2026-06-22
**Project:** Cmm.dev (data-viz gallery)
**PRs Merged:** #12

## What Was Built

A single interactive visualization of **Lionel Messi's 146 career penalties by goal placement**, live at https://cmm.dev/viz/messi-from-the-spot/ in the cmm.dev editorial house style (Georgia + ochre, Tufte data-ink).

- **134 of 146 penalties placed** in goal coordinates (shooter's view):
  - **74** StatsBomb-measured (La Liga open data)
  - **9** hand-verified tags
  - **51** video-estimated, flagged separately (lower confidence, known low-left bias)
  - 12 unplaced (no usable clip) — tracked in issue #13
- Features: Verified/Estimated + Scored/Missed filters, live side/height read, sortable full record, hover details.
- **Extraction pipeline** (in `~/messi-penalties/`, not in repo): `yt-dlp` (official-source + date-anchored search) -> `ffmpeg` contact sheets -> parallel vision subagents to locate the kick and estimate placement. Zero LLM tokens for the mechanical 90%.

## Key Decisions

| Decision | Rationale |
|---|---|
| One viz, not two | Consolidated the editorial chart + interactive scatter into a single gallery entry. |
| Generate the viz, don't hand-edit | `build_combined.py` emits the HTML from the CSV; fixes go in the generator, then regenerate (no drift). |
| Keep verified vs estimated separate | Estimates have a low-left bias; solid = verified, hollow = estimated; side-split excludes off-target. |
| Exclude copyrighted clips from repo | 324 MB of video stays local; only viz + dataset ship. |
| Precedence: manual > measured > auto | Hand-verified tags always override in the merge. |

## Corrections Applied

- 3-agent PR review caught off-target penalties (coords outside 0-1) skewing the side-split and floating as stray marks. Fixed: flagged `ot`, excluded from stats, labeled "off", faded at rim. Also fixed blank-height->ground coercion, fake 0% for empty buckets, same-date sort tiebreak.
- Notable finding: real data overturns the original "shoots right, scores left" story — Messi goes his-left ~50% / his-right ~39%, converting better to his right (88% vs 80%).
- Process: a `cp` clobbered the git-tracked gallery `index.html`; caught in verification, restored from git. (Codified in memory.)

## What's Next

- Issue #13: hand-verify the 51 estimated placements via the local tagger; 12 unplaced are diminishing returns.
- Gallery is a standing shelf — more charts as they get made.

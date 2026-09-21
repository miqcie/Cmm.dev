# Session Recap: Macintosh-style layout for cmm.dev

**Date:** 2026-09-21
**Project:** Cmm.dev

## What Was Built

cmm.dev now looks like a black-and-white Macintosh desktop from the 1987 Apple
Human Interface Guidelines. It has a menu bar, three overlapping windows (Home,
Projects, About), desktop icons, and Mac-style buttons and scroll bars. Every
word of content lives in plain HTML, so people, search engines, and LLMs can
all read it without running any script.

The old site placed each line of text with JavaScript at a pixel position. That
left no structure for a machine to read. The new site uses headings, a table
for projects, and a definition list for career facts. It also ships
`/llms.txt` and a JSON-LD `Person` block.

Full design notes: [DESIGN.md](DESIGN.md).

## Key Decisions

| Decision | Rationale |
|---|---|
| Plain HTML + CSS, one small script | Content readable with JavaScript off; no runtime dependencies |
| Only `#000` and `#fff` | Matches a real 1-bit Mac screen; highlight means inversion |
| Overlapping windows on desktop, stacked on phones | Faithful to the desktop metaphor where there is room; readable where there is not |
| No Chicago font shipped | Not freely licensed; the site makes no outside requests |
| `/viz/` left as is | It has its own editorial style and its own audience |
| Menu titles are plain links | Simpler and more accessible than pull-down menus |

## How the Work Was Split

The main session wrote a spec, then delegated the build and the docs to two
cheaper agents running in parallel. The main session reviewed screenshots and
fixed four layout bugs: a definition-list grid that widened past the window,
a Projects title bar hidden under Home, the About window sliding under the
desktop icons, and a phone-load scroll that hid the Home title bar under the
menu bar.

## What's Next

- Decide whether the Projects table on phones should drop a column instead of scrolling sideways.
- Consider a real pull-down "Go" menu if the site grows more pages.

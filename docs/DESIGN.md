# Design: a Macintosh desktop for cmm.dev

The old cmm.dev looked like a terminal. A script placed every line of text by
pixel position, so a search engine or an AI reader found no structure. That raised
a question: how do we make the site easy to read for both people and
machines, without losing its personality? The answer is a black-and-white
Macintosh desktop, styled after the 1987 Apple Human Interface Guidelines[^hig]
("the HIG"), built entirely from plain HTML.

**In one sentence: cmm.dev now looks like a classic Mac desktop, and every
word on it lives in the page's HTML, so people and machines can both read it
easily.**

The rest of this document backs that up. Five points matter most:

1. The Mac look follows real interface rules from 1987, not just decoration.
2. The page has one clear anatomy: a menu bar, three windows, and desktop icons.
3. The layout adapts for phones without changing the content.
4. A small script adds interactivity, but the page fully works without it.
5. Every design choice also makes the page easy for an LLM to read.

## 1. The Mac look follows real rules, not just decoration

The 1987 HIG lists ten design principles for the Apple Desktop Interface (PDF
p. 17).[^hig] We picked concrete features on the page for several of them:

- **Metaphors** (PDF p. 17-18): the page is a "desktop" holding "windows," a
  "disk," and "folders," so it feels familiar right away.
- **Direct manipulation**[^direct-manipulation] (PDF p. 18): on desktop
  screens, you drag a window by its title bar and click it to bring it
  forward, just like a real Mac.
- **Consistency** (PDF p. 20): every window shares one title bar, close box,
  and button style. Learn one, and you know them all.
- **User control** (PDF p. 21): you choose which window is active or closed.
  The site never pops up anything on its own.
- **Perceived stability** (PDF p. 22): the menu bar never moves. The HIG
  says a menu bar "is always visible at the top of the screen" and this
  "adds to the illusion of stability" (PDF p. 39).
- **Aesthetic integrity** (PDF p. 23): the whole site uses only black and
  white, matching a real 1-bit[^one-bit] Macintosh screen. No gray text, no
  color, no shadows except hard black ones.
- **Modelessness** (PDF p. 26): nothing locks you into one task. Every link
  and menu title works at any time, with no dropdown menu to trap a click.
- **WYSIWYG**[^wysiwyg] (PDF p. 20-21): what you see in the page's HTML is
  what a reader gets, with nothing hidden behind a script.

## 2. The page has one clear anatomy

The page has four parts. A **menu bar** sits fixed at the top, white with a
black line under it, holding four plain-text links: cmm.dev, Projects, About,
and Viz. Below it sits the **desktop**, filled with a checkerboard dither[^dither]
pattern, the same 50% gray effect a real black-and-white Mac used to fake a
middle tone.

Three **windows** sit on the desktop: Home, Projects, and About. Each has a
close box, a zoom box, and a size box, matching the standard parts the HIG
describes for a document window (PDF p. 56). Only the active window shows a
striped title bar and its boxes; an inactive one stays plain white, per the
HIG's rule for active versus inactive windows (PDF p. 57-59).

Small **desktop icons** sit at the right edge on wide screens, like disks and
folders on a real desktop. Titles, menus, and buttons use a bold stack that
stands in for Chicago[^chicago-geneva]; body text uses a Geneva-style stack.
One rule governs color everywhere: only `#000` and `#fff`. Highlighting means
inverting those two colors, never adding a third.

## 3. The layout adapts for phones without changing the content

Below 720 pixels wide, the three windows stack in one column, full width, in
reading order: Home, then Projects, then About. The menu bar stays fixed at
the top, but the keyboard hint and desktop icons hide for lack of room. The
Projects table keeps every column; it scrolls sideways inside its window
instead of dropping data.

At 720 pixels and wider — a breakpoint[^breakpoint] chosen to fit a window
comfortably — the windows become movable, overlapping panels, placed the way
folders might sit on a real desktop. Above 1280 pixels, they spread out
further to overlap less. Only position and shape change between sizes; the
content never does.

## 4. A small script adds interactivity, but the page fully works without it

A short TypeScript file adds Mac-style behavior: clicking a window raises its
z-order[^z-order] to bring it to the front, dragging a title bar moves the
window, the close box hides it, the zoom box resizes it, and the keys H, P,
A, and V jump to Home, Projects, About, and Viz. This is progressive
enhancement[^progressive-enhancement] — a layer added on top of a page that
already works on its own.

With JavaScript turned off, all three windows still show and are fully
readable. Every link still works. You lose the drag, the click-to-front
order, and the close and zoom boxes. You never lose any content.

## 5. Every choice also makes the page easy for an LLM to read

The rebuild's two hard rules were: write real HTML, and use only black and
white. The HTML rule pays off for machine readers directly. The page uses
semantic HTML[^semantic-html] tags — `<header>`, `<nav>`, `<main>`,
`<section>`, headings from `<h1>` to `<h4>`, `<p>`, `<table>`, and `<dl>` —
so a crawler or an LLM can tell a menu from a heading from a plain paragraph.
All text is present when the page loads; none of it is drawn later by a
script, so a reader with no JavaScript still sees everything.

The Projects window uses a real `<table>`, so a reader can line up each
project's name, language, and star count. The About window uses a `<dl>`,
a definition list, so "Now" clearly pairs with "Eagle Ridge Advisory." A
block of JSON-LD[^json-ld] in the page head describes Chris McConnell as a
`Person`, with a name, job title, location, and links, in a format search
engines already understand. A separate file, `/llms.txt`,[^llms-txt] gives
any LLM a short, plain-text summary of the whole site. HTML comments mark
each region — the menu bar, each window, the desktop icons — so a person or
a model skimming the source sees the page's map at a glance.

## How to edit content

All page content lives directly in `index.html`. There is no separate data
file or content management system. To change the bio, edit the paragraph and
list inside the About window. To add, remove, or edit a project, edit the
matching row in the Projects table. Styling lives in `src/style.css` and
behavior lives in `src/main.ts`; neither file holds any visible text.

## What we did not do

We did not ship the real Chicago font. It is not freely licensed, and the
site makes no requests to outside services, so every font is a system font
stand-in. The `/viz/` page keeps its own separate, editorial look; it is not
part of this Mac redesign. Finally, we did not build pull-down menus. The
menu bar's titles are plain links you click once, not menus that open and
require a second click — a simpler, more accessible choice that still reads
as a menu bar.

[^hig]: HIG stands for Human Interface Guidelines — Apple's 1987 rulebook for
  how Macintosh software should look and behave.
[^one-bit]: 1-bit means each pixel is only black or white, with no shades of
  gray, the way early Macintosh screens worked.
[^dither]: Dithering mixes black and white pixels in a checkerboard pattern to
  fake a middle gray tone on a screen that can only show two colors.
[^direct-manipulation]: Direct manipulation means acting on something by
  touching or dragging it directly on screen, instead of typing a command
  for it.
[^chicago-geneva]: Chicago and Geneva are the original Macintosh system
  fonts: Chicago bold for titles and menus, Geneva for regular text.
[^breakpoint]: A breakpoint is the screen width where a page's layout
  switches from one arrangement to another, such as from stacked to
  side-by-side.
[^z-order]: Z-order is the front-to-back stacking order of overlapping
  windows on screen; a higher z-order means a window sits closer to the
  viewer.
[^progressive-enhancement]: Progressive enhancement means building a page
  that works with plain HTML first, then adding extra behavior with
  JavaScript for browsers that support it.
[^semantic-html]: Semantic HTML means using tags that describe what content
  is, such as a table for data or a heading for a title, instead of generic
  boxes with no meaning.
[^json-ld]: JSON-LD is a small block of structured data in a page that tells
  search engines facts about it, such as a person's name and job, in a
  standard format.
[^llms-txt]: llms.txt is a plain-text file at a site's root that gives AI
  tools a short summary of the site's pages and content.
[^wysiwyg]: WYSIWYG means "what you see is what you get" — what you see on
  screen matches what you get in the final result, with no hidden steps.
</content>

# Cmm.dev Portfolio — Gridland TUI Website

## Context
Build a terminal-style engineering portfolio for Cmm.dev using the [gridland](https://github.com/thoughtfulllc/gridland) framework. Gridland renders React components as a terminal UI on HTML5 Canvas — giving the site a distinctive developer aesthetic. The site will showcase notable public GitHub projects from the `miqcie` account.

## Tech Stack
- **Vite 6** + **React 19** + **TypeScript**
- **@gridland/web** (TUI renderer + vite plugin)
- **@gridland/ui** (themed components, Link)
- **@gridland/utils** (keyboard hooks, terminal dimensions)

## Project Structure
```
Cmm.dev/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── main.tsx          # React DOM mount
    ├── App.tsx           # TUI shell + keyboard nav + screen routing
    ├── screens/
    │   ├── Home.tsx      # Welcome banner + bio + nav hints
    │   ├── Projects.tsx  # Scrollable project showcase grid
    │   └── About.tsx     # Extended bio + links
    └── data/
        └── projects.ts   # Project metadata array
```

## Implementation Steps

### 1. Scaffold Vite + Gridland project
- Create `package.json` with deps: `react`, `react-dom`, `@gridland/web`, `@gridland/ui`, `@gridland/utils`
- Create `vite.config.ts` using `gridlandWebPlugin()` + `@vitejs/plugin-react`
- Create `tsconfig.json` with `"jsx": "react-jsx"`, esnext target
- Create `index.html` with `#root` div, dark background, full viewport

### 2. Create entry point (`src/main.tsx`)
- Mount React app to `#root`

### 3. Build project data (`src/data/projects.ts`)
Notable public repos to feature (from miqcie's GitHub):
| Project | Description | Tech | Stars |
|---------|-------------|------|-------|
| gilfoyle-tech-reviewer | Technical review agent with Gilfoyle-style precision | JS | 13 |
| grepai-beads-helpers | Automation scripts for semantic code search & AI memory | Shell | 6 |
| Humaine-studio | Thought lab on human + AI collaboration | HTML | 1 |
| voice-pipeline | Voice capture → transcribe → classify → route | Python | 0 |
| mondrian | Evidence-first Zero Trust runtime for startups | Go | 0 |
| T1DCalculator | iOS insulin dose calculator using medical formulas | Swift | 0 |
| task-sync-system | Event-driven task mgmt for ADHD workflows | — | 0 |
| chrome-to-safari-converter | Browser extension converter tool | JS | 0 |

### 4. Build screens

**Home.tsx** — ASCII art header "CMM.DEV", tagline, bio summary, keyboard nav hints (`[p] projects  [a] about`)

**Projects.tsx** — Bordered boxes for each project with name, description, language tag, star count, and GitHub URL. Two-column layout using flexbox. Keyboard scrollable.

**About.tsx** — Bio, location, blog link (humaine.studio), GitHub link, "hireable" status, member since 2011.

### 5. Build App shell (`src/App.tsx`)
- Wrap everything in `<TUI>` at full viewport
- State for current screen (home/projects/about)
- Keyboard listener: `p` → projects, `a` → about, `h`/`Esc` → home
- Status bar at bottom showing nav keys
- Render active screen component

### 6. Key Files to Modify/Create
- `/home/user/Cmm.dev/package.json` (new)
- `/home/user/Cmm.dev/vite.config.ts` (new)
- `/home/user/Cmm.dev/tsconfig.json` (new)
- `/home/user/Cmm.dev/index.html` (new)
- `/home/user/Cmm.dev/src/main.tsx` (new)
- `/home/user/Cmm.dev/src/App.tsx` (new)
- `/home/user/Cmm.dev/src/screens/Home.tsx` (new)
- `/home/user/Cmm.dev/src/screens/Projects.tsx` (new)
- `/home/user/Cmm.dev/src/screens/About.tsx` (new)
- `/home/user/Cmm.dev/src/data/projects.ts` (new)
- `/home/user/Cmm.dev/README.md` (update)

### 7. Gridland API Reference (from source)
- `<TUI style={{ width: "100vw", height: "100vh" }}>` — root canvas renderer
- `<box>` — flex container (props: `flexDirection`, `border`, `borderStyle`, `borderColor`, `backgroundColor`, `padding`, `gap`, `flexGrow`, `marginTop`, `width`, `height`, `title`, `titleAlignment`)
- `<text>` — text node (props: `fg`, `bold`)
- `<a href={url}>` — hyperlink inside `<text>`
- `useKeyboard()` from `@gridland/utils` — keyboard input hook
- `gridlandWebPlugin()` from `@gridland/web/vite-plugin` — Vite plugin
- Border styles: `"single"`, `"rounded"`, `"double"`
- JSX types declared via `@gridland/ui/gridland-jsx.d.ts` or inline module augmentation

### 8. Color Palette (Nord-inspired, matching gridland examples)
- Background: `#2e3440`
- Primary text: `#d8dee9`
- Accent green: `#a3be8c`
- Accent blue: `#81a1c1`
- Accent purple: `#b48ead`
- Accent yellow: `#ebcb8b`
- Accent red: `#bf616a`
- Border blue: `#5e81ac`
- Header cyan: `#88c0d0`

## Verification
1. `bun install` (or `npm install`) — deps install cleanly
2. `bun run dev` — Vite dev server starts, site renders terminal UI in browser
3. Keyboard nav works: `h`/`p`/`a` switch screens
4. All project cards render with correct data and GitHub links
5. Commit and push to `claude/setup-cmm-portfolio-d45W2` branch

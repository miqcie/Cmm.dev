import {
  prepareWithSegments,
  layoutWithLines,
  type PreparedTextWithSegments,
} from "@chenglou/pretext"

// ── Nord palette ────────────────────────────────────────────────────────
const C = {
  bg: "#2e3440",
  text: "#d8dee9",
  cyan: "#88c0d0",
  yellow: "#ebcb8b",
  green: "#a3be8c",
  blue: "#81a1c1",
  purple: "#b48ead",
  red: "#bf616a",
  border: "#5e81ac",
  muted: "#4c566a",
} as const

// ── Fonts ───────────────────────────────────────────────────────────────
const MONO = '"SF Mono", "Fira Code", "Cascadia Code", "JetBrains Mono", Menlo, Monaco, "Courier New", monospace'
const FONT = `14px ${MONO}`
const FONT_SMALL = `13px ${MONO}`
const LINE_HEIGHT = 22
const LINE_HEIGHT_SMALL = 20
const GUTTER = 24
const NARROW = 540

// ── Project data ────────────────────────────────────────────────────────
interface Project {
  name: string
  description: string
  language: string
  stars: number
  url: string
}

const langColors: Record<string, string> = {
  JavaScript: C.yellow,
  Shell: C.green,
  HTML: C.red,
  Python: C.blue,
  Go: C.cyan,
  Swift: C.purple,
  TypeScript: C.blue,
}

const projects: Project[] = [
  { name: "gilfoyle-tech-reviewer", description: "Technical review agent with Gilfoyle-style precision", language: "JavaScript", stars: 13, url: "https://github.com/miqcie/gilfoyle-tech-reviewer" },
  { name: "grepai-beads-helpers", description: "Automation scripts for semantic code search & AI memory", language: "Shell", stars: 6, url: "https://github.com/miqcie/grepai-beads-helpers" },
  { name: "Humaine-studio", description: "Thought lab on human + AI collaboration", language: "HTML", stars: 1, url: "https://github.com/miqcie/Humaine-studio" },
  { name: "voice-pipeline", description: "Voice capture → transcribe → classify → route", language: "Python", stars: 0, url: "https://github.com/miqcie/voice-pipeline" },
  { name: "mondrian", description: "Evidence-first Zero Trust runtime for startups", language: "Go", stars: 0, url: "https://github.com/miqcie/mondrian" },
  { name: "T1DCalculator", description: "iOS insulin dose calculator using medical formulas", language: "Swift", stars: 0, url: "https://github.com/miqcie/T1DCalculator" },
  { name: "task-sync-system", description: "Event-driven task mgmt for ADHD workflows", language: "TypeScript", stars: 0, url: "https://github.com/miqcie/task-sync-system" },
  { name: "chrome-to-safari-converter", description: "Browser extension converter tool", language: "JavaScript", stars: 0, url: "https://github.com/miqcie/chrome-to-safari-converter" },
]

// ── ASCII art ───────────────────────────────────────────────────────────
const BANNER = [
  "  ██████╗███╗   ███╗███╗   ███╗   ██████╗ ███████╗██╗   ██╗",
  " ██╔════╝████╗ ████║████╗ ████║   ██╔══██╗██╔════╝██║   ██║",
  " ██║     ██╔████╔██║██╔████╔██║   ██║  ██║█████╗  ██║   ██║",
  " ██║     ██║╚██╔╝██║██║╚██╔╝██║   ██║  ██║██╔══╝  ╚██╗ ██╔╝",
  " ╚██████╗██║ ╚═╝ ██║██║ ╚═╝ ██║██╗██████╔╝███████╗ ╚████╔╝ ",
  "  ╚═════╝╚═╝     ╚═╝╚═╝     ╚═╝╚═╝╚═════╝ ╚══════╝  ╚═══╝ ",
]

const BANNER_SMALL = [
  " ██████╗██╗  ██╗██╗  ██╗",
  "██╔════╝███╗███║███╗███║",
  "██║     ██████║██████║",
  "██║     ██╔██╔██║██╔██╔██║",
  "╚██████╗██║  ██║██║  ██║",
  " ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝",
  "       · D E V ·",
]

const PORTRAIT = [
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⣶⡖⠛⠛⠶⢶⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⢀⣴⠛⠒⠒⠂⠄⠩⠭⠭⠊⠻⣦⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⣾⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠸⣧⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⣀⣸⣧⣤⣤⣤⣤⣄⡀⠀⣠⣤⣤⣴⣶⣿⣄⡀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⣠⠟⣿⠀⠀⢠⣤⡀⣹⠛⢻⡇⣀⣤⣀⠀⢘⡿⢷⡄⠀⠀⠀⠀",
  "⠀⠀⠀⠀⣿⠀⣿⣆⠀⠈⠉⣠⡿⠀⠈⢧⡉⠀⠈⢀⣼⡇⠀⡟⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠘⣧⣿⠈⠉⠉⣉⣩⣇⣀⣀⣆⣉⣉⡉⠉⢰⣇⡼⠃⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⢻⣦⣀⣾⠿⡿⠿⠿⠛⠛⣻⢿⣷⣀⣾⡏⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠸⣿⣿⣿⡄⠙⠓⠶⠒⠛⠁⣼⣿⣿⣿⠁⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣿⣦⣇⣇⣇⣠⣾⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⢿⣿⣿⣿⣿⣿⣿⡿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
]

// ── Types ───────────────────────────────────────────────────────────────
type Screen = "home" | "projects" | "about"

interface Line {
  x: number
  y: number
  text: string
  color: string
  font: string
  lineHeight: number
  href?: string
  navTarget?: Screen
  bold?: boolean
}

// ── State ───────────────────────────────────────────────────────────────
let currentScreen: Screen = "home"
const stage = document.getElementById("stage") as HTMLDivElement
const linePool: HTMLElement[] = []

// ── Pretext helpers ─────────────────────────────────────────────────────
function measureLines(
  text: string,
  font: string,
  maxWidth: number,
  lh: number,
): { lines: { text: string; width: number }[]; height: number } {
  const prepared = prepareWithSegments(text, font)
  const result = layoutWithLines(prepared, maxWidth, lh)
  return { lines: result.lines, height: result.height }
}

// ── Layout engine ───────────────────────────────────────────────────────

function layoutHome(w: number, _h: number): Line[] {
  const out: Line[] = []
  const narrow = w < NARROW
  const gutter = narrow ? 16 : GUTTER
  const contentW = w - gutter * 2
  const banner = narrow ? BANNER_SMALL : BANNER
  const font = narrow ? FONT_SMALL : FONT
  const lh = narrow ? LINE_HEIGHT_SMALL : LINE_HEIGHT

  // Measure banner width (character-by-character for monospace art)
  let y = gutter + lh

  // ASCII banner — centered
  for (const line of banner) {
    const prepared = prepareWithSegments(line, font)
    const measured = layoutWithLines(prepared, 9999, lh)
    const lineW = measured.lines[0]?.width ?? 0
    out.push({ x: Math.max(gutter, Math.round((w - lineW) / 2)), y, text: line, color: C.cyan, font, lineHeight: lh })
    y += lh
  }

  y += lh * 2

  // Tagline
  const tagline = "Practitioner Who Builds"
  const tagPrep = prepareWithSegments(tagline, font)
  const tagW = layoutWithLines(tagPrep, 9999, lh).lines[0]?.width ?? 0
  out.push({ x: Math.round((w - tagW) / 2), y, text: tagline, color: C.yellow, font, lineHeight: lh, bold: true })
  y += lh * 2

  // Description — wrapped
  const desc = "GRC + Cybersecurity. The first mile for companies on their compliance journey. I build the tools I use with clients — then open-source the methodology."
  const descResult = measureLines(desc, font, contentW, lh)
  for (const line of descResult.lines) {
    const lw = line.width
    out.push({ x: Math.round((w - lw) / 2), y, text: line.text, color: C.text, font, lineHeight: lh })
    y += lh
  }

  y += lh * 2

  // Nav separator
  const sep = "─── Navigate ───"
  const sepPrep = prepareWithSegments(sep, font)
  const sepW = layoutWithLines(sepPrep, 9999, lh).lines[0]?.width ?? 0
  out.push({ x: Math.round((w - sepW) / 2), y, text: sep, color: C.green, font, lineHeight: lh })
  y += lh + Math.round(lh * 0.5)

  // Nav buttons
  const navItems: { label: string; target: Screen }[] = [
    { label: "[p] projects", target: "projects" },
    { label: "[a] about", target: "about" },
  ]
  const navText = navItems.map(n => n.label).join("    ")
  const navPrep = prepareWithSegments(navText, font)
  const navW = layoutWithLines(navPrep, 9999, lh).lines[0]?.width ?? 0
  const navStartX = Math.round((w - navW) / 2)

  // Measure each item's width to place them as separate clickable spans
  let navX = navStartX
  for (const item of navItems) {
    const itemPrep = prepareWithSegments(item.label, font)
    const itemW = layoutWithLines(itemPrep, 9999, lh).lines[0]?.width ?? 0
    out.push({ x: navX, y, text: item.label, color: C.blue, font, lineHeight: lh, navTarget: item.target })
    navX += itemW
    // gap
    const gapPrep = prepareWithSegments("    ", font)
    const gapW = layoutWithLines(gapPrep, 9999, lh).lines[0]?.width ?? 0
    navX += gapW
  }
  y += lh * 3

  // Footer
  const footer = "github.com/miqcie  •  humaine.studio  •  richmond, va"
  const footResult = measureLines(footer, font, contentW, lh)
  for (const line of footResult.lines) {
    const lw = line.width
    out.push({ x: Math.round((w - lw) / 2), y, text: line.text, color: C.muted, font, lineHeight: lh })
    y += lh
  }

  return out
}

function layoutProjects(w: number, _h: number): Line[] {
  const out: Line[] = []
  const narrow = w < NARROW
  const gutter = narrow ? 16 : GUTTER
  const contentW = w - gutter * 2
  const font = narrow ? FONT_SMALL : FONT
  const lh = narrow ? LINE_HEIGHT_SMALL : LINE_HEIGHT
  let y = gutter

  // Header
  out.push({ x: gutter, y, text: "─── Projects ───", color: C.yellow, font, lineHeight: lh, bold: true })
  y += lh * 2

  const cols = narrow ? 1 : 2
  const colGap = 24
  const colW = cols === 1 ? contentW : Math.floor((contentW - colGap) / 2)

  // Lay out cards in columns
  const colY = [y, y] // track y position per column

  for (let i = 0; i < projects.length; i++) {
    const col = cols === 1 ? 0 : i % 2
    const colX = gutter + col * (colW + colGap)
    let cy = colY[col]!

    const p = projects[i]!
    const langColor = langColors[p.language] || C.text

    // Card top border
    const innerW = colW - 4 // 2 chars for border on each side
    const borderH = "╭" + "─".repeat(Math.max(2, Math.floor(innerW / 8.4))) + "╮" // approximate
    // Instead of box drawing (hard to align), use a simple top rule
    out.push({ x: colX, y: cy, text: "┌" + "─".repeat(40) + "┐", color: C.border, font, lineHeight: lh })
    cy += lh

    // Project name
    out.push({ x: colX + 16, y: cy, text: p.name, color: C.cyan, font, lineHeight: lh, bold: true })
    cy += lh

    // Description — wrapped within card
    const descResult = measureLines(p.description, font, colW - 32, lh)
    for (const line of descResult.lines) {
      out.push({ x: colX + 16, y: cy, text: line.text, color: C.text, font, lineHeight: lh })
      cy += lh
    }
    cy += Math.round(lh * 0.5)

    // Language + stars
    const meta = `● ${p.language}` + (p.stars > 0 ? `  ★ ${p.stars}` : "")
    out.push({ x: colX + 16, y: cy, text: meta, color: langColor, font, lineHeight: lh })
    cy += lh

    // URL link
    const shortUrl = p.url.replace("https://github.com/", "")
    out.push({ x: colX + 16, y: cy, text: shortUrl, color: C.border, font, lineHeight: lh, href: p.url })
    cy += lh

    // Bottom border
    out.push({ x: colX, y: cy, text: "└" + "─".repeat(40) + "┘", color: C.border, font, lineHeight: lh })
    cy += lh + Math.round(lh * 0.5)

    colY[col] = cy
  }

  return out
}

function layoutAbout(w: number, _h: number): Line[] {
  const out: Line[] = []
  const narrow = w < NARROW
  const gutter = narrow ? 16 : GUTTER
  const contentW = w - gutter * 2
  const font = narrow ? FONT_SMALL : FONT
  const lh = narrow ? LINE_HEIGHT_SMALL : LINE_HEIGHT
  let y = gutter

  // Header
  out.push({ x: gutter, y, text: "─── About ───", color: C.yellow, font, lineHeight: lh, bold: true })
  y += lh * 2

  if (narrow) {
    // Mobile: portrait centered, then bio stacked below

    // Portrait
    for (const line of PORTRAIT) {
      const prep = prepareWithSegments(line, font)
      const pw = layoutWithLines(prep, 9999, lh).lines[0]?.width ?? 0
      out.push({ x: Math.round((w - pw) / 2), y, text: line, color: C.blue, font, lineHeight: lh })
      y += lh
    }
    y += lh
  } else {
    // Desktop: portrait on left, bio on right
    const portraitX = gutter

    // Lay down portrait lines
    const portraitStartY = y
    for (const line of PORTRAIT) {
      out.push({ x: portraitX, y, text: line, color: C.blue, font, lineHeight: lh })
      y += lh
    }

    // Bio on the right
    const prep0 = prepareWithSegments(PORTRAIT[0]!, font)
    const portraitW = layoutWithLines(prep0, 9999, lh).lines[0]?.width ?? 0
    const bioX = portraitX + portraitW + 32
    const bioW = contentW - portraitW - 32
    let bioY = portraitStartY

    // Name
    out.push({ x: bioX, y: bioY, text: "Chris McConnell, MBA", color: C.cyan, font, lineHeight: lh, bold: true })
    bioY += lh * 2

    // Bio text
    const bioText = 'Making sense of the revolution underfoot. I focus on the "missing middle" — systems that help us think better without taking decisions away. Oversight and augmentation, not replacement.'
    const bioResult = measureLines(bioText, font, Math.max(200, bioW), lh)
    for (const line of bioResult.lines) {
      out.push({ x: bioX, y: bioY, text: line.text, color: C.text, font, lineHeight: lh })
      bioY += lh
    }
    bioY += lh

    // Experience entries
    const entries = [
      ["Now       ", "Eagle Ridge Advisory — Founder"],
      ["          ", "Humaine Studio — Applied AI Strategist"],
      ["Before    ", "Deep Water Point — Dir. of AI & Strategic Ops"],
      ["Education ", "NYU Stern MBA · University of Idaho BA"],
      ["Location  ", "Richmond, Virginia"],
      ["Focus     ", "CMMC · Zero Trust · AI Agents · GRC Automation"],
    ]
    for (const [label, value] of entries) {
      out.push({ x: bioX, y: bioY, text: label!, color: C.green, font, lineHeight: lh, bold: true })
      const labelPrep = prepareWithSegments(label!, font)
      const labelW = layoutWithLines(labelPrep, 9999, lh).lines[0]?.width ?? 0
      // Wrap value text
      const valResult = measureLines(value!, font, Math.max(100, bioW - labelW), lh)
      for (let vi = 0; vi < valResult.lines.length; vi++) {
        out.push({ x: bioX + labelW, y: bioY, text: valResult.lines[vi]!.text, color: C.text, font, lineHeight: lh })
        bioY += lh
      }
    }

    y = Math.max(y, bioY) + lh
  }

  if (narrow) {
    // Mobile bio section
    out.push({ x: gutter, y, text: "Chris McConnell, MBA", color: C.cyan, font, lineHeight: lh, bold: true })
    y += lh * 2

    const bioText = 'Making sense of the revolution underfoot. I focus on the "missing middle" — systems that help us think better without taking decisions away. Oversight and augmentation, not replacement.'
    const bioResult = measureLines(bioText, font, contentW, lh)
    for (const line of bioResult.lines) {
      out.push({ x: gutter, y, text: line.text, color: C.text, font, lineHeight: lh })
      y += lh
    }
    y += lh

    const entries = [
      ["Now       ", "Eagle Ridge Advisory — Founder"],
      ["          ", "Humaine Studio — Applied AI Strategist"],
      ["Before    ", "Deep Water Point — Dir. of AI & Strategic Ops"],
      ["Education ", "NYU Stern MBA · University of Idaho BA"],
      ["Location  ", "Richmond, Virginia"],
      ["Focus     ", "CMMC · Zero Trust · AI Agents · GRC Automation"],
    ]
    for (const [label, value] of entries) {
      const labelPrep = prepareWithSegments(label!, font)
      const labelW = layoutWithLines(labelPrep, 9999, lh).lines[0]?.width ?? 0
      out.push({ x: gutter, y, text: label!, color: C.green, font, lineHeight: lh, bold: true })
      const valResult = measureLines(value!, font, Math.max(100, contentW - labelW), lh)
      for (let vi = 0; vi < valResult.lines.length; vi++) {
        out.push({ x: gutter + labelW, y, text: valResult.lines[vi]!.text, color: C.text, font, lineHeight: lh })
        y += lh
      }
    }
    y += lh
  }

  // Experience blurbs
  y += lh
  const blurbs = [
    "Led 300+ consultants through Zero Trust for CMMC compliance.",
    "Built AI workflows that cut 160 hrs/month to 12.",
    "Now I build the tools and run the engagements myself.",
  ]
  for (const blurb of blurbs) {
    const result = measureLines(blurb, font, contentW, lh)
    for (const line of result.lines) {
      out.push({ x: gutter, y, text: line.text, color: C.muted, font, lineHeight: lh })
      y += lh
    }
  }

  y += lh * 2

  // Links
  out.push({ x: gutter, y, text: "Links", color: C.blue, font, lineHeight: lh })
  y += lh
  const links: [string, string][] = [
    ["github.com/miqcie", "https://github.com/miqcie"],
    ["humaine.studio", "https://humaine.studio"],
    ["eagleridge.io", "https://eagleridge.io"],
    ["linkedin.com/in/c-mcconnell", "https://www.linkedin.com/in/c-mcconnell/"],
    ["data viz", "/viz/"],
  ]
  for (const [label, href] of links) {
    out.push({ x: gutter + 16, y, text: label, color: C.border, font, lineHeight: lh, href })
    y += lh
  }

  return out
}

// ── DOM rendering (editorial-engine pattern) ────────────────────────────

function syncPool(count: number): void {
  while (linePool.length < count) {
    const el = document.createElement("span")
    el.className = "ln"
    stage.appendChild(el)
    linePool.push(el)
  }
  for (let i = 0; i < linePool.length; i++) {
    linePool[i]!.style.display = i < count ? "" : "none"
  }
}

function renderLines(lines: Line[]): void {
  // We need separate elements for links vs text vs nav buttons
  // Clear and rebuild — simpler than pooling 3 types
  while (stage.firstChild) stage.removeChild(stage.firstChild)
  linePool.length = 0

  for (const line of lines) {
    let el: HTMLElement

    if (line.href) {
      const a = document.createElement("a")
      a.href = line.href
      // Internal links (root-relative) navigate in place; external links open a new tab.
      if (/^https?:/.test(line.href)) {
        a.target = "_blank"
        a.rel = "noreferrer"
      }
      a.className = "ln"
      el = a
    } else if (line.navTarget) {
      const btn = document.createElement("button")
      btn.className = "nav-btn"
      const target = line.navTarget
      btn.addEventListener("click", () => navigate(target))
      el = btn
    } else {
      el = document.createElement("span")
      el.className = "ln"
    }

    el.textContent = line.text
    el.style.left = `${line.x}px`
    el.style.top = `${line.y}px`
    el.style.font = line.font
    el.style.lineHeight = `${line.lineHeight}px`
    el.style.color = line.color
    if (line.bold) el.style.fontWeight = "700"

    stage.appendChild(el)
    linePool.push(el)
  }

  // Add bottom nav bar
  renderNavBar(lines)
}

function renderNavBar(lines: Line[]): void {
  const w = document.documentElement.clientWidth
  const narrow = w < NARROW
  const font = narrow ? FONT_SMALL : FONT
  const lh = narrow ? LINE_HEIGHT_SMALL : LINE_HEIGHT

  // Find the max Y of all lines to position the nav
  let maxY = 0
  for (const line of lines) {
    const bottom = line.y + line.lineHeight
    if (bottom > maxY) maxY = bottom
  }

  // Nav bar at the bottom of viewport or below content
  const h = document.documentElement.clientHeight
  const navY = Math.max(maxY + lh * 2, h - lh * 2)
  const gutter = narrow ? 16 : GUTTER

  // Separator line
  const sepEl = document.createElement("span")
  sepEl.className = "ln"
  sepEl.textContent = "─".repeat(Math.floor((w - gutter * 2) / 8))
  sepEl.style.left = `${gutter}px`
  sepEl.style.top = `${navY}px`
  sepEl.style.font = font
  sepEl.style.lineHeight = `${lh}px`
  sepEl.style.color = C.muted
  stage.appendChild(sepEl)

  const navScreens: { label: string; key: string; target: Screen }[] = [
    { label: "[h]ome", key: "h", target: "home" },
    { label: "[p]rojects", key: "p", target: "projects" },
    { label: "[a]bout", key: "a", target: "about" },
  ]

  let navX = gutter
  const navBtnY = navY + lh
  for (const nav of navScreens) {
    const btn = document.createElement("button")
    btn.className = "nav-btn"
    btn.textContent = nav.label
    btn.style.left = `${navX}px`
    btn.style.top = `${navBtnY}px`
    btn.style.font = font
    btn.style.lineHeight = `${lh}px`
    btn.style.color = currentScreen === nav.target ? C.cyan : C.muted
    const target = nav.target
    btn.addEventListener("click", () => navigate(target))
    stage.appendChild(btn)

    const prep = prepareWithSegments(nav.label, font)
    const itemW = layoutWithLines(prep, 9999, lh).lines[0]?.width ?? 0
    navX += itemW

    const gapPrep = prepareWithSegments("  ", font)
    const gapW = layoutWithLines(gapPrep, 9999, lh).lines[0]?.width ?? 0
    navX += gapW
  }

  if (!narrow) {
    const brand = "cmm.dev"
    const brandPrep = prepareWithSegments(brand, font)
    const brandW = layoutWithLines(brandPrep, 9999, lh).lines[0]?.width ?? 0
    const brandEl = document.createElement("span")
    brandEl.className = "ln"
    brandEl.textContent = brand
    brandEl.style.left = `${w - gutter - brandW}px`
    brandEl.style.top = `${navBtnY}px`
    brandEl.style.font = font
    brandEl.style.lineHeight = `${lh}px`
    brandEl.style.color = C.muted
    stage.appendChild(brandEl)
  }

  // Update stage height for scrolling
  const totalHeight = navBtnY + lh * 2
  stage.style.height = `${Math.max(totalHeight, h)}px`
}

// ── Navigation ──────────────────────────────────────────────────────────

function navigate(screen: Screen): void {
  currentScreen = screen
  stage.scrollTop = 0
  render()
}

function render(): void {
  const w = document.documentElement.clientWidth
  const h = document.documentElement.clientHeight

  let lines: Line[]
  switch (currentScreen) {
    case "home":
      lines = layoutHome(w, h)
      break
    case "projects":
      lines = layoutProjects(w, h)
      break
    case "about":
      lines = layoutAbout(w, h)
      break
  }

  renderLines(lines)
}

// ── Events ──────────────────────────────────────────────────────────────

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey || e.metaKey || e.shiftKey) return
  if (e.key === "p") navigate("projects")
  else if (e.key === "a") navigate("about")
  else if (e.key === "h" || e.key === "Escape") navigate("home")
})

// Resize
window.addEventListener("resize", () => render())

// ── Boot ────────────────────────────────────────────────────────────────

// Wait for fonts to load, then render
await document.fonts.ready
render()

// cmm.dev — progressive-enhancement script for the Mac-desktop layout.
// All content already lives in index.html; this only adds window-manager
// behavior (front/back, drag, close, zoom, keyboard shortcuts).
// Strict TS, zero dependencies.

const desktop = document.getElementById("desktop")!

const windows = Array.from(document.querySelectorAll<HTMLElement>(".window"))
const menuTitles = Array.from(document.querySelectorAll<HTMLAnchorElement>(".menu-title[data-window]"))

const narrowQuery = window.matchMedia("(max-width: 719px)")

let topZ = 1

function windowById(id: string): HTMLElement | null {
  return document.getElementById(id)
}

// Bring a window to front, mark it active/open, sync the menu bar and hash.
function focusWindow(id: string, userInitiated = true): void {
  const target = windowById(id)
  if (!target || !target.classList.contains("window")) return

  for (const w of windows) w.classList.remove("active")
  target.classList.remove("closed")
  target.classList.add("active")
  target.style.zIndex = String(++topZ)

  for (const m of menuTitles) {
    if (m.dataset.window === id) m.setAttribute("aria-current", "true")
    else m.removeAttribute("aria-current")
  }

  // Initial load with no hash: leave the page at the top and the URL clean.
  // (Writing a fragment before the load event makes the browser jump to it.)
  if (!userInitiated) return

  // On phones the windows stack, so "bring to front" means scroll to it.
  if (narrowQuery.matches) {
    target.scrollIntoView({ block: "start" })
  }

  history.replaceState(null, "", "#" + id)
}

// Any element with data-window navigates in place instead of following the hash link.
document.addEventListener("click", (e) => {
  const el = (e.target as HTMLElement).closest<HTMLElement>("a[data-window]")
  if (!el) return
  const id = el.dataset.window
  if (!id) return
  e.preventDefault()
  focusWindow(id)
})

// Clicking anywhere in a window brings it to front.
document.addEventListener("pointerdown", (e) => {
  const win = (e.target as HTMLElement).closest<HTMLElement>(".window")
  if (win) focusWindow(win.id)
})

// Close / zoom boxes.
for (const win of windows) {
  const closeBtn = win.querySelector<HTMLButtonElement>(".closebox")
  const zoomBtn = win.querySelector<HTMLButtonElement>(".zoombox")

  closeBtn?.addEventListener("click", (e) => {
    e.stopPropagation()
    win.classList.add("closed")
    win.classList.remove("active")
    // Focus the top-most remaining open window, if any.
    const open = windows
      .filter((w) => !w.classList.contains("closed") && w !== win)
      .sort((a, b) => Number(b.style.zIndex || 0) - Number(a.style.zIndex || 0))
    if (open[0]) focusWindow(open[0].id)
  })

  zoomBtn?.addEventListener("click", (e) => {
    e.stopPropagation()
    win.classList.toggle("zoomed")
  })
}

// ── Dragging (desktop widths only) ─────────────────────────────────────
let dragTarget: HTMLElement | null = null
let dragOffsetX = 0
let dragOffsetY = 0

document.addEventListener("pointerdown", (e) => {
  if (narrowQuery.matches) return
  const target = e.target as HTMLElement
  const titlebar = target.closest<HTMLElement>(".titlebar")
  if (!titlebar) return
  if (target.closest(".closebox, .zoombox")) return
  const win = titlebar.closest<HTMLElement>(".window")
  if (!win) return

  const rect = win.getBoundingClientRect()
  const deskRect = desktop.getBoundingClientRect()
  dragTarget = win
  dragOffsetX = e.clientX - rect.left
  dragOffsetY = e.clientY - rect.top

  win.style.left = `${rect.left - deskRect.left}px`
  win.style.top = `${rect.top - deskRect.top}px`

  titlebar.setPointerCapture(e.pointerId)
})

document.addEventListener("pointermove", (e) => {
  if (!dragTarget) return
  const deskRect = desktop.getBoundingClientRect()
  const titlebarHeight = 19

  let left = e.clientX - deskRect.left - dragOffsetX
  let top = e.clientY - deskRect.top - dragOffsetY

  // Clamp so at least 40px of the title bar stays inside the desktop.
  const maxLeft = deskRect.width - 40
  const minLeft = -(dragTarget.offsetWidth - 40)
  const maxTop = deskRect.height - titlebarHeight
  left = Math.min(maxLeft, Math.max(minLeft, left))
  top = Math.min(maxTop, Math.max(0, top))

  dragTarget.style.left = `${left}px`
  dragTarget.style.top = `${top}px`
})

document.addEventListener("pointerup", () => {
  dragTarget = null
})

// Clear inline drag positions when crossing the narrow/desktop breakpoint.
narrowQuery.addEventListener("change", () => {
  for (const w of windows) {
    w.style.left = ""
    w.style.top = ""
  }
})

// ── Keyboard shortcuts ──────────────────────────────────────────────────
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return
  const target = e.target as HTMLElement | null
  const tag = target?.tagName
  if (tag === "INPUT" || tag === "TEXTAREA") return

  if (e.key === "h" || e.key === "Escape") focusWindow("home")
  else if (e.key === "p") focusWindow("projects")
  else if (e.key === "a") focusWindow("about")
  else if (e.key === "v") window.location.href = "/viz/"
})

// ── Initial focus ────────────────────────────────────────────────────────
function focusFromHash(): void {
  const id = location.hash.replace("#", "")
  if (id && windowById(id)?.classList.contains("window")) focusWindow(id)
  else focusWindow("home", false)
}

window.addEventListener("hashchange", focusFromHash)
focusFromHash()

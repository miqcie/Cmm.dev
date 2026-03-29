import { useState } from "react"
import { TUI } from "@gridland/web"
import { useKeyboard } from "@gridland/utils"
import { Home } from "./screens/Home"
import { Projects } from "./screens/Projects"
import { About } from "./screens/About"

type Screen = "home" | "projects" | "about"

function Shell() {
  const [screen, setScreen] = useState<Screen>("home")

  useKeyboard((event) => {
    if (event.name === "p") setScreen("projects")
    else if (event.name === "a") setScreen("about")
    else if (event.name === "h" || event.name === "escape") setScreen("home")
  })

  return (
    <box flexDirection="column" flexGrow={1}>
      <box flexGrow={1}>
        {screen === "home" && <Home />}
        {screen === "projects" && <Projects />}
        {screen === "about" && <About />}
      </box>
      <box
        flexDirection="row"
        justifyContent="space-between"
        padding={1}
        borderColor="#4c566a"
      >
        <text fg="#4c566a">
          <span style={{ fg: screen === "home" ? "#88c0d0" : "#4c566a" }}>[h]ome</span>
          {"  "}
          <span style={{ fg: screen === "projects" ? "#88c0d0" : "#4c566a" }}>[p]rojects</span>
          {"  "}
          <span style={{ fg: screen === "about" ? "#88c0d0" : "#4c566a" }}>[a]bout</span>
        </text>
        <text fg="#4c566a">cmm.dev</text>
      </box>
    </box>
  )
}

export function App() {
  return (
    <TUI
      style={{ width: "100vw", height: "100vh" }}
      backgroundColor="#2e3440"
      autoFocus
    >
      <Shell />
    </TUI>
  )
}

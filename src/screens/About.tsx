import { useIsMobile } from "../hooks/useIsMobile"

const PORTRAIT = `⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⣶⡖⠛⠛⠶⢶⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢀⣴⠛⠒⠒⠂⠄⠩⠭⠭⠊⠻⣦⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣾⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠸⣧⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣀⣸⣧⣤⣤⣤⣤⣄⡀⠀⣠⣤⣤⣴⣶⣿⣄⡀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣠⠟⣿⠀⠀⢠⣤⡀⣹⠛⢻⡇⣀⣤⣀⠀⢘⡿⢷⡄⠀⠀⠀⠀
⠀⠀⠀⠀⣿⠀⣿⣆⠀⠈⠉⣠⡿⠀⠈⢧⡉⠀⠈⢀⣼⡇⠀⡟⠀⠀⠀⠀
⠀⠀⠀⠀⠘⣧⣿⠈⠉⠉⣉⣩⣇⣀⣀⣆⣉⣉⡉⠉⢰⣇⡼⠃⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢻⣦⣀⣾⠿⡿⠿⠿⠛⠛⣻⢿⣷⣀⣾⡏⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠸⣿⣿⣿⡄⠙⠓⠶⠒⠛⠁⣼⣿⣿⣿⠁⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣿⣦⣇⣇⣇⣠⣾⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⢿⣿⣿⣿⣿⣿⣿⡿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`

function BioSection({ isMobile }: { isMobile: boolean }) {
  return (
    <box
      flexDirection="column"
      border
      borderStyle="rounded"
      borderColor="#5e81ac"
      padding={isMobile ? 1 : 2}
      flexGrow={1}
    >
      <text fg="#d8dee9">
        <span style={{ fg: "#88c0d0", attributes: 1 }}>Chris McConnell, MBA</span>
      </text>
      <text fg="#d8dee9" marginTop={1} wrapMode="word">
        Making sense of the revolution underfoot. I focus on the "missing middle" — systems that help us think better without taking decisions away. Oversight and augmentation, not replacement.
      </text>

      <box marginTop={2} flexDirection="column" gap={1}>
        <text fg="#d8dee9">
          <span style={{ fg: "#a3be8c", attributes: 1 }}>Now</span>{"         Eagle Ridge Advisory — Founder"}
        </text>
        <text fg="#d8dee9">
          <span style={{ fg: "#a3be8c", attributes: 1 }}>{"            "}</span>{"Humaine Studio — Applied AI Strategist"}
        </text>
        <text fg="#d8dee9">
          <span style={{ fg: "#a3be8c", attributes: 1 }}>Before</span>{"      Deep Water Point — Dir. of AI & Strategic Ops"}
        </text>
        <text fg="#d8dee9">
          <span style={{ fg: "#a3be8c", attributes: 1 }}>Education</span>{"   NYU Stern MBA · University of Idaho BA"}
        </text>
        <text fg="#d8dee9">
          <span style={{ fg: "#a3be8c", attributes: 1 }}>Location</span>{"    Richmond, Virginia"}
        </text>
        <text fg="#d8dee9">
          <span style={{ fg: "#a3be8c", attributes: 1 }}>Focus</span>{"       CMMC · Zero Trust · AI Agents · GRC Automation"}
        </text>
      </box>
    </box>
  )
}

function ExperienceSection() {
  return (
    <box
      flexDirection="column"
      border
      borderStyle="rounded"
      borderColor="#5e81ac"
      padding={1}
      flexGrow={1}
    >
      <text fg="#4c566a" wrapMode="word">
        Led 300+ consultants through Zero Trust for CMMC compliance.
      </text>
      <text fg="#4c566a" wrapMode="word">
        Built AI workflows that cut 160 hrs/month to 12.
      </text>
      <text fg="#4c566a" wrapMode="word">
        Now I build the tools and run the engagements myself.
      </text>
    </box>
  )
}

function LinksSection() {
  return (
    <box
      flexDirection="column"
      border
      borderStyle="rounded"
      borderColor="#5e81ac"
      padding={1}
      flexGrow={1}
    >
      <text>
        <span style={{ fg: "#81a1c1" }}>Links</span>
      </text>
      <text>
        {"  "}
        <a href="https://github.com/miqcie" style={{ fg: "#5e81ac", attributes: 8 }}>
          github.com/miqcie
        </a>
      </text>
      <text>
        {"  "}
        <a href="https://humaine.studio" style={{ fg: "#5e81ac", attributes: 8 }}>
          humaine.studio
        </a>
      </text>
      <text>
        {"  "}
        <a href="https://eagleridge.io" style={{ fg: "#5e81ac", attributes: 8 }}>
          eagleridge.io
        </a>
      </text>
      <text>
        {"  "}
        <a href="https://www.linkedin.com/in/c-mcconnell/" style={{ fg: "#5e81ac", attributes: 8 }}>
          linkedin.com/in/c-mcconnell
        </a>
      </text>
    </box>
  )
}

export function About() {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <scrollbox flexDirection="column" flexGrow={1} padding={1} overflow="scroll">
        <text>
          <span style={{ fg: "#ebcb8b", attributes: 1 }}>{"─── About ───"}</span>
        </text>

        <box
          marginTop={1}
          border
          borderStyle="rounded"
          borderColor="#5e81ac"
          padding={1}
          alignItems="center"
        >
          <text fg="#81a1c1">{PORTRAIT}</text>
        </box>

        <box marginTop={1}>
          <BioSection isMobile />
        </box>

        <box marginTop={1}>
          <ExperienceSection />
        </box>

        <box marginTop={1}>
          <LinksSection />
        </box>
      </scrollbox>
    )
  }

  return (
    <box flexDirection="column" flexGrow={1} padding={1}>
      <text>
        <span style={{ fg: "#ebcb8b", attributes: 1 }}>{"─── About ───"}</span>
      </text>

      <box flexDirection="row" marginTop={1} gap={2}>
        <box
          border
          borderStyle="rounded"
          borderColor="#5e81ac"
          padding={1}
        >
          <text fg="#81a1c1">{PORTRAIT}</text>
        </box>

        <BioSection isMobile={false} />
      </box>

      <box flexDirection="row" marginTop={1} gap={2}>
        <ExperienceSection />
        <LinksSection />
      </box>
    </box>
  )
}

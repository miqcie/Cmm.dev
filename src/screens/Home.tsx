import { useIsMobile } from "../hooks/useIsMobile"

const BANNER_FULL = `  ██████╗███╗   ███╗███╗   ███╗   ██████╗ ███████╗██╗   ██╗
 ██╔════╝████╗ ████║████╗ ████║   ██╔══██╗██╔════╝██║   ██║
 ██║     ██╔████╔██║██╔████╔██║   ██║  ██║█████╗  ██║   ██║
 ██║     ██║╚██╔╝██║██║╚██╔╝██║   ██║  ██║██╔══╝  ╚██╗ ██╔╝
 ╚██████╗██║ ╚═╝ ██║██║ ╚═╝ ██║██╗██████╔╝███████╗ ╚████╔╝
  ╚═════╝╚═╝     ╚═╝╚═╝     ╚═╝╚═╝╚═════╝ ╚══════╝  ╚═══╝`

const BANNER_SMALL = ` ██████╗██╗  ██╗██╗  ██╗
██╔════╝███╗███║███╗███║
██║     ██████║██████║
██║     ██╔██╔██║██╔██╔██║
╚██████╗██║  ██║██║  ██║
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝
       ·  D E V  ·`

export function Home() {
  const isMobile = useIsMobile()

  return (
    <box flexDirection="column" flexGrow={1} padding={1}>
      <box flexDirection="column" alignItems="center" marginTop={1}>
        <text fg="#88c0d0">
          {isMobile ? BANNER_SMALL : BANNER_FULL}
        </text>
      </box>

      <box marginTop={2} flexDirection="column" alignItems="center">
        <text fg="#d8dee9">
          <span style={{ fg: "#ebcb8b", attributes: 1 }}>Practitioner Who Builds</span>
        </text>
        {isMobile ? (
          <>
            <text fg="#d8dee9" marginTop={1} wrapMode="word">
              GRC + Cybersecurity. The first mile for companies on their compliance journey.
            </text>
            <text fg="#d8dee9" marginTop={1} wrapMode="word">
              I build the tools I use with clients — then open-source the methodology.
            </text>
          </>
        ) : (
          <>
            <text fg="#d8dee9" marginTop={1}>
              GRC + Cybersecurity. The first mile for companies
            </text>
            <text fg="#d8dee9">
              on their compliance journey. I build the tools I use
            </text>
            <text fg="#d8dee9">
              with clients — then open-source the methodology.
            </text>
          </>
        )}
      </box>

      <box marginTop={3} flexDirection="column" alignItems="center">
        <text fg="#a3be8c">
          {"─── Navigate ───"}
        </text>
        <text fg="#d8dee9" marginTop={1}>
          <span style={{ fg: "#81a1c1", attributes: 1 }}>[p]</span>{" projects  "}
          <span style={{ fg: "#81a1c1", attributes: 1 }}>[a]</span>{" about  "}
        </text>
      </box>

      <box marginTop={3} flexDirection="column" alignItems="center">
        <text fg="#4c566a" wrapMode="word" textAlign="center">
          {"github.com/miqcie  •  humaine.studio  •  richmond, va"}
        </text>
      </box>
    </box>
  )
}

import { projects } from "../data/projects"

const langColors: Record<string, string> = {
  JavaScript: "#ebcb8b",
  Shell: "#a3be8c",
  HTML: "#bf616a",
  Python: "#81a1c1",
  Go: "#88c0d0",
  Swift: "#b48ead",
  TypeScript: "#81a1c1",
}

function ProjectCard({ name, description, language, stars, url }: {
  name: string
  description: string
  language: string
  stars: number
  url: string
}) {
  const langColor = langColors[language] || "#d8dee9"
  return (
    <box
      flexDirection="column"
      border
      borderStyle="rounded"
      borderColor="#5e81ac"
      padding={1}
      width="50%"
    >
      <text>
        <span style={{ fg: "#88c0d0", attributes: 1 }}>{name}</span>
      </text>
      <text fg="#d8dee9" marginTop={1}>{description}</text>
      <box flexDirection="row" marginTop={1} gap={2}>
        <text>
          <span style={{ fg: langColor }}>● {language}</span>
        </text>
        {stars > 0 && (
          <text fg="#ebcb8b">★ {stars}</text>
        )}
      </box>
      <text marginTop={1}>
        <a href={url} style={{ fg: "#5e81ac", attributes: 8 }}>
          {url.replace("https://github.com/", "")}
        </a>
      </text>
    </box>
  )
}

export function Projects() {
  const rows: typeof projects[] = []
  for (let i = 0; i < projects.length; i += 2) {
    rows.push(projects.slice(i, i + 2))
  }

  return (
    <box flexDirection="column" flexGrow={1} padding={1}>
      <text>
        <span style={{ fg: "#ebcb8b", attributes: 1 }}>{"─── Projects ───"}</span>
      </text>
      <box flexDirection="column" marginTop={1} gap={1}>
        {rows.map((row, i) => (
          <box key={i} flexDirection="row" gap={1}>
            {row.map((project) => (
              <ProjectCard key={project.name} {...project} />
            ))}
            {row.length === 1 && <box width="50%" />}
          </box>
        ))}
      </box>
    </box>
  )
}

export interface Project {
  name: string
  description: string
  language: string
  stars: number
  url: string
}

export const projects: Project[] = [
  {
    name: "gilfoyle-tech-reviewer",
    description: "Technical review agent with Gilfoyle-style precision",
    language: "JavaScript",
    stars: 13,
    url: "https://github.com/miqcie/gilfoyle-tech-reviewer",
  },
  {
    name: "grepai-beads-helpers",
    description: "Automation scripts for semantic code search & AI memory",
    language: "Shell",
    stars: 6,
    url: "https://github.com/miqcie/grepai-beads-helpers",
  },
  {
    name: "Humaine-studio",
    description: "Thought lab on human + AI collaboration",
    language: "HTML",
    stars: 1,
    url: "https://github.com/miqcie/Humaine-studio",
  },
  {
    name: "voice-pipeline",
    description: "Voice capture → transcribe → classify → route",
    language: "Python",
    stars: 0,
    url: "https://github.com/miqcie/voice-pipeline",
  },
  {
    name: "mondrian",
    description: "Evidence-first Zero Trust runtime for startups",
    language: "Go",
    stars: 0,
    url: "https://github.com/miqcie/mondrian",
  },
  {
    name: "T1DCalculator",
    description: "iOS insulin dose calculator using medical formulas",
    language: "Swift",
    stars: 0,
    url: "https://github.com/miqcie/T1DCalculator",
  },
  {
    name: "task-sync-system",
    description: "Event-driven task mgmt for ADHD workflows",
    language: "TypeScript",
    stars: 0,
    url: "https://github.com/miqcie/task-sync-system",
  },
  {
    name: "chrome-to-safari-converter",
    description: "Browser extension converter tool",
    language: "JavaScript",
    stars: 0,
    url: "https://github.com/miqcie/chrome-to-safari-converter",
  },
]

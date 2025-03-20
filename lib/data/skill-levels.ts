export interface SkillLevel {
  value: string
  label: string
}

export const skillLevels: SkillLevel[] = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
]

export const skillLevelDescriptions = {
  beginner: "Avoid jargon, use simple analogies, and explain basic programming concepts.",
  intermediate: "Include explanations of design patterns and best practices where relevant.",
  advanced: "Include performance considerations, edge cases, and potential optimizations.",
}


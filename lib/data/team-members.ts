export interface TeamMember {
  name: string
  role: string
  bio: string
  avatarUrl: string
}

export const teamMembers: TeamMember[] = [
  {
    name: "Jane Smith",
    role: "Founder & CEO",
    bio: "Former AI researcher at Google, passionate about making code more accessible.",
    avatarUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "John Doe",
    role: "CTO",
    bio: "20+ years of software development experience, previously at Microsoft.",
    avatarUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Sarah Johnson",
    role: "Lead AI Engineer",
    bio: "PhD in Natural Language Processing, specializing in code understanding.",
    avatarUrl: "/placeholder.svg?height=100&width=100",
  },
]


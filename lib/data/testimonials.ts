export interface Testimonial {
  quote: string
  author: string
  role: string
  avatarUrl: string
}

export const testimonials: Testimonial[] = [
  {
    quote: "This tool has saved me countless hours trying to understand legacy code.",
    author: "Sarah Chen",
    role: "Senior Developer at TechCorp",
    avatarUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    quote: "Perfect for onboarding new team members to our codebase.",
    author: "Michael Johnson",
    role: "Engineering Manager",
    avatarUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    quote: "The beginner-friendly explanations helped me learn programming faster.",
    author: "Alex Rodriguez",
    role: "CS Student",
    avatarUrl: "/placeholder.svg?height=100&width=100",
  },
]

export const loginTestimonial = {
  quote:
    "This tool has completely changed how I understand and learn from code. It's like having a senior developer explain everything to me.",
  author: "Sofia Davis",
}


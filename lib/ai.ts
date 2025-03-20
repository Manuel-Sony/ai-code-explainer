import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// AI service for code explanation
export async function explainCode(
  code: string,
  language: string,
  level: "beginner" | "intermediate" | "advanced" = "intermediate",
): Promise<string> {
  try {
    // Create a prompt based on the user's code and preferences
    const prompt = createPrompt(code, language, level)

    // Generate explanation using OpenAI
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      system:
        "You are an expert programmer specializing in explaining code clearly and concisely. Your explanations should be accurate, educational, and tailored to the user's skill level.",
    })

    return text
  } catch (error) {
    console.error("AI explanation error:", error)
    throw new Error("Failed to generate code explanation")
  }
}

// Helper to create the prompt for the AI
function createPrompt(code: string, language: string, level: string): string {
  return `
    Please explain the following ${language} code ${
      level === "beginner"
        ? "in simple terms for a beginner"
        : level === "advanced"
          ? "in depth with advanced concepts"
          : "at an intermediate level"
    }:
    
    \`\`\`${language}
    ${code}
    \`\`\`
    
    ${getAdditionalInstructions(level)}
  `
}

// Customize instructions based on user's skill level
function getAdditionalInstructions(level: string): string {
  switch (level) {
    case "beginner":
      return "Avoid jargon, use simple analogies, and explain basic programming concepts."
    case "intermediate":
      return "Include explanations of design patterns and best practices where relevant."
    case "advanced":
      return "Include performance considerations, edge cases, and potential optimizations."
    default:
      return ""
  }
}


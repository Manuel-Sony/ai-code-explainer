import { type NextRequest, NextResponse } from "next/server"
import { explainCode } from "@/lib/ai"
import { getCache, setCache } from "@/lib/redis"
import { db } from "@/lib/db"
import { codeExplanations } from "@/lib/db/schema"
import { auth } from "@/lib/auth"
import { createHash } from "crypto"
import { rateLimit } from "@/lib/rate-limit"

export async function POST(request: NextRequest) {
  try {
    // Get user session
    const session = await auth()
    const userId = session?.user?.id

    // Apply rate limiting
    if (userId) {
      const identifier = userId
      const { success, limit, remaining } = await rateLimit(identifier)

      if (!success) {
        return NextResponse.json(
          { error: "Rate limit exceeded. Please try again later." },
          {
            status: 429,
            headers: {
              "X-RateLimit-Limit": limit.toString(),
              "X-RateLimit-Remaining": remaining.toString(),
            },
          },
        )
      }
    }

    // Parse request body
    const body = await request.json()
    const { code, language, level, save = false } = body

    // Validate input
    if (!code || !language) {
      return NextResponse.json({ error: "Code and language are required" }, { status: 400 })
    }

    // Create cache key based on input
    const cacheKey = createCacheKey(code, language, level)

    // Check cache first
    const cachedExplanation = await getCache<string>(cacheKey)
    if (cachedExplanation) {
      return NextResponse.json({ explanation: cachedExplanation })
    }

    // Generate explanation with AI
    const explanation = await explainCode(code, language, level)

    // Cache the result
    await setCache(cacheKey, explanation, 60 * 60 * 24) // Cache for 24 hours

    // If user is authenticated and wants to save the explanation
    if (save && userId) {
      // Save to database
      await db.insert(codeExplanations).values({
        userId,
        code,
        explanation,
        language,
        level,
        title: generateTitle(code, language),
      })
    }

    return NextResponse.json(
      { explanation },
      {
        headers: {
          "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
        },
      },
    )
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Failed to generate explanation" }, { status: 500 })
  }
}

// Helper to create a unique cache key
function createCacheKey(code: string, language: string, level: string): string {
  const hash = createHash("md5").update(`${code}-${language}-${level}`).digest("hex")
  return `explanation:${hash}`
}

// Generate a title based on the code
function generateTitle(code: string, language: string): string {
  // Extract first line or function name as title
  const firstLine = code.split("\n")[0].trim()
  if (firstLine.length > 30) {
    return `${language} snippet (${new Date().toLocaleDateString()})`
  }
  return firstLine
}


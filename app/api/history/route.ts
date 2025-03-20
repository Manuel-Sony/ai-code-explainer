import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { codeExplanations } from "@/lib/db/schema"
import { auth } from "@/lib/auth"
import { eq } from "drizzle-orm"

// Get user's saved explanations
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const language = searchParams.get("language")
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    // Build query
    let query = db
      .select()
      .from(codeExplanations)
      .where(eq(codeExplanations.userId, session.user.id))
      .limit(limit)
      .offset(offset)
      .orderBy(codeExplanations.createdAt)

    // Add language filter if provided
    if (language) {
      query = query.where(eq(codeExplanations.language, language))
    }

    // Execute query
    const explanations = await query

    return NextResponse.json({ explanations })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 })
  }
}


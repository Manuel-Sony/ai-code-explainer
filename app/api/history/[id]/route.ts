import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { codeExplanations } from "@/lib/db/schema"
import { auth } from "@/lib/auth"
import { eq, and } from "drizzle-orm"

// Delete a saved explanation
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    // Delete explanation if it belongs to the user
    const result = await db
      .delete(codeExplanations)
      .where(and(eq(codeExplanations.id, id), eq(codeExplanations.userId, session.user.id)))
      .returning({ id: codeExplanations.id })

    if (result.length === 0) {
      return NextResponse.json({ error: "Explanation not found or not authorized" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Failed to delete explanation" }, { status: 500 })
  }
}

// Update a saved explanation (rename, etc.)
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const body = await request.json()
    const { title } = body

    // Update explanation if it belongs to the user
    const result = await db
      .update(codeExplanations)
      .set({ title })
      .where(and(eq(codeExplanations.id, id), eq(codeExplanations.userId, session.user.id)))
      .returning({ id: codeExplanations.id })

    if (result.length === 0) {
      return NextResponse.json({ error: "Explanation not found or not authorized" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Failed to update explanation" }, { status: 500 })
  }
}


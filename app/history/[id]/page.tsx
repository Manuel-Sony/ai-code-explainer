import { notFound } from "next/navigation"
import { db } from "@/lib/db"
import { codeExplanations } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { auth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, Share2 } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export async function generateMetadata({ params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user?.id) {
    return {
      title: "Explanation - CodeExplain",
    }
  }

  const [explanation] = await db.select().from(codeExplanations).where(eq(codeExplanations.id, params.id)).limit(1)

  if (!explanation) {
    return {
      title: "Explanation Not Found - CodeExplain",
    }
  }

  return {
    title: `${explanation.title} - CodeExplain`,
    description: `Code explanation for ${explanation.language} snippet`,
  }
}

export default async function ExplanationPage({ params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user?.id) {
    notFound()
  }

  const [explanation] = await db.select().from(codeExplanations).where(eq(codeExplanations.id, params.id)).limit(1)

  if (!explanation) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/history">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">{explanation.title}</h1>
        <Badge>{explanation.language}</Badge>
        <Badge variant="outline">{explanation.level}</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Code</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
              <code>{explanation.code}</code>
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Explanation</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: explanation.explanation.replace(/\n/g, "<br>") }} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


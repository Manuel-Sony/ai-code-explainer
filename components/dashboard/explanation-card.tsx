"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Share2, Trash2, Pencil, Eye } from "lucide-react"
import Link from "next/link"

interface ExplanationCardProps {
  id: string
  title: string
  language: string
  createdAt: string
  code: string
  onDelete: (id: string) => void
  onEdit: (id: string, title: string) => void
}

export default function ExplanationCard({
  id,
  title,
  language,
  createdAt,
  code,
  onDelete,
  onEdit,
}: ExplanationCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{title}</CardTitle>
          <Badge>{language}</Badge>
        </div>
        <CardDescription>{new Date(createdAt).toLocaleDateString()}</CardDescription>
      </CardHeader>
      <CardContent>
        <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto max-h-[150px]">
          <code>{code.substring(0, 200)}...</code>
        </pre>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/history/${id}`}>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Eye className="h-4 w-4" /> View
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" title="Download">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" title="Share">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" title="Delete" onClick={() => onDelete(id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" title="Edit Title" onClick={() => onEdit(id, title)}>
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}


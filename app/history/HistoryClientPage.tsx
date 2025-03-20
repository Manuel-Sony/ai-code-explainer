"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Share2, Trash2, Pencil } from "lucide-react"
import HistoryEmptyState from "@/components/history-empty-state"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { languageTabs, mockExplanations } from "@/lib/data"
import type { MockExplanation } from "@/lib/data/mock-explanations"

interface CodeExplanation extends MockExplanation {
  // Additional fields that might come from the API
}

export default function HistoryClientPage() {
  const [savedExplanations, setSavedExplanations] = useState<CodeExplanation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [editTitle, setEditTitle] = useState("")
  const [editId, setEditId] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchExplanations()
  }, [])

  const fetchExplanations = async () => {
    try {
      setIsLoading(true)

      // In a real app, this would be an API call
      // const response = await fetch('/api/history')
      // const data = await response.json()
      // setSavedExplanations(data.explanations || [])

      // For demo purposes, use mock data
      setTimeout(() => {
        setSavedExplanations(mockExplanations as CodeExplanation[])
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Error fetching explanations:", error)
      toast({
        title: "Error",
        description: "Failed to load your saved explanations.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/history/${id}`, {
      //   method: 'DELETE',
      // })

      // For demo purposes, just update the state
      setSavedExplanations(savedExplanations.filter((exp) => exp.id !== id))
      toast({
        title: "Success",
        description: "Explanation deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting explanation:", error)
      toast({
        title: "Error",
        description: "Failed to delete explanation.",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (id: string, currentTitle: string) => {
    setEditId(id)
    setEditTitle(currentTitle)
    setIsDialogOpen(true)
  }

  const saveTitle = async () => {
    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/history/${editId}`, {
      //   method: 'PATCH',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ title: editTitle }),
      // })

      // For demo purposes, just update the state
      setSavedExplanations(savedExplanations.map((exp) => (exp.id === editId ? { ...exp, title: editTitle } : exp)))

      setIsDialogOpen(false)
      toast({
        title: "Success",
        description: "Title updated successfully.",
      })
    } catch (error) {
      console.error("Error updating title:", error)
      toast({
        title: "Error",
        description: "Failed to update title.",
        variant: "destructive",
      })
    }
  }

  const filteredExplanations =
    activeTab === "all" ? savedExplanations : savedExplanations.filter((exp) => exp.language === activeTab)

  const hasExplanations = filteredExplanations.length > 0

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Saved Explanations</h1>
      <p className="text-muted-foreground mb-8">View, manage, and share your saved code explanations.</p>

      <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          {languageTabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab}>
          {hasExplanations ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExplanations.map((explanation) => (
                <Card key={explanation.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{explanation.title}</CardTitle>
                      <Badge>{explanation.language}</Badge>
                    </div>
                    <CardDescription>{new Date(explanation.createdAt).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto max-h-[150px]">
                      <code>{explanation.snippet}</code>
                    </pre>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(explanation.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(explanation.id, explanation.title)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <HistoryEmptyState />
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Title</DialogTitle>
            <DialogDescription>Update the title of your saved explanation.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveTitle}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}


"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Copy, Download, Share2, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import MonacoEditor from "@/components/editor/monaco-editor"
import { languages, skillLevels } from "@/lib/data"

export default function CodeExplainer() {
  const [code, setCode] = useState("")
  const [language, setLanguage] = useState("javascript")
  const [level, setLevel] = useState("intermediate")
  const [isLoading, setIsLoading] = useState(false)
  const [explanation, setExplanation] = useState("")
  const { toast } = useToast()

  const handleExplain = async () => {
    if (!code.trim()) return

    setIsLoading(true)

    try {
      // Call the API to get the explanation
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          language,
          level,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate explanation")
      }

      const data = await response.json()
      setExplanation(data.explanation)
    } catch (error) {
      console.error("Error explaining code:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate explanation. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (!explanation) return

    try {
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          language,
          level,
          save: true,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to save explanation")
      }

      toast({
        title: "Success",
        description: "Explanation saved to your history.",
      })
    } catch (error) {
      console.error("Error saving explanation:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save explanation. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleCopy = () => {
    if (!explanation) return

    navigator.clipboard.writeText(explanation)
    toast({
      title: "Copied",
      description: "Explanation copied to clipboard.",
    })
  }

  const handleDownload = () => {
    if (!explanation) return

    const element = document.createElement("a")
    const file = new Blob([explanation], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `explanation-${new Date().toISOString().slice(0, 10)}.md`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="lg:sticky lg:top-24 lg:self-start">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Explanation Level" />
                </SelectTrigger>
                <SelectContent>
                  {skillLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <MonacoEditor value={code} onChange={setCode} language={language} height="300px" />

            <Button onClick={handleExplain} disabled={!code.trim() || isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Explanation...
                </>
              ) : (
                "Explain Code"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div>
        <Tabs defaultValue="explanation" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="explanation">Explanation</TabsTrigger>
            <TabsTrigger value="comparison">Compare with Docs</TabsTrigger>
          </TabsList>
          <TabsContent value="explanation" className="mt-4">
            {explanation ? (
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-end gap-2 mb-4">
                    <Button variant="outline" size="icon" onClick={handleCopy}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleDownload}>
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleSave}>
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="prose dark:prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: explanation.replace(/\n/g, "<br>") }} />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-muted/40">
                <div className="mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-12 w-12 text-muted-foreground"
                  >
                    <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">No Explanation Yet</h3>
                <p className="text-muted-foreground mb-4">Paste your code and click "Explain Code" to get started.</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="comparison" className="mt-4">
            <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-muted/40">
              <h3 className="text-lg font-medium mb-2">Documentation Comparison</h3>
              <p className="text-muted-foreground mb-4">
                This feature compares AI explanations with official documentation.
              </p>
              <Button variant="outline">Upgrade to Pro</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


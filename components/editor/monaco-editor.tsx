"use client"

import { useRef, useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { useTheme } from "next-themes"

interface MonacoEditorProps {
  value: string
  onChange: (value: string) => void
  language: string
  height?: string
  readOnly?: boolean
}

export default function MonacoEditor({
  value,
  onChange,
  language,
  height = "300px",
  readOnly = false,
}: MonacoEditorProps) {
  const editorRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { theme } = useTheme()

  useEffect(() => {
    // Dynamically load Monaco Editor
    import("monaco-editor").then((monaco) => {
      if (!containerRef.current) return

      // Dispose previous editor instance if it exists
      if (editorRef.current) {
        editorRef.current.dispose()
      }

      // Set theme based on system/user preference
      monaco.editor.defineTheme("custom-dark", {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#1e1e2e",
        },
      })

      // Create editor
      editorRef.current = monaco.editor.create(containerRef.current, {
        value,
        language,
        theme: theme === "dark" ? "custom-dark" : "vs",
        automaticLayout: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        readOnly,
        fontSize: 14,
        lineNumbers: "on",
        wordWrap: "on",
        tabSize: 2,
      })

      // Add change event listener
      editorRef.current.onDidChangeModelContent(() => {
        onChange(editorRef.current.getValue())
      })

      setIsLoading(false)
    })

    return () => {
      // Cleanup
      if (editorRef.current) {
        editorRef.current.dispose()
      }
    }
  }, [language, theme])

  // Update editor value when prop changes
  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.getValue()) {
      editorRef.current.setValue(value)
    }
  }, [value])

  // Update theme when it changes
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.updateOptions({
        theme: theme === "dark" ? "custom-dark" : "vs",
      })
    }
  }, [theme])

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
      <div ref={containerRef} style={{ height, width: "100%" }} className="border rounded-md overflow-hidden" />
    </div>
  )
}


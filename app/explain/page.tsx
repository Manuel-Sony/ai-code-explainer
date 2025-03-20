import CodeExplainer from "@/components/code-explainer"

export const metadata = {
  title: "Code Explainer - AI-Powered Code Explanation Tool",
  description: "Paste your code and get instant AI-powered explanations",
}

export default function ExplainPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Code Explainer</h1>
      <p className="text-muted-foreground mb-8">Paste your code below and get an instant AI-powered explanation.</p>
      <CodeExplainer />
    </div>
  )
}


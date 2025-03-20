import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HistoryEmptyState() {
  return (
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
          <path d="M12 8v4l3 3" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      </div>
      <h3 className="text-lg font-medium mb-2">No Saved Explanations</h3>
      <p className="text-muted-foreground mb-4">
        You haven't saved any code explanations yet. Try explaining some code first.
      </p>
      <Link href="/explain">
        <Button>Explain Code</Button>
      </Link>
    </div>
  )
}


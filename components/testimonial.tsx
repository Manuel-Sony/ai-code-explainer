import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Image from "next/image"

interface TestimonialProps {
  quote: string
  author: string
  role: string
  avatarUrl: string
}

export default function Testimonial({ quote, author, role, avatarUrl }: TestimonialProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="h-10 w-10 rounded-full overflow-hidden">
          <Image src={avatarUrl || "/placeholder.svg"} alt={author} width={40} height={40} className="object-cover" />
        </div>
        <div>
          <h4 className="font-medium">{author}</h4>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground italic">"{quote}"</p>
      </CardContent>
    </Card>
  )
}


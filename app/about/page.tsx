import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Code, Database, Server } from "lucide-react"
import { languageCategories, techFeatures, teamMembers, apiExample } from "@/lib/data"

export const metadata = {
  title: "About - AI-Powered Code Explanation Tool",
  description: "Learn how our AI-powered code explainer works",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">About CodeExplain</h1>
        <p className="text-muted-foreground max-w-2xl">
          Our mission is to make code more accessible and understandable for everyone, from beginners to experts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground mb-4">
            CodeExplain uses advanced AI models to analyze and explain code in natural language. Our system breaks down
            complex code into understandable explanations tailored to your skill level.
          </p>
          <p className="text-muted-foreground mb-6">
            Whether you're a student learning to code, a professional developer trying to understand legacy code, or a
            team onboarding new members, CodeExplain makes code comprehension faster and easier.
          </p>
          <Link href="/explain">
            <Button className="gap-1.5">
              Try It Now <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="How CodeExplain Works"
            width={600}
            height={400}
            className="object-cover"
          />
        </div>
      </div>

      {/* How It Works - Technical */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">The Technology Behind CodeExplain</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {techFeatures.map((feature) => {
            const IconComponent =
              feature.icon === "Code"
                ? Code
                : feature.icon === "Brain"
                  ? Brain
                  : feature.icon === "Database"
                    ? Database
                    : Server

            return (
              <Card key={feature.title}>
                <CardHeader className="flex flex-row items-center gap-4">
                  <IconComponent className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Supported Languages */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Supported Languages</h2>

        <Tabs defaultValue="popular" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            {languageCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {languageCategories.map((category) => (
            <TabsContent
              key={category.id}
              value={category.id}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {category.languages.map((lang) => (
                <Card key={lang.title}>
                  <CardHeader>
                    <CardTitle>{lang.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{lang.description}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* API Documentation */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">API Documentation</h2>

        <Card>
          <CardHeader>
            <CardTitle>RESTful API</CardTitle>
            <CardDescription>Integrate code explanations into your own applications</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
              <code>{apiExample}</code>
            </pre>
            <div className="mt-4">
              <Link href="/docs/api">
                <Button variant="outline">View Full API Documentation</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Section */}
      <div>
        <h2 className="text-2xl font-bold mb-8 text-center">Our Team</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.name}>
              <CardHeader className="text-center">
                <div className="mx-auto rounded-full overflow-hidden w-24 h-24 mb-4">
                  <Image
                    src={member.avatarUrl || "/placeholder.svg"}
                    alt={member.name}
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                </div>
                <CardTitle>{member.name}</CardTitle>
                <CardDescription>{member.role}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}


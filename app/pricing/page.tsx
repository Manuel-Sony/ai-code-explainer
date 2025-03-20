import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { pricingPlans, pricingFaqs, apiExample } from "@/lib/data"

export const metadata = {
  title: "Pricing - AI-Powered Code Explanation Tool",
  description: "Choose the right plan for your code explanation needs",
}

export default function PricingPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-muted-foreground max-w-2xl">
          Choose the plan that's right for you, from free to unlimited. All plans include our core AI-powered code
          explanation features.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {pricingPlans.map((plan) => (
          <Card key={plan.id} className={`flex flex-col ${plan.popular ? "border-primary" : ""}`}>
            <CardHeader>
              {plan.popular && (
                <div className="py-1 px-3 bg-primary text-primary-foreground text-xs font-medium rounded-full w-fit mb-2">
                  Most Popular
                </div>
              )}
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">
                  {plan.currency}
                  {plan.price}
                </span>
                <span className="text-muted-foreground">/{plan.frequency}</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">{plan.buttonText}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* API Section */}
      <div className="mt-20 max-w-3xl mx-auto">
        <div className="flex flex-col items-center text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">API Access</h2>
          <p className="text-muted-foreground">
            Integrate our AI-powered code explanations directly into your applications, IDEs, or documentation.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>RESTful API</CardTitle>
            <CardDescription>Simple integration with any platform</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
              <code>{apiExample}</code>
            </pre>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View API Documentation
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* FAQ Section */}
      <div className="mt-20 max-w-3xl mx-auto">
        <div className="flex flex-col items-center text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {pricingFaqs.map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}


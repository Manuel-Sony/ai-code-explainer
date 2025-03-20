export interface PricingFeature {
  text: string
}

export interface PricingPlan {
  id: string
  name: string
  description: string
  price: number
  currency: string
  frequency: string
  features: PricingFeature[]
  buttonText: string
  popular?: boolean
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    description: "For casual users and students",
    price: 0,
    currency: "$",
    frequency: "month",
    features: [
      { text: "5 code explanations per day" },
      { text: "Basic explanation depth" },
      { text: "Support for all languages" },
      { text: "History for 7 days" },
    ],
    buttonText: "Get Started",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For professional developers",
    price: 19,
    currency: "$",
    frequency: "month",
    features: [
      { text: "Unlimited code explanations" },
      { text: "Advanced explanation depth" },
      { text: "Priority processing" },
      { text: "Unlimited history" },
      { text: "Export to PDF/Markdown" },
    ],
    buttonText: "Subscribe Now",
    popular: true,
  },
  {
    id: "team",
    name: "Team",
    description: "For teams and organizations",
    price: 49,
    currency: "$",
    frequency: "month",
    features: [
      { text: "Everything in Pro plan" },
      { text: "5 team members included" },
      { text: "Team sharing & collaboration" },
      { text: "API access" },
      { text: "SSO & advanced security" },
    ],
    buttonText: "Contact Sales",
  },
]

export const pricingFaqs = [
  {
    question: "Can I change plans at any time?",
    answer:
      "Yes, you can upgrade, downgrade, or cancel your subscription at any time. Changes take effect at the end of your current billing cycle.",
  },
  {
    question: "Is there a limit to the size of code I can explain?",
    answer:
      "Free plans have a limit of 1,000 tokens (roughly 750 words) per explanation. Pro and Team plans increase this limit to 4,000 tokens.",
  },
  {
    question: "Do you offer educational discounts?",
    answer:
      "Yes, we offer a 50% discount for verified students and educators. Contact our support team with your academic credentials to apply.",
  },
]

export const apiExample = `// Example API request
fetch('https://api.codeexplain.ai/explain', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    code: 'function hello() { return "world"; }',
    language: 'javascript',
    level: 'intermediate'
  })
})`


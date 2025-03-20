export interface NavItem {
  href: string
  label: string
}

export const mainNavItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/explain", label: "Code Explainer" },
  { href: "/history", label: "History" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
]


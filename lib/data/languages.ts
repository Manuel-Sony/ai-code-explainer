export interface Language {
  value: string
  label: string
}

export const languages: Language[] = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "cpp", label: "C++" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
]

export const languageTabs = [
  { value: "all", label: "All" },
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "other", label: "Other" },
]

// Language categories for the About page
export const languageCategories = [
  {
    id: "popular",
    label: "Popular",
    languages: [
      { title: "JavaScript", description: "ES6+, Node.js, TypeScript" },
      { title: "Python", description: "Python 3.x, Django, Flask" },
      { title: "Java", description: "Java 8+, Spring, Android" },
      { title: "C#", description: ".NET Core, ASP.NET" },
    ],
  },
  {
    id: "web",
    label: "Web Development",
    languages: [
      { title: "HTML/CSS", description: "HTML5, CSS3, SASS" },
      { title: "React", description: "Hooks, Context, Redux" },
      { title: "Vue", description: "Vue 2/3, Vuex, Composition API" },
      { title: "PHP", description: "PHP 7+, Laravel, WordPress" },
    ],
  },
  {
    id: "data",
    label: "Data Science",
    languages: [
      { title: "R", description: "Data analysis, statistics" },
      { title: "SQL", description: "MySQL, PostgreSQL, SQLite" },
      { title: "Julia", description: "Scientific computing" },
      { title: "MATLAB", description: "Numerical computing" },
    ],
  },
]


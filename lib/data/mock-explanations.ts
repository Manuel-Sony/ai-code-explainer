"use client"

export interface MockExplanation {
  id: string
  title: string
  language: string
  createdAt: string
  snippet: string
  level?: string
  explanation?: string
}

export const mockExplanations: MockExplanation[] = [
  {
    id: "1",
    title: "React useEffect Hook",
    language: "javascript",
    createdAt: "2023-11-10T12:00:00Z",
    snippet:
      "useEffect(() => {\n  // This runs after every render\n  return () => {\n    // This runs before the component unmounts\n  };\n}, []);",
    level: "intermediate",
    explanation:
      "The useEffect Hook lets you perform side effects in function components. By default, it runs after every render, but you can optimize it to run only when certain values change by providing a dependency array. In this example, the empty dependency array means the effect will only run once after the initial render (similar to componentDidMount). The function returned inside useEffect will run when the component unmounts (similar to componentWillUnmount).",
  },
  {
    id: "2",
    title: "Python List Comprehension",
    language: "python",
    createdAt: "2023-11-09T15:30:00Z",
    snippet: "numbers = [1, 2, 3, 4, 5]\nsquares = [x**2 for x in numbers if x % 2 == 0]",
    level: "beginner",
    explanation:
      "This Python code demonstrates list comprehension, which is a concise way to create lists. The code creates a list called 'numbers' with values 1 through 5. Then it creates a new list called 'squares' that contains the square of each even number from the 'numbers' list. The condition 'if x % 2 == 0' filters for even numbers (numbers that when divided by 2 have a remainder of 0). So 'squares' will contain [4, 16] which are the squares of 2 and 4.",
  },
  {
    id: "3",
    title: "Java Stream API",
    language: "java",
    createdAt: "2023-11-08T09:45:00Z",
    snippet:
      "List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);\nList<Integer> evenSquares = numbers.stream()\n    .filter(x -> x % 2 == 0)\n    .map(x -> x * x)\n    .collect(Collectors.toList());",
    level: "advanced",
    explanation:
      "This Java code demonstrates the Stream API introduced in Java 8. It creates a list of integers from 1 to 5, then uses a stream to process this data in a functional style. The stream operation has three parts: 1) filter - keeps only even numbers, 2) map - transforms each number to its square, and 3) collect - gathers the results into a new list. The result is a list containing [4, 16], which are the squares of the even numbers 2 and 4. This approach is more declarative and often more readable than traditional imperative code.",
  },
]


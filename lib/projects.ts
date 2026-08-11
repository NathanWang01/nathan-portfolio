export interface Project {
  title: string
  description: string
  tags: string[]
  github: string | null
  demo: string | null
  image?: string
  comingSoon?: boolean
}

export const projects: Project[] = [
  {
    title: 'Focus Timer',
    description: 'A Pomodoro-style productivity timer with focus/break/long-break modes, session tracking, a built-in to-do list, and a light/dark theme toggle.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/NathanWang01/focus-timer',
    demo: 'https://focus-timer-tan-two.vercel.app',
    image: '/projects/focus-timer.png',
  },
  {
    title: 'Expense Tracker',
    description: 'A personal finance tracker for logging income and expenses by category, with a live spending breakdown, donut chart visualization, and running balance.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/NathanWang01/expense-tracker',
    demo: 'https://expense-tracker-three-alpha-57.vercel.app',
    image: '/projects/expense-tracker.png',
  },
  {
    title: 'Color Palette Generator',
    description: 'A creative tool for generating color palettes from any base color using 5 harmony types, with a dynamic background preview, saved palettes, copy-as-code export, and a live UI mockup.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/NathanWang01/color-palette-generator',
    demo: 'https://color-palette-generator-topaz.vercel.app',
    image: '/projects/color-palette-generator.png',
  },
  {
    title: 'Church Site',
    description: 'A clean, informational website for a church community, built with HTML and CSS.',
    tags: ['HTML', 'CSS'],
    github: 'https://github.com/NathanWang01/church.site',
    demo: 'https://covenant-reformed-church.vercel.app',
    image: '/projects/church-site.png',
  },
]

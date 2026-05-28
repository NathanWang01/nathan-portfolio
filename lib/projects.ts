export interface Project {
  title: string
  description: string
  tags: string[]
  github: string | null
  demo: string | null
  comingSoon?: boolean
}

export const projects: Project[] = [
  {
    title: 'My Website',
    description: 'A personal website built with HTML and CSS, showcasing early frontend development work.',
    tags: ['HTML', 'CSS'],
    github: 'https://github.com/NathanWang01/my-website',
    demo: null,
  },
  {
    title: 'Church Site',
    description: 'A clean, informational website for a church community, built with HTML and CSS.',
    tags: ['HTML', 'CSS'],
    github: 'https://github.com/NathanWang01/church.site',
    demo: null,
  },
  {
    title: 'Coming Soon',
    description: 'More projects are in the works. Stay tuned!',
    tags: [],
    github: null,
    demo: null,
    comingSoon: true,
  },
]

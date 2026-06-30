import { IconType } from 'react-icons'
import { SiPython, SiMysql, SiJavascript, SiHtml5, SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiVscodium, SiGit, SiGithub } from 'react-icons/si'
import { DiJava } from 'react-icons/di'

export const skillIcons: Record<string, IconType> = {
  'Java': DiJava,
  'Python': SiPython,
  'SQL': SiMysql,
  'JavaScript': SiJavascript,
  'HTML/CSS': SiHtml5,
  'React': SiReact,
  'Next.js': SiNextdotjs,
  'TypeScript': SiTypescript,
  'Tailwind CSS': SiTailwindcss,
  'VS Code': SiVscodium,
  'Git': SiGit,
  'GitHub': SiGithub,
}

'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { projects } from '@/lib/projects'

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: false, margin: '-15%' })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80, scale: 0.96 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 80, scale: 0.96 }}
      transition={{ duration: 0.75, ease: 'easeOut', delay: index * 0.05 }}
      className={`min-h-[70vh] bg-surface border border-white/10 rounded-2xl p-8 flex flex-col gap-6
        hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5
        transition-colors duration-300 ${project.comingSoon ? 'opacity-50' : ''}`}
    >
      <div className="h-52 md:flex-1 md:h-auto md:min-h-[240px] rounded-xl overflow-hidden bg-white/5">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="w-full h-full object-cover object-top"
          />
        ) : project.comingSoon ? (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-text-muted font-heading text-lg">Coming Soon</span>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-text-muted text-sm">Preview coming soon</span>
          </div>
        )}
      </div>

      <div>
        <h3 className="font-heading text-2xl font-bold text-text-primary">{project.title}</h3>
        <p className="text-text-muted mt-3 text-base leading-relaxed">{project.description}</p>
      </div>

      {project.tags.length > 0 && (
        <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
          {project.tags.map((tag) => (
            <li key={tag}>
              <span className="text-xs bg-accent/10 text-accent px-3 py-1.5 rounded-md font-medium block">
                {tag}
              </span>
            </li>
          ))}
        </ul>
      )}

      {!project.comingSoon && (
        <div className="flex gap-6 pt-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-text-muted hover:text-accent transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            >
              <FiGithub size={16} /> GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-text-muted hover:text-accent transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            >
              <FiExternalLink size={16} /> Live Demo
            </a>
          )}
        </div>
      )}
    </motion.div>
  )
}

export default function Projects() {
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: false, margin: '-100px' })

  return (
    <section id="projects" aria-label="Projects" className="py-24 px-6 bg-surface/20">
      <div className="max-w-3xl mx-auto">
        <div ref={headerRef}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="font-heading text-accent font-semibold tracking-widest uppercase text-sm mb-3"
          >
            My Projects
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-heading text-5xl md:text-6xl font-bold text-text-primary mb-16"
          >
            Things I&apos;ve <span className="text-accent">Built</span>
          </motion.h2>
        </div>

        <div className="flex flex-col gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { projects } from '@/lib/projects'

export default function Projects() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" aria-label="Projects" className="py-24 px-6 bg-surface/20" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-16"
        >
          My <span className="text-accent">Projects</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`bg-surface border border-white/10 rounded-2xl p-6 flex flex-col gap-4
                hover:border-accent/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5
                transition-all duration-300 ${project.comingSoon ? 'opacity-50' : ''}`}
            >
              <div className="h-40 rounded-xl bg-white/5 flex items-center justify-center">
                {project.comingSoon ? (
                  <span className="text-text-muted font-heading text-lg">Coming Soon</span>
                ) : (
                  <span className="text-text-muted text-sm" aria-hidden="true">Preview</span>
                )}
              </div>

              <div>
                <h3 className="font-heading text-xl font-bold text-text-primary">{project.title}</h3>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">{project.description}</p>
              </div>

              {project.tags.length > 0 && (
                <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
                  {project.tags.map((tag) => (
                    <li key={tag}>
                      <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-md font-medium block">
                        {tag}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {!project.comingSoon && (
                <div className="flex gap-4 mt-auto pt-2">
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
          ))}
        </div>
      </div>
    </section>
  )
}

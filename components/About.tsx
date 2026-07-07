'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skills } from '@/lib/skills'
import { skillIcons } from '@/lib/skillIcons'

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })

  return (
    <section id="about" aria-label="About" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="font-heading text-accent font-semibold tracking-widest uppercase text-sm mb-3"
        >
          About Me
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-16"
        >
          Who I <span className="text-accent">Am</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <p className="text-text-muted text-lg leading-relaxed">
              I&apos;m Nathan Wang, a frontend developer from the US with a love for clean UI and expressive code.
              Whether it&apos;s a smooth animation or a responsive layout, I care deeply about the details
              that make a web experience feel right.
            </p>
            <p className="text-text-muted text-lg leading-relaxed">
              Outside of coding, you&apos;ll find me experimenting in the kitchen or losing track of time in a good game.
              I bring that same creative energy and attention to detail into everything I build.
            </p>
          </motion.div>

          <div className="flex flex-col gap-8">
            {Object.entries(skills).map(([category, items], catIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.6, delay: 0.3 + catIndex * 0.1 }}
              >
                <h3 className="text-text-muted uppercase text-xs tracking-widest font-medium mb-4">
                  {category}
                </h3>
                <ul className="flex flex-wrap gap-4 list-none p-0 m-0">
                  {items.map((skill, i) => {
                    const Icon = skillIcons[skill]
                    return (
                      <li key={skill}>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.3, delay: 0.4 + catIndex * 0.1 + i * 0.05 }}
                          className="flex flex-col items-center gap-1.5 group"
                          title={skill}
                        >
                          {Icon ? (
                            <Icon
                              size={36}
                              className="text-accent/70 group-hover:text-accent transition-colors duration-200"
                              aria-label={skill}
                            />
                          ) : (
                            <span className="w-9 h-9 flex items-center justify-center bg-surface border border-white/10 rounded-lg text-xs text-text-muted font-medium">
                              {skill.slice(0, 2)}
                            </span>
                          )}
                          <span className="text-text-muted text-xs group-hover:text-accent transition-colors duration-200">
                            {skill}
                          </span>
                        </motion.div>
                      </li>
                    )
                  })}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

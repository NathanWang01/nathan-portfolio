'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skills } from '@/lib/skills'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-16"
        >
          About <span className="text-accent">Me</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-text-muted text-lg leading-relaxed"
          >
            I&apos;m Nathan Wang, a developer from the US with a love for clean UI and expressive code.
            Whether it&apos;s a smooth animation or a responsive layout, I care deeply about the details
            that make a web experience feel right. I build with React, Next.js, and modern web technologies.
          </motion.p>

          <div className="flex flex-col gap-8">
            {Object.entries(skills).map(([category, items], catIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + catIndex * 0.1 }}
              >
                <h3 className="text-text-muted uppercase text-xs tracking-widest font-medium mb-3">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.4 + catIndex * 0.1 + i * 0.05 }}
                      className="bg-surface border border-white/10 text-text-primary px-3 py-1.5 rounded-lg text-sm font-medium hover:border-accent/50 hover:text-accent transition-colors duration-200"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

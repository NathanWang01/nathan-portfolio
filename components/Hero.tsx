'use client'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import Image from 'next/image'
import { FiGithub, FiLinkedin } from 'react-icons/fi'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Hero() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="min-h-screen flex items-center px-6 pt-24 pb-16">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          <motion.p variants={itemVariants} className="font-heading text-accent font-semibold tracking-widest uppercase text-sm">
            Hi, I&apos;m
          </motion.p>

          <motion.h1 variants={itemVariants} className="font-heading text-6xl md:text-8xl font-bold text-text-primary leading-tight">
            Nathan <span className="text-accent">Wang</span>
          </motion.h1>

          <motion.div variants={itemVariants} className="text-2xl md:text-3xl font-heading text-text-muted h-10">
            <TypeAnimation
              sequence={['Frontend Developer', 2000, 'React Enthusiast', 2000, 'UI/UX Lover', 2000]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </motion.div>

          <motion.p variants={itemVariants} className="text-text-muted text-lg leading-relaxed max-w-lg">
            I build interactive, responsive web experiences with React — bringing designs to life through clean code and smooth animations.
          </motion.p>

          <motion.div variants={itemVariants} className="flex gap-4 flex-wrap">
            <button
              onClick={() => scrollTo('#projects')}
              className="bg-accent text-white px-8 py-4 rounded-full font-medium hover:bg-accent/90 transition-colors duration-200"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollTo('#contact')}
              className="border border-accent text-accent px-8 py-4 rounded-full font-medium hover:bg-accent/10 transition-colors duration-200"
            >
              Contact Me
            </button>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-5">
            <a
              href="https://github.com/NathanWang01"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-text-muted hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            >
              <FiGithub size={22} />
            </a>
            <a
              href="https://www.linkedin.com/in/nathan-wang-238862243/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-text-muted hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            >
              <FiLinkedin size={22} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          className="flex justify-center"
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            <div className="absolute inset-0 rounded-full bg-accent/20 blur-3xl animate-pulse z-0" />
            <Image
              src="/avatar.jpg"
              alt="Nathan Wang — Frontend Developer"
              fill
              sizes="(max-width: 768px) 288px, 384px"
              className="rounded-full object-cover z-10 border-2 border-accent/30"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

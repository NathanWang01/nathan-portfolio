'use client'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    const data = new FormData(e.currentTarget)
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        e.currentTarget.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" aria-label="Contact" className="py-24 px-6" ref={ref}>
      <div className="max-w-2xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="font-heading text-accent font-semibold tracking-widest uppercase text-sm mb-3"
        >
          Contact
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-4"
        >
          Let&apos;s Work <span className="text-accent">Together</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-text-muted text-lg mb-12"
        >
          Have a project in mind or just want to say hi? I&apos;d love to hear from you.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 text-left"
        >
          <label htmlFor="contact-name" className="sr-only">Your Name</label>
          <input id="contact-name" type="text" name="name" placeholder="Your Name" required
            className="bg-surface border border-white/10 rounded-xl px-5 py-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors" />
          <label htmlFor="contact-email" className="sr-only">Your Email</label>
          <input id="contact-email" type="email" name="email" placeholder="Your Email" required
            className="bg-surface border border-white/10 rounded-xl px-5 py-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors" />
          <label htmlFor="contact-message" className="sr-only">Your Message</label>
          <textarea id="contact-message" name="message" placeholder="Your Message" required rows={6}
            className="bg-surface border border-white/10 rounded-xl px-5 py-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors resize-none" />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="bg-accent text-white font-medium py-4 px-8 rounded-xl hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/25 transition-all duration-200 disabled:opacity-60"
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
          {status === 'success' && (
            <p role="status" className="text-green-400 text-center text-sm">Message sent! I&apos;ll get back to you soon.</p>
          )}
          {status === 'error' && (
            <p role="alert" className="text-red-400 text-center text-sm">Something went wrong. Please try again.</p>
          )}
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex items-center justify-center gap-6 mt-12 flex-wrap"
        >
          <a
            href="mailto:nathanwang555@gmail.com"
            className="flex items-center gap-2 text-text-muted hover:text-accent transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          >
            <FiMail size={18} aria-hidden="true" /> nathanwang555@gmail.com
          </a>
          <a
            href="https://github.com/NathanWang01"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-text-muted hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          >
            <FiGithub size={20} aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/nathan-wang-238862243/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-text-muted hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          >
            <FiLinkedin size={20} aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

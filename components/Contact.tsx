'use client'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const data = new FormData(form)
    try {
      const res = await fetch('https://formspree.io/f/mwleqgkr', {
        method: 'POST',
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
        }),
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
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
          className="font-heading text-5xl md:text-6xl font-bold text-text-primary mb-4"
        >
          Let&apos;s Work <span className="text-accent">Together</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-text-muted text-xl md:text-2xl mb-12"
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

      </div>
    </section>
  )
}

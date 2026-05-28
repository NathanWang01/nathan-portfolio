import { FiGithub, FiLinkedin } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="border-t border-accent/20 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-text-muted text-sm">
          Designed & Built by <span className="text-accent font-medium">Nathan Wang</span> © 2026
        </p>
        <div className="flex gap-5">
          <a
            href="https://github.com/NathanWang01"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-text-muted hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          >
            <FiGithub size={18} aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/nathan-wang-238862243/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-text-muted hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          >
            <FiLinkedin size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}

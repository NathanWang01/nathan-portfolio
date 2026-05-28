import { render, screen } from '@testing-library/react'
import Navbar from '@/components/Navbar'

jest.mock('framer-motion', () => ({
  motion: {
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

describe('Navbar', () => {
  it('renders the name and nav links', () => {
    render(<Navbar />)
    expect(screen.getByText('Nathan')).toBeInTheDocument()
    expect(screen.getByText('Wang')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })
})

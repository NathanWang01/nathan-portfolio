import { render, screen } from '@testing-library/react'
import Projects from '@/components/Projects'

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
  },
  useInView: () => true,
}))

describe('Projects', () => {
  it('renders section heading and all project cards', () => {
    render(<Projects />)
    expect(screen.getByRole('heading', { name: /My Projects/i })).toBeInTheDocument()
    expect(screen.getByText('My Website')).toBeInTheDocument()
    expect(screen.getByText('Church Site')).toBeInTheDocument()
    expect(screen.getAllByText('Coming Soon').length).toBeGreaterThan(0)
  })
})

import { render, screen } from '@testing-library/react'
import Contact from '@/components/Contact'

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
  },
  useInView: () => true,
}))

describe('Contact', () => {
  it('renders form fields and contact info', () => {
    render(<Contact />)
    expect(screen.getByPlaceholderText('Your Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Your Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Your Message')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
    expect(screen.getByText('nathanwang555@gmail.com')).toBeInTheDocument()
  })
})

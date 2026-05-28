import { render, screen } from '@testing-library/react'
import Hero from '@/components/Hero'

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
}))

jest.mock('react-type-animation', () => ({
  TypeAnimation: () => <span>Frontend Developer</span>,
}))

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt, ...props }: any) => <img alt={alt} {...props} />,
}))

describe('Hero', () => {
  it('renders name, bio, CTA buttons, and social links', () => {
    render(<Hero />)
    expect(screen.getByText('Nathan')).toBeInTheDocument()
    expect(screen.getByText('Wang')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /View My Work/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Contact Me/i })).toBeInTheDocument()
    expect(screen.getByAltText(/Nathan Wang/i)).toBeInTheDocument()
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument()
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByText(/I build interactive, responsive web experiences/i)).toBeInTheDocument()
  })
})

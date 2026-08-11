import type { Metadata } from 'next'
import { GFS_Didot, Fraunces } from 'next/font/google'
import './globals.css'

const gfsDidot = GFS_Didot({
  subsets: ['latin'],
  variable: '--font-didot',
  weight: '400',
})
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  weight: ['700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Nathan Wang — Frontend Developer',
  description: 'I build interactive, responsive web experiences with React — bringing designs to life through clean code and smooth animations.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${gfsDidot.variable} ${fraunces.variable}`}>
      <body className="bg-background text-text-primary antialiased">
        {children}
      </body>
    </html>
  )
}

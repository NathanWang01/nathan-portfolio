import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import GeometricBackground from '@/components/GeometricBackground'

export default function Home() {
  return (
    <main className="bg-background text-text-primary min-h-screen relative">
      <GeometricBackground />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </main>
  )
}

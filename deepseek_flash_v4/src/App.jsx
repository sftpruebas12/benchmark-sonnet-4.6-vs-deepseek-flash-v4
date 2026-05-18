import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import MarqueeBar from './components/MarqueeBar'
import Features from './components/Features'
import Workflow from './components/Workflow'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Footer from './components/Footer'
import ToastSocialProof from './components/ToastSocialProof'
import CursorRing from './components/CursorRing'
import SectionDivider from './components/SectionDivider'
import useScrollProgress from './hooks/useScrollProgress'

export default function App() {
  const [showTop, setShowTop] = useState(false)
  const progress = useScrollProgress()

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-neural-950 relative">
      <div className="fixed inset-0 bg-noise pointer-events-none z-0" />

      <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <CursorRing />
      <ToastSocialProof />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Stats />
          <MarqueeBar />
          <Features />
          <SectionDivider />
          <Workflow />
          <SectionDivider />
          <Testimonials />
          <Pricing />
          <FAQ />
          <CTA />
        </main>
        <Footer />
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 z-50 w-11 h-11 rounded-xl glass flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all duration-500 ${
          showTop ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  )
}

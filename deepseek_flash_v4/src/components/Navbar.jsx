import { useState, useEffect, useRef } from 'react'
import useActiveSection from '../hooks/useActiveSection'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const activeSection = useActiveSection()
  const linksRef = useRef({})
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0, opacity: 0 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!activeSection) return
    const el = linksRef.current[activeSection]
    if (!el) return
    const { offsetLeft, offsetWidth } = el
    setIndicatorStyle({ width: offsetWidth, left: offsetLeft, opacity: 1 })
  }, [activeSection])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-neural-950/80 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-indigo-500/30">
              N
            </div>
            <span className="text-lg font-semibold tracking-tight">NeuralFlow</span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            <div className="relative flex items-center">
              {navLinks.map((link) => {
                const sectionId = link.href.slice(1)
                const isActive = activeSection === sectionId
                return (
                  <a
                    key={link.href}
                    ref={(el) => { linksRef.current[sectionId] = el }}
                    href={link.href}
                    className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 relative ${
                      isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </a>
                )
              })}
              <span
                className="absolute bottom-0 h-0.5 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 transition-all duration-300 ease-out"
                style={{
                  width: indicatorStyle.width,
                  left: indicatorStyle.left,
                  opacity: indicatorStyle.opacity,
                }}
              />
            </div>
            <div className="w-px h-6 bg-white/[0.06] mx-3" />
            <a
              href="#"
              className="group inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium hover:from-indigo-400 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-[1.02]"
            >
              Get Started
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden relative w-10 h-10 rounded-xl glass flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span
                className={`block h-[2px] bg-zinc-300 rounded-full transition-all duration-300 origin-center ${
                  open ? 'rotate-45 translate-y-[3.5px]' : ''
                }`}
              />
              <span
                className={`block h-[2px] bg-zinc-300 rounded-full transition-all duration-300 ${
                  open ? 'opacity-0 scale-x-0' : ''
                }`}
              />
              <span
                className={`block h-[2px] bg-zinc-300 rounded-full transition-all duration-300 origin-center ${
                  open ? '-rotate-45 -translate-y-[3.5px]' : ''
                }`}
              />
            </div>
          </button>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-400 ease-in-out ${
            open ? 'max-h-80 opacity-100 pb-6' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-2 pt-2 border-t border-white/[0.06]">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm text-zinc-400 hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/[0.04] transition-all duration-200"
                style={{
                  transitionDelay: open ? `${i * 0.05}s` : '0s',
                  opacity: open ? 1 : 0,
                  transform: open ? 'translateY(0)' : 'translateY(-8px)',
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#"
              className="mt-2 inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium shadow-lg shadow-indigo-500/20"
              onClick={() => setOpen(false)}
            >
              Get Started
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}

import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  Zap, Brain, Network, BarChart3, Shield, RefreshCw,
  ArrowRight, Check, ChevronDown, Menu, X, Play,
  Star, TrendingUp, Database, Activity, Globe, Bot,
  Users, Clock, ChevronUp, Cpu,
} from 'lucide-react'

/* ════════════════════════════════════════════════════════════════════════════
   CONSTANTS
════════════════════════════════════════════════════════════════════════════ */

const SECTION_IDS = ['features', 'workflow', 'pricing', 'faq']

const SOCIAL_PROOFS = [
  { name: 'Alex M.',     company: 'TechCorp',      action: 'just signed up for Growth' },
  { name: 'Sarah K.',    company: 'FinanceHub',    action: 'started a free trial' },
  { name: 'Team Volta',  company: 'Volta Logistics', action: 'deployed 24 new agents' },
  { name: 'Mike R.',     company: 'DataPipeline',  action: 'automated their first workflow' },
  { name: 'Emma L.',     company: 'Apex AI',       action: 'upgraded to Enterprise' },
]

/* ════════════════════════════════════════════════════════════════════════════
   HOOKS
════════════════════════════════════════════════════════════════════════════ */

function useReveal(threshold = 0.14) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

function useActiveSection(ids) {
  const [active, setActive] = useState('')
  useEffect(() => {
    const observers = ids.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.35 },
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [ids])
  return active
}

function useAnimatedCounter(to, { duration = 1600, decimals = 0 } = {}) {
  const [val, setVal] = useState(0)
  const [ref, visible] = useReveal(0.3)
  const started = useRef(false)
  useEffect(() => {
    if (!visible || started.current) return
    started.current = true
    const t0 = performance.now()
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1)
      const eased = 1 - (1 - p) ** 3
      const cur = to * eased
      setVal(decimals > 0 ? parseFloat(cur.toFixed(decimals)) : Math.floor(cur))
      if (p < 1) requestAnimationFrame(tick)
      else setVal(to)
    }
    requestAnimationFrame(tick)
  }, [visible, to, duration, decimals])
  return [ref, val]
}

function useParallax(speed = 0.12) {
  const [y, setY] = useState(0)
  useEffect(() => {
    const h = () => setY(window.scrollY * speed)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [speed])
  return y
}

/* ════════════════════════════════════════════════════════════════════════════
   PRIMITIVES
════════════════════════════════════════════════════════════════════════════ */

function cn(...cls) { return cls.filter(Boolean).join(' ') }

function GradientText({ children, className }) {
  return (
    <span className={cn('bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent', className)}>
      {children}
    </span>
  )
}

function Chip({ children }) {
  return (
    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-300 text-xs font-semibold tracking-wider uppercase select-none">
      <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
      {children}
    </span>
  )
}

function SectionLabel({ children }) {
  return <div className="flex justify-center mb-5"><Chip>{children}</Chip></div>
}

/* GlowCard — Stripe-style radial gradient follows the mouse */
function GlowCard({ children, className, glowColor = 'rgba(139,92,246,0.13)' }) {
  const ref = useRef(null)
  const spotRef = useRef(null)

  const handleMove = useCallback((e) => {
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    if (spotRef.current) {
      spotRef.current.style.background = `radial-gradient(380px circle at ${x}px ${y}px, ${glowColor}, transparent 70%)`
    }
  }, [glowColor])

  return (
    <div
      ref={ref}
      className={cn('glow-card relative overflow-hidden', className)}
      onMouseMove={handleMove}
    >
      <div ref={spotRef} className="glow-spot" />
      {children}
    </div>
  )
}

function SectionDivider() {
  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 my-2">
      <svg viewBox="0 0 1200 8" className="w-full h-2 overflow-visible" preserveAspectRatio="none">
        <defs>
          <linearGradient id="div-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="transparent" />
            <stop offset="30%"  stopColor="rgba(139,92,246,0.25)" />
            <stop offset="50%"  stopColor="rgba(167,139,250,0.4)" />
            <stop offset="70%"  stopColor="rgba(139,92,246,0.25)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <line x1="0" y1="4" x2="1200" y2="4" stroke="url(#div-grad)" strokeWidth="1" />
        <circle cx="600" cy="4" r="3" fill="rgba(139,92,246,0.6)" />
        <circle cx="600" cy="4" r="6" fill="rgba(139,92,246,0.15)" />
      </svg>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   GLOBAL UI OVERLAYS
════════════════════════════════════════════════════════════════════════════ */

function NoiseOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] opacity-[0.028] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
      }}
    />
  )
}

function ScrollProgressBar() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const h = () => {
      const el = document.documentElement
      setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100)
    }
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  return (
    <div
      className="fixed top-0 left-0 z-[60] h-[2px] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 transition-[width] duration-75 origin-left"
      style={{ width: `${pct}%` }}
    />
  )
}

function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const h = () => setShow(window.scrollY > 500)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={cn(
        'fixed bottom-7 right-6 z-50 w-10 h-10 rounded-full bg-[#0e0e1e]/90 backdrop-blur-xl border border-white/[0.1] flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all duration-300 shadow-xl',
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none',
      )}
    >
      <ChevronUp className="w-4 h-4" />
    </button>
  )
}

function CursorRing() {
  const [pos, setPos]     = useState({ x: -200, y: -200 })
  const [big, setBig]     = useState(false)
  const hasHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches

  useEffect(() => {
    if (!hasHover) return
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY })
    const onOver = (e) => setBig(!!e.target.closest('a, button, [role="button"]'))
    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
    }
  }, [hasHover])

  if (!hasHover) return null

  const size = big ? 40 : 22
  return (
    <div
      className="cursor-ring"
      style={{
        left: pos.x - size / 2,
        top:  pos.y - size / 2,
        width:  size,
        height: size,
        borderColor: big ? 'rgba(139,92,246,0.7)' : 'rgba(255,255,255,0.2)',
        backgroundColor: big ? 'rgba(139,92,246,0.06)' : 'transparent',
      }}
    />
  )
}

function ToastSocialProof() {
  const [idx,     setIdx]     = useState(0)
  const [phase,   setPhase]   = useState('hidden') // hidden | enter | visible | exit

  useEffect(() => {
    const show = () => {
      setIdx((i) => (i + 1) % SOCIAL_PROOFS.length)
      setPhase('enter')
      const t1 = setTimeout(() => setPhase('visible'), 10)
      const t2 = setTimeout(() => setPhase('exit'), 3800)
      const t3 = setTimeout(() => setPhase('hidden'), 4200)
      return [t1, t2, t3]
    }

    let timers = []
    const first = setTimeout(() => { timers = show() }, 4000)
    const interval = setInterval(() => { timers = show() }, 11000)

    return () => {
      clearTimeout(first)
      clearInterval(interval)
      timers.forEach(clearTimeout)
    }
  }, [])

  const proof = SOCIAL_PROOFS[idx]
  if (phase === 'hidden') return null

  return (
    <div
      className={cn(
        'fixed bottom-7 left-5 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#0d0d1e]/90 backdrop-blur-2xl border border-white/[0.09] shadow-2xl max-w-[268px]',
        phase === 'enter'   && 'toast-enter',
        phase === 'exit'    && 'toast-exit',
        phase === 'visible' && 'opacity-100',
      )}
    >
      <div
        className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br from-violet-500 to-cyan-500"
      >
        {proof.name[0]}
      </div>
      <div>
        <div className="text-[12px] font-semibold text-white leading-tight">{proof.name}</div>
        <div className="text-[11px] text-slate-400 mt-0.5 leading-tight">{proof.action}</div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   NAVBAR
════════════════════════════════════════════════════════════════════════════ */

const NAV_LINKS = [
  { label: 'Product',      href: '#features' , id: 'features'  },
  { label: 'How it works', href: '#workflow'  , id: 'workflow'  },
  { label: 'Pricing',      href: '#pricing'   , id: 'pricing'   },
  { label: 'FAQ',          href: '#faq'       , id: 'faq'       },
]

function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const activeSection = useActiveSection(SECTION_IDS)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <header className={cn(
      'fixed inset-x-0 top-0 z-50 transition-all duration-500',
      scrolled ? 'bg-[#06060f]/80 backdrop-blur-2xl border-b border-white/[0.07] shadow-xl shadow-black/20' : 'bg-transparent',
    )}>
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group flex-shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-shadow">
            <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-white text-[17px] tracking-tight">NeuralFlow</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ label, href, id }) => (
            <a
              key={id}
              href={href}
              className="relative text-sm font-medium transition-colors duration-200 py-1 group"
            >
              <span className={cn(
                'transition-colors duration-200',
                activeSection === id ? 'text-white' : 'text-slate-400 group-hover:text-white',
              )}>
                {label}
              </span>
              {/* Animated underline */}
              <span className={cn(
                'absolute -bottom-0.5 left-0 right-0 h-px bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-300 origin-left',
                activeSection === id ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-60 group-hover:scale-x-100',
              )} />
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a href="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Sign in</a>
          <a href="#" className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/30 hover:-translate-y-px">
            Get Started
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/[0.07] bg-[#06060f]/95 backdrop-blur-2xl px-5 py-5 space-y-1">
          {NAV_LINKS.map(({ label, href, id }) => (
            <a
              key={id}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'block px-4 py-3 rounded-xl text-sm font-medium transition-all',
                activeSection === id ? 'text-white bg-white/[0.06]' : 'text-slate-300 hover:text-white hover:bg-white/[0.04]',
              )}
            >
              {label}
            </a>
          ))}
          <div className="pt-4 mt-2 border-t border-white/[0.07] flex flex-col gap-3">
            <a href="#" className="block text-center py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.04] transition-all text-sm font-medium">Sign in</a>
            <a href="#" className="block text-center py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-all">Get Started</a>
          </div>
        </div>
      )}
    </header>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   HERO
════════════════════════════════════════════════════════════════════════════ */

function StatusDot({ status }) {
  const map = { running: 'bg-violet-400 animate-pulse', complete: 'bg-emerald-400', queued: 'bg-slate-600' }
  return <span className={cn('w-2 h-2 rounded-full flex-shrink-0', map[status] ?? map.queued)} />
}

function AgentDashboard() {
  const tiltRef = useRef(null)

  const onMove = useCallback((e) => {
    const rect = tiltRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 10
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -10
    tiltRef.current.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateZ(4px)`
  }, [])

  const onLeave = useCallback(() => {
    tiltRef.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)'
  }, [])

  const agents = [
    { name: 'Data Ingestion Agent',  status: 'complete', pct: 100, t: '1.2s' },
    { name: 'Analysis Engine',       status: 'running',  pct: 68,  t: '3.1s' },
    { name: 'Report Generator',      status: 'running',  pct: 31,  t: '—'   },
    { name: 'Notification Dispatch', status: 'queued',   pct: 0,   t: '—'   },
  ]

  return (
    <div
      ref={tiltRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative w-full max-w-[390px] mx-auto lg:mx-0"
      style={{ transition: 'transform 0.12s ease-out', willChange: 'transform', transformStyle: 'preserve-3d' }}
    >
      {/* Ambient glow */}
      <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-violet-600/25 via-fuchsia-600/10 to-cyan-600/15 blur-3xl -z-10" />

      <div className="relative bg-[#0b0b17]/90 backdrop-blur-2xl border border-white/[0.09] rounded-2xl p-6 shadow-2xl shadow-black/50">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-semibold text-white">Agent Network</span>
          </div>
          <span className="px-2 py-0.5 rounded-md text-[11px] font-bold tracking-wider bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">LIVE</span>
        </div>

        {/* Agents */}
        <div className="space-y-2.5">
          {agents.map(({ name, status, pct, t }) => (
            <div key={name} className="flex flex-col gap-1.5 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-white/[0.1] transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <StatusDot status={status} />
                  <span className="text-xs font-medium text-slate-200">{name}</span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">{t}</span>
              </div>
              <div className="w-full h-1 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${pct}%`,
                    background: status === 'complete' ? '#34d399' : status === 'running' ? 'linear-gradient(90deg,#8b5cf6,#06b6d4)' : 'transparent',
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-5 pt-4 border-t border-white/[0.06] grid grid-cols-3 gap-3 text-center">
          {[{ v: '1,247', l: 'Tasks/hr' }, { v: '99.9%', l: 'Uptime' }, { v: '<5ms', l: 'P99 lat' }].map(({ v, l }) => (
            <div key={l}>
              <div className="text-[13px] font-bold text-white tabular-nums">{v}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating badges */}
      <div className="absolute -top-4 -right-4 bg-[#0e0e1e] border border-white/[0.1] rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 shadow-xl animate-float">
        <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
        <span className="text-xs font-bold text-white whitespace-nowrap">+34% efficiency</span>
      </div>
      <div className="absolute -bottom-4 -left-4 bg-[#0e0e1e] border border-white/[0.1] rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 shadow-xl animate-float-delayed">
        <Shield className="w-3.5 h-3.5 text-violet-400" />
        <span className="text-xs font-bold text-white whitespace-nowrap">SOC 2 Certified</span>
      </div>
    </div>
  )
}

function Hero() {
  const parallaxY = useParallax(0.11)

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Animated grid */}
      <div
        className="absolute inset-0 opacity-45 grid-drift"
        style={{
          backgroundImage:
            'linear-gradient(rgba(139,92,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Scan line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="scan-line bg-gradient-to-r from-transparent via-violet-500/25 to-transparent"
        />
      </div>

      {/* Parallax orbs */}
      <div
        className="absolute top-32 left-[10%] w-80 h-80 rounded-full bg-violet-600/12 blur-[100px] pointer-events-none"
        style={{ transform: `translateY(${parallaxY}px)` }}
      />
      <div
        className="absolute bottom-20 right-[8%] w-[480px] h-[480px] rounded-full bg-cyan-600/8 blur-[120px] pointer-events-none"
        style={{ transform: `translateY(${-parallaxY * 0.6}px)` }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-radial from-violet-700/15 via-violet-700/4 to-transparent pointer-events-none"
        style={{ transform: `translate(-50%, calc(-50% + ${parallaxY * 0.3}px))` }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-24 lg:py-36 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <Chip>Now in Public Beta · v2.0</Chip>

            <h1 className="mt-6 text-5xl sm:text-6xl lg:text-[68px] font-bold tracking-tight leading-[1.03] text-white">
              AI Agents That<br />
              <GradientText>Scale Your Ops</GradientText><br />
              10×
            </h1>

            <p className="mt-7 text-lg sm:text-xl text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Deploy intelligent agent networks that handle complex enterprise workflows end-to-end —
              from data pipelines to customer operations — without the engineering overhead.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#" className="group relative px-8 py-4 rounded-xl font-semibold text-white bg-violet-600 hover:bg-violet-500 transition-all duration-200 hover:shadow-xl hover:shadow-violet-500/30 hover:-translate-y-px inline-flex items-center justify-center gap-2">
                Start for free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#workflow" className="group px-8 py-4 rounded-xl font-semibold text-slate-300 hover:text-white border border-white/[0.1] hover:border-white/[0.2] hover:bg-white/[0.04] transition-all duration-200 inline-flex items-center justify-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                  <Play className="w-3 h-3 fill-violet-400 text-violet-400 ml-0.5" />
                </div>
                Watch demo
              </a>
            </div>

            {/* Social proof avatars */}
            <div className="mt-10 flex items-center gap-4 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {[['A','#7c3aed'],['B','#2563eb'],['C','#0891b2'],['D','#059669'],['E','#d97706']].map(([i, c]) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#06060f] flex items-center justify-center text-[11px] font-bold text-white" style={{ background: c }}>{i}</div>
                ))}
              </div>
              <p className="text-sm text-slate-400">
                Trusted by <span className="text-white font-semibold">2,400+</span> enterprise teams
              </p>
            </div>
          </div>

          {/* Visual */}
          <div className="flex justify-center lg:justify-end">
            <AgentDashboard />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   LOGO CLOUD (MARQUEE)
════════════════════════════════════════════════════════════════════════════ */

const RAW_LOGOS = ['Stripe', 'Notion', 'Figma', 'Vercel', 'Linear', 'Loom', 'Retool', 'Airtable', 'Salesforce', 'Snowflake']
const LOGOS = [...RAW_LOGOS, ...RAW_LOGOS] // double for seamless loop

function LogoCloud() {
  return (
    <section className="py-14 border-y border-white/[0.06] overflow-hidden">
      <p className="text-center text-[11px] font-semibold text-slate-600 mb-8 tracking-[0.18em] uppercase px-5">
        Trusted by teams at
      </p>
      <div className="relative">
        {/* Left/right fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#06060f] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#06060f] to-transparent pointer-events-none" />

        <div className="flex animate-marquee whitespace-nowrap">
          {LOGOS.map((logo, i) => (
            <span
              key={`${logo}-${i}`}
              className="inline-block mx-8 text-slate-700 hover:text-slate-400 transition-colors duration-300 text-xl font-extrabold tracking-tight cursor-default select-none"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   STATS — animated counters
════════════════════════════════════════════════════════════════════════════ */

const STAT_ITEMS = [
  { to: 2400,  suffix: '+',  label: 'Enterprise teams',  icon: Users,      decimals: 0 },
  { to: 12,    suffix: 'M+', label: 'Tasks automated/day', icon: Cpu,       decimals: 0 },
  { to: 99.99, suffix: '%',  label: 'Uptime SLA',         icon: Activity,  decimals: 2 },
  { to: 5,     prefix: '<',  suffix: 'ms', label: 'P99 latency', icon: Clock, decimals: 0 },
]

function StatItem({ to, suffix = '', prefix = '', label, icon: Icon, decimals }) {
  const [ref, val] = useAnimatedCounter(to, { decimals })
  return (
    <div ref={ref} className="flex flex-col items-center sm:items-start gap-3 text-center sm:text-left group">
      <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors">
        <Icon className="w-5 h-5 text-violet-400" strokeWidth={1.5} />
      </div>
      <div>
        <div className="text-4xl font-bold text-white tabular-nums tracking-tight">
          {prefix}{val.toLocaleString()}{suffix}
        </div>
        <div className="text-sm text-slate-400 mt-1">{label}</div>
      </div>
    </div>
  )
}

function Stats() {
  const [ref, visible] = useReveal(0.2)
  return (
    <section className="py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div
          ref={ref}
          className={cn('reveal', visible && 'visible')}
        >
          <div className="relative rounded-3xl border border-white/[0.07] bg-white/[0.01] p-10 sm:p-14 overflow-hidden">
            {/* Inner glow */}
            <div className="absolute inset-0 bg-gradient-radial from-violet-600/8 via-transparent to-transparent pointer-events-none" />
            <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-14">
              {STAT_ITEMS.map((s) => <StatItem key={s.label} {...s} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   FEATURES
════════════════════════════════════════════════════════════════════════════ */

const FEATURES = [
  { icon: Network,   title: 'Multi-Agent Orchestration', grad: 'from-violet-500 to-purple-600',
    description: 'Deploy coordinated agent networks that collaborate on complex tasks. Each agent specializes; together they outperform any monolith.' },
  { icon: Activity,  title: 'Real-Time Data Pipelines',  grad: 'from-blue-500 to-cyan-500',
    description: 'Stream, transform, and route data at enterprise scale. Sub-5ms latency with automatic backpressure and exactly-once semantics.' },
  { icon: Database,  title: '200+ Native Integrations',  grad: 'from-cyan-500 to-teal-500',
    description: 'Connect Salesforce, Snowflake, Slack, and hundreds more in minutes. Native auth, webhooks, and bidirectional sync out of the box.' },
  { icon: Shield,    title: 'Enterprise-Grade Security', grad: 'from-emerald-500 to-green-500',
    description: 'SOC 2 Type II, ISO 27001, HIPAA compliant. Private deployment options, field-level encryption, and full audit trails.' },
  { icon: RefreshCw, title: 'Self-Healing Workflows',    grad: 'from-orange-500 to-amber-500',
    description: 'Agents detect failures, attempt recovery, and escalate intelligently. 99.99% workflow SLA with built-in redundancy and retry logic.' },
  { icon: Brain,     title: 'Natural Language Config',   grad: 'from-pink-500 to-rose-500',
    description: 'Describe your workflow in plain English. Our AI compiles it into production-grade agent logic — no YAML, no SDKs, no boilerplate.' },
]

function FeatureCard({ icon: Icon, title, description, grad }) {
  return (
    <GlowCard className="group relative p-6 rounded-2xl border border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300 cursor-default">
      <div className={cn('inline-flex p-2.5 rounded-xl bg-gradient-to-br mb-5 shadow-lg', grad)}>
        <Icon className="w-5 h-5 text-white" strokeWidth={1.75} />
      </div>
      <h3 className="font-semibold text-white mb-2.5 text-[17px] leading-snug">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
    </GlowCard>
  )
}

function Features() {
  const [ref, visible] = useReveal(0.1)
  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel>Features</SectionLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Built for enterprise complexity
          </h2>
          <p className="mt-5 text-lg text-slate-400 leading-relaxed">
            Every feature is designed for teams that can't afford downtime, data loss,
            or unpredictable AI behavior in production.
          </p>
        </div>

        <div ref={ref} className={cn('grid sm:grid-cols-2 lg:grid-cols-3 gap-4 reveal', visible && 'visible')}>
          {FEATURES.map((f) => <FeatureCard key={f.title} {...f} />)}
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   WORKFLOW SHOWCASE
════════════════════════════════════════════════════════════════════════════ */

const STEPS = [
  { n: '01', icon: Globe,    title: 'Connect', desc: 'Integrate your data sources, APIs, and SaaS tools in minutes with 200+ native connectors. No custom middleware.' },
  { n: '02', icon: Brain,    title: 'Define',  desc: 'Describe your workflow in plain language or use the visual builder. NeuralFlow compiles it to optimized agent logic.' },
  { n: '03', icon: Bot,      title: 'Deploy',  desc: 'Agents go live in seconds. We handle scaling, retries, observability, and infrastructure — you handle strategy.' },
  { n: '04', icon: BarChart3,title: 'Optimize',desc: 'Full trace-level observability into every agent decision. AI-powered recommendations surface bottlenecks automatically.' },
]

const LOG_LINES = [
  { t: '09:42:01', c: 'text-violet-400',  m: '[Orchestrator] Workflow "Monthly Report" triggered by schedule' },
  { t: '09:42:01', c: 'text-slate-400',   m: '[Agent-1] Connecting to Snowflake... fetching 12,847 rows' },
  { t: '09:42:03', c: 'text-slate-400',   m: '[Agent-2] Statistical analysis complete — 3 anomalies flagged' },
  { t: '09:42:05', c: 'text-cyan-400',    m: '[Agent-3] Generating executive summary via GPT-4o...' },
  { t: '09:42:07', c: 'text-slate-400',   m: '[Agent-3] Summary ready — 847 words, 3 charts embedded' },
  { t: '09:42:08', c: 'text-emerald-400', m: '[Agent-4] Report distributed to 14 stakeholders via Slack + email ✓' },
  { t: '09:42:08', c: 'text-slate-500',   m: '[Orchestrator] Workflow complete in 7.1s — 0 errors, 0 retries' },
]

function WorkflowShowcase() {
  const [ref, visible] = useReveal(0.1)
  return (
    <section id="workflow" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-violet-600/10 to-transparent pointer-events-none" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-cyan-600/10 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <SectionLabel>How it works</SectionLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            From idea to production<br />in <GradientText>four steps</GradientText>
          </h2>
        </div>

        <div ref={ref} className={cn('reveal', visible && 'visible')}>
          {/* Steps */}
          <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-violet-500/25 to-transparent pointer-events-none" />
            {STEPS.map(({ n, icon: Icon, title, desc }) => (
              <div key={n} className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1">
                <div className="relative mb-5 z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center shadow-xl shadow-violet-500/20">
                    <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="text-[11px] font-bold text-violet-400 tracking-[0.15em] mb-1.5">{n}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Terminal */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#09091a]/80 backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/50">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-white/[0.06] bg-white/[0.01]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="ml-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-slate-500 font-mono">neuralflow — agent-runtime</span>
              </div>
            </div>
            <div className="p-6 font-mono text-[13px] space-y-2.5 overflow-x-auto">
              {LOG_LINES.map(({ t, c, m }, i) => (
                <div key={i} className="flex gap-5 min-w-0">
                  <span className="text-slate-600 flex-shrink-0 tabular-nums">{t}</span>
                  <span className={cn('break-all', c)}>{m}</span>
                </div>
              ))}
              <div className="flex gap-5 mt-1">
                <span className="text-slate-600 tabular-nums">09:42:09</span>
                <span className="text-white animate-pulse">▌</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   TESTIMONIALS
════════════════════════════════════════════════════════════════════════════ */

const TESTIMONIALS = [
  { quote: "NeuralFlow replaced an entire data engineering team's worth of manual work. Our weekly reporting pipeline went from 3 days to 18 minutes — with better accuracy.",
    name: 'Sarah Chen',    title: 'Head of Data · Meridian Insurance', avatar: 'SC', color: '#7c3aed', stars: 5 },
  { quote: 'The multi-agent architecture is genuinely different from anything else on the market. We run 400+ concurrent workflows with zero infrastructure headaches.',
    name: 'Marcus Okonkwo', title: 'CTO · Volta Logistics',           avatar: 'MO', color: '#0891b2', stars: 5 },
  { quote: "Compliance was our biggest concern with AI tooling. NeuralFlow's SOC 2 certification and audit trails made our legal team comfortable in days, not months.",
    name: 'Priya Nair',    title: 'VP Engineering · Apex Fintech',    avatar: 'PN', color: '#059669', stars: 5 },
]

function TestimonialCard({ quote, name, title, avatar, color, stars }) {
  return (
    <GlowCard className="flex flex-col p-8 rounded-2xl border border-white/[0.06] bg-white/[0.015] hover:border-white/[0.1] transition-all duration-300">
      <div className="flex gap-1 mb-6">
        {Array.from({ length: stars }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="text-[15px] text-slate-300 leading-relaxed flex-1">"{quote}"</p>
      <div className="flex items-center gap-3.5 mt-8 pt-6 border-t border-white/[0.06]">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: color }}>{avatar}</div>
        <div>
          <div className="text-sm font-semibold text-white">{name}</div>
          <div className="text-xs text-slate-500 mt-0.5">{title}</div>
        </div>
      </div>
    </GlowCard>
  )
}

function Testimonials() {
  const [ref, visible] = useReveal(0.1)
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">Loved by engineering leaders</h2>
          <p className="mt-5 text-lg text-slate-400">Join teams eliminating ops overhead with intelligent automation.</p>
        </div>

        <div ref={ref} className={cn('grid md:grid-cols-3 gap-5 reveal', visible && 'visible')}>
          {TESTIMONIALS.map((t) => <TestimonialCard key={t.name} {...t} />)}
        </div>

        {/* Trust badges with animated progress bars */}
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Security score', val: 98,  tag: 'SOC 2 Type II'  },
            { label: 'Uptime (30d)',   val: 100, tag: '99.99% SLA'     },
            { label: 'Compliance',     val: 94,  tag: 'ISO 27001'      },
            { label: 'Response time',  val: 87,  tag: '<5ms P99'       },
          ].map(({ label, val, tag }) => (
            <ProgressBadge key={label} label={label} val={val} tag={tag} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProgressBadge({ label, val, tag }) {
  const [ref, visible] = useReveal(0.3)
  return (
    <div ref={ref} className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
      <div className="flex justify-between items-center mb-2.5">
        <span className="text-xs font-medium text-slate-400">{label}</span>
        <span className="text-xs font-bold text-white">{tag}</span>
      </div>
      <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-[width] duration-1000 ease-out"
          style={{ width: visible ? `${val}%` : '0%' }}
        />
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   PRICING
════════════════════════════════════════════════════════════════════════════ */

const PLANS = [
  { name: 'Starter',    monthly: 0,   annual: 0,   highlighted: false,
    desc: 'Perfect for prototyping and small teams exploring AI automation.',
    features: ['3 active agents', '1,000 workflow runs/month', '5 integrations', 'Community support', 'Public audit logs'],
    cta: 'Start for free' },
  { name: 'Growth',     monthly: 299, annual: 239, highlighted: true,
    desc: 'For teams ready to automate at scale with full enterprise capabilities.',
    features: ['25 active agents', 'Unlimited workflow runs', '50+ integrations', 'Priority support (4hr SLA)', 'Private audit logs', 'Custom agent logic', 'SSO / SAML'],
    cta: 'Start 14-day trial' },
  { name: 'Enterprise', monthly: null, annual: null, highlighted: false,
    desc: 'Custom deployments for mission-critical enterprise operations.',
    features: ['Unlimited agents', 'Unlimited everything', 'All integrations + custom', 'Dedicated success manager', 'SLA up to 99.99%', 'Private cloud / on-prem', 'Custom compliance & DPA'],
    cta: 'Talk to sales' },
]

function PricingCard({ plan, annual }) {
  const price = annual ? plan.annual : plan.monthly
  const [ref, visible] = useReveal(0.15)

  return (
    <GlowCard
      ref={ref}
      glowColor={plan.highlighted ? 'rgba(139,92,246,0.15)' : 'rgba(139,92,246,0.08)'}
      className={cn(
        'reveal relative flex flex-col p-8 rounded-2xl border transition-all duration-300',
        visible && 'visible',
        plan.highlighted
          ? 'border-violet-500/50 bg-gradient-to-b from-violet-600/10 via-violet-600/5 to-transparent shadow-xl shadow-violet-500/10'
          : 'border-white/[0.06] bg-white/[0.015] hover:border-white/[0.12]',
      )}
    >
      {plan.highlighted && (
        <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
      )}
      {plan.highlighted && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1 rounded-full bg-violet-600 text-white text-xs font-bold tracking-wider shadow-lg shadow-violet-600/40">Most Popular</span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-bold text-white">{plan.name}</h3>
        <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">{plan.desc}</p>
      </div>

      <div className="mb-8 flex items-end gap-1">
        {price !== null ? (
          <>
            <span className="text-5xl font-bold text-white tabular-nums leading-none">${price}</span>
            <span className="text-slate-400 mb-1.5">/mo</span>
            {annual && plan.monthly > 0 && (
              <span className="mb-1.5 ml-2 text-xs font-semibold text-emerald-400">
                Save ${(plan.monthly - plan.annual) * 12}/yr
              </span>
            )}
          </>
        ) : (
          <span className="text-5xl font-bold text-white leading-none">Custom</span>
        )}
      </div>

      <ul className="space-y-3 flex-1 mb-8">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm">
            <div className={cn('mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0', plan.highlighted ? 'bg-violet-500/25' : 'bg-white/[0.07]')}>
              <Check className={cn('w-2.5 h-2.5', plan.highlighted ? 'text-violet-300' : 'text-slate-400')} strokeWidth={2.5} />
            </div>
            <span className="text-slate-300">{f}</span>
          </li>
        ))}
      </ul>

      <a href="#" className={cn(
        'block w-full py-3.5 rounded-xl font-semibold text-sm text-center transition-all duration-200',
        plan.highlighted
          ? 'bg-violet-600 hover:bg-violet-500 text-white hover:shadow-lg hover:shadow-violet-500/30 hover:-translate-y-px'
          : 'border border-white/[0.1] hover:border-white/[0.2] text-slate-300 hover:text-white hover:bg-white/[0.04]',
      )}>
        {plan.cta}
      </a>
    </GlowCard>
  )
}

function Pricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <section id="pricing" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-violet-600/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionLabel>Pricing</SectionLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">Simple, transparent pricing</h2>
          <p className="mt-5 text-lg text-slate-400">No hidden fees. No per-seat madness. Pay for what you automate.</p>

          {/* Toggle */}
          <div className="mt-10 inline-flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/[0.07]">
            {[{ label: 'Monthly', val: false }, { label: 'Annual', val: true, badge: '−20%' }].map(({ label, val, badge }) => (
              <button
                key={label}
                onClick={() => setAnnual(val)}
                className={cn(
                  'px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2',
                  annual === val ? 'bg-white/[0.1] text-white shadow-sm' : 'text-slate-400 hover:text-slate-200',
                )}
              >
                {label}
                {badge && <span className="px-1.5 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-400">{badge}</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 items-start">
          {PLANS.map((plan) => <PricingCard key={plan.name} plan={plan} annual={annual} />)}
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          All plans include a 30-day money-back guarantee. No questions asked.
        </p>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   FAQ
════════════════════════════════════════════════════════════════════════════ */

const FAQS = [
  { q: 'How long does it take to ship my first workflow?',
    a: "Most teams ship their first production workflow within 2 hours. NeuralFlow's natural language config and 200+ pre-built integrations eliminate the typical setup overhead that kills momentum." },
  { q: 'Can NeuralFlow replace our custom Python scripts and cron jobs?',
    a: 'Yes — NeuralFlow is purpose-built for exactly this. You can import existing scripts as agent logic, then layer in observability, error handling, retries, and horizontal scaling automatically.' },
  { q: 'How does NeuralFlow handle data privacy and compliance?',
    a: "We're SOC 2 Type II, ISO 27001, and HIPAA compliant. All data in transit and at rest is encrypted with AES-256. We offer private cloud and on-premises deployments for regulated industries." },
  { q: 'What happens when an agent fails mid-workflow?',
    a: 'Agents retry with configurable exponential back-off, and the orchestrator attempts self-healing before escalating. Every failure is logged with full context — inputs, outputs, and LLM reasoning traces.' },
  { q: 'Do I need engineering skills to use NeuralFlow?',
    a: 'No. Our natural language workflow builder handles most use cases without code. For advanced logic, you can write custom agent code in Python, TypeScript, or Go — or have our AI generate it.' },
  { q: 'How does pricing work for high-volume workflows?',
    a: 'Growth and Enterprise plans include unlimited runs. We charge a flat monthly fee based on your agent count and required features — never per-run, per-seat, or per-token.' },
  { q: 'Can I connect NeuralFlow to my existing data warehouse?',
    a: 'Yes. We have native connectors for Snowflake, BigQuery, Redshift, Databricks, and more. Data stays in your environment — NeuralFlow orchestrates the agents, not the storage.' },
  { q: 'Is there an on-premises or private cloud deployment option?',
    a: 'Yes, available on the Enterprise plan. We support Kubernetes-based deployment to your own infrastructure with the same feature set as our cloud product and full data sovereignty.' },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-white/[0.06] last:border-0">
      <button
        className="w-full flex items-start justify-between gap-6 py-6 text-left group cursor-pointer"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-medium text-white group-hover:text-violet-300 transition-colors text-[15px]">{q}</span>
        <ChevronDown className={cn('w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5 transition-transform duration-300', open && 'rotate-180 text-violet-400')} />
      </button>
      <div className={cn('overflow-hidden transition-all duration-300', open ? 'max-h-52 opacity-100' : 'max-h-0 opacity-0')}>
        <p className="pb-6 text-slate-400 leading-relaxed text-[15px]">{a}</p>
      </div>
    </div>
  )
}

function FAQ() {
  const [ref, visible] = useReveal(0.1)
  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-16">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">Questions, answered</h2>
          <p className="mt-5 text-lg text-slate-400">Everything you need to know before you ship your first agent.</p>
        </div>
        <div ref={ref} className={cn('border-t border-white/[0.06] reveal', visible && 'visible')}>
          {FAQS.map(({ q, a }) => <FAQItem key={q} q={q} a={a} />)}
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   CTA BANNER — with email form
════════════════════════════════════════════════════════════════════════════ */

function EmailSignup() {
  const [email,     setEmail]     = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error,     setError]     = useState(false)

  const handle = (e) => {
    e.preventDefault()
    if (!email.includes('@')) { setError(true); return }
    setError(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-medium text-sm">
        <Check className="w-5 h-5 flex-shrink-0" strokeWidth={2.5} />
        You're on the list! We'll be in touch soon.
      </div>
    )
  }

  return (
    <form onSubmit={handle} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <div className="flex-1">
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(false) }}
          placeholder="your@company.com"
          className={cn(
            'w-full px-5 py-3.5 rounded-xl bg-white/[0.07] border text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all text-sm',
            error
              ? 'border-rose-500/60 focus:ring-rose-500/30'
              : 'border-white/[0.12] focus:ring-violet-500/40 focus:border-violet-500/50',
          )}
        />
        {error && <p className="mt-1.5 text-xs text-rose-400 text-left pl-1">Enter a valid email address.</p>}
      </div>
      <button
        type="submit"
        className="px-6 py-3.5 rounded-xl bg-white text-violet-900 font-bold text-sm hover:bg-slate-100 transition-all hover:shadow-xl hover:-translate-y-px whitespace-nowrap"
      >
        Get early access
      </button>
    </form>
  )
}

function CTABanner() {
  const [ref, visible] = useReveal(0.15)
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div
          ref={ref}
          className={cn('reveal relative overflow-hidden rounded-3xl border border-white/[0.08]', visible && 'visible')}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/70 via-[#0d0a1e] to-[#06060f]" />
          <div className="absolute inset-0 bg-gradient-radial from-violet-600/20 via-transparent to-transparent" />
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          <div className="relative px-8 sm:px-16 py-20 text-center">
            <Chip>Join the waitlist</Chip>
            <h2 className="mt-6 text-4xl sm:text-5xl font-bold text-white tracking-tight mb-6">
              Start automating today.<br />
              <GradientText>No credit card required.</GradientText>
            </h2>
            <p className="text-lg text-slate-300 max-w-lg mx-auto mb-10 leading-relaxed">
              Join 2,400+ teams who've already replaced their ops overhead with intelligent agent networks.
            </p>

            <EmailSignup />

            <p className="mt-5 text-xs text-slate-500">
              No spam. Unsubscribe anytime. By signing up you agree to our{' '}
              <a href="#" className="underline hover:text-slate-400 transition-colors">Terms of Service</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   FOOTER
════════════════════════════════════════════════════════════════════════════ */

const FOOTER_LINKS = [
  { title: 'Product',   links: ['Features', 'Integrations', 'Changelog', 'Roadmap', 'Status'] },
  { title: 'Solutions', links: ['Data Pipelines', 'Customer Ops', 'Finance Automation', 'Compliance', 'DevOps'] },
  { title: 'Company',   links: ['About', 'Blog', 'Careers', 'Press', 'Contact'] },
  { title: 'Legal',     links: ['Privacy', 'Terms', 'Security', 'DPA', 'Cookies'] },
]

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-10">
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-5 w-fit">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
                <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-white text-[17px] tracking-tight">NeuralFlow</span>
            </a>
            <p className="text-sm text-slate-500 leading-relaxed max-w-[230px]">
              The AI agent platform for enterprise automation at scale.
            </p>
            <div className="flex items-center gap-5 mt-6">
              {['Twitter', 'GitHub', 'LinkedIn'].map((s) => (
                <a key={s} href="#" className="text-sm font-medium text-slate-600 hover:text-slate-300 transition-colors">{s}</a>
              ))}
            </div>
          </div>

          {FOOTER_LINKS.map(({ title, links }) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-600">© 2026 NeuralFlow, Inc. All rights reserved.</p>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-400/10 border border-emerald-400/20">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium text-emerald-400">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   APP
════════════════════════════════════════════════════════════════════════════ */

export default function App() {
  return (
    <div className="min-h-screen bg-[#06060f] text-slate-100 antialiased">
      {/* Global overlays */}
      <NoiseOverlay />
      <ScrollProgressBar />
      <BackToTop />
      <CursorRing />
      <ToastSocialProof />

      <Navbar />

      <main>
        <Hero />
        <LogoCloud />
        <Stats />
        <SectionDivider />
        <Features />
        <SectionDivider />
        <WorkflowShowcase />
        <SectionDivider />
        <Testimonials />
        <SectionDivider />
        <Pricing />
        <FAQ />
        <CTABanner />
      </main>

      <Footer />
    </div>
  )
}

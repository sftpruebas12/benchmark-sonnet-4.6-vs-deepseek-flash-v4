import { useState, useEffect } from 'react'
import useReveal from '../hooks/useReveal'

const steps = [
  {
    number: '01',
    title: 'Define your workflow',
    description: 'Visually map out your business processes using our intuitive drag-and-drop builder. No coding required.',
  },
  {
    number: '02',
    title: 'Deploy AI agents',
    description: 'Assign intelligent agents to each step. They learn from your data and adapt to edge cases automatically.',
  },
  {
    number: '03',
    title: 'Monitor & optimize',
    description: 'Watch your automations run in real-time. Get AI-driven recommendations to improve performance continuously.',
  },
]

const integrations = [
  'Slack', 'Salesforce', 'HubSpot', 'Notion', 'Jira', 'GitHub',
  'Zendesk', 'Google Cloud', 'AWS', 'Stripe', 'Shopify', 'Sentry',
]

const barConfigs = [
  { label: 'Data Sync', time: '1.2s', width: 100 },
  { label: 'AI Processing', time: '0.8s', width: 85 },
  { label: 'Report Gen', time: '2.1s', width: 60 },
  { label: 'Alert Push', time: '0.4s', width: 100 },
  { label: 'Archive', time: '0.3s', width: 95 },
]

function AnimatedProgressBars() {
  const [ref, revealed] = useReveal()

  return (
    <div ref={ref} className="glass rounded-2xl p-6 md:p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-[80px]" />
      <div className="relative">
        <div className="flex items-center gap-2 mb-6">
          <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium text-zinc-300">All systems operational</span>
        </div>
        <div className="space-y-3">
          {barConfigs.map((bar, i) => (
            <div key={bar.label} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.04] hover:bg-white/[0.05] transition-colors duration-200">
              <div className="w-2 h-2 rounded-full bg-emerald-400/60" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-zinc-300">{bar.label}</span>
                  <span className="text-[10px] font-mono text-zinc-500">{bar.time}</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000 ease-out"
                    style={{
                      width: revealed ? `${bar.width}%` : '0%',
                      transitionDelay: revealed ? `${i * 0.15}s` : '0s',
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Workflow() {
  const [headerRef, headerRevealed] = useReveal()
  const [leftRef, leftRevealed] = useReveal()
  const [integrationsRef, integrationsRevealed] = useReveal()

  return (
    <section id="workflow" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-radial-gradient opacity-50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className={`max-w-2xl mb-16 md:mb-20 transition-all duration-800 ${headerRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
             style={{ transitionDuration: '0.8s', transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <span className="text-xs font-semibold tracking-widest uppercase text-purple-400">Workflow</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-4 mb-6">
            Set up in minutes, not
            <br />
            <span className="gradient-text">months of development</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            NeuralFlow&apos;s intuitive platform lets you go from idea to production in record time.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center mb-24">
          <div ref={leftRef} className={`space-y-8 md:space-y-12 transition-all duration-800 ${leftRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
               style={{ transitionDuration: '0.8s', transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}>
            {steps.map((step) => (
              <div key={step.number} className="group flex gap-5 md:gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/[0.06] flex items-center justify-center text-sm font-mono font-medium text-indigo-400 shrink-0 group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                    {step.number}
                  </div>
                  <div className="flex-1 w-px bg-gradient-to-b from-white/[0.06] to-transparent group-last:hidden" />
                </div>
                <div className="pb-8 group-last:pb-0">
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={`transition-all duration-800 ${leftRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
               style={{ transitionDuration: '0.8s', transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)', transitionDelay: '0.2s' }}>
            <AnimatedProgressBars />
          </div>
        </div>

        <div ref={integrationsRef} className={`text-center transition-all duration-800 ${integrationsRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
             style={{ transitionDuration: '0.8s', transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <span className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-6 block">Trusted integrations</span>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {integrations.map((name) => (
              <span
                key={name}
                className="text-sm font-medium text-zinc-500 hover:text-zinc-300 hover:scale-105 transition-all duration-200"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

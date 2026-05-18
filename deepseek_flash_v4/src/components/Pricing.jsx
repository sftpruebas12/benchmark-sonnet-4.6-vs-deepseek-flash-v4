import { useState } from 'react'
import useReveal from '../hooks/useReveal'
import GlowCard from './GlowCard'

const monthlyTiers = [
  {
    name: 'Starter',
    price: 'Free',
    period: null,
    description: 'Perfect for exploring the platform and building small-scale automations.',
    features: [
      'Up to 3 active workflows',
      '2 AI agents included',
      '1,000 executions/month',
      'Basic analytics dashboard',
      'Community support',
      'API access (rate limited)',
    ],
    cta: 'Start free',
    featured: false,
  },
  {
    name: 'Pro',
    price: '$79',
    period: '/month',
    description: 'For growing teams that need reliable automation at scale.',
    features: [
      'Unlimited workflows',
      '10 AI agents included',
      '50,000 executions/month',
      'Advanced analytics & reports',
      'Priority email support',
      'Full API & webhook access',
      'Team collaboration (up to 10)',
      'SSO & role-based access',
    ],
    cta: 'Start free trial',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: null,
    description: 'Tailored solutions for organizations with complex requirements.',
    features: [
      'Unlimited everything',
      'Custom AI agent training',
      'Unlimited executions',
      'Dedicated success manager',
      '24/7 phone & chat support',
      'On-premise deployment option',
      'Custom integrations',
      'SLA guarantee (99.99%)',
      'Advanced audit logging',
    ],
    cta: 'Contact sales',
    featured: false,
  },
]

const yearlyTiers = monthlyTiers.map((tier) => {
  if (tier.price === 'Free') return { ...tier, period: null }
  if (tier.price === 'Custom') return tier
  const monthly = parseInt(tier.price.slice(1))
  const yearly = Math.floor(monthly * 10)
  return {
    ...tier,
    price: `$${yearly}`,
    period: '/year',
    description: tier.description + ' Save 2 months.',
  }
})

export default function Pricing() {
  const [annual, setAnnual] = useState(false)
  const [headerRef, headerRevealed] = useReveal()
  const [gridRef, gridRevealed] = useReveal()

  const tiers = annual ? yearlyTiers : monthlyTiers

  return (
    <section id="pricing" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-radial-gradient opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className={`max-w-2xl mx-auto text-center mb-12 md:mb-16 transition-all duration-800 ${headerRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
             style={{ transitionDuration: '0.8s', transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <span className="text-xs font-semibold tracking-widest uppercase text-indigo-400">Pricing</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-4 mb-6">
            Simple, transparent
            <br />
            <span className="gradient-text">pricing for every team</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            Start free and scale as you grow. No hidden fees, no surprise charges.
          </p>

          <div className="flex items-center justify-center gap-3 mt-8">
            <span className={`text-sm font-medium transition-colors duration-300 ${!annual ? 'text-white' : 'text-zinc-500'}`}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                annual ? 'bg-indigo-500' : 'bg-white/[0.1]'
              }`}
              aria-label="Toggle annual pricing"
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-300 shadow ${
                  annual ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-sm font-medium transition-colors duration-300 ${annual ? 'text-white' : 'text-zinc-500'}`}>
              Annual
              <span className="ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-400">Save ~17%</span>
            </span>
          </div>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier, i) => (
            <div
              key={tier.name}
              className={`transition-all duration-700 ${
                gridRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } ${tier.featured ? 'scale-100 md:scale-105' : ''}`}
              style={{
                transitionDuration: '0.7s',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: gridRevealed ? `${i * 0.1}s` : '0s',
              }}
            >
              <GlowCard
                className={`relative rounded-2xl p-6 md:p-8 h-full ${
                  tier.featured
                    ? 'bg-gradient-to-b from-indigo-500/10 to-purple-500/5 border border-indigo-500/20 shadow-xl shadow-indigo-500/10 hover:shadow-indigo-500/20'
                    : 'glass glass-hover'
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-[10px] font-semibold tracking-wider uppercase text-white shadow-lg">
                    Most popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">{tier.name}</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-3xl md:text-4xl font-bold text-white">{tier.price}</span>
                    {tier.period && <span className="text-sm text-zinc-500">{tier.period}</span>}
                  </div>
                  <p className="text-sm text-zinc-400">{tier.description}</p>
                </div>

                <a
                  href="#"
                  className={`block text-center py-3 rounded-xl font-medium text-sm transition-all duration-300 mb-8 ${
                    tier.featured
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-400 hover:to-purple-500 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-[1.02]'
                      : 'glass glass-hover text-zinc-300 hover:text-white'
                  }`}
                >
                  {tier.cta}
                </a>

                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <svg className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-zinc-400">{feature}</span>
                    </li>
                  ))}
                </ul>
              </GlowCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { useState } from 'react'
import useReveal from '../hooks/useReveal'

const faqs = [
  {
    q: 'What makes NeuralFlow different from other automation platforms?',
    a: 'Unlike traditional automation tools that require extensive coding or rigid if-this-then-that logic, NeuralFlow uses AI agents that understand context, learn from your data, and adapt to edge cases automatically. This means you can automate complex workflows that would be impossible with traditional rules-based systems.',
  },
  {
    q: 'How long does it take to get started?',
    a: 'Most teams are up and running within 30 minutes. Our onboarding wizard guides you through creating your first workflow, and our library of pre-built templates lets you deploy common automations in just a few clicks. No training required.',
  },
  {
    q: 'Is my data secure on NeuralFlow?',
    a: 'Absolutely. We are SOC 2 Type II certified and employ enterprise-grade security measures including end-to-end encryption (AES-256), SSO/SAML, granular role-based access controls, and comprehensive audit logging. We also offer on-premise deployment for Enterprise customers.',
  },
  {
    q: 'Can I integrate NeuralFlow with my existing tools?',
    a: 'NeuralFlow connects with 200+ popular tools out of the box, including Slack, Salesforce, HubSpot, Jira, GitHub, and more. For custom integrations, our powerful REST API and webhook system let you connect to virtually any service. Our Enterprise plan includes dedicated integration support.',
  },
  {
    q: 'What kind of support do you offer?',
    a: 'Starter plans include community support and documentation access. Pro plans come with priority email support and a response time of under 4 hours. Enterprise customers get a dedicated success manager, 24/7 phone and chat support, and a guaranteed 30-minute response time for critical issues.',
  },
  {
    q: 'Can I cancel my subscription at any time?',
    a: 'Yes, you can cancel anytime with no penalties. If you\'re on a monthly plan, you\'ll retain access until the end of your billing period. Annual plans include a 30-day money-back guarantee. We make cancellation easy — just a few clicks in your dashboard.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const [headerRef, headerRevealed] = useReveal()
  const [listRef, listRevealed] = useReveal()

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className={`max-w-2xl mb-16 md:mb-20 transition-all duration-800 ${headerRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
             style={{ transitionDuration: '0.8s', transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <span className="text-xs font-semibold tracking-widest uppercase text-purple-400">FAQ</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-4 mb-6">
            Frequently asked
            <br />
            <span className="gradient-text">questions</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            Everything you need to know about NeuralFlow. Can&apos;t find what you&apos;re looking for?{' '}
            <a href="#" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors">
              Contact our team
            </a>
          </p>
        </div>

        <div ref={listRef} className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={i}
                className={`glass rounded-xl overflow-hidden transition-all duration-700 ${
                  listRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDuration: '0.7s',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: listRevealed ? `${i * 0.06}s` : '0s',
                }}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 px-5 md:px-6 py-4 md:py-5 text-left transition-colors duration-200 hover:bg-white/[0.02]"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm md:text-base font-medium text-white pr-4">{faq.q}</span>
                  <svg
                    className={`w-4 h-4 text-zinc-500 shrink-0 transition-all duration-300 ${
                      isOpen ? 'rotate-180 text-indigo-400' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-5 md:px-6 pb-4 md:pb-5 text-sm text-zinc-400 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

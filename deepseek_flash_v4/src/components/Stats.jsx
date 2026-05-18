import useReveal from '../hooks/useReveal'
import useAnimatedCounter from '../hooks/useAnimatedCounter'
import { useState, useEffect } from 'react'

function AnimatedStat({ target, suffix, label, delay }) {
  const [ref, count] = useAnimatedCounter(target, { duration: 2000 })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    setDisplay(suffix === '%' ? count + '%' : suffix === '+' ? count.toLocaleString() + '+' : count.toLocaleString())
  }, [count, suffix])

  return (
    <div ref={ref} className="text-center" style={{ transitionDelay: `${delay}s` }}>
      <div className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-1">
        {display}
      </div>
      <div className="text-xs sm:text-sm text-zinc-500">{label}</div>
    </div>
  )
}

const stats = [
  { target: 10000000, suffix: '+', label: 'Automations executed' },
  { target: 2000, suffix: '+', label: 'Active teams' },
  { target: 9999, suffix: '%', label: 'Platform uptime' },
  { target: 200, suffix: '+', label: 'Integrations' },
]

export default function Stats() {
  const [ref, revealed] = useReveal()

  return (
    <section className="relative py-16 md:py-20 border-y border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 transition-all duration-800 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDuration: '0.8s', transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          {stats.map((stat, i) => (
            <AnimatedStat key={stat.label} target={stat.target} suffix={stat.suffix} label={stat.label} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}

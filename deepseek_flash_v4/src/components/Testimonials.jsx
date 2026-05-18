import useReveal from '../hooks/useReveal'

const testimonials = [
  {
    quote: 'NeuralFlow has completely transformed how our team handles customer onboarding. What used to take 3 days now happens in under 2 hours. The AI agents are remarkably intuitive.',
    author: 'Sarah Chen',
    role: 'VP of Operations',
    company: 'ScaleTech',
  },
  {
    quote: 'The workflow automation capabilities are best-in-class. We\'ve connected our entire stack — CRM, support, billing — into one seamless pipeline. ROI was evident in the first month.',
    author: 'Marcus Rivera',
    role: 'CTO',
    company: 'DataStream Inc.',
  },
  {
    quote: 'Finally, an enterprise AI platform that actually delivers on its promises. The analytics alone have saved us countless hours of manual reporting. Game changer for our data team.',
    author: 'Emily Nakamura',
    role: 'Head of Data',
    company: 'Apex Analytics',
  },
  {
    quote: 'We evaluated every automation platform on the market. NeuralFlow\'s combination of power, ease of use, and enterprise security made it the clear winner. Our team adopted it immediately.',
    author: 'David Okonkwo',
    role: 'Director of Engineering',
    company: 'CloudBase',
  },
]

export default function Testimonials() {
  const [headerRef, headerRevealed] = useReveal()
  const [gridRef, gridRevealed] = useReveal()

  return (
    <section id="testimonials" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className={`max-w-2xl mb-16 md:mb-20 transition-all duration-800 ${headerRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
             style={{ transitionDuration: '0.8s', transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <span className="text-xs font-semibold tracking-widest uppercase text-pink-400">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-4 mb-6">
            Trusted by
            <br />
            <span className="gradient-text">industry leaders</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            See how forward-thinking companies are transforming their operations with NeuralFlow.
          </p>
        </div>

        <div ref={gridRef} className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className={`group relative p-6 md:p-8 rounded-2xl glass glass-hover transition-all duration-700 hover:translate-y-[-2px] ${
                gridRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDuration: '0.7s',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: gridRevealed ? `${i * 0.1}s` : '0s',
              }}
            >
              <svg className="w-8 h-8 text-indigo-400/40 mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-sm md:text-base text-zinc-300 leading-relaxed mb-6">&ldquo;{item.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500/30 to-purple-500/30 border border-white/[0.06] flex items-center justify-center text-sm font-semibold text-indigo-300">
                  {item.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{item.author}</div>
                  <div className="text-xs text-zinc-500">{item.role}, {item.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

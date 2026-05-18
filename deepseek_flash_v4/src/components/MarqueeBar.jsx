const logos = [
  'Linear', 'Vercel', 'Stripe', 'Figma', 'Notion', 'Railway',
  'Supabase', 'PlanetScale', 'Cal.com', 'Dub.co',
]

export default function MarqueeBar() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden border-b border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <p className="text-xs font-semibold tracking-widest uppercase text-zinc-600 text-center">
          Trusted by innovative teams worldwide
        </p>
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-neural-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-neural-950 to-transparent z-10 pointer-events-none" />
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_40px,black_calc(100%-40px),transparent)]">
          <div className="flex gap-12 md:gap-16 items-center animate-marquee shrink-0">
            {[...logos, ...logos].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="text-sm md:text-base font-semibold text-zinc-600 whitespace-nowrap tracking-tight"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </section>
  )
}

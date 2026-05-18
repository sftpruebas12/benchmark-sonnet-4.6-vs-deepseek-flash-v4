import { useRef, useEffect } from 'react'

export default function Hero() {
  const orbsRef = useRef(null)

  useEffect(() => {
    const orbs = orbsRef.current
    if (!orbs) return

    const onMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      orbs.style.transform = `translate(${x}px, ${y}px)`
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-40" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-indigo-500/10 to-transparent animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500/10 to-transparent animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-pink-500/10 to-transparent animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
      </div>

      <div ref={orbsRef} className="absolute inset-0 transition-transform duration-300 ease-out pointer-events-none">
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-purple-500/15 rounded-full blur-[120px] animate-float-delayed" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-glow" />
            <span className="text-xs sm:text-sm text-zinc-400 font-medium">
              Now in Public Beta{' '}
              <span className="text-white">— Join 2,000+ teams</span>
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1] mb-6 animate-fade-in-up">
            Automate your
            <br />
            <span className="gradient-text">entire workflow</span>
            <br />
            with AI agents
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Deploy intelligent agents that understand your business, automate complex workflows,
            and deliver enterprise-grade analytics — without writing a single line of code.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <a
              href="#"
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-base transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02]"
            >
              <span>Start building free</span>
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl glass glass-hover text-zinc-300 font-semibold text-base transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Watch demo
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-zinc-500 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              No code required
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              SOC 2 compliant
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Free 14-day trial
            </span>
          </div>
        </div>

        <div className="relative mt-16 md:mt-24 max-w-5xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="glass rounded-2xl overflow-hidden shadow-2xl glow">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
              <span className="ml-3 text-xs text-zinc-500 font-mono">neuralflow.app/dashboard</span>
            </div>
            <div className="aspect-video bg-gradient-to-br from-neural-900 via-indigo-950/30 to-neural-900 p-4 md:p-6">
              <div className="grid grid-cols-12 gap-4 h-full">
                <div className="col-span-3 hidden md:flex flex-col gap-3">
                  <div className="h-8 rounded-lg bg-white/[0.05] border border-white/[0.06] flex items-center px-3">
                    <div className="w-3 h-3 rounded-full bg-indigo-500/60" />
                    <div className="ml-2 h-2 w-16 rounded-full bg-white/[0.08]" />
                  </div>
                  {['Workflows', 'Agents', 'Analytics', 'Settings'].map((label, i) => (
                    <div
                      key={label}
                      className={`h-9 rounded-lg flex items-center px-3 transition-all duration-200 ${
                        i === 0
                          ? 'bg-white/[0.06] border border-white/[0.08]'
                          : 'bg-white/[0.02] border border-transparent'
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-indigo-400' : 'bg-zinc-600'}`} />
                      <span className={`ml-2.5 text-xs ${i === 0 ? 'text-zinc-200' : 'text-zinc-500'}`}>{label}</span>
                    </div>
                  ))}
                </div>

                <div className="col-span-12 md:col-span-9 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="h-3 w-28 rounded-full bg-white/[0.06]" />
                    <div className="flex gap-2">
                      <div className="w-6 h-6 rounded-md bg-white/[0.05] border border-white/[0.06]" />
                      <div className="w-6 h-6 rounded-md bg-white/[0.05] border border-white/[0.06]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: '2,847', label: 'Tasks completed', change: '+12.3%', up: true },
                      { value: '98.2%', label: 'Success rate', change: '+2.1%', up: true },
                      { value: '1.2s', label: 'Avg response', change: '-0.3s', up: false },
                    ].map((stat) => (
                      <div key={stat.label} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
                        <div className="text-lg font-bold text-white">{stat.value}</div>
                        <div className="text-[10px] text-zinc-500 mt-0.5">{stat.label}</div>
                        <div className={`text-[10px] font-medium mt-1 ${stat.up ? 'text-emerald-400' : 'text-red-400'}`}>
                          {stat.change}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex-1 rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-[10px] font-medium text-zinc-500">Recent Activity</div>
                      <div className="text-[10px] text-zinc-600">View all</div>
                    </div>
                    <div className="space-y-1.5">
                      {[
                        { agent: 'Data Sync Agent', status: 'Completed', time: '2m ago' },
                        { agent: 'Report Generator', status: 'In Progress', time: '5m ago' },
                        { agent: 'Alert Dispatcher', status: 'Completed', time: '12m ago' },
                      ].map((item) => (
                        <div key={item.agent} className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-white/[0.02]">
                          <div className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'Completed' ? 'bg-emerald-400' : 'bg-yellow-400'}`} />
                            <span className="text-xs text-zinc-300">{item.agent}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] text-zinc-600">{item.time}</span>
                            <span className={`text-[10px] font-medium ${item.status === 'Completed' ? 'text-emerald-400' : 'text-yellow-400'}`}>
                              {item.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-4 -right-4 -left-4 h-20 bg-gradient-to-t from-neural-950 to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  )
}

import { useState, useEffect, useCallback } from 'react'

const names = [
  'Acme Corp', 'DataFlow Inc', 'ScaleUp AI', 'CloudBase', 'NexGen Analytics',
  'Pinnacle Systems', 'ArcPoint Solutions', 'Meridian Health', 'Vanguard Tech',
  'OmniCore Labs', 'Strata Dynamics', 'Flux Enterprises',
]

const locations = ['San Francisco', 'New York', 'London', 'Berlin', 'Singapore', 'Tokyo', 'Toronto', 'Austin']

const messages = [
  'just deployed NeuralFlow across their organization',
  'automated 15+ workflows with NeuralFlow',
  'reduced processing time by 80% using NeuralFlow',
  'migrated their entire stack to NeuralFlow',
  'went live with NeuralFlow AI agents',
]

export default function ToastSocialProof() {
  const [toast, setToast] = useState(null)
  const [visible, setVisible] = useState(false)

  const showToast = useCallback(() => {
    const name = names[Math.floor(Math.random() * names.length)]
    const location = locations[Math.floor(Math.random() * locations.length)]
    const message = messages[Math.floor(Math.random() * messages.length)]

    setToast({ name, location, message })
    setVisible(true)

    setTimeout(() => {
      setVisible(false)
    }, 4000)
  }, [])

  useEffect(() => {
    showToast()
    const interval = setInterval(showToast, 12000)
    return () => clearInterval(interval)
  }, [showToast])

  if (!toast) return null

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 max-w-xs transition-all duration-500 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="glass rounded-xl px-4 py-3 shadow-xl flex items-center gap-3">
        <div className="relative shrink-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500/30 to-purple-500/30 border border-white/[0.06] flex items-center justify-center text-[10px] font-semibold text-indigo-300">
            {toast.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
          </div>
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-neural-950" />
        </div>
        <div className="min-w-0">
          <p className="text-xs text-zinc-300 leading-relaxed">
            <span className="font-semibold text-white">{toast.name}</span>{' '}
            {toast.message}
          </p>
          <p className="text-[10px] text-zinc-600 mt-0.5">{toast.location} &middot; Just now</p>
        </div>
      </div>
    </div>
  )
}

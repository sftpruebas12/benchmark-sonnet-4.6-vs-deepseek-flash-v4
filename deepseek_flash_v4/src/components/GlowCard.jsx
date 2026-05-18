import { useRef, useEffect } from 'react'

export default function GlowCard({ children, className = '', ...props }) {
  const cardRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const onMouseMove = (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      card.style.setProperty('--mx', `${x}px`)
      card.style.setProperty('--my', `${y}px`)
      card.style.setProperty('--opacity', '1')
    }

    const onMouseLeave = () => {
      card.style.setProperty('--opacity', '0')
    }

    card.addEventListener('mousemove', onMouseMove)
    card.addEventListener('mouseleave', onMouseLeave)

    return () => {
      card.removeEventListener('mousemove', onMouseMove)
      card.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        '--mx': '50%',
        '--my': '50%',
        '--opacity': '0',
      }}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-500 rounded-[inherit]"
        style={{
          opacity: 'var(--opacity)',
          background: 'radial-gradient(400px circle at var(--mx) var(--my), rgba(99,102,241,0.12), transparent 50%)',
        }}
      />
      {children}
    </div>
  )
}

import { useState, useEffect, useRef } from 'react'

export default function useAnimatedCounter(target, options = {}) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const hasRun = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true
          const duration = options.duration ?? 2000
          const start = performance.now()

          const raf = (now) => {
            const elapsed = now - start
            const t = Math.min(elapsed / duration, 1)
            const ease = 1 - Math.pow(1 - t, 3)
            setCount(Math.floor(ease * target))
            if (t < 1) requestAnimationFrame(raf)
          }

          requestAnimationFrame(raf)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, options.duration])

  return [ref, count]
}

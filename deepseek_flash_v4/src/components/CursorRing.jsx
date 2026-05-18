import { useEffect, useRef } from 'react'

export default function CursorRing() {
  const ringRef = useRef(null)

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouch) return

    const ring = ringRef.current
    if (!ring) return

    let mouseX = -100
    let mouseY = -100
    let ringX = -100
    let ringY = -100

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.1
      ringY += (mouseY - ringY) * 0.1
      ring.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    requestAnimationFrame(animate)

    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <div
      ref={ringRef}
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/[0.12] pointer-events-none z-[100] hidden md:block"
      style={{ transition: 'width 0.3s, height 0.3s' }}
    />
  )
}

import { useEffect, useRef } from 'react'

// Chispas que saltan en cada clic (estilo React Bits "ClickSpark").
export default function ClickSpark({ count = 9, radius = 26, duration = 520 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let sparks = []
    let raf = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = innerWidth * dpr
      canvas.height = innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const ease = (t) => t * (2 - t)
    const draw = (now) => {
      ctx.clearRect(0, 0, innerWidth, innerHeight)
      const color = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.lineCap = 'round'
      sparks = sparks.filter((s) => {
        const t = (now - s.start) / duration
        if (t >= 1) return false
        const e = ease(t)
        const dist = e * radius
        const len = 10 * (1 - e)
        const x1 = s.x + dist * Math.cos(s.angle)
        const y1 = s.y + dist * Math.sin(s.angle)
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x1 + len * Math.cos(s.angle), y1 + len * Math.sin(s.angle))
        ctx.stroke()
        return true
      })
      raf = sparks.length ? requestAnimationFrame(draw) : 0
    }

    const onClick = (e) => {
      const now = performance.now()
      for (let i = 0; i < count; i++) {
        sparks.push({ x: e.clientX, y: e.clientY, angle: (2 * Math.PI * i) / count + Math.random() * 0.3, start: now })
      }
      if (!raf) raf = requestAnimationFrame(draw)
    }
    window.addEventListener('pointerdown', onClick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointerdown', onClick)
    }
  }, [count, radius, duration])

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 z-[99] h-full w-full" />
}

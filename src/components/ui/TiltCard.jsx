import { useRef } from 'react'
import { animated, to, useSpring } from '@react-spring/web'

// Inclinación 3D que sigue al puntero, con resorte de React Spring
// (estilo React Bits "TiltedCard"). También mueve un brillo especular.
export default function TiltCard({ children, className = '', max = 8, scale = 1.02 }) {
  const ref = useRef(null)
  const [{ rx, ry, s, gx, gy, glare }, api] = useSpring(() => ({
    rx: 0,
    ry: 0,
    s: 1,
    gx: 50,
    gy: 50,
    glare: 0,
    config: { mass: 1, tension: 260, friction: 26 },
  }))

  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    api.start({ rx: (0.5 - py) * max * 2, ry: (px - 0.5) * max * 2, s: scale, gx: px * 100, gy: py * 100, glare: 1 })
  }
  const onLeave = () => api.start({ rx: 0, ry: 0, s: 1, glare: 0 })

  return (
    <div className="[perspective:1200px]">
      <animated.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className={`relative [transform-style:preserve-3d] ${className}`}
        style={{
          transform: to([rx, ry, s], (x, y, z) => `rotateX(${x}deg) rotateY(${y}deg) scale(${z})`),
        }}
      >
        {children}
        <animated.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] mix-blend-overlay"
          style={{
            opacity: glare.to((g) => g * 0.55),
            background: to(
              [gx, gy],
              (x, y) => `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,.55), transparent 55%)`,
            ),
          }}
        />
      </animated.div>
    </div>
  )
}

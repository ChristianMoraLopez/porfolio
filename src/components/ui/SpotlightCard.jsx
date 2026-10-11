import { useRef } from 'react'

// Tarjeta con un foco de luz que sigue al puntero (estilo React Bits
// "SpotlightCard"). Usa variables CSS para no re-renderizar.
export default function SpotlightCard({ children, className = '', color = 'var(--glow)', as: Tag = 'div', ...rest }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <Tag ref={ref} onPointerMove={onMove} className={`group/spot card overflow-hidden ${className}`} {...rest}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{ background: `radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), ${color}, transparent 65%)` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          padding: 1,
          background: `radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), var(--accent), transparent 70%)`,
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </Tag>
  )
}

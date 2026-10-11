import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'

// Cursor personalizado: un punto exacto y un anillo con resorte que crece
// sobre enlaces y muestra una etiqueta en elementos con data-cursor.
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [state, setState] = useState({ hover: false, label: '', down: false, hidden: true })
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 })
  const ry = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return
    setEnabled(true)
    document.documentElement.classList.add('has-cursor')

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const target = e.target instanceof Element ? e.target : null
      const labelled = target?.closest('[data-cursor]')
      const interactive = target?.closest('a, button, [role="button"], input, label, select')
      setState((s) => {
        const next = {
          ...s,
          hidden: false,
          hover: Boolean(labelled || interactive),
          label: labelled?.getAttribute('data-cursor') ?? '',
        }
        return next.hover === s.hover && next.label === s.label && !s.hidden ? s : next
      })
    }
    const down = () => setState((s) => ({ ...s, down: true }))
    const up = () => setState((s) => ({ ...s, down: false }))
    const leave = () => setState((s) => ({ ...s, hidden: true }))

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [x, y])

  if (!enabled) return null
  const size = state.label ? 88 : state.hover ? 56 : 34

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <motion.div
        className="absolute top-0 left-0 grid place-items-center rounded-full border border-fg/40"
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: size,
          height: size,
          opacity: state.hidden ? 0 : 1,
          scale: state.down ? 0.85 : 1,
          backgroundColor: state.label ? 'var(--accent)' : state.hover ? 'rgba(127,127,127,0.14)' : 'rgba(127,127,127,0)',
          borderColor: state.label ? 'var(--accent)' : 'var(--line-strong)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      >
        <AnimatePresence>
          {state.label && (
            <motion.span
              key={state.label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="font-mono text-[11px] font-medium tracking-wide text-white"
            >
              {state.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div
        className="absolute top-0 left-0 size-1.5 rounded-full bg-fg"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: state.hidden || state.label ? 0 : 1 }}
      />
    </div>
  )
}

import { useRef } from 'react'
import Logo from './ui/Logo'
import { gsap, useGSAP } from '../lib/gsap'

// Intro: el logo se dibuja trazo a trazo, cuenta hasta 100 y la cortina sube
// revelando el sitio. Se muestra una vez por sesión.
export default function Preloader({ onReveal, onDone }) {
  const root = useRef(null)

  useGSAP(
    () => {
      const counter = { v: 0 }
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, onComplete: onDone })

      tl.set('.pre-logo .logo-gear', { opacity: 0, scale: 0.6, transformOrigin: '50% 50%' })
        .from('.pre-logo .logo-trace', { drawSVG: 0, duration: 1.3, ease: 'power2.inOut', stagger: 0.15 }, 0.15)
        .to('.pre-logo .logo-gear', { opacity: 1, scale: 1, rotate: 360, duration: 1.4 }, 0.35)
        .to(
          counter,
          {
            v: 100,
            duration: 1.7,
            ease: 'power2.inOut',
            onUpdate: () => {
              const el = root.current?.querySelector('.pre-count')
              if (el) el.textContent = String(Math.round(counter.v)).padStart(3, '0')
            },
          },
          0,
        )
        .from('.pre-name span', { yPercent: 110, duration: 0.9, stagger: 0.035 }, 0.35)
        .to('.pre-bar', { scaleX: 1, duration: 1.7, ease: 'power2.inOut' }, 0)
        .to('.pre-content', { opacity: 0, y: -30, duration: 0.5, ease: 'power2.in' }, '+=0.15')
        .add(() => onReveal?.(), '-=0.2')
        .to(root.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1, ease: 'expo.inOut' }, '<')
    },
    { scope: root },
  )

  return (
    <div
      ref={root}
      className="noise fixed inset-0 z-[90] grid place-items-center bg-bg"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      aria-hidden
    >
      <div className="pre-content flex flex-col items-center gap-6">
        <Logo className="pre-logo size-24 text-accent sm:size-28" />
        <div className="overflow-hidden">
          <p className="pre-name font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            {'Christian Mora'.split('').map((c, i) => (
              <span key={i} className="inline-block whitespace-pre">
                {c}
              </span>
            ))}
          </p>
        </div>
        <div className="flex w-48 items-center gap-3">
          <div className="h-px flex-1 overflow-hidden bg-line">
            <div className="pre-bar h-full origin-left scale-x-0 bg-linear-to-r from-accent via-accent-2 to-accent-3" />
          </div>
          <span className="pre-count font-mono text-xs text-muted tabular-nums">000</span>
        </div>
      </div>
    </div>
  )
}

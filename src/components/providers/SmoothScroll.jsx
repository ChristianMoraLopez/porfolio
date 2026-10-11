import { createContext, useContext, useEffect, useState } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/gsap'

const LenisContext = createContext(null)

// Scroll suave con Lenis, sincronizado con el ticker de GSAP para que
// ScrollTrigger y los efectos de Motion lean la misma posición.
export function SmoothScroll({ children }) {
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const instance = new Lenis({ duration: 1.15, smoothWheel: true, autoRaf: false })
    instance.on('scroll', ScrollTrigger.update)
    const tick = (time) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    setLenis(instance)

    return () => {
      gsap.ticker.remove(tick)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

export const useLenis = () => useContext(LenisContext)

export function useScrollTo() {
  const lenis = useLenis()
  return (target) => {
    const el = typeof target === 'string' ? document.getElementById(target) : target
    if (!el && target !== 0) return
    if (lenis) lenis.scrollTo(target === 0 ? 0 : el, { duration: 1.6 })
    else if (target === 0) window.scrollTo({ top: 0, behavior: 'smooth' })
    else el.scrollIntoView({ behavior: 'smooth' })
  }
}

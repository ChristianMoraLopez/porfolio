import { useCallback, useEffect, useState } from 'react'
import { flushSync } from 'react-dom'

const getInitial = () => document.documentElement.classList.contains('dark')

// Tema claro/oscuro. Si el navegador soporta View Transitions, el cambio se
// revela con un círculo que crece desde el botón.
export function useTheme() {
  const [dark, setDark] = useState(getInitial)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#05060b' : '#f5f6fa')
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    } catch {
      // Sin almacenamiento disponible: el tema solo dura esta visita.
    }
  }, [dark])

  const toggle = useCallback((event) => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reduce || !event) {
      setDark((d) => !d)
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

    const transition = document.startViewTransition(() => {
      flushSync(() => setDark((d) => !d))
    })
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 750, easing: 'cubic-bezier(.7,0,.2,1)', pseudoElement: '::view-transition-new(root)' },
      )
    })
  }, [])

  return { dark, toggle }
}

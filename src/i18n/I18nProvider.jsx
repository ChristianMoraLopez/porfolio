import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { flushSync } from 'react-dom'
import { ui } from './ui'

const LANGS = ['es', 'en']
const I18nContext = createContext(null)

// Prioridad: ?lang= en la URL, luego la preferencia guardada y por último
// el idioma del navegador (español si empieza por "es", si no inglés).
const detect = () => {
  try {
    const param = new URLSearchParams(location.search).get('lang')
    if (LANGS.includes(param)) return param
    const saved = localStorage.getItem('lang')
    if (LANGS.includes(saved)) return saved
  } catch {
    // Sin almacenamiento: se usa el idioma del navegador.
  }
  return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en'
}

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(detect)

  useEffect(() => {
    const t = ui[lang]
    document.documentElement.lang = lang
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
    try {
      localStorage.setItem('lang', lang)
    } catch {
      // Sin almacenamiento: el idioma solo dura esta visita.
    }
  }, [lang])

  // Cambia de idioma con un fundido suave si el navegador soporta View Transitions.
  const setLang = useCallback((next) => {
    if (next === document.documentElement.lang) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reduce) {
      setLangState(next)
      return
    }
    const transition = document.startViewTransition(() => flushSync(() => setLangState(next)))
    transition.ready.then(() => {
      const opts = { duration: 450, easing: 'cubic-bezier(.4,0,.2,1)' }
      document.documentElement.animate({ opacity: [1, 0] }, { ...opts, pseudoElement: '::view-transition-old(root)' })
      document.documentElement.animate(
        { opacity: [0, 1], filter: ['blur(6px)', 'blur(0)'] },
        { ...opts, pseudoElement: '::view-transition-new(root)' },
      )
    })
  }, [])

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: ui[lang],
      // Resuelve campos bilingües { es, en }; deja igual cualquier otro valor.
      l: (v) => (v && typeof v === 'object' && !Array.isArray(v) && 'es' in v ? v[lang] : v),
      locale: lang === 'es' ? 'es-CO' : 'en-US',
    }),
    [lang, setLang],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export const useI18n = () => useContext(I18nContext)

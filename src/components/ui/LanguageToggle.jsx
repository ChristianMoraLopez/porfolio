import { motion } from 'motion/react'
import { useI18n } from '../../i18n/I18nProvider'

const options = [
  { id: 'es', label: 'ES', name: 'Español' },
  { id: 'en', label: 'EN', name: 'English' },
]

// Selector ES / EN con una píldora que se desliza al idioma activo.
export default function LanguageToggle({ className = '', layoutId = 'lang-pill' }) {
  const { lang, setLang, t } = useI18n()

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className={`relative flex h-10 items-center rounded-full border border-line bg-surface/60 p-1 ${className}`}
    >
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          lang={o.id}
          onClick={() => setLang(o.id)}
          aria-pressed={lang === o.id}
          aria-label={o.name}
          title={o.name}
          className={`relative grid h-full w-8 place-items-center rounded-full font-mono text-[11px] font-medium tracking-wide transition-colors ${
            lang === o.id ? 'text-bg' : 'text-muted hover:text-fg'
          }`}
        >
          {lang === o.id && (
            <motion.span
              layoutId={layoutId}
              className="absolute inset-0 rounded-full bg-fg"
              transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            />
          )}
          <span className="relative">{o.label}</span>
        </button>
      ))}
    </div>
  )
}

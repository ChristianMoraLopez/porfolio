import { AnimatePresence, motion } from 'motion/react'
import { FiMoon, FiSun } from 'react-icons/fi'
import { useI18n } from '../../i18n/I18nProvider'

export default function ThemeToggle({ dark, onToggle, className = '' }) {
  const { t } = useI18n()
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={dark ? t.theme.toLight : t.theme.toDark}
      className={`relative grid size-10 place-items-center overflow-hidden rounded-full border border-line bg-surface/60 text-fg transition-colors hover:border-line-strong ${className}`}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={dark ? 'moon' : 'sun'}
          initial={{ y: 18, rotate: -90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -18, rotate: 90, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          className="grid place-items-center"
        >
          {dark ? <FiMoon /> : <FiSun />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

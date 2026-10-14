import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { FiArrowUpRight, FiMenu, FiX } from 'react-icons/fi'
import Logo from './ui/Logo'
import ThemeToggle from './ui/ThemeToggle'
import LanguageToggle from './ui/LanguageToggle'
import { useI18n } from '../i18n/I18nProvider'
import { useScrollTo } from './providers/SmoothScroll'
import { profile } from '../data/profile'

const links = ['inicio', 'proyectos', 'sobre-mi', 'contacto']

export default function Navbar({ dark, onToggleTheme }) {
  const { t } = useI18n()
  const scrollTo = useScrollTo()
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('inicio')
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (v) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(v > prev && v > 240 && !open)
    setScrolled(v > 24)
  })

  useEffect(() => {
    const sections = [...document.querySelectorAll('[data-nav]')]
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.getAttribute('data-nav')))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
  }, [open])

  const go = (id) => {
    setOpen(false)
    scrollTo(id === 'inicio' ? 0 : id)
  }

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-linear-to-r from-accent via-accent-2 to-accent-3"
        style={{ scaleX: progress }}
      />

      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4"
      >
        <nav
          className={`mx-auto flex max-w-5xl items-center justify-between gap-2 rounded-full border py-2 pr-2 pl-3 transition-[background-color,border-color,box-shadow] duration-500 ${
            scrolled
              ? 'border-line bg-bg/70 shadow-[0_10px_40px_-10px_rgb(0_0_0/0.35)] backdrop-blur-xl'
              : 'border-transparent bg-transparent'
          }`}
        >
          <button type="button" onClick={() => go('inicio')} className="group flex shrink-0 items-center gap-2.5" aria-label={t.nav.home}>
            <Logo className="size-8 text-accent transition-transform duration-700 group-hover:rotate-[360deg]" />
            <span className="hidden font-display text-[15px] font-semibold tracking-tight min-[360px]:inline">Christian Mora</span>
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((id) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => go(id)}
                  className={`relative rounded-full px-4 py-2 text-sm whitespace-nowrap transition-colors ${
                    active === id ? 'text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  {active === id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full border border-line bg-surface"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {t.nav.links[id]}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <LanguageToggle />
            <ThemeToggle dark={dark} onToggle={onToggleTheme} />
            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden items-center gap-1.5 rounded-full bg-fg px-4 py-2.5 text-sm font-medium whitespace-nowrap text-bg transition-transform hover:scale-[1.03] lg:inline-flex"
            >
              {t.nav.cta}
              <FiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="grid size-10 place-items-center rounded-full border border-line bg-surface/60 md:hidden"
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={open}
            >
              {open ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 2.5rem) 2.5rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
            transition={{ duration: 0.7, ease: [0.7, 0, 0.2, 1] }}
            className="noise fixed inset-0 z-40 flex flex-col justify-between bg-bg px-6 pt-28 pb-10 md:hidden"
          >
            <ul className="space-y-2">
              {links.map((id, i) => (
                <li key={id} className="overflow-hidden">
                  <motion.button
                    type="button"
                    onClick={() => go(id)}
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '110%' }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-baseline gap-3 font-display text-5xl font-semibold tracking-tight"
                  >
                    <span className="font-mono text-xs text-muted">0{i + 1}</span>
                    <span className={active === id ? 'text-gradient' : ''}>{t.nav.links[id]}</span>
                  </motion.button>
                </li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.45 }}
              className="space-y-3 text-sm text-muted"
            >
              <a href={`mailto:${profile.email}`} className="block text-fg">
                {profile.email}
              </a>
              <div className="flex gap-4">
                <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

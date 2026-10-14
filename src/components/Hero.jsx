import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import { FiArrowDown, FiArrowUpRight, FiGithub, FiLinkedin, FiMapPin } from 'react-icons/fi'
import {
  SiDocker,
  SiDuckdb,
  SiKotlin,
  SiNextdotjs,
  SiOllama,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRust,
  SiSupabase,
  SiTauri,
  SiTypescript,
} from 'react-icons/si'
import Logo from './ui/Logo'
import Magnetic from './ui/Magnetic'
import ShaderBackground from './ui/ShaderBackground'
import { useScrollTo } from './providers/SmoothScroll'
import { gsap, SplitText, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { profile } from '../data/profile'
import { useI18n } from '../i18n/I18nProvider'

const orbits = [
  { radius: 24, duration: 26, icons: [SiReact, SiTypescript, SiNextdotjs] },
  { radius: 36, duration: 40, reverse: true, icons: [SiPython, SiRust, SiSupabase, SiDuckdb] },
  { radius: 47, duration: 58, icons: [SiTauri, SiPostgresql, SiOllama, SiDocker, SiKotlin] },
]

// Sistema "planetario": el logo es el sol y las tecnologías orbitan alrededor.
function OrbitSystem() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 60, damping: 18 })
  const y = useSpring(my, { stiffness: 60, damping: 18 })
  const { scrollY } = useScroll()
  const spin = useTransform(scrollY, [0, 900], [0, 140])
  const scale = useTransform(scrollY, [0, 900], [1, 0.75])

  useEffect(() => {
    const onMove = (e) => {
      mx.set((e.clientX / innerWidth - 0.5) * -36)
      my.set((e.clientY / innerHeight - 0.5) * -36)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [mx, my])

  return (
    <motion.div
      style={{ x, y, scale }}
      className="hero-orbit relative aspect-square w-full max-w-[560px]"
    >
      {orbits.map((o, i) => (
        <div
          key={i}
          className="absolute top-1/2 left-1/2 rounded-full border border-dashed border-line-strong"
          style={{ width: `${o.radius * 2}%`, height: `${o.radius * 2}%`, translate: '-50% -50%' }}
        >
          <div
            className="absolute inset-0 animate-spin"
            style={{ animationDuration: `${o.duration}s`, animationDirection: o.reverse ? 'reverse' : 'normal' }}
          >
            {o.icons.map((Icon, j) => {
              const angle = ((360 / o.icons.length) * j + i * 25) * (Math.PI / 180)
              return (
                <div
                  key={j}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${50 + 50 * Math.cos(angle)}%`, top: `${50 + 50 * Math.sin(angle)}%` }}
                >
                  <div
                    className="animate-spin"
                    style={{
                      animationDuration: `${o.duration}s`,
                      animationDirection: o.reverse ? 'normal' : 'reverse',
                    }}
                  >
                    <div className="grid size-10 place-items-center rounded-2xl border border-line bg-surface/80 text-lg text-fg/80 shadow-lg backdrop-blur sm:size-12 sm:text-xl">
                      <Icon />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      <motion.div style={{ rotate: spin }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-0 -z-10 scale-150 rounded-full bg-accent/30 blur-3xl" />
        <Logo className="hero-sun size-28 text-accent drop-shadow-[0_0_30px_var(--glow)] sm:size-36" />
      </motion.div>
    </motion.div>
  )
}

export default function Hero({ ready }) {
  const root = useRef(null)
  const { lang, t, l } = useI18n()
  const crafts = l(profile.crafts)
  const scrollTo = useScrollTo()
  const { scrollY } = useScroll()
  const contentY = useTransform(scrollY, [0, 700], [0, -140])
  const contentOpacity = useTransform(scrollY, [0, 520], [1, 0])

  useGSAP(
    () => {
      if (!ready || prefersReducedMotion()) return

      const split = SplitText.create('.hero-name', { type: 'words,chars', mask: 'chars', charsClass: 'split-char' })
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.from(split.chars, { yPercent: 120, rotate: 8, duration: 1.3, stagger: 0.035 })
        .from('.hero-fade', { y: 30, opacity: 0, duration: 1, stagger: 0.08 }, 0.35)
        .from('.hero-orbit', { scale: 0.6, opacity: 0, rotate: -40, duration: 1.8 }, 0.1)
        .from('.hero-sun .logo-trace', { drawSVG: 0, duration: 1.6, ease: 'power2.inOut' }, 0.3)
    },
    { scope: root, dependencies: [ready] },
  )

  // Las frases rotan con efecto "decrypt" (GSAP ScrambleText) y se reinician
  // en el idioma nuevo; el span lleva key={lang} para que React lo recree.
  useGSAP(
    () => {
      if (!ready || prefersReducedMotion()) return
      const scramble = gsap.timeline({ repeat: -1, delay: 1.6 })
      crafts.forEach((_, i) => {
        scramble.to('.hero-craft', {
          duration: 1.1,
          scrambleText: { text: crafts[(i + 1) % crafts.length], chars: '01<>/{}*#', speed: 0.5, revealDelay: 0.25 },
          ease: 'none',
          delay: 2.2,
        })
      })
    },
    { scope: root, dependencies: [ready, lang], revertOnUpdate: true },
  )

  return (
    <section ref={root} id="inicio" data-nav="inicio" className="noise relative isolate min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0 -z-20">
        <ShaderBackground />
      </div>
      <div className="dot-grid absolute inset-0 -z-10 opacity-50 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-linear-to-b from-transparent to-bg" />

      <div className="container-x grid min-h-[100svh] grid-cols-1 items-center gap-10 pt-28 pb-24 lg:grid-cols-[1.15fr_1fr]">
        <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 min-w-0">
          <div className="hero-fade mb-7 flex flex-wrap items-center gap-2">
            <span className="chip">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping-slow rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              {t.hero.available}
            </span>
            <span className="chip">
              <FiMapPin /> {profile.location}
            </span>
          </div>

          <h1 className="hero-name font-display text-[clamp(2.6rem,15vw,6.2rem)] xl:text-[8.2rem] leading-[0.86] font-bold tracking-[-0.04em]">
            Christian
            <br />
            Mora<span className="text-accent">.</span>
          </h1>

          <p className="hero-fade mt-6 font-display text-[clamp(1.3rem,5.6vw,2.4rem)] sm:mt-8 leading-tight font-medium tracking-tight">
            <span className="text-muted">{t.hero.build} </span>
            <span key={lang} className="hero-craft text-gradient">
              {crafts[0]}
            </span>
          </p>

          <p className="hero-fade mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {l(profile.role)} {t.hero.intro}
          </p>

          <div className="hero-fade mt-10 flex flex-wrap items-center gap-3">
            <Magnetic>
              <button
                type="button"
                onClick={() => scrollTo('proyectos')}
                data-cursor={t.hero.cursorSee}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-fg px-6 py-3.5 font-medium text-bg sm:px-7 sm:py-4"
              >
                <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-accent via-accent-2 to-accent-3 transition-transform duration-500 ease-out group-hover:translate-x-0" />
                <span className="relative">{t.hero.seeProjects}</span>
                <FiArrowDown className="relative transition-transform group-hover:translate-y-0.5" />
              </button>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface/40 px-6 py-3.5 font-medium backdrop-blur transition-colors hover:border-fg sm:px-7 sm:py-4"
              >
                {t.hero.talk}
                <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>
            <div className="ml-1 flex items-center gap-1">
              {[
                { href: profile.github, Icon: FiGithub, label: 'GitHub' },
                { href: profile.linkedin, Icon: FiLinkedin, label: 'LinkedIn' },
              ].map(({ href, Icon, label }) => (
                <Magnetic key={label} strength={0.5}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid size-12 place-items-center rounded-full text-xl text-muted transition-colors hover:text-fg"
                  >
                    <Icon />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="pointer-events-auto absolute inset-0 -z-10 grid place-items-center opacity-[0.16] lg:relative lg:inset-auto lg:z-0 lg:opacity-100">
          <OrbitSystem />
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollTo('proyectos')}
        className="hero-fade absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs tracking-[0.3em] text-muted uppercase sm:flex"
        aria-label={t.hero.scrollLabel}
      >
        <span className="flex h-10 w-6 justify-center rounded-full border border-line-strong p-1.5">
          <motion.span
            className="size-1.5 rounded-full bg-fg"
            animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
        {t.hero.scroll}
      </button>
    </section>
  )
}

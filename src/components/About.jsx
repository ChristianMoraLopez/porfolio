import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { FiBookOpen, FiBriefcase, FiDatabase, FiLayers, FiMapPin, FiMonitor, FiServer, FiZap } from 'react-icons/fi'
import CountUp from './ui/CountUp'
import SpotlightCard from './ui/SpotlightCard'
import { gsap, SplitText, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { profile, skillGroups, timeline } from '../data/profile'

const groupIcons = { layers: FiLayers, server: FiServer, database: FiDatabase, monitor: FiMonitor }
const kindIcons = { build: FiZap, work: FiBriefcase, study: FiBookOpen }

function BogotaClock() {
  const format = () =>
    new Intl.DateTimeFormat('es-CO', {
      timeZone: 'America/Bogota',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(new Date())
  const [time, setTime] = useState(format)
  useEffect(() => {
    const id = setInterval(() => setTime(format()), 1000)
    return () => clearInterval(id)
  }, [])
  return <span className="font-mono tabular-nums">{time}</span>
}

const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
}

function Timeline() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <div ref={ref} className="relative pl-10 sm:pl-14">
      <div className="absolute top-2 bottom-2 left-[15px] w-px bg-line sm:left-[23px]" />
      <motion.div
        className="absolute top-2 bottom-2 left-[15px] w-px origin-top bg-linear-to-b from-accent via-accent-2 to-accent-3 sm:left-[23px]"
        style={{ scaleY: line }}
      />
      <ol className="space-y-10">
        {timeline.map((item, i) => {
          const Icon = kindIcons[item.kind]
          return (
            <motion.li
              key={item.title}
              {...reveal}
              transition={{ type: 'spring', stiffness: 120, damping: 20, delay: i * 0.04 }}
              className="relative"
            >
              <span className="absolute top-0 -left-10 grid size-8 place-items-center rounded-full border border-line-strong bg-bg text-accent sm:-left-14 sm:size-12">
                <Icon className="sm:text-lg" />
              </span>
              <p className="font-mono text-xs text-muted">{item.period}</p>
              <h4 className="mt-1 font-display text-xl font-semibold tracking-tight sm:text-2xl">{item.title}</h4>
              <p className="text-sm text-accent">{item.place}</p>
              <p className="mt-2 max-w-2xl leading-relaxed text-muted">{item.detail}</p>
            </motion.li>
          )
        })}
      </ol>
    </div>
  )
}

export default function About() {
  const root = useRef(null)

  // El primer párrafo se "enciende" palabra por palabra al hacer scroll.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      SplitText.create('.about-lead', {
        type: 'words',
        autoSplit: true,
        onSplit(self) {
          return gsap.fromTo(
            self.words,
            { opacity: 0.12 },
            {
              opacity: 1,
              stagger: 0.1,
              ease: 'none',
              scrollTrigger: { trigger: '.about-lead', start: 'top 80%', end: 'bottom 45%', scrub: true },
            },
          )
        },
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="sobre-mi" data-nav="sobre-mi" className="relative py-28 sm:py-36">
      <div className="container-x">
        <p className="chip mb-8">03 — Sobre mí</p>
        <p className="about-lead max-w-5xl font-display text-[clamp(1.6rem,3.6vw,3rem)] leading-[1.15] font-medium tracking-tight">
          {profile.bio[0]}
        </p>

        <div className="mt-20 grid gap-4 md:grid-cols-6 lg:grid-cols-12">
          {profile.stats.map((s, i) => (
            <motion.div
              key={s.label}
              {...reveal}
              transition={{ type: 'spring', stiffness: 120, damping: 20, delay: i * 0.06 }}
              className="md:col-span-3"
            >
              <SpotlightCard className="h-full p-6 sm:p-7">
                <CountUp
                  value={s.value}
                  suffix={s.suffix}
                  className="text-gradient font-display text-5xl font-bold tracking-tight sm:text-6xl"
                />
                <p className="mt-2 text-sm text-muted">{s.label}</p>
              </SpotlightCard>
            </motion.div>
          ))}

          <motion.div {...reveal} transition={{ type: 'spring', stiffness: 120, damping: 20 }} className="md:col-span-4 lg:col-span-8">
            <SpotlightCard className="h-full p-7 sm:p-9">
              <p className="chip">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping-slow rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent" />
                </span>
                Ahora mismo
              </p>
              <p className="mt-6 text-lg leading-relaxed text-fg/90 sm:text-xl">{profile.bio[1]}</p>
            </SpotlightCard>
          </motion.div>

          <motion.div {...reveal} transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.08 }} className="md:col-span-2 lg:col-span-4">
            <SpotlightCard className="flex h-full flex-col justify-between gap-8 p-7">
              <div className="flex items-center gap-2 text-muted">
                <FiMapPin /> {profile.location}
              </div>
              <div>
                <p className="font-display text-4xl font-semibold tracking-tight">
                  <BogotaClock />
                </p>
                <p className="mt-1 text-sm text-muted">Hora local · UTC−5</p>
              </div>
              <p className="text-sm text-muted">{profile.languages}</p>
            </SpotlightCard>
          </motion.div>

          {skillGroups.map((g, i) => {
            const Icon = groupIcons[g.icon]
            return (
              <motion.div
                key={g.title}
                {...reveal}
                transition={{ type: 'spring', stiffness: 120, damping: 20, delay: i * 0.06 }}
                className="md:col-span-3 lg:col-span-6"
              >
                <SpotlightCard className="h-full p-7">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl bg-accent/10 text-accent">
                      <Icon />
                    </span>
                    <h3 className="font-display text-xl font-semibold tracking-tight">{g.title}</h3>
                  </div>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {g.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-line bg-bg-soft px-3 py-1.5 text-sm transition-colors hover:border-accent hover:text-accent"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-28 grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <h3 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Recorrido</h3>
            <p className="mt-4 max-w-xs text-muted">
              Del soporte en inglés en Amazon al backend financiero y a los datos y la automatización en Capgemini.
            </p>
          </div>
          <Timeline />
        </div>
      </div>
    </section>
  )
}

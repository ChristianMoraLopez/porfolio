import { useRef, useState } from 'react'
import { motion, useMotionValue } from 'motion/react'
import { FiArrowUpRight, FiCheck, FiGithub, FiLock, FiDownload } from 'react-icons/fi'
import SplitReveal from './ui/SplitReveal'
import TiltCard from './ui/TiltCard'
import { BrowserFrame, DesktopFrame } from './ui/Frames'
import { KeplerMock, TelescopeMock } from './ProjectMocks'
import { gsap, useGSAP } from '../lib/gsap'
import { featured } from '../data/projects'

function Visual({ project }) {
  if (project.visual === 'telescope')
    return (
      <DesktopFrame title="Telescope 2.0 — explorador de datos">
        <TelescopeMock />
      </DesktopFrame>
    )
  if (project.visual === 'kepler')
    return (
      <DesktopFrame title="Kepler — catálogo histórico">
        <KeplerMock />
      </DesktopFrame>
    )
  if (project.image.endsWith('.svg'))
    return (
      <DesktopFrame title={`${project.name} — Windows`}>
        <img src={project.image} alt={`Vista previa animada de ${project.name}`} className="h-full w-full object-cover" />
      </DesktopFrame>
    )
  return (
    <BrowserFrame url={project.url}>
      <img
        src={project.image}
        alt={`Captura de ${project.name}`}
        loading="lazy"
        className="h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-out group-hover/visual:scale-[1.04]"
      />
    </BrowserFrame>
  )
}

function ProjectLinks({ project }) {
  const base =
    'group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all duration-300'
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {project.demo && (
        <a href={project.demo} target="_blank" rel="noopener noreferrer" className={`${base} bg-fg text-bg hover:scale-[1.03]`}>
          Ver en vivo
          <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      )}
      {project.release && (
        <a href={project.release} target="_blank" rel="noopener noreferrer" className={`${base} bg-fg text-bg hover:scale-[1.03]`}>
          Descargar release
          <FiDownload className="transition-transform group-hover:translate-y-0.5" />
        </a>
      )}
      {project.repo && (
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} border border-line-strong hover:border-fg`}
        >
          <FiGithub />
          Código
        </a>
      )}
      {!project.repo && (
        <span className={`${base} border border-dashed border-line-strong text-muted`}>
          <FiLock />
          Código privado
        </span>
      )}
    </div>
  )
}

function Panel({ project, index }) {
  const [a, b] = project.accent
  return (
    <article className="feat-panel relative flex w-full shrink-0 items-center lg:motion-safe:h-full lg:motion-safe:w-screen">
      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-[4%] hidden -translate-y-1/2 font-display text-[22vw] leading-none font-bold text-transparent opacity-40 [-webkit-text-stroke:1px_var(--line-strong)] lg:block"
      >
        0{index + 1}
      </span>

      <div className="container-x relative grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 lg:col-span-5">
          <div className="feat-reveal flex flex-wrap items-center gap-3 font-mono text-xs text-muted">
            <span className="text-fg">0{index + 1}</span>
            <span className="h-px w-8 bg-line-strong" />
            <span>{project.kind}</span>
            <span>·</span>
            <span>{project.year}</span>
          </div>
          <h3 className="feat-reveal mt-5 font-display text-[clamp(2rem,10vw,3rem)] leading-[1.02] font-bold tracking-tight [overflow-wrap:anywhere] xl:text-6xl">{project.name}</h3>
          <p className="feat-reveal mt-4 font-display text-lg leading-snug text-fg/90 sm:text-xl xl:text-2xl">{project.tagline}</p>
          <p className="feat-reveal mt-4 leading-relaxed text-muted">{project.description}</p>
          <ul className="feat-reveal mt-6 flex flex-wrap gap-2">
            {project.highlights.map((h) => (
              <li key={h} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/60 px-3 py-1.5 text-xs">
                <FiCheck style={{ color: a }} />
                {h}
              </li>
            ))}
          </ul>
          <div className="feat-reveal mt-5 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-muted">
            {project.stack.map((s) => (
              <span key={s}>#{s.replace(/\s+/g, '')}</span>
            ))}
          </div>
          <div className="feat-reveal mt-8">
            <ProjectLinks project={project} />
          </div>
        </div>

        <div className="relative min-w-0 lg:col-span-7">
          <div
            aria-hidden
            className="absolute -inset-3 -z-10 sm:-inset-10 rounded-full opacity-50 blur-3xl"
            style={{ background: `radial-gradient(closest-side, ${a}, transparent), radial-gradient(closest-side at 80% 80%, ${b}, transparent)` }}
          />
          <div className="feat-visual">
            <a
              href={project.demo || project.repo || undefined}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor={project.demo ? 'Abrir' : project.repo ? 'Código' : 'Privado'}
              className="group/visual block"
              onClick={(e) => !(project.demo || project.repo) && e.preventDefault()}
            >
              <TiltCard max={5}>
                <Visual project={project} />
              </TiltCard>
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Featured() {
  const root = useRef(null)
  const progress = useMotionValue(0)
  const [current, setCurrent] = useState(0)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const track = root.current.querySelector('.feat-track')
        const panels = gsap.utils.toArray('.feat-panel')
        const distance = () => track.scrollWidth - window.innerWidth

        const scroller = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: '.feat-pin',
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              progress.set(self.progress)
              setCurrent(Math.min(panels.length - 1, Math.round(self.progress * (panels.length - 1))))
            },
          },
        })

        panels.forEach((panel, i) => {
          const items = panel.querySelectorAll('.feat-reveal')
          const trigger =
            i === 0
              ? { trigger: '.feat-pin', start: 'top 70%' }
              : { trigger: panel, containerAnimation: scroller, start: 'left 70%' }
          gsap.from(items, {
            y: 50,
            opacity: 0,
            duration: 0.9,
            ease: 'expo.out',
            stagger: 0.06,
            scrollTrigger: { ...trigger, toggleActions: 'play none none reverse' },
          })
          gsap.fromTo(
            panel.querySelector('.feat-visual'),
            { xPercent: i === 0 ? 0 : 14, rotate: i === 0 ? 0 : 3 },
            {
              xPercent: -10,
              rotate: -2,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scroller,
                start: i === 0 ? 'left left' : 'left right',
                end: 'right left',
                scrub: true,
              },
            },
          )
        })
      })

      mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray('.feat-panel').forEach((panel) => {
          gsap.from(panel.querySelectorAll('.feat-reveal, .feat-visual'), {
            y: 40,
            opacity: 0,
            duration: 0.9,
            ease: 'expo.out',
            stagger: 0.06,
            scrollTrigger: { trigger: panel, start: 'top 80%', once: true },
          })
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="proyectos" data-nav="proyectos" className="relative overflow-x-clip">
      <div className="container-x pt-28 pb-14 sm:pt-36">
        <p className="chip mb-6">01 — Proyectos destacados</p>
        <SplitReveal className="max-w-4xl font-display text-[clamp(2rem,9vw,5rem)] leading-[0.95] font-bold tracking-tight">
          Lo que más me enorgullece haber construido.
        </SplitReveal>
        <p className="mt-6 max-w-2xl text-base text-muted sm:text-lg">
          Productos reales: una app con IA que lee recibos de WhatsApp, herramientas de escritorio que procesan datos
          pesados en local y un e-commerce en producción.
        </p>
      </div>

      <div className="feat-pin relative lg:motion-safe:h-screen lg:motion-safe:overflow-hidden">
        <div className="feat-track flex flex-col gap-28 pb-10 lg:motion-safe:h-full lg:motion-safe:w-max lg:motion-safe:flex-row lg:motion-safe:gap-0 lg:motion-safe:pb-0">
          {featured.map((p, i) => (
            <Panel key={p.id} project={p} index={i} />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-8 hidden lg:motion-safe:block">
          <div className="container-x flex items-center gap-5 font-mono text-xs text-muted">
            <span className="text-fg tabular-nums">0{current + 1}</span>
            <div className="h-px flex-1 overflow-hidden bg-line">
              <motion.div className="h-full origin-left bg-fg" style={{ scaleX: progress }} />
            </div>
            <span className="tabular-nums">0{featured.length}</span>
            <span className="ml-4">{featured[current].name}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

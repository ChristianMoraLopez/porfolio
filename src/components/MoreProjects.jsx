import { useMemo, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import {
  FiArrowUpRight,
  FiCode,
  FiDatabase,
  FiGithub,
  FiLock,
  FiCrosshair,
  FiSearch,
  FiServer,
  FiShoppingBag,
  FiSmartphone,
  FiZap,
} from 'react-icons/fi'
import SpotlightCard from './ui/SpotlightCard'
import SplitReveal from './ui/SplitReveal'
import { categories, projects } from '../data/projects'
import { profile } from '../data/profile'

const icons = { scan: FiCrosshair, search: FiSearch, server: FiServer, database: FiDatabase, zap: FiZap, code: FiCode, phone: FiSmartphone, bag: FiShoppingBag }

function Cover({ project }) {
  if (project.image)
    return (
      <img
        src={project.image}
        alt={`Captura de ${project.name}`}
        loading="lazy"
        className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover/spot:scale-105"
      />
    )
  const Icon = icons[project.icon] ?? FiCode
  return (
    <div className="dot-grid relative grid h-full w-full place-items-center bg-bg-soft">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,var(--glow),transparent_60%)]" />
      <Icon className="relative text-5xl text-accent transition-transform duration-700 group-hover/spot:scale-110 group-hover/spot:rotate-6" />
      <span className="absolute bottom-3 left-4 font-mono text-[10px] text-muted">{project.stack.join(' · ')}</span>
    </div>
  )
}

function Card({ project }) {
  const href = project.demo || project.repo
  return (
    <SpotlightCard className="flex h-full flex-col rounded-3xl">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor={href ? (project.demo ? 'Abrir' : 'Código') : undefined}
        onClick={(e) => !href && e.preventDefault()}
        className="block aspect-[16/10] overflow-hidden rounded-t-3xl border-b border-line"
        tabIndex={href ? 0 : -1}
        aria-label={href ? `Abrir ${project.name}` : undefined}
      >
        <Cover project={project} />
      </a>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-semibold tracking-tight">{project.name}</h3>
          <span className="flex shrink-0 items-center gap-2 font-mono text-xs text-muted">
            {project.badge && (
              <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] text-accent">{project.badge}</span>
            )}
            {project.year}
          </span>
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span key={s} className="rounded-md bg-bg-soft px-2 py-1 font-mono text-[10px] text-muted">
              {s}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-4 text-sm">
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 font-medium">
              En vivo
              <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-fg">
              <FiGithub /> Código
            </a>
          )}
          {project.private && (
            <span className="inline-flex items-center gap-1.5 text-muted">
              <FiLock /> Privado
            </span>
          )}
        </div>
      </div>
    </SpotlightCard>
  )
}

export default function MoreProjects() {
  const [filter, setFilter] = useState('Todos')
  const [expanded, setExpanded] = useState(false)

  const list = useMemo(
    () => (filter === 'Todos' ? projects : projects.filter((p) => p.cats.includes(filter))),
    [filter],
  )
  const visible = expanded ? list : list.slice(0, 6)

  return (
    <section id="mas-proyectos" data-nav="proyectos" className="relative py-28 sm:py-36">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="chip mb-6">02 — Laboratorio</p>
            <SplitReveal className="max-w-3xl font-display text-[clamp(2.2rem,5vw,4.2rem)] leading-[0.95] font-bold tracking-tight">
              Más proyectos, experimentos y clientes.
            </SplitReveal>
          </div>

          <LayoutGroup id="filters">
            <div className="flex flex-wrap gap-1.5 rounded-full border border-line bg-surface/60 p-1.5 backdrop-blur" role="tablist">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={filter === c}
                  onClick={() => {
                    setFilter(c)
                    setExpanded(false)
                  }}
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors ${filter === c ? 'text-bg' : 'text-muted hover:text-fg'}`}
                >
                  {filter === c && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 -z-0 rounded-full bg-fg"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">{c}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>
        </div>

        <motion.ul layout className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.li
                layout
                key={p.name}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ type: 'spring', stiffness: 160, damping: 22, delay: (i % 3) * 0.06 }}
              >
                <Card project={p} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {list.length > 6 && (
            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              className="rounded-full border border-line-strong px-6 py-3 text-sm font-medium transition-colors hover:border-fg"
            >
              {expanded ? 'Ver menos' : `Ver los ${list.length} proyectos`}
            </button>
          )}
          <a
            href={`${profile.github}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm text-muted hover:text-fg"
          >
            <FiGithub /> Todo mi GitHub
            <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  )
}

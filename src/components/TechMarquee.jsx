import { FaAws, FaJava } from 'react-icons/fa'
import {
  SiDocker,
  SiDuckdb,
  SiGreensock,
  SiKotlin,
  SiLaravel,
  SiNextdotjs,
  SiNodedotjs,
  SiOllama,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRust,
  SiSpringboot,
  SiSupabase,
  SiTailwindcss,
  SiTauri,
  SiTypescript,
} from 'react-icons/si'
import VelocityMarquee from './ui/VelocityMarquee'

const rowA = [
  ['TypeScript', SiTypescript],
  ['React', SiReact],
  ['Next.js', SiNextdotjs],
  ['Node.js', SiNodedotjs],
  ['Tailwind', SiTailwindcss],
  ['GSAP', SiGreensock],
  ['Supabase', SiSupabase],
  ['PostgreSQL', SiPostgresql],
  ['AWS', FaAws],
]
const rowB = [
  ['Python', SiPython],
  ['Rust', SiRust],
  ['Tauri', SiTauri],
  ['DuckDB', SiDuckdb],
  ['Ollama', SiOllama],
  ['Kotlin', SiKotlin],
  ['Java', FaJava],
  ['Spring Boot', SiSpringboot],
  ['PHP', SiPhp],
  ['Laravel', SiLaravel],
  ['Docker', SiDocker],
]

const Row = ({ items, outline }) =>
  items.map(([name, Icon]) => (
    <span key={name} className="flex items-center gap-5 px-5 sm:gap-7 sm:px-7">
      <Icon className="text-[0.7em] text-accent" />
      <span className={outline ? 'text-transparent [-webkit-text-stroke:1px_var(--muted)]' : ''}>{name}</span>
      <span className="text-[0.45em] text-muted">✦</span>
    </span>
  ))

export default function TechMarquee() {
  return (
    <section aria-label="Tecnologías" className="relative border-y border-line bg-bg-soft/60 py-8 sm:py-10">
      <div className="space-y-3 font-display text-4xl font-semibold tracking-tight sm:text-6xl">
        <VelocityMarquee baseVelocity={-2.2}>
          <Row items={rowA} />
        </VelocityMarquee>
        <VelocityMarquee baseVelocity={2.2}>
          <Row items={rowB} outline />
        </VelocityMarquee>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-bg to-transparent" />
    </section>
  )
}

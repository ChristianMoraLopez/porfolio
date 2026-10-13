import { motion } from 'motion/react'
import { FiArrowUp, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import Logo from './ui/Logo'
import Magnetic from './ui/Magnetic'
import { useScrollTo } from './providers/SmoothScroll'
import { profile } from '../data/profile'

export default function Footer() {
  const scrollTo = useScrollTo()

  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="container-x flex flex-col gap-10 py-14 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Logo className="size-10 text-accent" />
            <span className="font-display text-xl font-semibold tracking-tight">Christian Mora</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted">
            Hecho con React, Motion, GSAP, React Spring, Lenis y un shader WebGL propio.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {[
            { href: profile.github, Icon: FiGithub, label: 'GitHub' },
            { href: profile.linkedin, Icon: FiLinkedin, label: 'LinkedIn' },
            { href: `mailto:${profile.email}`, Icon: FiMail, label: 'Correo' },
          ].map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={label}
              className="grid size-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-fg hover:text-fg"
            >
              <Icon />
            </a>
          ))}
          <Magnetic strength={0.5}>
            <button
              type="button"
              onClick={() => scrollTo(0)}
              aria-label="Volver arriba"
              className="group grid size-11 place-items-center rounded-full bg-fg text-bg"
            >
              <FiArrowUp className="transition-transform group-hover:-translate-y-0.5" />
            </button>
          </Magnetic>
        </div>
      </div>

      <div className="container-x flex flex-col gap-2 border-t border-line py-6 text-xs text-muted sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} {profile.fullName}. Todos los derechos reservados.</span>
        <span>{profile.location}</span>
      </div>

      <motion.p
        aria-hidden
        initial={{ y: '40%', opacity: 0 }}
        whileInView={{ y: '0%', opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none -mb-[0.2em] text-center font-display text-[12.5vw] leading-none font-bold tracking-[-0.05em] whitespace-nowrap text-transparent select-none [-webkit-text-stroke:1px_var(--line-strong)]"
      >
        Christian Mora
      </motion.p>
    </footer>
  )
}

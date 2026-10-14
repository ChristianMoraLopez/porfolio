import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { FiArrowUpRight, FiCheck, FiCoffee, FiCopy, FiGithub, FiLinkedin } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import Magnetic from './ui/Magnetic'
import SplitReveal from './ui/SplitReveal'
import VelocityMarquee from './ui/VelocityMarquee'
import { profile } from '../data/profile'
import { useI18n } from '../i18n/I18nProvider'

const channels = [
  { id: 'whatsapp', label: 'WhatsApp', href: profile.whatsapp, Icon: FaWhatsapp },
  { id: 'linkedin', label: 'LinkedIn', href: profile.linkedin, Icon: FiLinkedin },
  { id: 'github', label: 'GitHub', href: profile.github, Icon: FiGithub },
  { id: 'coffee', label: 'Buy me a coffee', href: profile.coffee, Icon: FiCoffee },
]

function CopyEmail() {
  const { t } = useI18n()
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      className="group inline-flex max-w-full min-w-0 items-center gap-2 rounded-full border border-line-strong bg-surface/60 py-2 pr-2 pl-4 backdrop-blur transition-colors hover:border-fg sm:gap-3 sm:pl-5"
    >
      <span className="min-w-0 truncate font-mono text-[12px] min-[380px]:text-sm sm:text-base">{profile.email}</span>
      <span className="relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-full bg-fg text-bg">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={copied ? 'ok' : 'copy'}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            {copied ? <FiCheck /> : <FiCopy />}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? t.contact.copied : ''}
      </span>
    </button>
  )
}

export default function Contact() {
  const { t } = useI18n()
  return (
    <section id="contacto" data-nav="contacto" className="relative overflow-hidden pt-10 pb-28 sm:pb-36">
      <VelocityMarquee baseVelocity={-1.6} className="border-y border-line py-6">
        {t.contact.marquee.map((w) => (
          <span key={w} className="flex items-center gap-6 px-6 font-display text-4xl font-bold tracking-tight sm:gap-8 sm:px-8 sm:text-7xl">
            {w}
            <span className="text-gradient text-4xl sm:text-5xl">✦</span>
          </span>
        ))}
      </VelocityMarquee>

      <div className="container-x mt-24 grid grid-cols-1 gap-16 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div className="min-w-0">
          <p className="chip mb-6">{t.contact.chip}</p>
          <SplitReveal
            type="words"
            className="font-display text-[clamp(2.1rem,10vw,6rem)] leading-[0.92] font-bold tracking-tight"
          >
            {t.contact.title}
          </SplitReveal>
          <p className="mt-6 max-w-lg text-lg text-muted">{t.contact.lead}</p>
          <div className="mt-10 flex flex-wrap items-center gap-6 [&>*]:max-w-full">
            <Magnetic strength={0.4}>
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor={t.contact.cursor}
                className="group relative grid size-32 place-items-center overflow-hidden rounded-full bg-fg text-bg sm:size-44"
              >
                <span className="absolute inset-0 scale-0 rounded-full bg-linear-to-br from-accent via-accent-2 to-accent-3 transition-transform duration-500 ease-out group-hover:scale-100" />
                <span className="relative flex flex-col items-center gap-1 font-medium">
                  <FaWhatsapp className="text-3xl" />
                  {t.contact.write}
                </span>
              </a>
            </Magnetic>
            <CopyEmail />
          </div>
        </div>

        <ul className="min-w-0 divide-y divide-line border-y border-line">
          {channels.map(({ id, label, href, Icon }, i) => (
            <motion.li
              key={id}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ type: 'spring', stiffness: 120, damping: 20, delay: i * 0.07 }}
            >
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 py-5 transition-[padding] duration-300 hover:pl-3 sm:gap-5 sm:py-6"
              >
                <span className="grid size-12 place-items-center rounded-2xl border border-line bg-surface text-xl transition-colors group-hover:border-accent group-hover:text-accent">
                  <Icon />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-xl font-semibold tracking-tight sm:text-2xl">{label}</span>
                  <span className="text-sm text-muted">{t.contact.channels[id]}</span>
                </span>
                <FiArrowUpRight className="text-2xl text-muted transition-all duration-300 group-hover:rotate-45 group-hover:text-fg" />
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

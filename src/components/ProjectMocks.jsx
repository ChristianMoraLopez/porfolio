import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { FiCheckCircle, FiSearch } from 'react-icons/fi'
import { useI18n } from '../i18n/I18nProvider'

// Mocks animados de las apps de escritorio privadas (no tienen demo pública).
// Todo se dimensiona con unidades de contenedor (cqw) para escalar con la tarjeta.

// Datos ficticios de ejemplo (marcas inventadas).
const rows = [
  ['0004127102', { es: 'Café molido 500 g', en: 'Ground coffee 500 g' }, 'Montaña', 'Bogotá', 12.4],
  ['0007731220', { es: 'Galletas avena', en: 'Oat cookies' }, 'Trigal', 'Medellín', 8.1],
  ['0001198433', { es: 'Jugo mango 1 L', en: 'Mango juice 1 L' }, 'Frutal', 'Cali', 6.7],
  ['0009984120', { es: 'Arroz premium', en: 'Premium rice' }, 'Granero', 'Bogotá', 15.2],
  ['0003310987', { es: 'Detergente 2 kg', en: 'Detergent 2 kg' }, 'Brisa', 'Barranquilla', 9.9],
  ['0005521476', { es: 'Chocolate tableta', en: 'Chocolate bar' }, 'Cacaoterra', 'Bucaramanga', 4.3],
  ['0002286610', { es: 'Atún en lata', en: 'Canned tuna' }, 'Marino', 'Bogotá', 7.8],
]
const millions = (v, locale) => `${v.toLocaleString(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}M`

function useTyping(words, active) {
  const [text, setText] = useState('')
  useEffect(() => {
    if (!active) return
    let word = 0
    let i = 0
    let deleting = false
    const id = setInterval(() => {
      const w = words[word]
      if (!deleting) {
        i++
        if (i > w.length + 12) deleting = true
      } else {
        i -= 2
        if (i <= 0) {
          deleting = false
          i = 0
          word = (word + 1) % words.length
        }
      }
      setText(w.slice(0, Math.min(i, w.length)))
    }, 70)
    return () => clearInterval(id)
  }, [words, active])
  return text
}

export function TelescopeMock() {
  const { t, l, locale } = useI18n()
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '-10% 0px' })
  const query = useTyping(t.mocks.queries, inView)
  const [hot, setHot] = useState(0)

  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => setHot((h) => (h + 1) % rows.length), 1400)
    return () => clearInterval(id)
  }, [inView])

  return (
    <div ref={ref} className="@container absolute inset-0 bg-[#0b1220]">
      <div className="flex h-full flex-col gap-[1.6cqw] p-[2.4cqw] text-[1.45cqw] text-slate-300">
        <div className="flex items-center gap-[1.4cqw]">
          <div className="flex flex-1 items-center gap-[1cqw] rounded-[1cqw] border border-sky-400/30 bg-white/5 px-[1.4cqw] py-[1cqw]">
            <FiSearch className="text-sky-400" />
            <span className="font-mono text-slate-100">{query}</span>
            <span className="h-[1.8cqw] w-px animate-pulse bg-sky-400" />
          </div>
          <span className="rounded-[1cqw] bg-sky-500 px-[1.6cqw] py-[1cqw] font-medium text-white">{t.mocks.export}</span>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-[1fr_32%] gap-[1.6cqw]">
          <div className="overflow-hidden rounded-[1.2cqw] border border-white/10">
            <div className="grid grid-cols-[1.2fr_1.6fr_1fr_1.1fr_0.8fr] gap-[1cqw] border-b border-white/10 bg-white/5 px-[1.4cqw] py-[1cqw] font-mono text-[1.15cqw] tracking-wide text-slate-400 uppercase">
              {t.mocks.cols.map((c, i) => (
                <span key={c} className={i === 4 ? 'text-right' : ''}>
                  {c}
                </span>
              ))}
            </div>
            {rows.map((r, i) => (
              <motion.div
                key={r[0]}
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.07 }}
                className={`grid grid-cols-[1.2fr_1.6fr_1fr_1.1fr_0.8fr] gap-[1cqw] border-b border-white/5 px-[1.4cqw] py-[1.05cqw] transition-colors duration-500 ${
                  hot === i ? 'bg-sky-400/15 text-white' : ''
                }`}
              >
                <span className="truncate font-mono text-slate-400">{r[0]}</span>
                <span className="truncate">{l(r[1])}</span>
                <span className="truncate">{r[2]}</span>
                <span className="truncate">{r[3]}</span>
                <span className="text-right font-mono text-sky-300">{millions(r[4], locale)}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex min-h-0 flex-col gap-[1.6cqw]">
            <div className="rounded-[1.2cqw] border border-white/10 bg-white/5 p-[1.6cqw]">
              <p className="text-[1.15cqw] tracking-wide text-slate-400 uppercase">{t.mocks.totalSales}</p>
              <p className="mt-[0.6cqw] font-display text-[3cqw] font-semibold text-white">${millions(64.4, locale)}</p>
              <div className="mt-[1.2cqw] flex h-[7cqw] items-end gap-[0.8cqw]">
                {[40, 65, 52, 80, 58, 92, 70, 100].map((h, i) => (
                  <motion.span
                    key={i}
                    className="flex-1 rounded-t-[0.5cqw] bg-linear-to-t from-sky-500 to-indigo-400"
                    initial={{ height: '8%' }}
                    animate={inView ? { height: [`${h * 0.5}%`, `${h}%`, `${h * 0.7}%`, `${h}%`] } : {}}
                    transition={{ duration: 4, delay: i * 0.08, repeat: Infinity, ease: 'easeInOut' }}
                  />
                ))}
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 16 }}
              className="flex items-start gap-[1cqw] rounded-[1.2cqw] border border-emerald-400/30 bg-emerald-400/10 p-[1.4cqw] text-emerald-300"
            >
              <FiCheckCircle className="mt-[0.2cqw] shrink-0" />
              <span>
                <b className="block font-semibold text-emerald-200">{t.mocks.noDupes}</b>
                {t.mocks.scanned}
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

const rings = [
  { label: 'Open', size: 46, duration: 9, color: 'bg-amber-400', count: '1.204' },
  { label: 'Pending', size: 68, duration: 14, color: 'bg-violet-400', count: '386' },
  { label: 'Prime', size: 90, duration: 22, color: 'bg-sky-400', count: '48.912' },
]
const lifecycle = [
  ['ADD', 'bg-emerald-400/15 text-emerald-300'],
  ['CHANGE', 'bg-amber-400/15 text-amber-300'],
  ['CHANGE', 'bg-amber-400/15 text-amber-300'],
  ['HELD', 'bg-rose-400/15 text-rose-300'],
]

export function KeplerMock() {
  const { t, l } = useI18n()
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '-10% 0px' })

  return (
    <div ref={ref} className="@container absolute inset-0 bg-[#0d0b1a]">
      <div className="grid h-full grid-cols-[44%_1fr] gap-[2cqw] p-[2.4cqw] text-[1.45cqw] text-slate-300">
        <div className="relative grid place-items-center">
          {rings.map((r, i) => (
            <div
              key={r.label}
              className="absolute rounded-full border border-white/10"
              style={{ width: `${r.size}%`, aspectRatio: '1' }}
            >
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: `${r.duration}s` }}>
                <span className={`absolute top-0 left-1/2 size-[1.6cqw] -translate-x-1/2 -translate-y-1/2 rounded-full ${r.color} shadow-[0_0_14px_currentColor]`} />
              </div>
              <span
                className="absolute left-1/2 -translate-x-1/2 font-mono text-[1.1cqw] text-slate-400"
                style={{ bottom: `${-0.5 - i * 0.2}%` }}
              >
                {r.label} · {r.count}
              </span>
            </div>
          ))}
          <div className="relative grid size-[9cqw] place-items-center rounded-full bg-linear-to-br from-amber-300 to-violet-500 font-display text-[1.4cqw] font-semibold text-black shadow-[0_0_40px_rgba(167,139,250,.5)]">
            Galaxy
          </div>
        </div>

        <div className="flex min-h-0 flex-col gap-[1.6cqw]">
          <div className="relative flex-1 overflow-hidden rounded-[1.2cqw] border border-white/10 bg-linear-to-br from-[#f6efe3] to-[#e7d8bf] p-[2cqw] text-[#3b2f20]">
            <p className="font-display text-[2.6cqw] leading-none font-bold">{l({ es: 'CAFÉ ANDINO', en: 'ANDEAN COFFEE' })}</p>
            <p className="mt-[0.8cqw] text-[1.3cqw] tracking-wide uppercase">{l({ es: 'Tostión media · 100% arábica', en: 'Medium roast · 100% arabica' })}</p>
            <p className="mt-[2.4cqw] text-[1.3cqw]">{l({ es: 'Peso neto 500 g', en: 'Net weight 500 g' })}</p>
            <p className="text-[1.3cqw]">{l({ es: 'Sin azúcar añadida', en: 'No added sugar' })}</p>
            {[
              ['18%', '9%', '62%', '12%'],
              ['47%', '9%', '48%', '8%'],
              ['63%', '9%', '30%', '8%'],
            ].map(([top, left, width, height], i) => (
              <motion.span
                key={i}
                className="absolute rounded-[0.4cqw] border border-violet-500 bg-violet-500/10"
                style={{ top, left, width, height }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: [0, 1, 1, 0], scale: [0.9, 1, 1, 1] } : {}}
                transition={{ duration: 4, delay: 0.6 + i * 0.5, repeat: Infinity, repeatDelay: 0.5, times: [0, 0.15, 0.85, 1] }}
              >
                <span className="absolute -top-[1.9cqw] right-0 rounded-[0.3cqw] bg-violet-600 px-[0.6cqw] font-mono text-[1cqw] text-white">
                  {98 - i * 3}%
                </span>
              </motion.span>
            ))}
            <motion.span
              className="absolute inset-x-0 h-[0.4cqw] bg-violet-500 shadow-[0_0_20px_4px_rgba(139,92,246,.6)]"
              initial={{ top: '0%' }}
              animate={inView ? { top: ['4%', '92%', '4%'] } : {}}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <div className="flex items-center gap-[0.8cqw]">
            {lifecycle.map(([label, cls], i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.15 }}
                className={`flex-1 rounded-[0.8cqw] px-[1cqw] py-[0.8cqw] ${cls}`}
              >
                <p className="font-mono text-[1.15cqw] font-medium">{label}</p>
                <p className="text-[1.1cqw] opacity-70">{t.mocks.dates[i]}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

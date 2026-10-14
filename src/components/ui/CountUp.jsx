import { useRef } from 'react'
import { useInView } from 'motion/react'
import { animated, useSpring } from '@react-spring/web'
import { useI18n } from '../../i18n/I18nProvider'

// Contador con física de resorte que arranca cuando entra en pantalla.
export default function CountUp({ value, suffix = '', className = '' }) {
  const ref = useRef(null)
  const { locale } = useI18n()
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const { n } = useSpring({
    n: inView ? value : 0,
    from: { n: 0 },
    config: { mass: 1, tension: 60, friction: 22 },
  })

  return (
    <span ref={ref} className={className}>
      <animated.span>{n.to((v) => Math.round(v).toLocaleString(locale))}</animated.span>
      {suffix}
    </span>
  )
}

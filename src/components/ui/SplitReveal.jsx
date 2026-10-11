import { useRef } from 'react'
import { gsap, SplitText, useGSAP, prefersReducedMotion } from '../../lib/gsap'

// Revela un texto por líneas o palabras al entrar en pantalla (GSAP SplitText
// con máscara, estilo React Bits "SplitText").
export default function SplitReveal({
  as: Tag = 'h2',
  children,
  className = '',
  type = 'lines',
  stagger = 0.08,
  delay = 0,
  start = 'top 85%',
}) {
  const ref = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      SplitText.create(ref.current, {
        type: type === 'words' ? 'words' : 'lines',
        mask: type === 'words' ? 'words' : 'lines',
        autoSplit: true,
        linesClass: 'split-line',
        wordsClass: 'split-word',
        onSplit(self) {
          return gsap.from(type === 'words' ? self.words : self.lines, {
            yPercent: 115,
            rotate: 3,
            opacity: 0,
            duration: 1.1,
            ease: 'expo.out',
            stagger,
            delay,
            scrollTrigger: { trigger: ref.current, start, once: true },
          })
        },
      })
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}

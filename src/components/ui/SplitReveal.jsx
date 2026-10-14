import { useRef } from 'react'
import { gsap, SplitText, useGSAP, prefersReducedMotion } from '../../lib/gsap'

// Revela un texto por líneas o palabras al entrar en pantalla (GSAP SplitText
// con máscara, estilo React Bits "SplitText"). SplitText reemplaza los nodos de
// texto, así que si el texto cambia (p. ej. al cambiar de idioma) el elemento
// se vuelve a montar con otra key en vez de dejar que React lo parchee.
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
  const text = typeof children === 'string' ? children : ''

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
    { scope: ref, dependencies: [text], revertOnUpdate: true },
  )

  return (
    <Tag key={text} ref={ref} className={className}>
      {children}
    </Tag>
  )
}

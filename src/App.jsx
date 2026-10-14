import { useEffect, useState } from 'react'
import { MotionConfig } from 'motion/react'
import { SmoothScroll } from './components/providers/SmoothScroll'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TechMarquee from './components/TechMarquee'
import Featured from './components/Featured'
import MoreProjects from './components/MoreProjects'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import Cursor from './components/ui/Cursor'
import ClickSpark from './components/ui/ClickSpark'
import { useTheme } from './hooks/useTheme'
import { I18nProvider, useI18n } from './i18n/I18nProvider'
import { prefersReducedMotion, ScrollTrigger } from './lib/gsap'

// La intro se muestra una vez por sesión y nunca con movimiento reducido.
const shouldShowIntro = () => {
  if (prefersReducedMotion()) return false
  try {
    return !sessionStorage.getItem('intro-seen')
  } catch {
    return true
  }
}

// Al cambiar de idioma cambian las alturas: se recalculan los ScrollTrigger
// (el scroll horizontal fijado de los destacados depende de ellas).
function RefreshOnLanguage() {
  const { lang } = useI18n()
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [lang])
  return null
}

function App() {
  const { dark, toggle } = useTheme()
  const [intro, setIntro] = useState(shouldShowIntro)
  const [ready, setReady] = useState(!intro)

  const finishIntro = () => {
    try {
      sessionStorage.setItem('intro-seen', '1')
    } catch {
      // Sin almacenamiento: la intro se repetirá en la próxima visita.
    }
    setIntro(false)
  }

  return (
    <I18nProvider>
      <MotionConfig reducedMotion="user">
        <SmoothScroll>
          <RefreshOnLanguage />
          {intro && <Preloader onReveal={() => setReady(true)} onDone={finishIntro} />}
          <Cursor />
          <ClickSpark />
          <Navbar dark={dark} onToggleTheme={toggle} />
          <main>
            <Hero ready={ready} />
            <TechMarquee />
            <Featured />
            <MoreProjects />
            <About />
            <Contact />
          </main>
          <Footer />
          <FloatingWhatsApp />
        </SmoothScroll>
      </MotionConfig>
    </I18nProvider>
  )
}

export default App

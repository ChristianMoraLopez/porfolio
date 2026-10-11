import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { FaWhatsapp } from 'react-icons/fa'
import { profile } from '../data/profile'

// Botón flotante de WhatsApp: aparece después del hero.
export default function FloatingWhatsApp() {
  const { scrollY } = useScroll()
  const [show, setShow] = useState(false)
  useMotionValueEvent(scrollY, 'change', (v) => setShow(v > window.innerHeight * 0.8))

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={profile.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escribir por WhatsApp"
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 90 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 360, damping: 20 }}
          className="fixed right-5 bottom-5 z-40 grid size-14 place-items-center rounded-full bg-[#25D366] text-3xl text-white shadow-[0_10px_30px_-5px_rgba(37,211,102,.55)]"
        >
          <FaWhatsapp />
        </motion.a>
      )}
    </AnimatePresence>
  )
}

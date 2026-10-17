import { useEffect, useState } from 'react'
import { FiArrowUp } from 'react-icons/fi'
import { AnimatePresence, motion } from 'framer-motion'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Volver arriba"
          className="fixed bottom-6 right-6 z-40 bg-forest-600 text-cream-50 w-12 h-12 rounded-full flex items-center justify-center shadow-premium hover:bg-forest-700 transition-colors"
        >
          <FiArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

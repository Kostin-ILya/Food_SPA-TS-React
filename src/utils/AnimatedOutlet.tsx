import { AnimatePresence, motion } from 'framer-motion'

import { useLocation, useOutlet } from 'react-router-dom'

const pageTransitionVariants = {
  hidden: { opacity: 0, y: -50 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 },
}

export const AnimatedOutlet = () => {
  const location = useLocation()
  const outlet = useOutlet()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ duration: 0.5 }}
        variants={pageTransitionVariants}
      >
        {outlet}
      </motion.div>
    </AnimatePresence>
  )
}

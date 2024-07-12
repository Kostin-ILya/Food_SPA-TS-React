import { useEffect, useState, Suspense } from 'react'
import { FiMenu as MenuBtn } from 'react-icons/fi'
import clsx from 'clsx'

import { AnimatedOutlet } from 'utils/AnimatedOutlet'
import { Aside } from './Aside'

import cl from './MainLayout.module.scss'

export const MainLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 991) {
        setIsMenuOpen(true)
      } else {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (isMenuOpen && window.innerWidth < 991) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
  }, [isMenuOpen])

  const handleClose = () => {
    setIsMenuOpen(false)
  }

  return (
    <div className={clsx(cl.mainLayout)}>
      <Suspense fallback={null}>
        <Aside isMenuOpen={isMenuOpen} handleClose={handleClose} />
        {isMenuOpen && <div className={cl.overlay} onClick={handleClose} />}

        <div className={cl.content}>
          <AnimatedOutlet />

          <MenuBtn
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cl.menuBtn}
          />

          <footer className={cl.footer}>
            <a href="https://github.com/Kostin-ilya" target="_blank">
              © 2024 Kostin Ilia. Все права защищены.
            </a>
          </footer>
        </div>
      </Suspense>
    </div>
  )
}

export default MainLayout

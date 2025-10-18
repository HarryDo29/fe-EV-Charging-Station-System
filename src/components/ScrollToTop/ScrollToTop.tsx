import { useState, useEffect } from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  // Theo dõi scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className='fixed bottom-8 right-8 z-50 w-14 h-14 bg-sky-600 hover:bg-sky-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group animate-in fade-in zoom-in'
          aria-label='Scroll to top'
        >
          <ArrowUpwardIcon className='w-10 h-10' />
        </button>
      )}
    </>
  )
}

export default ScrollToTop

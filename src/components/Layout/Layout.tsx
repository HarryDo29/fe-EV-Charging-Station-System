import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import ScrollToTop from '../ScrollToTop/ScrollToTop'

const Layout = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  return (
    <div className='relative w-screen h-screen'>
      <Navbar isAuthenticated={isAuthenticated} />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default Layout

import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import ScrollToTop from '../ScrollToTop/ScrollToTop'

type LayoutProps = {
  isAuthenticated: boolean
}

const Layout = ({ isAuthenticated }: LayoutProps) => {
  return (
    <div className='relative w-screen h-screen'>
      <Navbar isAuthenticated={isAuthenticated} />
      <main>
        {/* Nội dung của các page sẽ được render ở đây */}
        <Outlet />
      </main>
      {/* Bạn cũng có thể thêm Footer ở đây */}
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default Layout

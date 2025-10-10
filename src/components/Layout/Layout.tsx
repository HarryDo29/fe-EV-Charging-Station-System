import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

const Layout = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} />
      <main>
        {/* Nội dung của các page sẽ được render ở đây */}
        <Outlet />
      </main>
      {/* Bạn cũng có thể thêm Footer ở đây */}
      <Footer />
    </div>
  )
}

export default Layout

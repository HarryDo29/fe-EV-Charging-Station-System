import { Link } from 'react-router-dom'

const NavbarHeader = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  return (
    <nav className='absolute z-50 bg-transparent text-black w-screen p-0 pt-4 m-0'>
      <div className='container mx-auto flex items-center justify-between'>
        {/* Logo */}
        <a href='/'>
          <img src='/logo.png' alt='logo' className='w-10 h-10' />
        </a>

        {/* Navbar Links - Thêm mx-auto vào đây */}
        <ul className='flex space-x-4 mx-auto bg-white rounded-md p-3'>
          <li>
            <Link className='hover:text-sky-400 transition-colors' to='/'>
              Home
            </Link>
          </li>
          <li>
            <Link className='hover:text-sky-400 transition-colors' to='/booking'>
              Booking
            </Link>
          </li>
          <li>
            <Link className='hover:text-sky-400 transition-colors' to='/about'>
              About
            </Link>
          </li>
          <li>
            <Link className='hover:text-sky-400 transition-colors' to='/contact'>
              Contact
            </Link>
          </li>
        </ul>

        {/* Login Button */}
        <div>
          {isAuthenticated ? (
            <button className='bg-stone-50 hover:bg-sky-200 text-black px-4 py-2 rounded-md'>Logout</button>
          ) : (
            <button className='px-5 py-2.5 relative rounded-lg group overflow-hidden font-medium bg-stone-50 text-black-600 flex items-center justify-center'>
              <span className='absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-sky-300 group-hover:h-full opacity-90'></span>
              <span className='relative group-hover:text-black text-base font-semibold'>Login</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavbarHeader

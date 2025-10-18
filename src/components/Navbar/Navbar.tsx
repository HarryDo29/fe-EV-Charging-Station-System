import { Link, useNavigate } from 'react-router-dom'
import logo from '../../../public/EV-logo-black.svg'
import AccountDropDown from '../AccountDropDown/AccountDropDown'
import NotiDropDown from '../NotiDropDown/NotiDropDown'

type NavbarHeaderProps = {
  isAuthenticated: boolean
}

const NavbarHeader = ({ isAuthenticated }: NavbarHeaderProps) => {
  const navigate = useNavigate()

  return (
    <nav className='absolute z-[1005] bg-transparent text-black w-screen p-0 pt-4 m-0'>
      <div className='container mx-auto px-4 h-[40px] flex items-center justify-between'>
        {/* Logo */}
        <Link to='/'>
          <div className='w-32 h-full'>
            <img src={logo} alt='logo' className='max-w-full object-contain' />
          </div>
        </Link>
        {/* Navbar Links */}
        <ul className='flex space-x-4 mx-auto bg-white rounded-md p-3'>
          <li>
            <Link className='hover:text-sky-400 transition-colors' to='/'>
              Home
            </Link>
          </li>
          <li>
            <Link className='hover:text-sky-400 transition-colors' to='/map'>
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
        {/* Login Button / Avatar */}
        <NotiDropDown />
        <div>
          {isAuthenticated ? (
            <AccountDropDown />
          ) : (
            <button
              className='px-5 py-2.5 relative rounded-lg group overflow-hidden font-medium bg-stone-50 text-black-600 flex items-center justify-center'
              onClick={() => navigate('/auth')}
            >
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

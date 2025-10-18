import { Link, useNavigate } from 'react-router-dom'
import { Avatar } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { Person, Mail, Notifications, Settings, Logout } from '@mui/icons-material'
import logo from '../../../public/EV-logo-black.svg'
import { useCookies } from 'react-cookie'

const menuItems = [
  { icon: Person, label: 'Hồ sơ', url: '/profile', action: () => console.log('Xem hồ sơ') },
  { icon: Mail, label: 'Tin nhắn', url: '/messages', action: () => console.log('Tin nhắn') },
  { icon: Notifications, label: 'Thông báo', url: '/notifications', action: () => console.log('Thông báo') },
  { icon: Settings, label: 'Cài đặt', url: '/settings', action: () => console.log('Cài đặt') },
  { icon: Logout, label: 'Đăng xuất', url: '/logout', action: () => console.log('Đăng xuất'), danger: true }
]

type NavbarHeaderProps = {
  isAuthenticated: boolean
}

const NavbarHeader = ({ isAuthenticated }: NavbarHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const [, setCookie] = useCookies(['profile'])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

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
        <div>
          {isAuthenticated ? (
            <div className='relative' ref={dropdownRef}>
              {/* Avatar */}
              <div className='cursor-pointer'>
                <Avatar
                  alt='Harry_Do'
                  src='/assets/Avata/avt_HarryDo.jpeg'
                  sx={{ width: 45, height: 45 }}
                  onClick={() => setIsOpen(true)}
                />
              </div>

              {/* Dropdown */}
              {isOpen && (
                <div className='absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50'>
                  <div className='px-4 py-3 border-b border-gray-200'>
                    <p className='text-sm text-gray-600'>Harry Do</p>
                    <p className='text-sm text-gray-600'>harrydo@gmail.com</p>
                  </div>
                  <div className='py-1'>
                    {menuItems.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          item.action()
                          if (item.url === '/settings') {
                            setCookie('profile', 'settings')
                            navigate(`/profile`)
                            return
                          }
                          navigate(item.url)
                        }}
                        className={`w-full flex items-center px-4 py-2 text-sm transition-colors ${
                          item.danger ? 'text-red-600 hover:bg-red-50' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <item.icon className='w-4 h-4 mr-3' />
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
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

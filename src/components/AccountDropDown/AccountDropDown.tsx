import { Avatar } from '@mui/material'
import { Person, Mail, Notifications, Settings, Logout } from '@mui/icons-material'
import { useCookies } from 'react-cookie'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../context/AuthContext/useAuth'
import { fetchLogout } from '../../apis/auth.api'

const menuItems = [
  { icon: Person, label: 'Hồ sơ', url: '/profile', action: () => console.log('Xem hồ sơ') },
  { icon: Mail, label: 'Tin nhắn', url: '/messages', action: () => console.log('Tin nhắn') },
  { icon: Notifications, label: 'Thông báo', url: '/notifications', action: () => console.log('Thông báo') },
  { icon: Settings, label: 'Cài đặt', url: '/settings', action: () => console.log('Cài đặt') },
  { icon: Logout, label: 'Đăng xuất', url: '/logout', action: () => console.log('Đăng xuất'), danger: true }
]

const AccountDropDown = () => {
  const [, setCookie] = useCookies(['profile'])
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const [cookies] = useCookies(['driver_account'])
  console.log(cookies.driver_account)

  const { logOut } = useAuth()
  const handleLogout = async () => {
    console.log('handleLogout')

    try {
      const response = await fetchLogout()
      console.log('response', response)

      if (response.statusCode === 201) {
        console.log('logged out')

        logOut()
        navigate(`/`)
      }
    } catch (error) {
      console.log(error)
    }
  }

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
    <div className='relative' ref={dropdownRef}>
      {/* Avatar */}
      <div className='cursor-pointer p-1 m-2 bg-gradient-to-br from-sky-50 to-blue-50 rounded-full shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 ease-out group'>
        <Avatar
          alt={cookies.driver_account.full_name ?? 'Harry_Do'}
          src={cookies.driver_account.avatar_url}
          sx={{
            width: 45,
            height: 45,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'rotate(5deg)'
            }
          }}
          onClick={() => setIsOpen(true)}
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className='absolute right-0 mt-2 w-72 bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden transform transition-all duration-200 ease-out animate-in fade-in slide-in-from-top-2 z-50'>
          {/* Header */}
          <div className='bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 px-6 py-5'>
            <div className='flex items-center gap-4'>
              <Avatar
                alt={cookies.driver_account.full_name ?? 'Harry_Do'}
                src={cookies.driver_account.avatar_url}
                sx={{
                  width: 56,
                  height: 56,
                  border: '3px solid rgba(255,255,255,0.3)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}
              />
              <div className='flex-1 min-w-0'>
                <p className='text-white font-bold text-lg truncate'>{cookies.driver_account.full_name}</p>
                <p className='text-blue-100 text-sm truncate'>{cookies.driver_account.email}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className='py-2'>
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.action()
                  if (item.url === '/settings') {
                    setCookie('profile', 'settings')
                    navigate(`/profile`)
                    setIsOpen(false)
                    return
                  } else if (item.url === '/logout') {
                    handleLogout()
                    navigate('/auth')
                    setIsOpen(false)
                    return
                  }
                  navigate(item.url)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center px-6 py-3 text-sm font-medium transition-all duration-200 group/item ${
                  item.danger
                    ? 'text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50'
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50'
                }`}
              >
                <div
                  className={`p-2 rounded-lg mr-3 transition-all duration-200 ${
                    item.danger
                      ? 'bg-red-100 text-red-600 group-hover/item:bg-red-200 group-hover/item:scale-110'
                      : 'bg-blue-100 text-blue-600 group-hover/item:bg-blue-200 group-hover/item:scale-110'
                  }`}
                >
                  <item.icon className='w-5 h-5' />
                </div>
                <span className='flex-1 text-left'>{item.label}</span>
                <svg
                  className='w-4 h-4 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                </svg>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AccountDropDown

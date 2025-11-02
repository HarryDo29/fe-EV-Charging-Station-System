import { Avatar } from '@mui/material'
import { Person, Mail, Notifications, Settings, Logout } from '@mui/icons-material'
import { useCookies } from 'react-cookie'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../context/AuthContext/useAuth'
import { fetchLogout } from '../../apis/authApis'

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
      <div className='cursor-pointer'>
        <Avatar
          alt={cookies.driver_account.full_name ?? 'Harry_Do'}
          src={cookies.driver_account.avatar_url}
          sx={{ width: 45, height: 45 }}
          onClick={() => setIsOpen(true)}
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className='absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50'>
          <div className='px-4 py-3 border-b border-gray-200'>
            <p className='text-sm text-gray-600'>{cookies.driver_account.full_name}</p>
            <p className='text-sm text-gray-600'>{cookies.driver_account.email}</p>
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
                  } else if (item.url === '/logout') {
                    handleLogout()
                    navigate('/auth')
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
  )
}

export default AccountDropDown

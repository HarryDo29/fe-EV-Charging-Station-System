import {
  Check,
  Close as CloseIcon,
  FlashOn as ZapIcon,
  CalendarMonth as CalendarIcon,
  WarningAmber as AlertCircleIcon,
  TrendingUp as TrendingUpIcon,
  Notifications
} from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useRef } from 'react'

interface Notification {
  id: number
  type: 'success' | 'info' | 'warning' | 'error'
  icon: React.ReactNode
  title: string
  message: string
  time: string
  isRead: boolean
  color: string
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    type: 'success',
    icon: <ZapIcon className='w-5 h-5' />,
    title: 'Sạc hoàn tất',
    message: 'Xe Tesla Model 3 đã sạc xong tại trạm Quận 1',
    time: '5 phút trước',
    isRead: false,
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 2,
    type: 'info',
    icon: <CalendarIcon className='w-5 h-5' />,
    title: 'Lịch sạc sắp tới',
    message: 'Bạn có lịch sạc vào 14:00 ngày mai tại trạm Thủ Đức',
    time: '1 giờ trước',
    isRead: false,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 3,
    type: 'warning',
    icon: <AlertCircleIcon className='w-5 h-5' />,
    title: 'Thanh toán thất bại',
    message: 'Không thể thanh toán cho lịch sạc #12345. Vui lòng thử lại',
    time: '2 giờ trước',
    isRead: false,
    color: 'bg-amber-100 text-amber-600'
  },
  {
    id: 4,
    type: 'info',
    icon: <TrendingUpIcon className='w-5 h-5' />,
    title: 'Ưu đãi đặc biệt',
    message: 'Giảm 20% cho lần sạc tiếp theo. Áp dụng đến hết tháng này',
    time: '1 ngày trước',
    isRead: true,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    id: 5,
    type: 'success',
    icon: <Check className='w-5 h-5' />,
    title: 'Đặt lịch thành công',
    message: 'Lịch sạc của bạn đã được xác nhận tại trạm Quận 7',
    time: '2 ngày trước',
    isRead: true,
    color: 'bg-green-100 text-green-600'
  }
]

const NotiDropDown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const unreadCount = notifications.filter((n) => !n.isRead).length

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

  const markAsRead = (id: number) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, isRead: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((notif) => notif.id !== id))
  }

  return (
    <div className='relative' ref={dropdownRef}>
      {/* Notification Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='relative p-3 m-2 bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 rounded-full shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 ease-out group'
      >
        <Notifications className='w-6 h-6 transition-transform duration-300 group-hover:rotate-12' />
        {unreadCount > 0 && (
          <span className='absolute -top-1 -right-1 min-w-[24px] h-6 px-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse shadow-lg'>
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className='absolute right-0 mt-2 w-[420px] bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden transform transition-all duration-200 ease-out animate-in fade-in slide-in-from-top-2'>
          {/* Header */}
          <div className='bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 px-6 py-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Notifications className='w-6 h-6 text-white' />
                <h3 className='text-xl font-bold text-white'>Thông báo</h3>
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className='px-4 py-2 text-sm text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full font-semibold transition-all duration-200 hover:scale-105 active:scale-95'
                >
                  Đọc tất cả
                </button>
              )}
            </div>
            {unreadCount > 0 && <p className='text-blue-100 text-sm mt-2'>Bạn có {unreadCount} thông báo chưa đọc</p>}
          </div>

          {/* Notifications List */}
          <div className='max-h-[480px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'>
            {notifications.length === 0 ? (
              <div className='p-12 text-center'>
                <div className='w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center'>
                  <Notifications className='w-10 h-10 text-gray-400' />
                </div>
                <p className='text-gray-500 font-medium text-lg'>Không có thông báo nào</p>
                <p className='text-gray-400 text-sm mt-1'>Bạn sẽ nhận được thông báo ở đây</p>
              </div>
            ) : (
              notifications.map((notif, index) => (
                <div
                  key={notif.id}
                  className={`relative p-5 py-2 border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-200 ${index === 0 ? '' : ''} group cursor-pointer`}
                  onClick={() => !notif.isRead && markAsRead(notif.id)}
                >
                  <div className='flex gap-4'>
                    {/* Icon */}
                    <div
                      className={`${notif.color} p-3 rounded-xl flex-shrink-0 h-fit shadow-sm group-hover:scale-110 transition-transform duration-200`}
                    >
                      {notif.icon}
                    </div>

                    {/* Content */}
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-start justify-between gap-3 mb-2'>
                        <h4 className='font-bold text-gray-900 text-base leading-tight'>{notif.title}</h4>
                        {!notif.isRead && (
                          <div className='relative flex-shrink-0'>
                            <span className='w-3 h-3 bg-blue-500 rounded-full block'></span>
                            <span className='absolute top-0 left-0 w-3 h-3 bg-blue-400 rounded-full animate-ping'></span>
                          </div>
                        )}
                      </div>
                      <p className='text-sm text-gray-600 mb-3 leading-relaxed'>{notif.message}</p>
                      <div className='flex items-center justify-between'>
                        <span className='text-xs text-gray-500 font-medium flex items-center gap-1'>
                          <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
                            <path
                              fillRule='evenodd'
                              d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z'
                              clipRule='evenodd'
                            />
                          </svg>
                          {notif.time}
                        </span>
                        <div className='flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                          {!notif.isRead && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                markAsRead(notif.id)
                              }}
                              className='px-3 py-1 text-xs text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-full font-semibold transition-colors duration-200'
                            >
                              Đã đọc
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteNotification(notif.id)
                            }}
                            className='p-1.5 text-gray-400 hover:text-white hover:bg-red-500 rounded-full transition-all duration-200'
                          >
                            <CloseIcon className='w-4 h-4' />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className='p-4 bg-gradient-to-r from-gray-50 to-blue-50/30 border-t border-gray-200'>
              <button className='w-full py-3 text-center text-sm text-blue-600 hover:text-blue-700 font-bold bg-white hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md'>
                Xem tất cả thông báo →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default NotiDropDown

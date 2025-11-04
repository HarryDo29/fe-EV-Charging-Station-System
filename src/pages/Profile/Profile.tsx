import { useEffect, useState } from 'react'
import { bookingHistory } from '../../data/mockBookingHistory'
import { transactions } from '../../data/mockTransaction'
import { subscriptions } from '../../data/mockSubcriptions'
import VehicleCard from '../../components/Vehicle/VehicleCard'
import type { AddVehicle, Vehicle } from '../../interface/vehicle.interface'
import AddVehicleModal from '../../components/Modal/AddVehicleModal'
import { Avatar } from '@mui/material'
import {
  Person,
  CreditCard,
  Notifications,
  ChevronRight,
  BoltOutlined,
  CalendarTodayOutlined,
  DiamondOutlined
} from '@mui/icons-material'
import ChargeSessionCard from '../../components/ChargeSession/ChargeSessionCard'
import TransactionCard from '../../components/Transaction/TransactionCard'
import { useCookies } from 'react-cookie'
import { fetchOwnVehicles } from '../../apis/vehicleApi'

const profileTabs = [
  { id: 'overview', icon: Person, label: 'Tổng quan' },
  { id: 'bookings', icon: CalendarTodayOutlined, label: 'Lịch đặt sạc' },
  { id: 'transactions', icon: CreditCard, label: 'Giao dịch' },
  { id: 'subscriptions', icon: DiamondOutlined, label: 'Gói đăng ký' },
  { id: 'settings', icon: Notifications, label: 'Cài đặt' }
]

const menuItems = [
  {
    icon: Person,
    label: 'Chỉnh sửa thông tin cá nhân',
    desc: 'Cập nhật tên, email, số điện thoại',
    color: 'blue'
  },
  {
    icon: CreditCard,
    label: 'Phương thức thanh toán',
    desc: 'Quản lý thẻ và ví điện tử',
    color: 'green'
  },
  {
    icon: Notifications,
    label: 'Cài đặt thông báo',
    desc: 'Tùy chỉnh thông báo đặt lịch',
    color: 'orange'
  }
]

const Profile = () => {
  //cookies
  const [cookies, setCookie] = useCookies(['profile']) // _ is for removeCookie
  const tab = cookies.profile
  const [activeTab, setActiveTab] = useState(tab || 'overview')
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false)
  const [newVehicle, setNewVehicle] = useState<AddVehicle>({
    car_maker: '',
    models: '',
    license_plate: '',
    battery_capacity_kwh: 0,
    connector_type: null,
    charging_power_kw: 0,
    status: false
  } as AddVehicle)

  // console.log(cookies.profile)

  // useEffect(() => {
  //   if (tab) {
  //     setActiveTab(tab as string)
  //   }
  // }, [tab])

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetchOwnVehicles()
        if (response.statusCode === 200) {
          setVehicles(response.data)
        }
      } catch (error) {
        console.log('fetchVehicles error', error)
      }
    }
    fetchVehicles()
  }, [])

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600',
      green: 'bg-green-50 text-green-600',
      orange: 'bg-orange-50 text-orange-600'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  const renderOverview = () => (
    <div className='container mx-auto max-w-6xl p-0'>
      <div className='relative bg-gradient-to-br from-sky-600 via-blue-600 to-sky-700 rounded-2xl overflow-hidden shadow-2xl'>
        {/* Background Pattern */}
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2'></div>
          <div className='absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3'></div>
        </div>

        <div className='relative p-8'>
          {/* Avatar + Info */}
          <div className='flex items-center space-x-6 mb-8'>
            <div className='relative'>
              <Avatar
                src='/assets/Avata/avt_HarryDo.jpeg'
                alt='harry.do'
                sx={{ width: 96, height: 96, border: '4px solid white', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}
              />
              <div className='absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-white'></div>
            </div>
            <div className='flex-1'>
              <h2 className='text-3xl md:text-4xl font-bold text-white mb-3'>Harry Do</h2>
              <div className='space-y-1'>
                <p className='text-sky-100 flex items-center gap-2 text-sm md:text-base'>
                  <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                    <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
                    <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
                  </svg>
                  harry.do@example.com
                </p>
                <p className='text-sky-100 flex items-center gap-2 text-sm md:text-base'>
                  <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                    <path d='M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z' />
                  </svg>
                  0909 123 456
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'>
              <div className='flex items-center justify-between mb-3'>
                <div className='bg-sky-100 p-3 rounded-lg'>
                  <BoltOutlined className='text-sky-600' sx={{ fontSize: 28 }} />
                </div>
                <span className='text-xs font-semibold text-sky-600 bg-sky-50 px-3 py-1 rounded-full'>
                  +12% tháng này
                </span>
              </div>
              <p className='text-4xl font-bold text-gray-800 mb-1'>24</p>
              <p className='text-sm text-gray-600 font-medium'>Tổng lượt sạc</p>
            </div>
            <div className='bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'>
              <div className='flex items-center justify-between mb-3'>
                <div className='bg-blue-100 p-3 rounded-lg'>
                  <CalendarTodayOutlined className='text-blue-600' sx={{ fontSize: 28 }} />
                </div>
                <span className='text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full'>Sắp tới</span>
              </div>
              <p className='text-4xl font-bold text-gray-800 mb-1'>1</p>
              <p className='text-sm text-gray-600 font-medium'>Lịch đã đặt</p>
            </div>
            <div className='bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'>
              <div className='flex items-center justify-between mb-3'>
                <div className='bg-gradient-to-br from-yellow-100 to-orange-100 p-3 rounded-lg'>
                  <DiamondOutlined className='text-orange-600' sx={{ fontSize: 28 }} />
                </div>
                <span className='text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full'>
                  Active
                </span>
              </div>
              <p className='text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-1'>
                VIP
              </p>
              <p className='text-sm text-gray-600 font-medium'>Gói đang dùng</p>
            </div>
          </div>
        </div>
      </div>

      <div className='bg-white rounded-2xl shadow-lg p-6 mt-6 border border-gray-100'>
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h2 className='text-2xl font-bold text-gray-800 flex items-center gap-2'>
              <svg className='w-6 h-6 text-sky-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              Danh sách xe
            </h2>
            <p className='text-sm text-gray-600 mt-1'>Quản lý các phương tiện của bạn</p>
          </div>
          <span className='bg-sky-100 text-sky-700 px-4 py-2 rounded-full text-sm font-semibold'>
            {vehicles.length} xe
          </span>
        </div>

        <div className='space-y-3'>
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              onClick={() => setSelectedVehicle(vehicle)}
              className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                selectedVehicle?.id === vehicle.id
                  ? 'border-sky-500 bg-gradient-to-r from-sky-50 to-blue-50 shadow-lg transform scale-[1.02]'
                  : 'border-gray-200 hover:border-sky-300 hover:shadow-md'
              }`}
            >
              <VehicleCard vehicle={vehicle} selectedVehicle={selectedVehicle} />
            </div>
          ))}

          <button
            onClick={() => setShowAddVehicleModal(true)}
            className='group w-full border-2 border-dashed border-gray-300 rounded-xl p-5 text-gray-600 hover:border-sky-500 hover:text-sky-600 hover:bg-sky-50 transition-all duration-300 flex items-center justify-center gap-2'
          >
            <div className='bg-gray-100 group-hover:bg-sky-100 p-2 rounded-lg transition-colors'>
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
              </svg>
            </div>
            <span className='font-semibold'>Thêm xe mới</span>
          </button>
        </div>
      </div>

      {showAddVehicleModal && (
        <AddVehicleModal
          vehicles={vehicles}
          newVehicle={newVehicle}
          setVehicles={setVehicles}
          setNewVehicle={setNewVehicle}
          setShowAddVehicleModal={setShowAddVehicleModal}
        />
      )}
    </div>
  )

  const renderBookingHistory = () => (
    <div className='space-y-4'>
      <div className='bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl p-6 border border-sky-200'>
        <div className='flex items-center gap-3'>
          <div className='bg-sky-600 p-3 rounded-lg'>
            <CalendarTodayOutlined className='text-white' sx={{ fontSize: 24 }} />
          </div>
          <div>
            <h3 className='text-lg font-bold text-gray-800'>Lịch sử đặt sạc</h3>
            <p className='text-sm text-gray-600'>Tổng cộng {bookingHistory.length} lượt đặt lịch</p>
          </div>
        </div>
      </div>
      <div className='space-y-3'>
        {bookingHistory.map((booking) => (
          <ChargeSessionCard key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  )

  const renderTransactions = () => (
    <div className='space-y-4'>
      <div className='bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl p-6 border border-sky-200'>
        <div className='flex items-center gap-3 mb-4'>
          <div className='bg-sky-600 p-3 rounded-lg'>
            <CreditCard className='text-white' sx={{ fontSize: 24 }} />
          </div>
          <div>
            <h3 className='text-lg font-bold text-gray-800'>Lịch sử giao dịch</h3>
            <p className='text-sm text-gray-600'>Theo dõi chi tiết các giao dịch của bạn</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        <div className='bg-white rounded-xl p-5 border-2 border-gray-200 hover:border-sky-300 hover:shadow-lg transition-all duration-300'>
          <div className='flex items-center justify-between mb-3'>
            <p className='text-gray-600 text-sm font-medium'>Tổng giao dịch</p>
            <div className='bg-sky-100 p-2 rounded-lg'>
              <svg className='w-5 h-5 text-sky-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
                />
              </svg>
            </div>
          </div>
          <p className='text-3xl font-bold text-gray-900'>{transactions.length}</p>
        </div>
        <div className='bg-white rounded-xl p-5 border-2 border-green-200 hover:border-green-300 hover:shadow-lg transition-all duration-300'>
          <div className='flex items-center justify-between mb-3'>
            <p className='text-gray-600 text-sm font-medium'>Thành công</p>
            <div className='bg-green-100 p-2 rounded-lg'>
              <svg className='w-5 h-5 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
              </svg>
            </div>
          </div>
          <p className='text-3xl font-bold text-green-600'>
            {transactions.filter((t) => t.status === 'success').length}
          </p>
        </div>
        <div className='bg-white rounded-xl p-5 border-2 border-red-200 hover:border-red-300 hover:shadow-lg transition-all duration-300'>
          <div className='flex items-center justify-between mb-3'>
            <p className='text-gray-600 text-sm font-medium'>Thất bại</p>
            <div className='bg-red-100 p-2 rounded-lg'>
              <svg className='w-5 h-5 text-red-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </div>
          </div>
          <p className='text-3xl font-bold text-red-600'>{transactions.filter((t) => t.status === 'failed').length}</p>
        </div>
      </div>

      <div className='space-y-4'>
        {transactions.map((trans) => (
          <TransactionCard key={trans.id} trans={trans} />
        ))}
      </div>
    </div>
  )

  const renderSubscriptions = () => (
    <div className='space-y-6'>
      <div className='bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl p-6 border border-sky-200'>
        <div className='flex items-center gap-3'>
          <div className='bg-gradient-to-br from-yellow-500 to-orange-500 p-3 rounded-lg'>
            <DiamondOutlined className='text-white' sx={{ fontSize: 24 }} />
          </div>
          <div>
            <h3 className='text-lg font-bold text-gray-800'>Gói đăng ký</h3>
            <p className='text-sm text-gray-600'>Chọn gói phù hợp với nhu cầu của bạn</p>
          </div>
        </div>
      </div>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {subscriptions.map((sub, index) => (
          <div
            key={index}
            className={`relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${
              sub.active ? 'border-sky-500 transform scale-105' : 'border-gray-200 hover:border-sky-300'
            }`}
          >
            {sub.active && (
              <div className='absolute -top-3 -right-3'>
                <span className='bg-gradient-to-r from-sky-500 to-blue-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-1'>
                  <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                  </svg>
                  Đang dùng
                </span>
              </div>
            )}

            <div className='text-center mb-6'>
              <h4 className='text-2xl font-bold text-gray-800 mb-2'>{sub.name}</h4>
              <div className='flex items-baseline justify-center gap-1'>
                <span className='text-4xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent'>
                  {sub.price.split('/')[0]}
                </span>
                <span className='text-gray-500 text-sm'>/{sub.price.split('/')[1]}</span>
              </div>
              {sub.active && (
                <p className='text-sm text-gray-500 mt-2 flex items-center justify-center gap-1'>
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  Hết hạn: {sub.expiry}
                </p>
              )}
            </div>

            <ul className='space-y-3 mb-6'>
              {sub.benefits.map((benefit, i) => (
                <li key={i} className='flex items-start text-sm text-gray-600'>
                  <svg
                    className='w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            {!sub.active ? (
              <button className='w-full bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1'>
                Nâng cấp ngay
              </button>
            ) : (
              <button className='w-full bg-gray-100 text-gray-600 font-semibold py-3 rounded-xl cursor-not-allowed'>
                Gói hiện tại
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  const renderSettings = () => (
    <div className='space-y-6'>
      <div className='bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl p-6 border border-sky-200'>
        <div className='flex items-center gap-3'>
          <div className='bg-sky-600 p-3 rounded-lg'>
            <Notifications className='text-white' sx={{ fontSize: 24 }} />
          </div>
          <div>
            <h3 className='text-lg font-bold text-gray-800'>Cài đặt tài khoản</h3>
            <p className='text-sm text-gray-600'>Quản lý thông tin cá nhân và tùy chọn của bạn</p>
          </div>
        </div>
      </div>

      <div className='space-y-4'>
        {menuItems.map((item, index) => {
          const Icon = item.icon
          return (
            <button
              key={index}
              className='w-full bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-sky-300 hover:shadow-lg transition-all duration-300 text-left group'
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center ${getColorClasses(item.color)} transition-all duration-300 group-hover:scale-110`}
                  >
                    <Icon sx={{ fontSize: 28 }} />
                  </div>
                  <div className='flex-1'>
                    <p className='font-bold text-gray-900 mb-1 text-lg group-hover:text-sky-600 transition-colors'>
                      {item.label}
                    </p>
                    <p className='text-sm text-gray-500'>{item.desc}</p>
                  </div>
                </div>
                <ChevronRight
                  className='text-gray-400 group-hover:text-sky-600 group-hover:translate-x-2 transition-all duration-300'
                  sx={{ fontSize: 28 }}
                />
              </div>
            </button>
          )
        })}
      </div>

      <div className='pt-4 flex justify-center'>
        <button className='group bg-white border-2 border-red-200 hover:bg-red-50 hover:border-red-300 text-red-600 font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg flex items-center gap-3'>
          <svg
            className='w-6 h-6 group-hover:rotate-12 transition-transform'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
            />
          </svg>
          Đăng xuất tài khoản
        </button>
      </div>
    </div>
  )

  return (
    <div className='min-h-screen bg-white pt-0'>
      {/* Hero Header Section */}
      <section className='relative bg-gradient-to-br from-sky-600 via-sky-500 to-blue-600 text-white overflow-hidden'>
        <div className='absolute inset-0 bg-black opacity-10'></div>
        <div className='relative container mx-auto px-6 py-12 pt-20'></div>
      </section>

      <div className='max-w-6xl mx-auto px-4 md:px-6 -mt-8 relative z-10'>
        {/* Tabs */}
        <div className='bg-white rounded-2xl shadow-xl mb-6 overflow-hidden border border-gray-200'>
          <div className='flex overflow-x-auto scrollbar-thin scrollbar-thumb-sky-200 scrollbar-track-gray-100'>
            {profileTabs.map((tab) => {
              const TabIcon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id)
                    setCookie('profile', tab.id)
                  }}
                  className={`relative flex items-center justify-center gap-3 px-6 py-5 font-semibold transition-all duration-300 whitespace-nowrap flex-1 group ${
                    activeTab === tab.id ? 'bg-sky-600 shadow-lg' : 'text-gray-600 hover:bg-sky-50 hover:text-sky-600'
                  }`}
                >
                  <TabIcon
                    className={`transition-transform duration-300 ${activeTab === tab.id ? 'scale-110' : 'group-hover:scale-110'}`}
                    sx={{ fontSize: 24 }}
                  />
                  <span className='text-base font-bold text-black'>{tab.label}</span>
                  {activeTab === tab.id && (
                    <div className='absolute bottom-0 left-0 right-0 h-1 bg-white rounded-t-full'></div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className='animate-fadeIn pb-10'>
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'bookings' && renderBookingHistory()}
          {activeTab === 'transactions' && renderTransactions()}
          {activeTab === 'subscriptions' && renderSubscriptions()}
          {activeTab === 'settings' && renderSettings()}
        </div>
      </div>
    </div>
  )
}

export default Profile

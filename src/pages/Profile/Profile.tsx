import { useState } from 'react'
import { bookingHistory } from '../../data/mockBookingHistory'
import { transactions } from '../../data/mockTransaction'
import { subscriptions } from '../../data/mockSubcriptions'
import VehicleCard from '../../components/Vehicle/VehicleCard'
import mockVehicles from '../../data/mockVehicles'
import type { Vehicle } from '../../types/station'
import AddVehicleModal from '../../components/Modal/AddVehicleModal'
import { Avatar } from '@mui/material'
import ChargeSessionCard from '../../components/ChargeSession/ChargeSessionCard'
import TransactionCard from '../../components/Transaction/TransactionCard'

const profileTabs = [
  { id: 'overview', icon: '👤', label: 'Tổng quan' },
  { id: 'bookings', icon: '📅', label: 'Lịch đặt sạc' },
  { id: 'transactions', icon: '💳', label: 'Giao dịch' },
  { id: 'subscriptions', icon: '💎', label: 'Gói đăng ký' },
  { id: 'settings', icon: '⚙️', label: 'Cài đặt' }
]

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles)
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false)
  const [newVehicle, setNewVehicle] = useState<Vehicle>({
    id: '',
    name: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    batteryCapacity: 0.0,
    connectorType: ''
  })

  const renderOverview = () => (
    <div className='container mx-auto max-w-6xl p-0'>
      <div className='relative bg-gradient-to-br from-blue-600 via-blue-500 to-purple-500 rounded-3xl overflow-hidden shadow-2xl'>
        {/* Background Pattern */}
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2'></div>
          <div className='absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3'></div>
        </div>

        <div className='relative p-8'>
          {/* Avatar + Info */}
          <div className='flex items-center space-x-6 mb-8'>
            <Avatar src='/assets/Avata/avt_HarryDo.jpeg' alt='harry.do' sx={{ width: 80, height: 80 }} />
            <div>
              <h2 className='text-3xl font-bold text-white mb-2'>Harry Do</h2>
              <p className='text-white/90 flex items-center gap-2'>
                <span>📧</span> harry.do@example.com
              </p>
              <p className='text-white/90 flex items-center gap-2'>
                <span>📱</span> 0909 123 456
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className='grid grid-cols-3 gap-4'>
            <div className='bg-white/95 backdrop-blur rounded-xl p-4 text-center'>
              <p className='text-4xl font-bold text-gray-800 mb-1'>24</p>
              <p className='text-sm text-gray-600'>⚡ Tổng lượt sạc</p>
            </div>
            <div className='bg-white/95 backdrop-blur rounded-xl p-4 text-center'>
              <p className='text-4xl font-bold text-gray-800 mb-1'>1</p>
              <p className='text-sm text-gray-600'>🕐 Lịch sắp tới</p>
            </div>
            <div className='bg-white/95 backdrop-blur rounded-xl p-4 text-center'>
              <p className='text-4xl font-bold text-gray-800 mb-1'>VIP</p>
              <p className='text-sm text-gray-600'>💎 Gói đang dùng</p>
            </div>
          </div>
        </div>
      </div>

      <div className='bg-white rounded-lg shadow-md p-6 mt-4'>
        <h2 className='text-xl font-semibold mb-4'>Danh sách xe</h2>
        <div className='space-y-3'>
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              onClick={() => setSelectedVehicle(vehicle)}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                selectedVehicle?.id === vehicle.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <VehicleCard vehicle={vehicle} selectedVehicle={selectedVehicle} />
            </div>
          ))}

          <button
            onClick={() => setShowAddVehicleModal(true)}
            className='w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-all flex items-center justify-center'
          >
            <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
            </svg>
            Thêm xe mới
          </button>
        </div>
      </div>

      {showAddVehicleModal && (
        <AddVehicleModal
          vehicles={vehicles}
          newVehicle={newVehicle}
          setVehicles={setVehicles}
          setSelectedVehicle={setSelectedVehicle}
          setNewVehicle={setNewVehicle}
          setShowAddVehicleModal={setShowAddVehicleModal}
        />
      )}
    </div>
  )

  const renderBookingHistory = () => (
    <div className='space-y-3'>
      {bookingHistory.map((booking) => (
        <ChargeSessionCard key={booking.id} booking={booking} />
      ))}
    </div>
  )

  const renderTransactions = () => (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-4xl mx-auto'>
        <div className='mb-6'>
          <h2 className='text-2xl font-bold text-gray-800 mb-2'>Lịch Sử Giao Dịch</h2>
          <p className='text-gray-600 text-sm'>Theo dõi chi tiết các giao dịch của bạn</p>
        </div>

        {/* Summary */}
        <div className='mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4'>
          <div className='bg-white rounded-lg p-4 border border-gray-200'>
            <p className='text-gray-600 text-sm mb-1'>Tổng giao dịch</p>
            <p className='text-2xl font-bold text-gray-900'>{transactions.length}</p>
          </div>
          <div className='bg-white rounded-lg p-4 border border-gray-200'>
            <p className='text-gray-600 text-sm mb-1'>Thành công</p>
            <p className='text-2xl font-bold text-green-600'>
              {transactions.filter((t) => t.status === 'success').length}
            </p>
          </div>
          <div className='bg-white rounded-lg p-4 border border-gray-200'>
            <p className='text-gray-600 text-sm mb-1'>Thất bại</p>
            <p className='text-2xl font-bold text-red-600'>
              {transactions.filter((t) => t.status === 'failed').length}
            </p>
          </div>
        </div>

        <div className='space-y-4'>
          {transactions.map((trans) => (
            <TransactionCard key={trans.id} trans={trans} />
          ))}
        </div>
      </div>
    </div>
  )

  const renderSubscriptions = () => (
    <div className='space-y-4'>
      <h3 className='text-xl font-bold text-gray-800'>Các Gói Đăng Ký</h3>
      {subscriptions.map((sub, index) => (
        <div
          key={index}
          className={`bg-white rounded-lg p-6 border-2 ${sub.active ? 'border-blue-500' : 'border-gray-200'}`}
        >
          <div className='flex items-start justify-between mb-4'>
            <div>
              <h4 className='text-lg font-bold text-gray-800'>{sub.name}</h4>
              <p className='text-2xl font-bold text-blue-600 mt-1'>{sub.price}</p>
              {sub.active && <p className='text-sm text-gray-500 mt-1'>Hết hạn: {sub.expiry}</p>}
            </div>
            {sub.active && (
              <span className='px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-semibold'>
                ⭐ Đang dùng
              </span>
            )}
          </div>
          <ul className='space-y-2 mb-4'>
            {sub.benefits.map((benefit, i) => (
              <li key={i} className='flex items-center text-sm text-gray-600'>
                <span className='text-green-500 mr-2'>✓</span>
                {benefit}
              </li>
            ))}
          </ul>
          {!sub.active && (
            <button className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors'>
              Nâng cấp ngay
            </button>
          )}
        </div>
      ))}
    </div>
  )

  const renderSettings = () => (
    <div className='space-y-4'>
      <h3 className='text-xl font-bold text-gray-800'>Quản Lý Trang Cá Nhân</h3>
      <div className='bg-white rounded-lg border border-gray-200 divide-y'>
        {[
          { icon: '👤', label: 'Chỉnh sửa thông tin cá nhân', desc: 'Cập nhật tên, email, số điện thoại' },
          { icon: '💳', label: 'Phương thức thanh toán', desc: 'Quản lý thẻ và ví điện tử' },
          { icon: '🔔', label: 'Cài đặt thông báo', desc: 'Tùy chỉnh thông báo đặt lịch' }
        ].map((item, index) => (
          <button
            key={index}
            className='w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left'
          >
            <div className='flex items-center space-x-3'>
              <span className='text-2xl'>{item.icon}</span>
              <div>
                <p className='font-semibold text-gray-800'>{item.label}</p>
                <p className='text-sm text-gray-500'>{item.desc}</p>
              </div>
            </div>
            <span className='text-gray-400'>›</span>
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div className='min-h-screen bg-gray-50 pt-14'>
      <div className='max-w-6xl mx-auto p-4 md:p-6'>
        {/* Header */}
        <div className='mb-6'>
          <h1 className='text-3xl font-bold text-gray-800'>Trang Cá Nhân</h1>
          <p className='text-gray-600'>Quản lý đặt lịch sạc và tài khoản của bạn</p>
        </div>

        {/* Tabs */}
        <div className='bg-white rounded-lg shadow-sm mb-6 overflow-x-auto'>
          <div className='flex overflow-x-auto'>
            {profileTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center space-x-2 px-6 py-4 font-medium transition-all whitespace-nowrap flex-1 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className='text-lg'>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div>
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

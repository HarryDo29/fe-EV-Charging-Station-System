import React from 'react'
import DashboardLayout from '../../components/Dashboard/DashboardLayout'
import Sidebar from '../../components/Dashboard/Sidebar'
import StatCard from '../../components/Dashboard/StatCard'
import ChartCard from '../../components/Dashboard/ChartCard'
import ActivityItem from '../../components/Dashboard/ActivityItem'
import { Dashboard, Person } from '@mui/icons-material'
import {
  ElectricCar,
  EvStation,
  TrendingUp,
  Assignment,
  AttachMoney,
  Warning,
  CheckCircle,
  Bolt,
  AccessTime,
  PersonAdd,
  Payment,
  BarChart,
  Settings
} from '@mui/icons-material'

const adminSidebarItems = [
  {
    label: 'Dashboard',
    icon: <Dashboard sx={{ fontSize: 20 }} />,
    path: '/admin/dashboard'
  },
  {
    label: 'Quản lý Xe điện',
    icon: <ElectricCar sx={{ fontSize: 20 }} />,
    path: '/admin/vehicles',
    children: [
      { label: 'Danh sách xe', icon: null, path: '/admin/vehicles/list' },
      { label: 'Thêm xe mới', icon: null, path: '/admin/vehicles/add' },
      { label: 'Bảo trì xe', icon: null, path: '/admin/vehicles/maintenance' },
      { label: 'Theo dõi pin', icon: null, path: '/admin/vehicles/battery' }
    ]
  },
  {
    label: 'Quản lý Trạm sạc',
    icon: <EvStation sx={{ fontSize: 20 }} />,
    path: '/admin/stations',
    children: [
      { label: 'Danh sách trạm', icon: null, path: '/admin/stations/list' },
      { label: 'Trụ sạc', icon: null, path: '/admin/stations/chargers' },
      { label: 'Bản đồ trạm', icon: null, path: '/admin/stations/map' },
      { label: 'Bảo trì trụ', icon: null, path: '/admin/stations/maintenance' }
    ]
  },
  {
    label: 'Quản lý Người dùng',
    icon: <Person sx={{ fontSize: 20 }} />,
    path: '/admin/users',
    children: [
      { label: 'Khách hàng (Drivers)', icon: null, path: '/admin/users/customers' },
      { label: 'Nhân viên (Staff)', icon: null, path: '/admin/users/staff' },
      { label: 'Phân quyền', icon: null, path: '/admin/users/permissions' }
    ]
  },
  {
    label: 'Quản lý Giao dịch',
    icon: <Payment sx={{ fontSize: 20 }} />,
    path: '/admin/transactions',
    children: [
      { label: 'Đơn thuê xe', icon: null, path: '/admin/transactions/rentals' },
      { label: 'Thanh toán', icon: null, path: '/admin/transactions/payments' },
      { label: 'Hóa đơn', icon: null, path: '/admin/transactions/invoices' },
      { label: 'Khuyến mãi', icon: null, path: '/admin/transactions/promotions' }
    ]
  },
  {
    label: 'Báo cáo & Analytics',
    icon: <BarChart sx={{ fontSize: 20 }} />,
    path: '/admin/reports',
    children: [
      { label: 'Doanh thu', icon: null, path: '/admin/reports/revenue' },
      { label: 'Sử dụng xe', icon: null, path: '/admin/reports/vehicle-usage' },
      { label: 'Sử dụng trạm sạc', icon: null, path: '/admin/reports/station-usage' },
      { label: 'Hiệu suất nhân viên', icon: null, path: '/admin/reports/staff-performance' }
    ]
  },
  {
    label: 'Cài đặt Hệ thống',
    icon: <Settings sx={{ fontSize: 20 }} />,
    path: '/admin/settings',
    children: [
      { label: 'Biểu giá', icon: null, path: '/admin/settings/pricing' },
      { label: 'Khu vực', icon: null, path: '/admin/settings/regions' },
      { label: 'Thông báo', icon: null, path: '/admin/settings/notifications' },
      { label: 'Backup', icon: null, path: '/admin/settings/backup' }
    ]
  }
]

const AdminDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Xe đang hoạt động',
      value: '127/150',
      icon: <ElectricCar />,
      trend: { value: 12.5, isPositive: true },
      iconColor: 'text-emerald-500'
    },
    {
      title: 'Trạm sạc hoạt động',
      value: '45/50',
      icon: <EvStation />,
      trend: { value: 3.2, isPositive: true },
      iconColor: 'text-blue-500'
    },
    {
      title: 'Doanh thu hôm nay',
      value: '₫45.2M',
      icon: <AttachMoney />,
      trend: { value: 18.7, isPositive: true },
      iconColor: 'text-yellow-500'
    },
    {
      title: 'Đơn thuê đang xử lý',
      value: '23',
      icon: <Assignment />,
      badge: '5 urgent',
      iconColor: 'text-red-500'
    },
    {
      title: 'Tỷ lệ sử dụng xe',
      value: '84.7%',
      icon: <TrendingUp />,
      trend: { value: 5.4, isPositive: true },
      iconColor: 'text-purple-500'
    },
    {
      title: 'Cảnh báo hệ thống',
      value: '7',
      icon: <Warning />,
      iconColor: 'text-orange-500'
    }
  ]

  const recentActivities = [
    {
      icon: <CheckCircle sx={{ fontSize: 20 }} className='text-emerald-600' />,
      title: 'Đơn thuê mới #1234',
      description: 'Khách hàng Nguyễn Văn A thuê xe Tesla Model 3',
      time: '5 phút',
      iconBgColor: 'bg-emerald-100'
    },
    {
      icon: <Warning sx={{ fontSize: 20 }} className='text-red-600' />,
      title: 'Sự cố trạm sạc',
      description: 'Trụ sạc #45 tại Trạm Hà Nội gặp sự cố',
      time: '15 phút',
      iconBgColor: 'bg-red-100'
    },
    {
      icon: <Bolt sx={{ fontSize: 20 }} className='text-blue-600' />,
      title: 'Xe đã được sạc đầy',
      description: 'VinFast VF8 - Biển 30A-12345',
      time: '30 phút',
      iconBgColor: 'bg-blue-100'
    },
    {
      icon: <AccessTime sx={{ fontSize: 20 }} className='text-yellow-600' />,
      title: 'Bảo trì định kỳ',
      description: 'Xe BMW i4 cần bảo trì vào ngày mai',
      time: '1 giờ',
      iconBgColor: 'bg-yellow-100'
    },
    {
      icon: <PersonAdd sx={{ fontSize: 20 }} className='text-purple-600' />,
      title: 'Nhân viên mới',
      description: 'Trần Thị B được thêm vào hệ thống',
      time: '2 giờ',
      iconBgColor: 'bg-purple-100'
    }
  ]

  return (
    <DashboardLayout sidebar={<Sidebar items={adminSidebarItems} userRole='admin' />}>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900'>Dashboard</h1>
        <p className='text-gray-500 mt-1'>Tổng quan hệ thống cho thuê xe điện</p>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
        <ChartCard
          title='Doanh thu 7 ngày qua'
          subtitle='Biểu đồ doanh thu theo ngày'
          actions={
            <select className='text-sm border border-gray-300 rounded-lg px-3 py-1.5'>
              <option>7 ngày</option>
              <option>30 ngày</option>
              <option>90 ngày</option>
            </select>
          }
        >
          <div className='h-64 flex items-end justify-between space-x-2'>
            {[45, 52, 48, 65, 58, 70, 62].map((value, index) => (
              <div key={index} className='flex-1 flex flex-col items-center'>
                <div
                  className='w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg hover:from-emerald-600 hover:to-emerald-500 transition-all cursor-pointer'
                  style={{ height: `${value}%` }}
                />
                <span className='text-xs text-gray-500 mt-2'>{['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'][index]}</span>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title='Sử dụng xe theo giờ' subtitle='Biểu đồ phân bố theo thời gian'>
          <div className='h-64 flex items-end justify-between space-x-1'>
            {[30, 25, 20, 35, 45, 60, 75, 85, 80, 70, 65, 55, 50, 48, 52, 60, 70, 80, 90, 85, 75, 60, 45, 35].map(
              (value, index) => (
                <div key={index} className='flex-1 flex flex-col items-center'>
                  <div
                    className='w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t hover:from-blue-600 hover:to-blue-500 transition-all cursor-pointer'
                    style={{ height: `${value}%` }}
                  />
                </div>
              )
            )}
          </div>
          <div className='flex justify-between mt-2 text-xs text-gray-500'>
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>24:00</span>
          </div>
        </ChartCard>
      </div>

      {/* Additional Charts */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
        <ChartCard title='Top 5 xe được thuê nhiều nhất'>
          <div className='space-y-3'>
            {[
              { name: 'Tesla Model 3', rentals: 145, color: 'bg-emerald-500' },
              { name: 'VinFast VF8', rentals: 132, color: 'bg-blue-500' },
              { name: 'BMW i4', rentals: 98, color: 'bg-purple-500' },
              { name: 'Hyundai Ioniq 5', rentals: 87, color: 'bg-yellow-500' },
              { name: 'Kia EV6', rentals: 76, color: 'bg-pink-500' }
            ].map((vehicle, index) => (
              <div key={index}>
                <div className='flex justify-between text-sm mb-1'>
                  <span className='font-medium text-gray-700'>{vehicle.name}</span>
                  <span className='text-gray-600'>{vehicle.rentals} lượt</span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-2'>
                  <div
                    className={`${vehicle.color} h-2 rounded-full transition-all`}
                    style={{ width: `${(vehicle.rentals / 145) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title='Trạng thái xe'>
          <div className='h-48 flex items-center justify-center'>
            <div className='relative w-40 h-40'>
              <svg className='w-full h-full transform -rotate-90'>
                <circle cx='80' cy='80' r='70' fill='none' stroke='#e5e7eb' strokeWidth='20' />
                <circle
                  cx='80'
                  cy='80'
                  r='70'
                  fill='none'
                  stroke='#10b981'
                  strokeWidth='20'
                  strokeDasharray={`${(127 / 150) * 440} 440`}
                />
              </svg>
              <div className='absolute inset-0 flex flex-col items-center justify-center'>
                <span className='text-3xl font-bold text-gray-900'>84.7%</span>
                <span className='text-sm text-gray-500'>Đang hoạt động</span>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-3 gap-2 mt-4'>
            <div className='text-center'>
              <div className='flex items-center justify-center mb-1'>
                <div className='w-3 h-3 rounded-full bg-emerald-500 mr-2' />
                <span className='text-2xl font-bold text-gray-900'>127</span>
              </div>
              <span className='text-xs text-gray-500'>Hoạt động</span>
            </div>
            <div className='text-center'>
              <div className='flex items-center justify-center mb-1'>
                <div className='w-3 h-3 rounded-full bg-yellow-500 mr-2' />
                <span className='text-2xl font-bold text-gray-900'>15</span>
              </div>
              <span className='text-xs text-gray-500'>Bảo trì</span>
            </div>
            <div className='text-center'>
              <div className='flex items-center justify-center mb-1'>
                <div className='w-3 h-3 rounded-full bg-gray-300 mr-2' />
                <span className='text-2xl font-bold text-gray-900'>8</span>
              </div>
              <span className='text-xs text-gray-500'>Nghỉ</span>
            </div>
          </div>
        </ChartCard>

        <ChartCard title='Trạng thái trạm sạc'>
          <div className='space-y-4'>
            {[
              { name: 'Trạm Hà Nội', active: 12, total: 15, usage: 80 },
              { name: 'Trạm TP.HCM', active: 18, total: 20, usage: 90 },
              { name: 'Trạm Đà Nẵng', active: 8, total: 10, usage: 80 },
              { name: 'Trạm Cần Thơ', active: 7, total: 5, usage: 70 }
            ].map((station, index) => (
              <div key={index}>
                <div className='flex justify-between text-sm mb-1'>
                  <span className='font-medium text-gray-700'>{station.name}</span>
                  <span className='text-gray-600'>
                    {station.active}/{station.total}
                  </span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-2'>
                  <div
                    className={`${
                      station.usage >= 80 ? 'bg-emerald-500' : 'bg-yellow-500'
                    } h-2 rounded-full transition-all`}
                    style={{ width: `${station.usage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Recent Activity */}
      <ChartCard
        title='Hoạt động gần đây'
        subtitle='Cập nhật liên tục từ hệ thống'
        actions={<button className='text-sm text-emerald-600 hover:text-emerald-700 font-medium'>Xem tất cả</button>}
      >
        <div className='space-y-1'>
          {recentActivities.map((activity, index) => (
            <ActivityItem key={index} {...activity} />
          ))}
        </div>
      </ChartCard>
    </DashboardLayout>
  )
}

export default AdminDashboard

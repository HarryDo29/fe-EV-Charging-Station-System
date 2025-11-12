import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DashboardLayout from '../../components/Dashboard/DashboardLayout'
import Sidebar from '../../components/Dashboard/Sidebar'
import StatCard from '../../components/Dashboard/StatCard'
import ChartCard from '../../components/Dashboard/ChartCard'
import { Dashboard, EvStation, BatteryChargingFull, SupportAgent } from '@mui/icons-material'

const staffSidebarItems = [
  {
    label: 'Dashboard',
    icon: <Dashboard sx={{ fontSize: 20 }} />,
    path: '/staff'
  },
  {
    label: 'Quản lý Trụ sạc',
    icon: <EvStation sx={{ fontSize: 20 }} />,
    path: '/staff/chargers'
  },
  {
    label: 'Phiên sạc',
    icon: <BatteryChargingFull sx={{ fontSize: 20 }} />,
    path: '/staff/sessions/create'
  },
  {
    label: 'Hỗ trợ khách hàng',
    icon: <SupportAgent sx={{ fontSize: 20 }} />,
    path: '/staff/support',
    badge: 4
  }
]

const StaffDashboard: React.FC = () => {
  const navigate = useNavigate()

  const taskStats = [
    {
      title: 'Xe cần kiểm tra',
      value: '5',
      icon: (
        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
      ),
      iconColor: 'text-emerald-500'
    },
    {
      title: 'Trụ sạc cần bảo trì',
      value: '3',
      icon: (
        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
          />
        </svg>
      ),
      iconColor: 'text-yellow-500'
    },
    {
      title: 'Đơn thuê cần xác nhận',
      value: '7',
      icon: (
        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
          />
        </svg>
      ),
      iconColor: 'text-blue-500'
    },
    {
      title: 'Sự cố chờ xử lý',
      value: '2',
      icon: (
        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
      ),
      iconColor: 'text-red-500'
    }
  ]

  const todaySchedule = [
    {
      time: '08:00',
      title: 'Kiểm tra trạm Hà Nội',
      description: 'Kiểm tra toàn bộ trụ sạc và vệ sinh trạm',
      status: 'completed',
      location: 'Trạm Hà Nội'
    },
    {
      time: '10:30',
      title: 'Bảo trì trụ sạc #45',
      description: 'Thay thế cáp sạc và kiểm tra hệ thống',
      status: 'in_progress',
      location: 'Trạm Hà Nội'
    },
    {
      time: '13:00',
      title: 'Xác nhận đơn thuê #1234',
      description: 'Giao xe Tesla Model 3 cho khách hàng',
      status: 'pending',
      location: 'Trạm Hà Nội'
    },
    {
      time: '15:00',
      title: 'Kiểm tra xe VinFast VF8',
      description: 'Kiểm tra định kỳ và vệ sinh xe',
      status: 'pending',
      location: 'Trạm Hà Nội'
    },
    {
      time: '17:00',
      title: 'Báo cáo cuối ngày',
      description: 'Tổng hợp công việc và báo cáo quản lý',
      status: 'pending',
      location: 'Online'
    }
  ]

  const quickActions = [
    {
      label: 'Quản lý Trụ sạc',
      path: '/staff/chargers',
      icon: <EvStation />,
      color: 'bg-emerald-500 hover:bg-emerald-600'
    },
    {
      label: 'Tạo Phiên sạc',
      path: '/staff/sessions/create',
      icon: <BatteryChargingFull />,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      label: 'Hỗ trợ Khách hàng',
      path: '/staff/support',
      icon: <SupportAgent />,
      color: 'bg-purple-500 hover:bg-purple-600',
      badge: 4
    },
    {
      label: 'Cập nhật trạng thái',
      path: '/staff/chargers',
      icon: <EvStation />,
      color: 'bg-yellow-500 hover:bg-yellow-600'
    }
  ]

  const assignedStations = [
    {
      name: 'Trạm Hà Nội',
      address: '123 Đường ABC, Hà Nội',
      chargers: { active: 12, total: 15 },
      status: 'active'
    },
    {
      name: 'Trạm Cầu Giấy',
      address: '456 Đường XYZ, Hà Nội',
      chargers: { active: 8, total: 10 },
      status: 'active'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-100 text-emerald-700'
      case 'in_progress':
        return 'bg-blue-100 text-blue-700'
      case 'pending':
        return 'bg-gray-100 text-gray-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Hoàn thành'
      case 'in_progress':
        return 'Đang thực hiện'
      case 'pending':
        return 'Chờ xử lý'
      default:
        return 'Chờ xử lý'
    }
  }

  return (
    <DashboardLayout sidebar={<Sidebar items={staffSidebarItems} userRole='staff' />}>
      {/* Header */}
      <div className='mb-8'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>Dashboard Nhân viên</h1>
            <p className='text-gray-500 mt-1'>Chào mừng trở lại! Đây là công việc hôm nay của bạn</p>
          </div>
          <div className='text-right'>
            <p className='text-sm text-gray-500'>Thứ 4, 12 Tháng 11, 2025</p>
            <p className='text-2xl font-bold text-emerald-600'>08:30 AM</p>
          </div>
        </div>
      </div>

      {/* Task Overview Stats */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        {taskStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
        <div className='lg:col-span-2'>
          <ChartCard title='Lịch làm việc hôm nay' subtitle='Cập nhật trạng thái công việc của bạn'>
            <div className='space-y-3'>
              {todaySchedule.map((schedule, index) => (
                <div
                  key={index}
                  className='flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'
                >
                  <div className='flex-shrink-0 text-center'>
                    <p className='text-sm font-bold text-gray-900'>{schedule.time}</p>
                    <div
                      className={`mt-2 w-3 h-3 rounded-full ${
                        schedule.status === 'completed'
                          ? 'bg-emerald-500'
                          : schedule.status === 'in_progress'
                            ? 'bg-blue-500'
                            : 'bg-gray-300'
                      }`}
                    />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center justify-between mb-1'>
                      <h4 className='text-sm font-semibold text-gray-900'>{schedule.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(schedule.status)}`}>
                        {getStatusLabel(schedule.status)}
                      </span>
                    </div>
                    <p className='text-sm text-gray-600'>{schedule.description}</p>
                    <div className='flex items-center mt-2 text-xs text-gray-500'>
                      <svg className='w-4 h-4 mr-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                        />
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                        />
                      </svg>
                      {schedule.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        {/* Quick Actions & Assigned Stations */}
        <div className='space-y-6'>
          <ChartCard title='Thao tác nhanh'>
            <div className='grid grid-cols-2 gap-3'>
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => navigate(action.path)}
                  className={`${action.color} text-white p-4 rounded-lg transition-all transform hover:scale-105 shadow-sm relative`}
                >
                  {action.badge && (
                    <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'>
                      {action.badge}
                    </span>
                  )}
                  <div className='flex flex-col items-center space-y-2'>
                    {action.icon}
                    <span className='text-xs font-medium text-center'>{action.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </ChartCard>

          <ChartCard title='Trạm được phân công'>
            <div className='space-y-3'>
              {assignedStations.map((station, index) => (
                <Link
                  key={index}
                  to='/staff/chargers'
                  className='block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer'
                >
                  <h4 className='font-semibold text-gray-900 mb-1'>{station.name}</h4>
                  <p className='text-sm text-gray-600 mb-2'>{station.address}</p>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-2'>
                      <svg className='w-4 h-4 text-emerald-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M13 10V3L4 14h7v7l9-11h-7z'
                        />
                      </svg>
                      <span className='text-sm text-gray-700'>
                        {station.chargers.active}/{station.chargers.total} trụ
                      </span>
                    </div>
                    <span className='text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full'>Hoạt động</span>
                  </div>
                </Link>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>

      {/* Performance Summary */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <ChartCard title='Nhiệm vụ trong tuần'>
          <div className='space-y-3'>
            {[
              { day: 'Thứ 2', completed: 8, total: 10 },
              { day: 'Thứ 3', completed: 9, total: 12 },
              { day: 'Thứ 4', completed: 5, total: 15 },
              { day: 'Thứ 5', completed: 0, total: 8 },
              { day: 'Thứ 6', completed: 0, total: 11 }
            ].map((item, index) => (
              <div key={index}>
                <div className='flex justify-between text-sm mb-1'>
                  <span className='font-medium text-gray-700'>{item.day}</span>
                  <span className='text-gray-600'>
                    {item.completed}/{item.total}
                  </span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-2'>
                  <div
                    className='bg-emerald-500 h-2 rounded-full transition-all'
                    style={{ width: `${(item.completed / item.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title='Đánh giá tháng này'>
          <div className='flex flex-col items-center justify-center h-full'>
            <div className='text-center mb-4'>
              <div className='text-5xl font-bold text-emerald-600 mb-2'>4.8</div>
              <div className='flex justify-center mb-2'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-6 h-6 ${star <= 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                  </svg>
                ))}
              </div>
              <p className='text-sm text-gray-500'>28 đánh giá</p>
            </div>
            <div className='w-full space-y-2'>
              <div className='flex items-center justify-between text-xs'>
                <span className='text-gray-600'>Chuyên nghiệp</span>
                <span className='font-medium'>95%</span>
              </div>
              <div className='flex items-center justify-between text-xs'>
                <span className='text-gray-600'>Nhanh chóng</span>
                <span className='font-medium'>92%</span>
              </div>
              <div className='flex items-center justify-between text-xs'>
                <span className='text-gray-600'>Thân thiện</span>
                <span className='font-medium'>98%</span>
              </div>
            </div>
          </div>
        </ChartCard>

        <ChartCard title='Thống kê nhanh'>
          <div className='space-y-4'>
            <div className='flex items-center justify-between p-3 bg-emerald-50 rounded-lg'>
              <div className='flex items-center space-x-3'>
                <div className='bg-emerald-500 p-2 rounded-lg'>
                  <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </div>
                <div>
                  <p className='text-sm text-gray-600'>Nhiệm vụ hoàn thành</p>
                  <p className='text-2xl font-bold text-gray-900'>156</p>
                </div>
              </div>
            </div>

            <div className='flex items-center justify-between p-3 bg-blue-50 rounded-lg'>
              <div className='flex items-center space-x-3'>
                <div className='bg-blue-500 p-2 rounded-lg'>
                  <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </div>
                <div>
                  <p className='text-sm text-gray-600'>Giờ làm việc</p>
                  <p className='text-2xl font-bold text-gray-900'>168h</p>
                </div>
              </div>
            </div>

            <div className='flex items-center justify-between p-3 bg-purple-50 rounded-lg'>
              <div className='flex items-center space-x-3'>
                <div className='bg-purple-500 p-2 rounded-lg'>
                  <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
                    />
                  </svg>
                </div>
                <div>
                  <p className='text-sm text-gray-600'>Khách hàng hỗ trợ</p>
                  <p className='text-2xl font-bold text-gray-900'>42</p>
                </div>
              </div>
            </div>
          </div>
        </ChartCard>
      </div>
    </DashboardLayout>
  )
}

export default StaffDashboard

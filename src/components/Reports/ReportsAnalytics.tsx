import React, { useState } from 'react'
import DashboardLayout from '../Dashboard/DashboardLayout'
import Sidebar from '../Dashboard/Sidebar'
import ChartCard from '../Dashboard/ChartCard'

const adminSidebarItems = [
  {
    label: 'Dashboard',
    icon: (
      <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
        />
      </svg>
    ),
    path: '/admin/dashboard'
  },
  {
    label: 'Báo cáo & Analytics',
    icon: (
      <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
        />
      </svg>
    ),
    path: '/admin/reports',
    children: [
      { label: 'Doanh thu', icon: null, path: '/admin/reports/revenue' },
      { label: 'Sử dụng xe', icon: null, path: '/admin/reports/vehicle-usage' },
      { label: 'Sử dụng trạm sạc', icon: null, path: '/admin/reports/station-usage' },
      { label: 'Hiệu suất nhân viên', icon: null, path: '/admin/reports/staff-performance' }
    ]
  }
]

export const ReportsAnalytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30days')
  const [selectedReport, setSelectedReport] = useState('overview')

  const revenueData = [
    { month: 'T1', revenue: 125 },
    { month: 'T2', revenue: 142 },
    { month: 'T3', revenue: 138 },
    { month: 'T4', revenue: 165 },
    { month: 'T5', revenue: 178 },
    { month: 'T6', revenue: 195 },
    { month: 'T7', revenue: 212 },
    { month: 'T8', revenue: 198 },
    { month: 'T9', revenue: 215 },
    { month: 'T10', revenue: 232 },
    { month: 'T11', revenue: 245 },
    { month: 'T12', revenue: 258 }
  ]

  const vehicleUsageData = [
    { model: 'Tesla Model 3', usage: 92, rentals: 145 },
    { model: 'VinFast VF8', usage: 88, rentals: 132 },
    { model: 'BMW i4', usage: 75, rentals: 98 },
    { model: 'Hyundai Ioniq 5', usage: 68, rentals: 87 },
    { model: 'Kia EV6', usage: 62, rentals: 76 },
    { model: 'Tesla Model Y', usage: 85, rentals: 112 }
  ]

  const stationUsageData = [
    { station: 'Trạm Hà Nội', usage: 95, transactions: 1245 },
    { station: 'Trạm TP.HCM', usage: 92, transactions: 1189 },
    { station: 'Trạm Đà Nẵng', usage: 78, transactions: 892 },
    { station: 'Trạm Cần Thơ', usage: 72, transactions: 756 },
    { station: 'Trạm Hải Phòng', usage: 68, transactions: 634 }
  ]

  const staffPerformanceData = [
    { name: 'Trần Văn A', tasks: 156, rating: 4.8, efficiency: 95 },
    { name: 'Nguyễn Thị B', tasks: 203, rating: 4.9, efficiency: 98 },
    { name: 'Lê Văn C', tasks: 142, rating: 4.7, efficiency: 92 },
    { name: 'Phạm Thị D', tasks: 98, rating: 4.9, efficiency: 96 },
    { name: 'Hoàng Văn E', tasks: 87, rating: 4.5, efficiency: 88 }
  ]

  const maxRevenue = Math.max(...revenueData.map((d) => d.revenue))

  return (
    <DashboardLayout sidebar={<Sidebar items={adminSidebarItems} userRole='admin' />}>
      {/* Header */}
      <div className='mb-8'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>Báo cáo & Phân tích</h1>
            <p className='text-gray-500 mt-1'>Phân tích chi tiết về hiệu suất kinh doanh</p>
          </div>
          <div className='flex space-x-3'>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500'
            >
              <option value='7days'>7 ngày qua</option>
              <option value='30days'>30 ngày qua</option>
              <option value='90days'>90 ngày qua</option>
              <option value='year'>Năm nay</option>
            </select>
            <button className='bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors'>
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                />
              </svg>
              <span>Xuất báo cáo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Report Type Tabs */}
      <div className='flex items-center space-x-4 mb-8 overflow-x-auto pb-2'>
        {[
          { key: 'overview', label: 'Tổng quan', icon: '📊' },
          { key: 'revenue', label: 'Doanh thu', icon: '💰' },
          { key: 'vehicles', label: 'Xe điện', icon: '🚗' },
          { key: 'stations', label: 'Trạm sạc', icon: '⚡' },
          { key: 'staff', label: 'Nhân viên', icon: '👥' }
        ].map((report) => (
          <button
            key={report.key}
            onClick={() => setSelectedReport(report.key)}
            className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center space-x-2 ${
              selectedReport === report.key
                ? 'bg-emerald-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <span>{report.icon}</span>
            <span>{report.label}</span>
          </button>
        ))}
      </div>

      {/* Key Metrics */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
        <div className='bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white'>
          <div className='flex items-center justify-between mb-2'>
            <p className='text-emerald-100'>Doanh thu tháng này</p>
            <svg className='w-8 h-8 text-emerald-200' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </div>
          <p className='text-4xl font-bold mb-1'>₫245M</p>
          <div className='flex items-center text-emerald-100 text-sm'>
            <svg className='w-4 h-4 mr-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' />
            </svg>
            <span>+12.5% so với tháng trước</span>
          </div>
        </div>

        <div className='bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white'>
          <div className='flex items-center justify-between mb-2'>
            <p className='text-blue-100'>Lượt thuê xe</p>
            <svg className='w-8 h-8 text-blue-200' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
              />
            </svg>
          </div>
          <p className='text-4xl font-bold mb-1'>1,247</p>
          <div className='flex items-center text-blue-100 text-sm'>
            <svg className='w-4 h-4 mr-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' />
            </svg>
            <span>+8.3% so với tháng trước</span>
          </div>
        </div>

        <div className='bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white'>
          <div className='flex items-center justify-between mb-2'>
            <p className='text-purple-100'>Năng lượng sạc</p>
            <svg className='w-8 h-8 text-purple-200' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
            </svg>
          </div>
          <p className='text-4xl font-bold mb-1'>45,678 kWh</p>
          <div className='flex items-center text-purple-100 text-sm'>
            <svg className='w-4 h-4 mr-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' />
            </svg>
            <span>+15.7% so với tháng trước</span>
          </div>
        </div>

        <div className='bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white'>
          <div className='flex items-center justify-between mb-2'>
            <p className='text-yellow-100'>Khách hàng mới</p>
            <svg className='w-8 h-8 text-yellow-200' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
              />
            </svg>
          </div>
          <p className='text-4xl font-bold mb-1'>87</p>
          <div className='flex items-center text-yellow-100 text-sm'>
            <svg className='w-4 h-4 mr-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' />
            </svg>
            <span>+23.4% so với tháng trước</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
        {/* Revenue Chart */}
        <ChartCard title='Doanh thu theo tháng' subtitle='Biểu đồ doanh thu 12 tháng'>
          <div className='h-80 flex items-end justify-between space-x-2'>
            {revenueData.map((data, index) => (
              <div key={index} className='flex-1 flex flex-col items-center group'>
                <div className='relative w-full'>
                  <div
                    className='w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg hover:from-emerald-600 hover:to-emerald-500 transition-all cursor-pointer'
                    style={{ height: `${(data.revenue / maxRevenue) * 280}px` }}
                  />
                  <div className='absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap'>
                    ₫{data.revenue}M
                  </div>
                </div>
                <span className='text-xs text-gray-500 mt-2'>{data.month}</span>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Vehicle Usage Chart */}
        <ChartCard title='Tỷ lệ sử dụng xe theo model' subtitle='Top 6 xe được sử dụng nhiều nhất'>
          <div className='space-y-4'>
            {vehicleUsageData.map((vehicle, index) => (
              <div key={index}>
                <div className='flex justify-between text-sm mb-2'>
                  <span className='font-medium text-gray-700'>{vehicle.model}</span>
                  <div className='flex items-center space-x-3'>
                    <span className='text-gray-600'>{vehicle.rentals} lượt</span>
                    <span className='font-semibold text-gray-900'>{vehicle.usage}%</span>
                  </div>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-3'>
                  <div
                    className={`h-3 rounded-full transition-all ${
                      vehicle.usage >= 80 ? 'bg-emerald-500' : vehicle.usage >= 60 ? 'bg-blue-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${vehicle.usage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Additional Analytics */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Station Usage */}
        <ChartCard title='Hiệu suất trạm sạc' subtitle='Tỷ lệ sử dụng và giao dịch'>
          <div className='space-y-4'>
            {stationUsageData.map((station, index) => (
              <div key={index} className='p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
                <div className='flex items-center justify-between mb-2'>
                  <h4 className='font-semibold text-gray-900'>{station.station}</h4>
                  <span className='text-2xl font-bold text-emerald-600'>{station.usage}%</span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-2 mb-2'>
                  <div className='bg-emerald-500 h-2 rounded-full' style={{ width: `${station.usage}%` }} />
                </div>
                <p className='text-sm text-gray-600'>{station.transactions} giao dịch</p>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Staff Performance */}
        <ChartCard title='Hiệu suất nhân viên' subtitle='Top 5 nhân viên xuất sắc'>
          <div className='space-y-4'>
            {staffPerformanceData.map((staff, index) => (
              <div
                key={index}
                className='flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'
              >
                <div className='flex items-center space-x-3'>
                  <div className='w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold'>
                    {index + 1}
                  </div>
                  <div>
                    <p className='font-semibold text-gray-900'>{staff.name}</p>
                    <div className='flex items-center space-x-2 text-sm text-gray-600'>
                      <span>{staff.tasks} nhiệm vụ</span>
                      <span>•</span>
                      <div className='flex items-center'>
                        <svg className='w-4 h-4 text-yellow-400 mr-1' fill='currentColor' viewBox='0 0 20 20'>
                          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                        </svg>
                        <span>{staff.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='text-2xl font-bold text-emerald-600'>{staff.efficiency}%</p>
                  <p className='text-xs text-gray-500'>Hiệu suất</p>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </DashboardLayout>
  )
}

export default ReportsAnalytics

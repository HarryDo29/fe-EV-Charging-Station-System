import React, { useState } from 'react'
import DashboardLayout from '../Dashboard/DashboardLayout'
import Sidebar from '../Dashboard/Sidebar'

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
    label: 'Quản lý Người dùng',
    icon: (
      <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
        />
      </svg>
    ),
    path: '/admin/users',
    children: [
      { label: 'Khách hàng (Drivers)', icon: null, path: '/admin/users/customers' },
      { label: 'Nhân viên (Staff)', icon: null, path: '/admin/users/staff' },
      { label: 'Phân quyền', icon: null, path: '/admin/users/permissions' }
    ]
  }
]

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  totalRentals: number
  totalSpent: number
  status: 'active' | 'inactive' | 'blocked'
  joinDate: string
  vehicles: string[]
  lastRental: string
  rating: number
}

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0901234567',
    totalRentals: 45,
    totalSpent: 25000000,
    status: 'active',
    joinDate: '2024-01-15',
    vehicles: ['Tesla Model 3', 'VinFast VF8'],
    lastRental: '2025-11-10',
    rating: 4.8
  },
  {
    id: '2',
    name: 'Trần Thị B',
    email: 'tranthib@email.com',
    phone: '0912345678',
    totalRentals: 32,
    totalSpent: 18000000,
    status: 'active',
    joinDate: '2024-02-20',
    vehicles: ['BMW i4'],
    lastRental: '2025-11-08',
    rating: 4.5
  },
  {
    id: '3',
    name: 'Lê Văn C',
    email: 'levanc@email.com',
    phone: '0923456789',
    totalRentals: 28,
    totalSpent: 15000000,
    status: 'active',
    joinDate: '2024-03-10',
    vehicles: ['Hyundai Ioniq 5', 'Kia EV6'],
    lastRental: '2025-11-05',
    rating: 4.9
  },
  {
    id: '4',
    name: 'Phạm Thị D',
    email: 'phamthid@email.com',
    phone: '0934567890',
    totalRentals: 15,
    totalSpent: 8000000,
    status: 'inactive',
    joinDate: '2024-05-22',
    vehicles: ['VinFast VF8'],
    lastRental: '2025-09-15',
    rating: 4.2
  },
  {
    id: '5',
    name: 'Hoàng Văn E',
    email: 'hoangvane@email.com',
    phone: '0945678901',
    totalRentals: 8,
    totalSpent: 4500000,
    status: 'blocked',
    joinDate: '2024-06-30',
    vehicles: ['Tesla Model 3'],
    lastRental: '2025-08-20',
    rating: 3.5
  }
]

export const CustomerList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  const filteredCustomers = mockCustomers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
    const matchesStatus = filterStatus === 'all' || customer.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-100 text-emerald-700'
      case 'inactive':
        return 'bg-gray-100 text-gray-700'
      case 'blocked':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Hoạt động'
      case 'inactive':
        return 'Không hoạt động'
      case 'blocked':
        return 'Bị khóa'
      default:
        return status
    }
  }

  const statusCounts = {
    all: mockCustomers.length,
    active: mockCustomers.filter((c) => c.status === 'active').length,
    inactive: mockCustomers.filter((c) => c.status === 'inactive').length,
    blocked: mockCustomers.filter((c) => c.status === 'blocked').length
  }

  return (
    <DashboardLayout sidebar={<Sidebar items={adminSidebarItems} userRole='admin' />}>
      {/* Header */}
      <div className='mb-8'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>Quản lý Khách hàng</h1>
            <p className='text-gray-500 mt-1'>Quản lý thông tin khách hàng và lịch sử thuê xe</p>
          </div>
          <div className='flex space-x-3'>
            <button className='bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 border border-gray-200 transition-colors'>
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

      {/* Stats Overview */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
        <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Tổng khách hàng</p>
              <p className='text-3xl font-bold text-gray-900'>{mockCustomers.length}</p>
            </div>
            <div className='bg-emerald-100 p-3 rounded-lg'>
              <svg className='w-6 h-6 text-emerald-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                />
              </svg>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Đang hoạt động</p>
              <p className='text-3xl font-bold text-emerald-600'>{statusCounts.active}</p>
            </div>
            <div className='bg-emerald-100 p-3 rounded-lg'>
              <svg className='w-6 h-6 text-emerald-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Tổng lượt thuê</p>
              <p className='text-3xl font-bold text-gray-900'>
                {mockCustomers.reduce((sum, c) => sum + c.totalRentals, 0)}
              </p>
            </div>
            <div className='bg-blue-100 p-3 rounded-lg'>
              <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
                />
              </svg>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Doanh thu</p>
              <p className='text-3xl font-bold text-gray-900'>
                ₫{(mockCustomers.reduce((sum, c) => sum + c.totalSpent, 0) / 1000000).toFixed(1)}M
              </p>
            </div>
            <div className='bg-yellow-100 p-3 rounded-lg'>
              <svg className='w-6 h-6 text-yellow-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className='flex items-center space-x-4 mb-6 overflow-x-auto pb-2'>
        {[
          { key: 'all', label: 'Tất cả', count: statusCounts.all },
          { key: 'active', label: 'Hoạt động', count: statusCounts.active },
          { key: 'inactive', label: 'Không hoạt động', count: statusCounts.inactive },
          { key: 'blocked', label: 'Bị khóa', count: statusCounts.blocked }
        ].map((filter) => (
          <button
            key={filter.key}
            onClick={() => setFilterStatus(filter.key)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              filterStatus === filter.key
                ? 'bg-emerald-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {filter.label} ({filter.count})
          </button>
        ))}
      </div>

      {/* Search */}
      <div className='mb-6'>
        <div className='relative max-w-md'>
          <input
            type='text'
            placeholder='Tìm kiếm theo tên, email, số điện thoại...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent'
          />
          <svg
            className='w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </div>
      </div>

      {/* Customer Table */}
      <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b border-gray-200'>
              <tr>
                <th className='text-left p-4 text-sm font-semibold text-gray-700'>Khách hàng</th>
                <th className='text-left p-4 text-sm font-semibold text-gray-700'>Liên hệ</th>
                <th className='text-left p-4 text-sm font-semibold text-gray-700'>Lượt thuê</th>
                <th className='text-left p-4 text-sm font-semibold text-gray-700'>Chi tiêu</th>
                <th className='text-left p-4 text-sm font-semibold text-gray-700'>Đánh giá</th>
                <th className='text-left p-4 text-sm font-semibold text-gray-700'>Trạng thái</th>
                <th className='text-left p-4 text-sm font-semibold text-gray-700'>Thuê gần nhất</th>
                <th className='text-right p-4 text-sm font-semibold text-gray-700'>Thao tác</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className='hover:bg-gray-50'>
                  <td className='p-4'>
                    <div className='flex items-center space-x-3'>
                      <div className='w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white font-semibold'>
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <p className='font-semibold text-gray-900'>{customer.name}</p>
                        <p className='text-xs text-gray-500'>Tham gia: {customer.joinDate}</p>
                      </div>
                    </div>
                  </td>
                  <td className='p-4'>
                    <div>
                      <p className='text-sm text-gray-900'>{customer.email}</p>
                      <p className='text-sm text-gray-600'>{customer.phone}</p>
                    </div>
                  </td>
                  <td className='p-4'>
                    <div className='flex items-center space-x-2'>
                      <span className='text-2xl font-bold text-gray-900'>{customer.totalRentals}</span>
                      <span className='text-sm text-gray-500'>lượt</span>
                    </div>
                  </td>
                  <td className='p-4'>
                    <div>
                      <p className='font-semibold text-gray-900'>₫{(customer.totalSpent / 1000000).toFixed(1)}M</p>
                    </div>
                  </td>
                  <td className='p-4'>
                    <div className='flex items-center space-x-1'>
                      <svg className='w-5 h-5 text-yellow-400' fill='currentColor' viewBox='0 0 20 20'>
                        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                      </svg>
                      <span className='font-semibold text-gray-900'>{customer.rating}</span>
                    </div>
                  </td>
                  <td className='p-4'>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                      {getStatusLabel(customer.status)}
                    </span>
                  </td>
                  <td className='p-4 text-sm text-gray-600'>{customer.lastRental}</td>
                  <td className='p-4'>
                    <div className='flex items-center justify-end space-x-2'>
                      <button
                        onClick={() => setSelectedCustomer(customer)}
                        className='text-emerald-600 hover:text-emerald-700'
                        title='Xem chi tiết'
                      >
                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                          />
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                          />
                        </svg>
                      </button>
                      <button className='text-blue-600 hover:text-blue-700' title='Chỉnh sửa'>
                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                          />
                        </svg>
                      </button>
                      {customer.status !== 'blocked' ? (
                        <button className='text-red-600 hover:text-red-700' title='Khóa tài khoản'>
                          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                            />
                          </svg>
                        </button>
                      ) : (
                        <button className='text-emerald-600 hover:text-emerald-700' title='Mở khóa'>
                          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z'
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
            <div className='p-6 border-b border-gray-200'>
              <div className='flex items-center justify-between'>
                <h3 className='text-2xl font-bold text-gray-900'>Chi tiết khách hàng</h3>
                <button onClick={() => setSelectedCustomer(null)} className='text-gray-400 hover:text-gray-600'>
                  <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </button>
              </div>
            </div>

            <div className='p-6'>
              <div className='flex items-center space-x-4 mb-6'>
                <div className='w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white text-3xl font-bold'>
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <h4 className='text-xl font-bold text-gray-900'>{selectedCustomer.name}</h4>
                  <p className='text-gray-600'>{selectedCustomer.email}</p>
                  <div className='flex items-center space-x-2 mt-1'>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedCustomer.status)}`}
                    >
                      {getStatusLabel(selectedCustomer.status)}
                    </span>
                    <div className='flex items-center space-x-1'>
                      <svg className='w-4 h-4 text-yellow-400' fill='currentColor' viewBox='0 0 20 20'>
                        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                      </svg>
                      <span className='text-sm font-semibold'>{selectedCustomer.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-6 mb-6'>
                <div className='bg-gray-50 p-4 rounded-lg'>
                  <p className='text-sm text-gray-600 mb-1'>Số điện thoại</p>
                  <p className='font-semibold text-gray-900'>{selectedCustomer.phone}</p>
                </div>
                <div className='bg-gray-50 p-4 rounded-lg'>
                  <p className='text-sm text-gray-600 mb-1'>Ngày tham gia</p>
                  <p className='font-semibold text-gray-900'>{selectedCustomer.joinDate}</p>
                </div>
                <div className='bg-gray-50 p-4 rounded-lg'>
                  <p className='text-sm text-gray-600 mb-1'>Tổng lượt thuê</p>
                  <p className='font-semibold text-gray-900'>{selectedCustomer.totalRentals} lượt</p>
                </div>
                <div className='bg-gray-50 p-4 rounded-lg'>
                  <p className='text-sm text-gray-600 mb-1'>Tổng chi tiêu</p>
                  <p className='font-semibold text-gray-900'>₫{(selectedCustomer.totalSpent / 1000000).toFixed(1)}M</p>
                </div>
              </div>

              <div className='mb-6'>
                <h5 className='font-semibold text-gray-900 mb-3'>Xe đã thuê</h5>
                <div className='flex flex-wrap gap-2'>
                  {selectedCustomer.vehicles.map((vehicle, index) => (
                    <span key={index} className='px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm'>
                      {vehicle}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h5 className='font-semibold text-gray-900 mb-3'>Thuê xe gần nhất</h5>
                <p className='text-gray-600'>{selectedCustomer.lastRental}</p>
              </div>
            </div>

            <div className='p-6 border-t border-gray-200 flex justify-end space-x-3'>
              <button
                onClick={() => setSelectedCustomer(null)}
                className='px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50'
              >
                Đóng
              </button>
              <button className='px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600'>Chỉnh sửa</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

export default CustomerList

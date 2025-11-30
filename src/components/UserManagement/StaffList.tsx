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

interface Staff {
  id: string
  name: string
  email: string
  phone: string
  role: string
  assignedStations: string[]
  tasksCompleted: number
  status: 'active' | 'inactive' | 'on_leave'
  joinDate: string
  rating: number
  workingHours: number
}

const mockStaff: Staff[] = [
  {
    id: '1',
    name: 'Trần Văn Nhân Viên',
    email: 'nhanvien1@evcharge.com',
    phone: '0901111111',
    role: 'Kỹ thuật viên',
    assignedStations: ['Trạm Hà Nội', 'Trạm Cầu Giấy'],
    tasksCompleted: 156,
    status: 'active',
    joinDate: '2024-01-10',
    rating: 4.8,
    workingHours: 168
  },
  {
    id: '2',
    name: 'Nguyễn Thị Hỗ Trợ',
    email: 'hotro1@evcharge.com',
    phone: '0902222222',
    role: 'Hỗ trợ khách hàng',
    assignedStations: ['Trạm TP.HCM'],
    tasksCompleted: 203,
    status: 'active',
    joinDate: '2024-02-15',
    rating: 4.9,
    workingHours: 160
  },
  {
    id: '3',
    name: 'Lê Văn Bảo Trì',
    email: 'baotri1@evcharge.com',
    phone: '0903333333',
    role: 'Kỹ thuật viên',
    assignedStations: ['Trạm Đà Nẵng'],
    tasksCompleted: 142,
    status: 'active',
    joinDate: '2024-03-20',
    rating: 4.7,
    workingHours: 152
  },
  {
    id: '4',
    name: 'Phạm Thị Quản Lý',
    email: 'quanly1@evcharge.com',
    phone: '0904444444',
    role: 'Quản lý trạm',
    assignedStations: ['Trạm Hà Nội'],
    tasksCompleted: 98,
    status: 'active',
    joinDate: '2024-01-05',
    rating: 4.9,
    workingHours: 176
  },
  {
    id: '5',
    name: 'Hoàng Văn Nghỉ',
    email: 'nghi@evcharge.com',
    phone: '0905555555',
    role: 'Kỹ thuật viên',
    assignedStations: ['Trạm Cần Thơ'],
    tasksCompleted: 87,
    status: 'on_leave',
    joinDate: '2024-04-10',
    rating: 4.5,
    workingHours: 120
  }
]

export const StaffList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null)
  const [, setShowAddModal] = useState(false)

  const filteredStaff = mockStaff.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || staff.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-100 text-emerald-700'
      case 'inactive':
        return 'bg-gray-100 text-gray-700'
      case 'on_leave':
        return 'bg-yellow-100 text-yellow-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Đang làm việc'
      case 'inactive':
        return 'Không hoạt động'
      case 'on_leave':
        return 'Nghỉ phép'
      default:
        return status
    }
  }

  const statusCounts = {
    all: mockStaff.length,
    active: mockStaff.filter((s) => s.status === 'active').length,
    on_leave: mockStaff.filter((s) => s.status === 'on_leave').length,
    inactive: mockStaff.filter((s) => s.status === 'inactive').length
  }

  return (
    <DashboardLayout sidebar={<Sidebar items={adminSidebarItems} userRole='admin' />}>
      {/* Header */}
      <div className='mb-8'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>Quản lý Nhân viên</h1>
            <p className='text-gray-500 mt-1'>Quản lý nhân viên tại các trạm sạc</p>
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
            <button
              onClick={() => setShowAddModal(true)}
              className='bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors'
            >
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
              </svg>
              <span>Thêm nhân viên</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
        <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Tổng nhân viên</p>
              <p className='text-3xl font-bold text-gray-900'>{mockStaff.length}</p>
            </div>
            <div className='bg-blue-100 p-3 rounded-lg'>
              <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
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
              <p className='text-sm text-gray-600 mb-1'>Đang làm việc</p>
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
              <p className='text-sm text-gray-600 mb-1'>Nhiệm vụ hoàn thành</p>
              <p className='text-3xl font-bold text-gray-900'>
                {mockStaff.reduce((sum, s) => sum + s.tasksCompleted, 0)}
              </p>
            </div>
            <div className='bg-purple-100 p-3 rounded-lg'>
              <svg className='w-6 h-6 text-purple-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
                />
              </svg>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Đánh giá trung bình</p>
              <p className='text-3xl font-bold text-gray-900'>
                {(mockStaff.reduce((sum, s) => sum + s.rating, 0) / mockStaff.length).toFixed(1)}
              </p>
            </div>
            <div className='bg-yellow-100 p-3 rounded-lg'>
              <svg className='w-6 h-6 text-yellow-600' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className='flex items-center space-x-4 mb-6 overflow-x-auto pb-2'>
        {[
          { key: 'all', label: 'Tất cả', count: statusCounts.all },
          { key: 'active', label: 'Đang làm việc', count: statusCounts.active },
          { key: 'on_leave', label: 'Nghỉ phép', count: statusCounts.on_leave },
          { key: 'inactive', label: 'Không hoạt động', count: statusCounts.inactive }
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
            placeholder='Tìm kiếm theo tên, email, vai trò...'
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

      {/* Staff Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {filteredStaff.map((staff) => (
          <div
            key={staff.id}
            className='bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow'
          >
            <div className='flex items-start justify-between mb-4'>
              <div className='flex items-center space-x-3'>
                <div className='w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-lg'>
                  {staff.name.charAt(0)}
                </div>
                <div>
                  <h3 className='font-bold text-gray-900'>{staff.name}</h3>
                  <p className='text-sm text-gray-600'>{staff.role}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(staff.status)}`}>
                {getStatusLabel(staff.status)}
              </span>
            </div>

            <div className='space-y-2 mb-4'>
              <div className='flex items-center text-sm text-gray-600'>
                <svg className='w-4 h-4 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                  />
                </svg>
                {staff.email}
              </div>
              <div className='flex items-center text-sm text-gray-600'>
                <svg className='w-4 h-4 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                  />
                </svg>
                {staff.phone}
              </div>
            </div>

            <div className='mb-4'>
              <p className='text-sm text-gray-600 mb-2'>Trạm được phân công:</p>
              <div className='flex flex-wrap gap-1'>
                {staff.assignedStations.map((station, index) => (
                  <span key={index} className='px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs'>
                    {station}
                  </span>
                ))}
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4 mb-4'>
              <div className='bg-gray-50 p-3 rounded-lg'>
                <p className='text-xs text-gray-600 mb-1'>Nhiệm vụ</p>
                <p className='text-lg font-bold text-gray-900'>{staff.tasksCompleted}</p>
              </div>
              <div className='bg-gray-50 p-3 rounded-lg'>
                <p className='text-xs text-gray-600 mb-1'>Giờ làm</p>
                <p className='text-lg font-bold text-gray-900'>{staff.workingHours}h</p>
              </div>
            </div>

            <div className='flex items-center justify-between mb-4'>
              <span className='text-sm text-gray-600'>Đánh giá:</span>
              <div className='flex items-center space-x-1'>
                <svg className='w-5 h-5 text-yellow-400' fill='currentColor' viewBox='0 0 20 20'>
                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                </svg>
                <span className='font-semibold text-gray-900'>{staff.rating}</span>
              </div>
            </div>

            <div className='flex space-x-2'>
              <button
                onClick={() => setSelectedStaff(staff)}
                className='flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg text-sm font-medium transition-colors'
              >
                Chi tiết
              </button>
              <button className='px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors'>
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Staff Detail Modal */}
      {selectedStaff && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
            <div className='p-6 border-b border-gray-200'>
              <div className='flex items-center justify-between'>
                <h3 className='text-2xl font-bold text-gray-900'>Chi tiết nhân viên</h3>
                <button onClick={() => setSelectedStaff(null)} className='text-gray-400 hover:text-gray-600'>
                  <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </button>
              </div>
            </div>

            <div className='p-6'>
              <div className='flex items-center space-x-4 mb-6'>
                <div className='w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold'>
                  {selectedStaff.name.charAt(0)}
                </div>
                <div>
                  <h4 className='text-xl font-bold text-gray-900'>{selectedStaff.name}</h4>
                  <p className='text-gray-600'>{selectedStaff.role}</p>
                  <span
                    className={`mt-1 inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedStaff.status)}`}
                  >
                    {getStatusLabel(selectedStaff.status)}
                  </span>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-6 mb-6'>
                <div className='bg-gray-50 p-4 rounded-lg'>
                  <p className='text-sm text-gray-600 mb-1'>Email</p>
                  <p className='font-semibold text-gray-900'>{selectedStaff.email}</p>
                </div>
                <div className='bg-gray-50 p-4 rounded-lg'>
                  <p className='text-sm text-gray-600 mb-1'>Số điện thoại</p>
                  <p className='font-semibold text-gray-900'>{selectedStaff.phone}</p>
                </div>
                <div className='bg-gray-50 p-4 rounded-lg'>
                  <p className='text-sm text-gray-600 mb-1'>Ngày tham gia</p>
                  <p className='font-semibold text-gray-900'>{selectedStaff.joinDate}</p>
                </div>
                <div className='bg-gray-50 p-4 rounded-lg'>
                  <p className='text-sm text-gray-600 mb-1'>Đánh giá</p>
                  <div className='flex items-center space-x-1'>
                    <svg className='w-5 h-5 text-yellow-400' fill='currentColor' viewBox='0 0 20 20'>
                      <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                    </svg>
                    <span className='font-semibold text-gray-900'>{selectedStaff.rating}</span>
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-6 mb-6'>
                <div className='bg-emerald-50 p-4 rounded-lg'>
                  <p className='text-sm text-gray-600 mb-1'>Nhiệm vụ hoàn thành</p>
                  <p className='text-2xl font-bold text-emerald-600'>{selectedStaff.tasksCompleted}</p>
                </div>
                <div className='bg-blue-50 p-4 rounded-lg'>
                  <p className='text-sm text-gray-600 mb-1'>Giờ làm việc</p>
                  <p className='text-2xl font-bold text-blue-600'>{selectedStaff.workingHours}h</p>
                </div>
              </div>

              <div>
                <h5 className='font-semibold text-gray-900 mb-3'>Trạm được phân công</h5>
                <div className='flex flex-wrap gap-2'>
                  {selectedStaff.assignedStations.map((station, index) => (
                    <span key={index} className='px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm'>
                      {station}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className='p-6 border-t border-gray-200 flex justify-end space-x-3'>
              <button
                onClick={() => setSelectedStaff(null)}
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

export default StaffList

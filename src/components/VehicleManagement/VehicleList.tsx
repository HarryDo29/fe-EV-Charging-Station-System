import React, { useState } from 'react'
import DashboardLayout from '../Dashboard/DashboardLayout'
import Sidebar from '../Dashboard/Sidebar'
import { Link } from 'react-router-dom'

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
    label: 'Quản lý Xe điện',
    icon: (
      <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2'
        />
      </svg>
    ),
    path: '/admin/vehicles',
    children: [
      { label: 'Danh sách xe', icon: null, path: '/admin/vehicles/list' },
      { label: 'Thêm xe mới', icon: null, path: '/admin/vehicles/add' },
      { label: 'Bảo trì xe', icon: null, path: '/admin/vehicles/maintenance' },
      { label: 'Theo dõi pin', icon: null, path: '/admin/vehicles/battery' }
    ]
  }
]

interface Vehicle {
  id: string
  plateNumber: string
  model: string
  brand: string
  battery: number
  status: 'available' | 'rented' | 'maintenance' | 'charging'
  location: string
  rentCount: number
  lastMaintenance: string
  image: string
}

const mockVehicles: Vehicle[] = [
  {
    id: '1',
    plateNumber: '30A-12345',
    model: 'Model 3',
    brand: 'Tesla',
    battery: 87,
    status: 'available',
    location: 'Trạm Hà Nội',
    rentCount: 145,
    lastMaintenance: '2025-10-15',
    image: '/api/placeholder/400/300'
  },
  {
    id: '2',
    plateNumber: '30B-67890',
    model: 'VF8',
    brand: 'VinFast',
    battery: 65,
    status: 'rented',
    location: 'Đang di chuyển',
    rentCount: 132,
    lastMaintenance: '2025-10-20',
    image: '/api/placeholder/400/300'
  },
  {
    id: '3',
    plateNumber: '30C-11111',
    model: 'i4',
    brand: 'BMW',
    battery: 45,
    status: 'charging',
    location: 'Trạm TP.HCM',
    rentCount: 98,
    lastMaintenance: '2025-10-10',
    image: '/api/placeholder/400/300'
  },
  {
    id: '4',
    plateNumber: '30D-22222',
    model: 'Ioniq 5',
    brand: 'Hyundai',
    battery: 20,
    status: 'maintenance',
    location: 'Garage',
    rentCount: 87,
    lastMaintenance: '2025-11-01',
    image: '/api/placeholder/400/300'
  },
  {
    id: '5',
    plateNumber: '30E-33333',
    model: 'EV6',
    brand: 'Kia',
    battery: 92,
    status: 'available',
    location: 'Trạm Đà Nẵng',
    rentCount: 76,
    lastMaintenance: '2025-10-25',
    image: '/api/placeholder/400/300'
  },
  {
    id: '6',
    plateNumber: '30F-44444',
    model: 'Model Y',
    brand: 'Tesla',
    battery: 78,
    status: 'rented',
    location: 'Đang di chuyển',
    rentCount: 156,
    lastMaintenance: '2025-10-18',
    image: '/api/placeholder/400/300'
  }
]

const VehicleList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')

  const filteredVehicles = mockVehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || vehicle.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-emerald-100 text-emerald-700'
      case 'rented':
        return 'bg-blue-100 text-blue-700'
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-700'
      case 'charging':
        return 'bg-purple-100 text-purple-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available':
        return 'Sẵn sàng'
      case 'rented':
        return 'Đang thuê'
      case 'maintenance':
        return 'Bảo trì'
      case 'charging':
        return 'Đang sạc'
      default:
        return status
    }
  }

  const getBatteryColor = (battery: number) => {
    if (battery >= 80) return 'text-emerald-500'
    if (battery >= 50) return 'text-yellow-500'
    if (battery >= 20) return 'text-orange-500'
    return 'text-red-500'
  }

  const statusCounts = {
    all: mockVehicles.length,
    available: mockVehicles.filter((v) => v.status === 'available').length,
    rented: mockVehicles.filter((v) => v.status === 'rented').length,
    maintenance: mockVehicles.filter((v) => v.status === 'maintenance').length,
    charging: mockVehicles.filter((v) => v.status === 'charging').length
  }

  return (
    <DashboardLayout sidebar={<Sidebar items={adminSidebarItems} userRole='admin' />}>
      {/* Header */}
      <div className='mb-8'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>Quản lý Xe điện</h1>
            <p className='text-gray-500 mt-1'>Quản lý toàn bộ xe điện trong hệ thống</p>
          </div>
          <Link
            to='/admin/vehicles/add'
            className='bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors'
          >
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
            </svg>
            <span>Thêm xe mới</span>
          </Link>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className='flex items-center space-x-4 mb-6 overflow-x-auto pb-2'>
        {[
          { key: 'all', label: 'Tất cả xe', count: statusCounts.all },
          { key: 'available', label: 'Sẵn sàng', count: statusCounts.available },
          { key: 'rented', label: 'Đang thuê', count: statusCounts.rented },
          { key: 'charging', label: 'Đang sạc', count: statusCounts.charging },
          { key: 'maintenance', label: 'Bảo trì', count: statusCounts.maintenance }
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

      {/* Search and View Toggle */}
      <div className='flex items-center justify-between mb-6 gap-4'>
        <div className='flex-1 max-w-md relative'>
          <input
            type='text'
            placeholder='Tìm kiếm theo biển số, model, hãng xe...'
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

        <div className='flex items-center space-x-2'>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${
              viewMode === 'grid' ? 'bg-emerald-500 text-white' : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
              />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-2 rounded-lg ${
              viewMode === 'table' ? 'bg-emerald-500 text-white' : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
            </svg>
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow'
            >
              <div className='relative h-48 bg-gray-200'>
                <div className='absolute top-4 right-4'>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
                    {getStatusLabel(vehicle.status)}
                  </span>
                </div>
                <div className='absolute bottom-4 left-4 right-4'>
                  <div className='bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-3'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center space-x-2'>
                        <svg
                          className={`w-5 h-5 ${getBatteryColor(vehicle.battery)}`}
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M13 10V3L4 14h7v7l9-11h-7z'
                          />
                        </svg>
                        <span className='font-semibold text-gray-900'>{vehicle.battery}%</span>
                      </div>
                      <span className='text-xs text-gray-500'>~{Math.round(vehicle.battery * 4)}km</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className='p-4'>
                <div className='mb-3'>
                  <h3 className='text-lg font-bold text-gray-900'>
                    {vehicle.brand} {vehicle.model}
                  </h3>
                  <p className='text-sm text-gray-600'>{vehicle.plateNumber}</p>
                </div>

                <div className='space-y-2 mb-4'>
                  <div className='flex items-center text-sm text-gray-600'>
                    <svg className='w-4 h-4 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
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
                    {vehicle.location}
                  </div>
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-gray-600'>Số lượt thuê:</span>
                    <span className='font-semibold text-gray-900'>{vehicle.rentCount}</span>
                  </div>
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-gray-600'>Bảo trì gần nhất:</span>
                    <span className='font-semibold text-gray-900'>{vehicle.lastMaintenance}</span>
                  </div>
                </div>

                <div className='flex space-x-2'>
                  <Link
                    to={`/admin/vehicles/detail/${vehicle.id}`}
                    className='flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg text-center text-sm font-medium transition-colors'
                  >
                    Chi tiết
                  </Link>
                  <button className='px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors'>
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z'
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-gray-50 border-b border-gray-200'>
                <tr>
                  <th className='text-left p-4 text-sm font-semibold text-gray-700'>Xe</th>
                  <th className='text-left p-4 text-sm font-semibold text-gray-700'>Biển số</th>
                  <th className='text-left p-4 text-sm font-semibold text-gray-700'>Pin</th>
                  <th className='text-left p-4 text-sm font-semibold text-gray-700'>Trạng thái</th>
                  <th className='text-left p-4 text-sm font-semibold text-gray-700'>Vị trí</th>
                  <th className='text-left p-4 text-sm font-semibold text-gray-700'>Lượt thuê</th>
                  <th className='text-left p-4 text-sm font-semibold text-gray-700'>Bảo trì</th>
                  <th className='text-right p-4 text-sm font-semibold text-gray-700'>Thao tác</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-100'>
                {filteredVehicles.map((vehicle) => (
                  <tr key={vehicle.id} className='hover:bg-gray-50'>
                    <td className='p-4'>
                      <div>
                        <p className='font-semibold text-gray-900'>{vehicle.brand}</p>
                        <p className='text-sm text-gray-600'>{vehicle.model}</p>
                      </div>
                    </td>
                    <td className='p-4'>
                      <span className='font-mono font-medium text-gray-900'>{vehicle.plateNumber}</span>
                    </td>
                    <td className='p-4'>
                      <div className='flex items-center space-x-2'>
                        <div className='w-20 bg-gray-200 rounded-full h-2'>
                          <div
                            className={`h-2 rounded-full ${
                              vehicle.battery >= 80
                                ? 'bg-emerald-500'
                                : vehicle.battery >= 50
                                  ? 'bg-yellow-500'
                                  : vehicle.battery >= 20
                                    ? 'bg-orange-500'
                                    : 'bg-red-500'
                            }`}
                            style={{ width: `${vehicle.battery}%` }}
                          />
                        </div>
                        <span className='text-sm font-medium text-gray-900'>{vehicle.battery}%</span>
                      </div>
                    </td>
                    <td className='p-4'>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
                        {getStatusLabel(vehicle.status)}
                      </span>
                    </td>
                    <td className='p-4 text-sm text-gray-600'>{vehicle.location}</td>
                    <td className='p-4 text-sm font-medium text-gray-900'>{vehicle.rentCount}</td>
                    <td className='p-4 text-sm text-gray-600'>{vehicle.lastMaintenance}</td>
                    <td className='p-4'>
                      <div className='flex items-center justify-end space-x-2'>
                        <Link
                          to={`/admin/vehicles/detail/${vehicle.id}`}
                          className='text-emerald-600 hover:text-emerald-700'
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
                        </Link>
                        <button className='text-blue-600 hover:text-blue-700'>
                          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                            />
                          </svg>
                        </button>
                        <button className='text-red-600 hover:text-red-700'>
                          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

export default VehicleList

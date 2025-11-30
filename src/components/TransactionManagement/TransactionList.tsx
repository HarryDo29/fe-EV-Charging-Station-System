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
    label: 'Quản lý Giao dịch',
    icon: (
      <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z'
        />
      </svg>
    ),
    path: '/transactions',
    children: [
      { label: 'Đơn thuê xe', icon: null, path: '/transactions/rentals' },
      { label: 'Thanh toán', icon: null, path: '/transactions/payments' },
      { label: 'Hóa đơn', icon: null, path: '/transactions/invoices' },
      { label: 'Khuyến mãi', icon: null, path: '/transactions/promotions' }
    ]
  }
]

interface Transaction {
  id: string
  orderNumber: string
  customer: string
  vehicle: string
  startDate: string
  endDate: string
  totalAmount: number
  paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded'
  rentalStatus: 'active' | 'completed' | 'cancelled'
  paymentMethod: string
  station: string
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    orderNumber: 'ORD-2025-001234',
    customer: 'Nguyễn Văn A',
    vehicle: 'Tesla Model 3 - 30A-12345',
    startDate: '2025-11-10 08:00',
    endDate: '2025-11-12 18:00',
    totalAmount: 2500000,
    paymentStatus: 'paid',
    rentalStatus: 'active',
    paymentMethod: 'Thẻ tín dụng',
    station: 'Trạm Hà Nội'
  },
  {
    id: '2',
    orderNumber: 'ORD-2025-001235',
    customer: 'Trần Thị B',
    vehicle: 'VinFast VF8 - 30B-67890',
    startDate: '2025-11-08 10:00',
    endDate: '2025-11-10 16:00',
    totalAmount: 1800000,
    paymentStatus: 'paid',
    rentalStatus: 'completed',
    paymentMethod: 'Chuyển khoản',
    station: 'Trạm TP.HCM'
  },
  {
    id: '3',
    orderNumber: 'ORD-2025-001236',
    customer: 'Lê Văn C',
    vehicle: 'BMW i4 - 30C-11111',
    startDate: '2025-11-12 14:00',
    endDate: '2025-11-15 10:00',
    totalAmount: 3200000,
    paymentStatus: 'pending',
    rentalStatus: 'active',
    paymentMethod: 'Tiền mặt',
    station: 'Trạm Đà Nẵng'
  },
  {
    id: '4',
    orderNumber: 'ORD-2025-001237',
    customer: 'Phạm Thị D',
    vehicle: 'Hyundai Ioniq 5 - 30D-22222',
    startDate: '2025-11-05 09:00',
    endDate: '2025-11-07 17:00',
    totalAmount: 1500000,
    paymentStatus: 'paid',
    rentalStatus: 'completed',
    paymentMethod: 'Ví điện tử',
    station: 'Trạm Hà Nội'
  },
  {
    id: '5',
    orderNumber: 'ORD-2025-001238',
    customer: 'Hoàng Văn E',
    vehicle: 'Kia EV6 - 30E-33333',
    startDate: '2025-11-03 11:00',
    endDate: '2025-11-05 15:00',
    totalAmount: 1200000,
    paymentStatus: 'failed',
    rentalStatus: 'cancelled',
    paymentMethod: 'Thẻ tín dụng',
    station: 'Trạm Cần Thơ'
  },
  {
    id: '6',
    orderNumber: 'ORD-2025-001239',
    customer: 'Võ Thị F',
    vehicle: 'Tesla Model Y - 30F-44444',
    startDate: '2025-11-01 08:00',
    endDate: '2025-11-03 18:00',
    totalAmount: 2800000,
    paymentStatus: 'refunded',
    rentalStatus: 'cancelled',
    paymentMethod: 'Chuyển khoản',
    station: 'Trạm TP.HCM'
  }
]

export const TransactionList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPaymentStatus, setFilterPaymentStatus] = useState<string>('all')
  const [filterRentalStatus, setFilterRentalStatus] = useState<string>('all')
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPayment = filterPaymentStatus === 'all' || transaction.paymentStatus === filterPaymentStatus
    const matchesRental = filterRentalStatus === 'all' || transaction.rentalStatus === filterRentalStatus
    return matchesSearch && matchesPayment && matchesRental
  })

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-emerald-100 text-emerald-700'
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'failed':
        return 'bg-red-100 text-red-700'
      case 'refunded':
        return 'bg-gray-100 text-gray-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getPaymentStatusLabel = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Đã thanh toán'
      case 'pending':
        return 'Chờ thanh toán'
      case 'failed':
        return 'Thất bại'
      case 'refunded':
        return 'Đã hoàn tiền'
      default:
        return status
    }
  }

  const getRentalStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-700'
      case 'completed':
        return 'bg-emerald-100 text-emerald-700'
      case 'cancelled':
        return 'bg-gray-100 text-gray-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getRentalStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Đang thuê'
      case 'completed':
        return 'Hoàn thành'
      case 'cancelled':
        return 'Đã hủy'
      default:
        return status
    }
  }

  const totalRevenue = mockTransactions
    .filter((t) => t.paymentStatus === 'paid')
    .reduce((sum, t) => sum + t.totalAmount, 0)

  const activeRentals = mockTransactions.filter((t) => t.rentalStatus === 'active').length
  const pendingPayments = mockTransactions.filter((t) => t.paymentStatus === 'pending').length

  return (
    <DashboardLayout sidebar={<Sidebar items={adminSidebarItems} userRole='admin' />}>
      {/* Header */}
      <div className='mb-8'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>Quản lý Giao dịch</h1>
            <p className='text-gray-500 mt-1'>Quản lý đơn thuê xe và thanh toán</p>
          </div>
          <div className='flex space-x-3'>
            <button className='bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 border border-gray-200 transition-colors'>
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z'
                />
              </svg>
              <span>Lọc nâng cao</span>
            </button>
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

      {/* Stats Overview */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
        <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Tổng doanh thu</p>
              <p className='text-3xl font-bold text-gray-900'>₫{(totalRevenue / 1000000).toFixed(1)}M</p>
            </div>
            <div className='bg-emerald-100 p-3 rounded-lg'>
              <svg className='w-6 h-6 text-emerald-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
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

        <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Tổng giao dịch</p>
              <p className='text-3xl font-bold text-gray-900'>{mockTransactions.length}</p>
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
              <p className='text-sm text-gray-600 mb-1'>Đang thuê</p>
              <p className='text-3xl font-bold text-blue-600'>{activeRentals}</p>
            </div>
            <div className='bg-blue-100 p-3 rounded-lg'>
              <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2'
                />
              </svg>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Chờ thanh toán</p>
              <p className='text-3xl font-bold text-yellow-600'>{pendingPayments}</p>
            </div>
            <div className='bg-yellow-100 p-3 rounded-lg'>
              <svg className='w-6 h-6 text-yellow-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className='flex flex-col md:flex-row gap-4 mb-6'>
        <div className='flex-1 relative'>
          <input
            type='text'
            placeholder='Tìm kiếm theo mã đơn, khách hàng, xe...'
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

        <select
          value={filterPaymentStatus}
          onChange={(e) => setFilterPaymentStatus(e.target.value)}
          className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500'
        >
          <option value='all'>Tất cả thanh toán</option>
          <option value='paid'>Đã thanh toán</option>
          <option value='pending'>Chờ thanh toán</option>
          <option value='failed'>Thất bại</option>
          <option value='refunded'>Đã hoàn tiền</option>
        </select>

        <select
          value={filterRentalStatus}
          onChange={(e) => setFilterRentalStatus(e.target.value)}
          className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500'
        >
          <option value='all'>Tất cả trạng thái</option>
          <option value='active'>Đang thuê</option>
          <option value='completed'>Hoàn thành</option>
          <option value='cancelled'>Đã hủy</option>
        </select>
      </div>

      {/* Transactions Table */}
      <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b border-gray-200'>
              <tr>
                <th className='text-left p-4 text-sm font-semibold text-gray-700'>Mã đơn</th>
                <th className='text-left p-4 text-sm font-semibold text-gray-700'>Khách hàng</th>
                <th className='text-left p-4 text-sm font-semibold text-gray-700'>Xe</th>
                <th className='text-left p-4 text-sm font-semibold text-gray-700'>Thời gian</th>
                <th className='text-left p-4 text-sm font-semibold text-gray-700'>Trạm</th>
                <th className='text-left p-4 text-sm font-semibold text-gray-700'>Số tiền</th>
                <th className='text-left p-4 text-sm font-semibold text-gray-700'>Thanh toán</th>
                <th className='text-left p-4 text-sm font-semibold text-gray-700'>Trạng thái</th>
                <th className='text-right p-4 text-sm font-semibold text-gray-700'>Thao tác</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className='hover:bg-gray-50'>
                  <td className='p-4'>
                    <div>
                      <p className='font-mono font-semibold text-gray-900 text-sm'>{transaction.orderNumber}</p>
                      <p className='text-xs text-gray-500'>{transaction.paymentMethod}</p>
                    </div>
                  </td>
                  <td className='p-4'>
                    <p className='font-medium text-gray-900'>{transaction.customer}</p>
                  </td>
                  <td className='p-4'>
                    <p className='text-sm text-gray-900'>{transaction.vehicle}</p>
                  </td>
                  <td className='p-4'>
                    <div>
                      <p className='text-sm text-gray-900'>Từ: {transaction.startDate}</p>
                      <p className='text-sm text-gray-600'>Đến: {transaction.endDate}</p>
                    </div>
                  </td>
                  <td className='p-4'>
                    <p className='text-sm text-gray-600'>{transaction.station}</p>
                  </td>
                  <td className='p-4'>
                    <p className='font-semibold text-gray-900'>₫{(transaction.totalAmount / 1000).toFixed(0)}K</p>
                  </td>
                  <td className='p-4'>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(transaction.paymentStatus)}`}
                    >
                      {getPaymentStatusLabel(transaction.paymentStatus)}
                    </span>
                  </td>
                  <td className='p-4'>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getRentalStatusColor(transaction.rentalStatus)}`}
                    >
                      {getRentalStatusLabel(transaction.rentalStatus)}
                    </span>
                  </td>
                  <td className='p-4'>
                    <div className='flex items-center justify-end space-x-2'>
                      <button
                        onClick={() => setSelectedTransaction(transaction)}
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
                      <button className='text-blue-600 hover:text-blue-700' title='In hóa đơn'>
                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z'
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

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
            <div className='p-6 border-b border-gray-200'>
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='text-2xl font-bold text-gray-900'>Chi tiết giao dịch</h3>
                  <p className='text-sm text-gray-500 mt-1'>{selectedTransaction.orderNumber}</p>
                </div>
                <button onClick={() => setSelectedTransaction(null)} className='text-gray-400 hover:text-gray-600'>
                  <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </button>
              </div>
            </div>

            <div className='p-6'>
              <div className='grid grid-cols-2 gap-6 mb-6'>
                <div className='bg-gray-50 p-4 rounded-lg'>
                  <p className='text-sm text-gray-600 mb-1'>Khách hàng</p>
                  <p className='font-semibold text-gray-900'>{selectedTransaction.customer}</p>
                </div>
                <div className='bg-gray-50 p-4 rounded-lg'>
                  <p className='text-sm text-gray-600 mb-1'>Xe thuê</p>
                  <p className='font-semibold text-gray-900'>{selectedTransaction.vehicle}</p>
                </div>
                <div className='bg-gray-50 p-4 rounded-lg'>
                  <p className='text-sm text-gray-600 mb-1'>Trạm lấy xe</p>
                  <p className='font-semibold text-gray-900'>{selectedTransaction.station}</p>
                </div>
                <div className='bg-gray-50 p-4 rounded-lg'>
                  <p className='text-sm text-gray-600 mb-1'>Phương thức thanh toán</p>
                  <p className='font-semibold text-gray-900'>{selectedTransaction.paymentMethod}</p>
                </div>
              </div>

              <div className='mb-6'>
                <h4 className='font-semibold text-gray-900 mb-3'>Thời gian thuê</h4>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='bg-blue-50 p-4 rounded-lg'>
                    <p className='text-sm text-blue-600 mb-1'>Bắt đầu</p>
                    <p className='font-semibold text-gray-900'>{selectedTransaction.startDate}</p>
                  </div>
                  <div className='bg-purple-50 p-4 rounded-lg'>
                    <p className='text-sm text-purple-600 mb-1'>Kết thúc</p>
                    <p className='font-semibold text-gray-900'>{selectedTransaction.endDate}</p>
                  </div>
                </div>
              </div>

              <div className='bg-emerald-50 p-6 rounded-lg mb-6'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm text-gray-600 mb-1'>Tổng tiền</p>
                    <p className='text-3xl font-bold text-emerald-600'>
                      ₫{(selectedTransaction.totalAmount / 1000).toFixed(0)}K
                    </p>
                  </div>
                  <div className='text-right'>
                    <span
                      className={`inline-block px-4 py-2 rounded-lg text-sm font-medium mb-2 ${getPaymentStatusColor(selectedTransaction.paymentStatus)}`}
                    >
                      {getPaymentStatusLabel(selectedTransaction.paymentStatus)}
                    </span>
                    <br />
                    <span
                      className={`inline-block px-4 py-2 rounded-lg text-sm font-medium ${getRentalStatusColor(selectedTransaction.rentalStatus)}`}
                    >
                      {getRentalStatusLabel(selectedTransaction.rentalStatus)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className='p-6 border-t border-gray-200 flex justify-between'>
              <button className='px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2'>
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z'
                  />
                </svg>
                <span>In hóa đơn</span>
              </button>
              <button
                onClick={() => setSelectedTransaction(null)}
                className='px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50'
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

export default TransactionList

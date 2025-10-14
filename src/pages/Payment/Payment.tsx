import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Station, ChargePoint, Vehicle, BookingData } from '../../types/station'

const Payment = () => {
  const navigate = useNavigate()
  const [bookingData, setBookingData] = useState<BookingData | null>(null)
  const [station, setStation] = useState<Station | null>(null)
  const [chargePoint, setChargePoint] = useState<ChargePoint | null>(null)
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'momo' | 'zalopay' | 'bank'>('card')
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    // Lấy dữ liệu từ sessionStorage
    const bookingDataStr = sessionStorage.getItem('bookingData')
    const stationStr = sessionStorage.getItem('selectedStation')
    const chargePointStr = sessionStorage.getItem('selectedChargePoint')
    const vehicleStr = sessionStorage.getItem('selectedVehicle')

    if (!bookingDataStr || !stationStr || !chargePointStr || !vehicleStr) {
      // Nếu không có dữ liệu, quay lại trang map
      navigate('/map')
      return
    }

    setBookingData(JSON.parse(bookingDataStr))
    setStation(JSON.parse(stationStr))
    setChargePoint(JSON.parse(chargePointStr))
    setVehicle(JSON.parse(vehicleStr))
  }, [navigate])

  const calculateTotal = () => {
    if (!chargePoint || !bookingData) return 0
    return chargePoint.price * chargePoint.power * bookingData.duration
  }

  const handlePayment = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      // Clear session storage
      sessionStorage.removeItem('bookingData')
      sessionStorage.removeItem('selectedStation')
      sessionStorage.removeItem('selectedChargePoint')
      sessionStorage.removeItem('selectedVehicle')

      // Show success message and navigate
      alert('Thanh toán thành công! Đặt lịch của bạn đã được xác nhận.')
      navigate('/')
    }, 2000)
  }

  if (!bookingData || !station || !chargePoint || !vehicle) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <p className='text-center text-gray-600'>Đang tải thông tin thanh toán...</p>
      </div>
    )
  }

  const total = calculateTotal()
  const serviceFee = Math.round(total * 0.05)
  const grandTotal = total + serviceFee

  return (
    <div className='container mx-auto px-4 py-8 max-w-4xl'>
      {/* Header */}
      <div className='mb-8'>
        <button onClick={() => navigate(-1)} className='flex items-center text-gray-600 hover:text-gray-900 mb-4'>
          <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
          </svg>
          Quay lại
        </button>
        <h1 className='text-3xl font-bold text-gray-900'>Thanh toán</h1>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Left Column - Payment Methods */}
        <div className='lg:col-span-2 space-y-6'>
          {/* Booking Information */}
          <div className='bg-white rounded-lg shadow-md p-6'>
            <h2 className='text-xl font-semibold mb-4'>Thông tin đặt lịch</h2>
            <div className='space-y-3'>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Trạm sạc:</span>
                <span className='font-medium text-right'>{station.name}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Địa chỉ:</span>
                <span className='font-medium text-right'>{station.address}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Cổng sạc:</span>
                <span className='font-medium'>
                  {chargePoint.name} ({chargePoint.power} kW)
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Xe:</span>
                <span className='font-medium'>{vehicle.name}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Ngày & Giờ:</span>
                <span className='font-medium'>
                  {new Date(bookingData.startDate).toLocaleDateString('vi-VN')} - {bookingData.startTime}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Thời gian sạc:</span>
                <span className='font-medium'>{bookingData.duration} giờ</span>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className='bg-white rounded-lg shadow-md p-6'>
            <h2 className='text-xl font-semibold mb-4'>Phương thức thanh toán</h2>
            <div className='space-y-3'>
              <div
                onClick={() => setPaymentMethod('card')}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all flex items-center ${
                  paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className='flex-1 flex items-center'>
                  <div className='w-12 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center justify-center mr-3'>
                    <svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 20 20'>
                      <path d='M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z' />
                      <path
                        fillRule='evenodd'
                        d='M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                  <span className='font-medium'>Thẻ tín dụng/Ghi nợ</span>
                </div>
                {paymentMethod === 'card' && (
                  <svg className='w-6 h-6 text-blue-500' fill='currentColor' viewBox='0 0 20 20'>
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    />
                  </svg>
                )}
              </div>

              <div
                onClick={() => setPaymentMethod('momo')}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all flex items-center ${
                  paymentMethod === 'momo' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className='flex-1 flex items-center'>
                  <div className='w-12 h-8 bg-pink-500 rounded flex items-center justify-center mr-3 font-bold text-white text-sm'>
                    M
                  </div>
                  <span className='font-medium'>Ví MoMo</span>
                </div>
                {paymentMethod === 'momo' && (
                  <svg className='w-6 h-6 text-blue-500' fill='currentColor' viewBox='0 0 20 20'>
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    />
                  </svg>
                )}
              </div>

              <div
                onClick={() => setPaymentMethod('zalopay')}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all flex items-center ${
                  paymentMethod === 'zalopay' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className='flex-1 flex items-center'>
                  <div className='w-12 h-8 bg-blue-400 rounded flex items-center justify-center mr-3 font-bold text-white text-sm'>
                    Z
                  </div>
                  <span className='font-medium'>ZaloPay</span>
                </div>
                {paymentMethod === 'zalopay' && (
                  <svg className='w-6 h-6 text-blue-500' fill='currentColor' viewBox='0 0 20 20'>
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    />
                  </svg>
                )}
              </div>

              <div
                onClick={() => setPaymentMethod('bank')}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all flex items-center ${
                  paymentMethod === 'bank' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className='flex-1 flex items-center'>
                  <div className='w-12 h-8 bg-green-500 rounded flex items-center justify-center mr-3'>
                    <svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 20 20'>
                      <path
                        fillRule='evenodd'
                        d='M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm7 5a1 1 0 10-2 0v1H8a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V9z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                  <span className='font-medium'>Chuyển khoản ngân hàng</span>
                </div>
                {paymentMethod === 'bank' && (
                  <svg className='w-6 h-6 text-blue-500' fill='currentColor' viewBox='0 0 20 20'>
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Summary & Payment */}
        <div className='lg:col-span-1'>
          <div className='bg-white rounded-lg shadow-md p-6 sticky top-20'>
            <h2 className='text-xl font-semibold mb-4'>Chi tiết thanh toán</h2>
            <div className='space-y-3 mb-4'>
              <div className='flex justify-between text-sm'>
                <span className='text-gray-600'>Phí sạc điện</span>
                <span className='font-medium'>{total.toLocaleString()} VND</span>
              </div>
              <div className='flex justify-between text-sm'>
                <span className='text-gray-600'>Phí dịch vụ (5%)</span>
                <span className='font-medium'>{serviceFee.toLocaleString()} VND</span>
              </div>
              <div className='border-t pt-3 flex justify-between'>
                <span className='font-semibold text-gray-900'>Tổng cộng</span>
                <span className='font-bold text-xl text-blue-600'>{grandTotal.toLocaleString()} VND</span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className='w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center'
            >
              {isProcessing ? (
                <>
                  <svg className='animate-spin h-5 w-5 mr-2' fill='none' viewBox='0 0 24 24'>
                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    />
                  </svg>
                  Đang xử lý...
                </>
              ) : (
                'Xác nhận thanh toán'
              )}
            </button>

            <div className='mt-4 text-xs text-gray-500 text-center'>
              <p>🔒 Giao dịch được mã hóa và bảo mật</p>
              <p className='mt-1'>Bằng việc thanh toán, bạn đồng ý với Điều khoản dịch vụ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment

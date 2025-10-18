import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Station, ChargePoint, Vehicle, BookingData } from '../../types/station'

const Payment = () => {
  const navigate = useNavigate()
  const [bookingData, setBookingData] = useState<BookingData | null>(null)
  const [station, setStation] = useState<Station | null>(null)
  const [chargePoint, setChargePoint] = useState<ChargePoint | null>(null)
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)

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
    <div className='container mx-auto px-4 py-8 pt-0 max-w-4xl'>
      {/* Header */}
      {/* <div className=''>
        <button onClick={() => navigate(-1)} className='flex items-center text-gray-600 hover:text-gray-900 mb-4'>
          <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
          </svg>
          Quay lại
        </button>
        <h1 className='text-3xl font-bold text-gray-900'>Thanh toán</h1>
      </div> */}

      <div className='flex justify-center pt-10'>
        <div className='bg-white rounded-3xl shadow-2xl overflow-hidden w-full m-10'>
          <div className='bg-gradient-to-r from-slate-900 to-slate-700 p-8'>
            <div className='flex items-start justify-between'>
              <div>
                <h2 className='text-3xl font-bold text-white mb-2'>Booking Confirmed</h2>
                <p className='text-slate-300'>
                  Mã đặt lịch: <span className='font-mono font-bold'>#BK20251017</span>
                </p>
              </div>
              {/* <div className='px-4 py-2 bg-green-400 text-slate-900 rounded-full text-sm font-bold'>✓ Active</div> */}
            </div>
          </div>

          <div className='p-4 px-20'>
            <div className='grid grid-cols-3 gap-4 mb-4'>
              <div className='text-center p-4 bg-slate-50 rounded-xl'>
                <p className='text-sm text-slate-500 uppercase tracking-wide mb-2'>Ngày</p>
                <p className='text-lg font-bold text-slate-900'>
                  {new Date(bookingData.startDate).toLocaleDateString('vi-VN')}
                </p>
              </div>
              <div className='text-center p-4 bg-slate-50 rounded-xl'>
                <p className='text-sm text-slate-500 uppercase tracking-wide mb-2'>Giờ</p>
                <p className='text-lg font-bold text-slate-900'>{bookingData.duration}</p>
              </div>
              <div className='text-center p-4 bg-slate-50 rounded-xl'>
                <p className='text-sm text-slate-500 uppercase tracking-wide mb-2'>Thời lượng</p>
                <p className='text-lg font-bold text-slate-900'>{bookingData.duration}</p>
              </div>
            </div>

            <div className='space-y-5'>
              <div className='flex items-center justify-between py-4 border-b border-slate-200 my-2 m-1'>
                <span className='text-slate-600 text-base'>Trạm sạc</span>
                <span className='font-semibold text-slate-900 text-right'>{station.name}</span>
              </div>
              <div className='flex items-center justify-between py-4 border-b border-slate-200 my-2 m-1'>
                <span className='text-slate-600 text-base'>Địa chỉ</span>
                <span className='font-semibold text-slate-900 text-right max-w-xs'>{station.address}</span>
              </div>
              <div className='flex items-center justify-between py-4 border-b border-slate-200 my-2 m-1'>
                <span className='text-slate-600 text-base'>Cổng sạc</span>
                <span className='font-semibold text-slate-900'>{chargePoint.name}</span>
              </div>
              <div className='flex items-center justify-between py-4 border-b border-slate-200 my-2 m-1'>
                <span className='text-slate-600 text-base'>Phương tiện</span>
                <span className='font-semibold text-slate-900'>{vehicle.name}</span>
              </div>
              <div className='flex items-center justify-between py-4 m-1'>
                <span className='text-slate-600 text-base'>Phí sạc điện</span>
                <span className='font-semibold'>{total.toLocaleString()} VND</span>
              </div>
              <div className='flex items-center justify-between py-4 m-1'>
                <span className='text-slate-600 text-base'>Phí dịch vụ (5%)</span>
                <span className='font-semibold'>{serviceFee.toLocaleString()} VND</span>
              </div>
              <div className='flex items-center justify-between py-4 m-0'>
                <span className='text-base font-semibold text-slate-900'>Tổng cộng</span>
                <span className='text-2xl font-bold text-slate-900'>{grandTotal.toLocaleString()} VND</span>
              </div>
            </div>
            <div className='flex justify-center'>
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className='w-1/2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed'
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
                  'Thanh toán'
                )}
              </button>
            </div>

            <div className='mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl'>
              <p className='text-sm text-blue-800'>
                <strong>Lưu ý:</strong> Vui lòng đến trước giờ đặt lịch 10 phút để check-in và chuẩn bị sạc.
              </p>
            </div>
          </div>
        </div>

        {/* <div className='bg-white rounded-3xl shadow-2xl overflow-hidden w-full m-10'>
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
        </div> */}
      </div>
    </div>
  )
}

export default Payment

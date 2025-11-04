import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { BookingData } from '../../interface/bookingData.interface'
import { CreditCard } from '@mui/icons-material'
import type { CreateReservation } from '../../interface/reservation'
import type { CreateTransaction } from '../../interface/transaction.interface'
import { TransactionType } from '../../constants/transactionType'
import { createReservation as createReservationApi } from '../../apis/reservationApis'
import { createOrder as createOrderApi } from '../../apis/orderApis'
import { createTransaction as createTransactionApi } from '../../apis/transactionApis'
import QrPaymentModal from '../../components/Modal/QrPaymentModal'

export interface QrCodeUrl {
  bin: string
  accountNumber: string
  accountName: string
  description: string
  amount: number
}

const Payment = () => {
  const navigate = useNavigate()
  const [bookingData, setBookingData] = useState<BookingData | null>(null)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [qrCodeUrl, setQrCodeUrl] = useState<QrCodeUrl | null>(null)
  const [isOpenQrCodeModal, setIsOpenQrCodeModal] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const { state } = useLocation() as { state: BookingData }
  console.log('state', state)
  console.log('bookingData', bookingData)

  useEffect(() => {
    if (state) {
      setBookingData(state)
    } else {
      navigate('/map')
      return
    }
  }, [navigate, state])

  const handleOpenQrCodeModal = () => {
    setIsOpenQrCodeModal(true)
  }

  const handleCloseQrCodeModal = () => {
    setIsOpenQrCodeModal(false)
  }

  // handle create reservation and payment
  const handlePayment = async () => {
    setIsProcessing(true)
    if (!bookingData) {
      setIsProcessing(false)
      navigate('/map')
      return
    }
    try {
      // Create reservation
      const createReservation: CreateReservation = {
        reservation_day: bookingData.slots[0].date,
        start_time: bookingData.slots[0].start_time,
        end_time: bookingData.slots[bookingData.slots.length - 1].end_time,
        charge_point_id: bookingData.chargePoint.id.toString(),
        vehicle_id: bookingData.vehicle.id.toString()
      }
      console.log('createReservation', createReservation)
      const reservation = await createReservationApi(createReservation)
      if (!reservation) {
        throw new Error('Failed to create reservation')
      }
      setOrderId(reservation.data.id)

      // Create order
      console.log('reservation', reservation)
      const order = await createOrderApi(reservation.data.id)
      if (!order) {
        throw new Error('Failed to create order')
      }

      // Create transaction
      const createTransaction: CreateTransaction = {
        amount: bookingData.amount,
        type: TransactionType.PAY_CHARGING_FEE,
        order_id: order.data.id
      }
      const transaction = await createTransactionApi(createTransaction)
      if (!transaction) {
        throw new Error('Failed to create transaction')
      }
      console.log('transaction', transaction)
      setQrCodeUrl({
        bin: transaction.data.bin,
        accountNumber: transaction.data.accountNumber,
        accountName: transaction.data.accountName,
        description: transaction.data.description,
        amount: transaction.data.amount
      })
      handleOpenQrCodeModal()
    } catch (error) {
      console.error('Error creating reservation and payment:', error)
      setIsProcessing(false)
    }
  }

  if (!bookingData) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <p className='text-center text-gray-600'>Đang tải thông tin thanh toán...</p>
      </div>
    )
  }

  const total = bookingData.amount
  const serviceFee = Math.round(total * 0.05)
  const grandTotal = total + serviceFee

  return (
    <div className='container mx-auto px-4 py-8 pt-0 max-w-4xl'>
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
                  {new Date(bookingData.slots[0].date).toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <div className='text-center p-4 bg-slate-50 rounded-xl'>
                <p className='text-sm text-slate-500 uppercase tracking-wide mb-2'>Giờ</p>
                <p className='text-lg font-bold text-slate-900'>
                  {bookingData.slots[0].start_time} - {bookingData.slots[bookingData.slots.length - 1].end_time}
                </p>
              </div>
              <div className='text-center p-4 bg-slate-50 rounded-xl'>
                <p className='text-sm text-slate-500 uppercase tracking-wide mb-2'>Thời lượng</p>
                <p className='text-lg font-bold text-slate-900'>{bookingData.slots.length} giờ</p>
              </div>
            </div>

            <div className='space-y-5'>
              <div className='flex items-center justify-between py-4 border-b border-slate-200 my-2 m-1'>
                <span className='text-slate-600 text-base'>Trạm sạc</span>
                <span className='font-semibold text-slate-900 text-right'>{bookingData.station.name}</span>
              </div>
              <div className='flex items-center justify-between py-4 border-b border-slate-200 my-2 m-1'>
                <span className='text-slate-600 text-base'>Cổng sạc</span>
                <span className='font-semibold text-slate-900 text-right'>{bookingData.chargePoint.identifier}</span>
              </div>
              <div className='flex items-center justify-between py-4 border-b border-slate-200 my-2 m-1'>
                <span className='text-slate-600 text-base'>Phương tiện</span>
                <span className='font-semibold text-slate-900'>
                  {bookingData.vehicle.car_maker} {bookingData.vehicle.license_plate}
                </span>
              </div>
              <div className='flex items-center justify-between py-4 m-1'>
                <span className='text-slate-600 text-base'>Phí sạc điện</span>
                <span className='font-semibold'>{total} VND</span>
              </div>
              <div className='flex items-center justify-between py-4 m-1'>
                <span className='text-slate-600 text-base'>Phí dịch vụ (5%)</span>
                <span className='font-semibold'>{serviceFee} VND</span>
              </div>
              <div className='flex items-center justify-between py-4 m-0'>
                <span className='text-base font-semibold text-slate-900'>Tổng cộng</span>
                <span className='text-2xl font-bold text-slate-900'>{grandTotal} VND</span>
              </div>
            </div>
            <div className='flex justify-center'>
              <div>
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className='w-full bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 active:from-blue-700 active:to-blue-800 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-[0_6px_0_0_rgb(29,78,216)] hover:shadow-[0_4px_0_0_rgb(29,78,216)] active:shadow-[0_2px_0_0_rgb(29,78,216)] hover:translate-y-0.5 active:translate-y-1 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-[0_6px_0_0_rgb(156,163,175)] flex items-center justify-center gap-3'
                >
                  {isProcessing ? (
                    <>
                      <svg className='animate-spin h-6 w-6' fill='none' viewBox='0 0 24 24'>
                        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                        <path
                          className='opacity-75'
                          fill='currentColor'
                          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                        />
                      </svg>
                      <span>Đang xử lý...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className='w-6 h-6' />
                      <span>Thanh toán</span>
                    </>
                  )}
                </button>
              </div>
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

      {orderId !== null && qrCodeUrl !== null && (
        <QrPaymentModal
          orderId={orderId}
          qrCodeUrl={qrCodeUrl}
          isOpenQrCodeModal={isOpenQrCodeModal}
          onClose={handleCloseQrCodeModal}
        />
      )}
    </div>
  )
}

export default Payment

import { Box, Modal, IconButton } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { TransactionStatus } from '../../constants/transactionStatus'
import io, { Socket } from 'socket.io-client'
import type { QrCodeUrl } from '../../pages/Payment/Payment'
import CloseIcon from '@mui/icons-material/Close'

interface QrPaymentModalProps {
  orderId: string
  qrCodeUrl: QrCodeUrl
  isOpenQrCodeModal: boolean
  onClose: () => void
}
const QrPaymentModal = ({ orderId, qrCodeUrl, isOpenQrCodeModal, onClose }: QrPaymentModalProps) => {
  const socketRef = useRef<Socket | null>(null)
  const [paymentStatus, setPaymentStatus] = useState<TransactionStatus>(TransactionStatus.PENDING)

  useEffect(() => {
    if (isOpenQrCodeModal) {
      setPaymentStatus(TransactionStatus.PENDING) // Reset trạng thái

      // 2. Kết nối tới server NestJS
      socketRef.current = io('http://localhost:3000') // (URL Gateway của bạn)

      // 3. (QUAN TRỌNG) Gửi tin nhắn 'joinOrderRoom'
      // Ngay khi kết nối, báo cho server là "tôi muốn hóng tin cho đơn này"
      socketRef.current?.emit('joinOrderRoom', orderId)

      // 4. Lắng nghe sự kiện 'payment_status' từ server
      socketRef.current?.on('payment_status', (data) => {
        // (Ví dụ: data = { orderId: '...', status: 'SUCCESS' })

        setPaymentStatus(data.status) // Cập nhật UI

        // Dừng kết nối WebSocket
        socketRef.current?.disconnect()

        // Tự động đóng modal sau 2 giây
        setTimeout(() => {
          onClose() // Gọi hàm đóng modal từ component cha
        }, 2000)
      })

      return () => {
        socketRef.current?.disconnect()
      }
    }
  }, [isOpenQrCodeModal, orderId, onClose])

  return (
    <Modal open={isOpenQrCodeModal} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          borderRadius: 4,
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          minWidth: 500,
          maxWidth: 350,
          outline: 'none',
          overflow: 'hidden'
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 12,
            top: 12,
            zIndex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 1)',
              transform: 'scale(1.1)',
              transition: 'all 0.2s ease-in-out'
            },
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}
        >
          <CloseIcon sx={{ color: '#6b7280' }} />
        </IconButton>

        {/* 1. Hiển thị QR (nếu chưa thanh toán) */}
        {paymentStatus === TransactionStatus.PENDING && (
          <div className='bg-gray-50 from-blue-50 to-indigo-50 p-12 py-4'>
            <div className='flex flex-col items-center gap-4'>
              <div className='text-center'>
                <div className='inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text mb-2'>
                  <h2 className='text-3xl font-bold text-black'>Quét mã QR để thanh toán</h2>
                </div>
                <div className='bg-white/70 backdrop-blur-sm rounded-lg px-4 py-2 inline-block'>
                  <p className='text-gray-600 text-sm'>
                    Mã đơn hàng: <span className='text-lg font-bold text-black tracking-wide'>{orderId}</span>
                  </p>
                </div>
              </div>

              <div className='bg-white p-4 rounded-3xl shadow-2xl border-4 border-indigo-100 hover:border-indigo-200 transition-all duration-300 transform hover:scale-[1.02]'>
                <div className='bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-2xl'>
                  <img
                    src={`https://img.vietqr.io/image/${qrCodeUrl.bin}-${qrCodeUrl.accountNumber}-vietqr_pro.jpg?addInfo=${qrCodeUrl.description.replace(' ', '+')}&amount=${qrCodeUrl.amount}`}
                    alt='QR Code'
                    className='w-full h-full object-contain'
                  />
                </div>
                <div className='mt-6 space-y-3 bg-gradient-to-br from-gray-50 to-blue-50 p-4 rounded-xl'>
                  <div className='flex items-start gap-2'>
                    <span className='text-gray-600 text-sm font-medium min-w-[110px]'>Tên tài khoản:</span>
                    <span className='text-gray-900 text-sm font-semibold'>{qrCodeUrl.accountName}</span>
                  </div>
                  <div className='flex items-start gap-2'>
                    <span className='text-gray-600 text-sm font-medium min-w-[110px]'>Số tài khoản:</span>
                    <span className='text-gray-900 text-sm font-mono font-semibold'>{qrCodeUrl.accountNumber}</span>
                  </div>
                  <div className='flex items-start gap-2'>
                    <span className='text-gray-600 text-sm font-medium min-w-[110px]'>Nội dung:</span>
                    <span className='text-gray-900 text-sm font-semibold'>{qrCodeUrl.description}</span>
                  </div>
                  <div className='flex items-start gap-2 pt-2 border-t-2 border-indigo-200'>
                    <span className='text-gray-600 text-sm font-medium min-w-[110px]'>Số tiền:</span>
                    <span className='text-black-600 text-lg font-bold'>{qrCodeUrl.amount.toLocaleString()} VND</span>
                  </div>
                </div>
              </div>

              <div className='flex items-center gap-3 bg-blue-100 px-6 py-3 rounded-full shadow-md'>
                <div className='animate-pulse'>
                  <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </div>
                <p className='text-sm font-semibold text-blue-700'>Đang chờ thanh toán...</p>
              </div>
            </div>
          </div>
        )}

        {/* 2. Hiển thị khi thanh toán thành công */}
        {paymentStatus === TransactionStatus.SUCCESS && (
          <div className='bg-gray-50 from-green-50 to-emerald-50 p-12'>
            <div className='flex flex-col items-center gap-6'>
              <div className='bg-gradient-to-br from-green-400 to-emerald-500 rounded-full p-8 shadow-2xl animate-bounce'>
                <svg className='w-20 h-20 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M5 13l4 4L19 7' />
                </svg>
              </div>
              <h2 className='text-4xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 text-transparent bg-clip-text'>
                Thanh toán thành công!
              </h2>
              <p className='text-gray-700 text-lg font-medium'>Đơn hàng của bạn đã được xác nhận</p>
              <div className='bg-white px-6 py-3 rounded-full shadow-lg'>
                <p className='text-green-600 font-semibold'>✓ Giao dịch hoàn tất</p>
              </div>
            </div>
          </div>
        )}

        {/* 3. Hiển thị khi thanh toán thất bại */}
        {paymentStatus === TransactionStatus.FAILED && (
          <div className='bg-gray-50 from-red-50 to-pink-50 p-12'>
            <div className='flex flex-col items-center gap-6'>
              <div className='bg-gradient-to-br from-red-400 to-pink-500 rounded-full p-8 shadow-2xl animate-pulse'>
                <svg className='w-20 h-20 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M6 18L18 6M6 6l12 12' />
                </svg>
              </div>
              <h2 className='text-4xl font-extrabold bg-gradient-to-r from-red-600 to-pink-600 text-transparent bg-clip-text'>
                Thanh toán thất bại!
              </h2>
              <p className='text-gray-700 text-lg font-medium'>Vui lòng thử lại sau</p>
              <div className='bg-white px-6 py-3 rounded-full shadow-lg'>
                <p className='text-red-600 font-semibold'>✗ Giao dịch không thành công</p>
              </div>
            </div>
          </div>
        )}
      </Box>
    </Modal>
  )
}

export default QrPaymentModal

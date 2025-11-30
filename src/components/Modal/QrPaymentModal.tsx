import { Box, Modal, IconButton } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { TransactionStatus } from '../../constants/transactionStatus'
import io, { Socket } from 'socket.io-client'
import type { QrCodeUrl } from '../../pages/Payment/Payment'
import CloseIcon from '@mui/icons-material/Close'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CheckIcon from '@mui/icons-material/Check'
import DescriptionIcon from '@mui/icons-material/Description'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import CancelIcon from '@mui/icons-material/Cancel'
import ErrorIcon from '@mui/icons-material/Error'
import RefreshIcon from '@mui/icons-material/Refresh'

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
      socketRef.current = io('http://localhost:3000', {
        transports: ['polling', 'websocket'], // cho phép fallback -> tránh lỗi closed before established
        path: '/socket-io/payment', // nếu server dùng custom path, chỉnh lại
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 10,
        timeout: 20000
      }) // (URL Gateway của bạn)

      // 3. (QUAN TRỌNG) Gửi tin nhắn 'joinPaymentRoom'
      // Ngay khi kết nối, báo cho server là "tôi muốn hóng tin cho đơn này"
      socketRef.current.on('connect', () => {
        console.log('Connected to server')
        socketRef.current?.emit('joinPaymentRoom', { orderId: orderId })
        console.log('Joined room', orderId)
      })

      // 4. Lắng nghe sự kiện 'payment_status' từ server
      socketRef.current.on('payment_status', (data) => {
        // (Ví dụ: data = { orderId: '...', status: 'SUCCESS' })
        console.log('payment_status', data)
        setPaymentStatus(data.status === 'SUCCESS' ? TransactionStatus.SUCCESS : TransactionStatus.FAILED) // Cập nhật UI
        console.log('payment_status', paymentStatus)

        // Dừng kết nối WebSocket
        socketRef.current?.disconnect()

        // Tự động đóng modal sau 2 giây
        // setTimeout(() => {
        //   onClose() // Gọi hàm đóng modal từ component cha
        // }, 2000)
      })

      return () => {
        socketRef.current?.disconnect()
      }
    }

    // 5. Lắng nghe disconnect
    socketRef.current?.on('disconnect', (reason) => {
      console.log('❌ Disconnected:', reason)
    })

    // 6. Lắng nghe lỗi
    socketRef.current?.on('connect_error', (error) => {
      console.error('🔴 Connection error:', error)
    })

    // Cleanup khi unmount
    return () => {
      console.log('🧹 Cleaning up socket...')
      socketRef.current?.disconnect()
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
                  <AccessTimeIcon sx={{ fontSize: 24, color: '#2563eb' }} />
                </div>
                <p className='text-sm font-semibold text-blue-700'>Đang chờ thanh toán...</p>
              </div>
            </div>
          </div>
        )}

        {/* 2. Hiển thị khi thanh toán thành công */}
        {paymentStatus === TransactionStatus.SUCCESS && (
          <div className='bg-white p-12'>
            <div className='flex flex-col items-center gap-6'>
              <div className='relative w-32 h-32 flex items-center justify-center animate-[successPop_0.6s_cubic-bezier(0.68,-0.55,0.265,1.55)]'>
                <div className='absolute inset-0 bg-green-500 rounded-full shadow-xl'></div>
                <CheckIcon sx={{ fontSize: 80, color: 'white', position: 'relative', zIndex: 10 }} />
              </div>

              <h2 className='text-4xl font-extrabold text-green-600 text-center'>Thanh toán thành công!</h2>

              <div className='bg-gray-50 rounded-2xl p-6 w-full border border-gray-200 shadow-md'>
                <div className='flex items-center gap-3 mb-4'>
                  <DescriptionIcon sx={{ fontSize: 24, color: '#16a34a' }} />
                  <span className='text-gray-600 text-sm font-medium'>Mã đơn hàng</span>
                </div>
                <p className='text-2xl font-bold text-gray-800 mb-4 tracking-wide'>{orderId}</p>

                <div className='h-[1px] bg-gray-300 my-4'></div>

                <div className='flex justify-between items-center mb-4'>
                  <span className='text-gray-600 text-sm font-medium'>Số tiền</span>
                  <span className='text-2xl font-bold text-gray-800'>{qrCodeUrl.amount.toLocaleString()} VND</span>
                </div>

                <div className='bg-green-100 rounded-xl px-4 py-3 flex items-center gap-2'>
                  <CheckCircleIcon sx={{ fontSize: 20, color: '#16a34a' }} />
                  <span className='text-green-800 font-semibold text-sm'>Giao dịch hoàn tất</span>
                </div>
              </div>

              <div className='bg-green-50 border border-green-200 rounded-xl px-6 py-4 w-full'>
                <div className='flex items-start gap-3'>
                  <CheckCircleIcon sx={{ fontSize: 20, color: '#16a34a', mt: 0.5, flexShrink: 0 }} />
                  <p className='text-green-800 text-sm font-medium'>
                    Đơn hàng của bạn đã được xác nhận và đang được xử lý
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Hiển thị khi thanh toán thất bại */}
        {paymentStatus === TransactionStatus.FAILED && (
          <div className='bg-white p-12'>
            <div className='flex flex-col items-center gap-6'>
              <div className='relative w-32 h-32 flex items-center justify-center animate-[errorShake_0.6s_cubic-bezier(0.36,0.07,0.19,0.97)]'>
                <div className='absolute inset-0 bg-red-500 rounded-full shadow-xl'></div>
                <CloseIcon sx={{ fontSize: 80, color: 'white', position: 'relative', zIndex: 10, strokeWidth: 3 }} />
              </div>

              <h2 className='text-4xl font-extrabold text-red-600 text-center'>Thanh toán thất bại!</h2>

              <div className='bg-gray-50 rounded-2xl p-6 w-full border border-gray-200 shadow-md'>
                <div className='flex items-center gap-3 mb-4'>
                  <ErrorOutlineIcon sx={{ fontSize: 24, color: '#dc2626' }} />
                  <span className='text-gray-600 text-sm font-medium'>Mã đơn hàng</span>
                </div>
                <p className='text-2xl font-bold text-gray-800 mb-4 tracking-wide'>{orderId}</p>

                <div className='h-[1px] bg-gray-300 my-4'></div>

                <div className='bg-red-100 rounded-xl px-4 py-3 flex items-center gap-2'>
                  <CancelIcon sx={{ fontSize: 20, color: '#dc2626' }} />
                  <span className='text-red-800 font-semibold text-sm'>Giao dịch không thành công</span>
                </div>
              </div>

              <div className='bg-red-50 border border-red-200 rounded-xl px-6 py-4 w-full'>
                <div className='flex items-start gap-3'>
                  <ErrorIcon sx={{ fontSize: 20, color: '#dc2626', mt: 0.5, flexShrink: 0 }} />
                  <p className='text-red-800 text-sm font-medium'>
                    Vui lòng kiểm tra lại thông tin và thử thanh toán lại
                  </p>
                </div>
              </div>

              <button className='bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex items-center gap-2'>
                <RefreshIcon sx={{ fontSize: 20 }} />
                Thử lại
              </button>
            </div>
          </div>
        )}
      </Box>
    </Modal>
  )
}

export default QrPaymentModal

import type { DriverAccount } from '../../interface/driverAccount.interface'

interface OTPModalProps {
  setShowOtpVerifyModal: (show: boolean) => void
  account: DriverAccount
  otp: string[]
  otpRefs: React.RefObject<HTMLInputElement[]>
  handleOtpChange: (index: number, value: string) => void
  handleOtpKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void
  handleOtpPaste: (e: React.ClipboardEvent) => void
  handleSubmitOtp: () => void
  handleSendOtp: () => void
}

// Render OTP Verification Modal
export const OTPModal = ({
  setShowOtpVerifyModal,
  account,
  otp,
  otpRefs,
  handleOtpChange,
  handleOtpKeyDown,
  handleOtpPaste,
  handleSubmitOtp,
  handleSendOtp
}: OTPModalProps) => (
  <div className='fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
    <div className='bg-white rounded-lg shadow-xl max-w-sm w-full p-6'>
      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <h3 className='text-lg font-semibold text-gray-900'>Xác minh OTP</h3>
        <button
          onClick={() => setShowOtpVerifyModal(false)}
          className='text-gray-400 hover:text-gray-600 transition-colors'
        >
          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
          </svg>
        </button>
      </div>

      {/* Description */}
      <p className='text-sm text-gray-600 text-center mb-6'>
        Mã OTP đã được gửi đến email: <br />
        <span className='font-medium text-gray-900'>{account?.email}</span>
      </p>

      {/* OTP Input Fields */}
      <div className='flex justify-center gap-2 mb-6' onPaste={handleOtpPaste}>
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              otpRefs.current[index] = el as HTMLInputElement
            }}
            type='text'
            inputMode='numeric'
            maxLength={1}
            value={digit}
            onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ''))}
            onKeyDown={(e) => handleOtpKeyDown(index, e)}
            className='w-11 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all outline-none'
          />
        ))}
      </div>

      {/* Resend OTP */}
      <div className='text-center mb-6'>
        <button className='text-sm text-sky-600 hover:text-sky-700 font-medium' onClick={handleSendOtp}>
          Gửi lại mã OTP
        </button>
      </div>

      {/* Buttons */}
      <div className='flex gap-3'>
        <button
          onClick={() => setShowOtpVerifyModal(false)}
          className='flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors'
        >
          Hủy
        </button>
        <button
          onClick={handleSubmitOtp}
          disabled={otp.some((digit) => !digit)}
          className='flex-1 px-4 py-2.5 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          Xác nhận
        </button>
      </div>
    </div>
  </div>
)

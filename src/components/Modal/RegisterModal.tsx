import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  CheckCircle as CheckCircleIcon,
  RemoveRedEye as RemoveRedEyeIcon,
  VisibilityOff as VisibilityOffIcon,
  AutorenewOutlined as AutorenewOutlinedIcon,
  PersonAddAlt1Outlined as PersonAddAlt1OutlinedIcon
} from '@mui/icons-material'

interface RegisterModalProps {
  registerName: string
  setRegisterName: (name: string) => void
  registerEmail: string
  setRegisterEmail: (email: string) => void
  registerPassword: string
  setRegisterPassword: (password: string) => void
  registerConfirmPassword: string
  setRegisterConfirmPassword: (password: string) => void
  showRegisterPassword: boolean
  setShowRegisterPassword: (show: boolean) => void
  showConfirmPassword: boolean
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
  setShowConfirmPassword: (show: boolean) => void
  handleRegister: () => void
  isLoading: boolean
}

const RegisterModal = ({
  registerName,
  setRegisterName,
  registerEmail,
  setRegisterEmail,
  registerPassword,
  setRegisterPassword,
  registerConfirmPassword,
  setRegisterConfirmPassword,
  showRegisterPassword,
  setShowRegisterPassword,
  showConfirmPassword,
  handleKeyPress,
  setShowConfirmPassword,
  handleRegister,
  isLoading
}: RegisterModalProps) => {
  return (
    <div>
      <div className='space-y-4 '>
        <div>
          <label className='block text-sm font-semibold text-gray-700 mb-2'>Họ và tên</label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <PersonIcon className='w-5 h-5 text-gray-400' />
            </div>
            <input
              type='text'
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
              onKeyPress={handleKeyPress}
              className='w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:ring-4 focus:ring-sky-100 text-gray-700 outline-none transition-all'
              placeholder='Nguyễn Văn A'
            />
          </div>
        </div>

        <div>
          <label className='block text-sm font-semibold text-gray-700 mb-2'>Email</label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <EmailIcon className='w-5 h-5 text-gray-400' />
            </div>
            <input
              type='email'
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              className='w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:ring-4 focus:ring-sky-100 text-gray-700 outline-none transition-all'
              placeholder='example@email.com'
            />
          </div>
        </div>

        <div>
          <label className='block text-sm font-semibold text-gray-700 mb-2'>Mật khẩu</label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <LockIcon className='w-5 h-5 text-gray-400' />
            </div>
            <input
              type={showRegisterPassword ? 'text' : 'password'}
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className='w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:ring-4 focus:ring-sky-100 text-gray-700 outline-none transition-all'
              placeholder='••••••••'
            />
            <button
              type='button'
              onClick={() => setShowRegisterPassword(!showRegisterPassword)}
              className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600'
            >
              {showRegisterPassword ? (
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'
                  />
                </svg>
              ) : (
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
              )}
            </button>
          </div>
        </div>

        <div>
          <label className='block text-sm font-semibold text-gray-700 mb-2'>Xác nhận mật khẩu</label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <CheckCircleIcon className='w-5 h-5 text-gray-400' />
            </div>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={registerConfirmPassword}
              onChange={(e) => setRegisterConfirmPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className='w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:ring-4 focus:ring-sky-100 text-gray-700   outline-none transition-all'
              placeholder='••••••••'
            />
            <button
              type='button'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600'
            >
              {showConfirmPassword ? (
                <RemoveRedEyeIcon className='w-5 h-5 text-gray-400' />
              ) : (
                <VisibilityOffIcon className='w-5 h-5 text-gray-400' />
              )}
            </button>
          </div>
        </div>

        <button
          onClick={handleRegister}
          disabled={isLoading || !registerName || !registerEmail || !registerPassword || !registerConfirmPassword}
          className='w-full bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
        >
          {isLoading ? (
            <>
              <AutorenewOutlinedIcon className='w-5 h-5 text-white' />
              Đang xử lý...
            </>
          ) : (
            <>
              <PersonAddAlt1OutlinedIcon className='w-5 h-5 text-white' />
              Đăng ký
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default RegisterModal

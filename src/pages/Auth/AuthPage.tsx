import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  LocationPin as LocationPinIcon,
  AccessTime as AccessTimeIcon,
  Bolt as BoltIcon,
  Security as SecurityIcon,
  Home as HomeIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  RemoveRedEye as RemoveRedEyeIcon,
  VisibilityOff as VisibilityOffIcon,
  Login as LoginIcon
} from '@mui/icons-material'
import RegisterModal from '../../components/Modal/RegisterModal'

const features = [
  {
    icon: LocationPinIcon,
    title: '500+ Trạm Sạc',
    desc: 'Mạng lưới phủ sóng toàn quốc',
    color: 'blue'
  },
  {
    icon: AccessTimeIcon,
    title: 'Đặt Lịch Thông Minh',
    desc: 'Tối ưu thời gian và chi phí',
    color: 'purple'
  },
  {
    icon: BoltIcon,
    title: 'Sạc Nhanh Siêu Tốc',
    desc: 'Công suất lên đến 150kW',
    color: 'yellow'
  },
  {
    icon: SecurityIcon,
    title: 'An Toàn & Bảo Mật',
    desc: 'Thanh toán an toàn tuyệt đối',
    color: 'green'
  }
]

const AuthPage = () => {
  const navigate = useNavigate()
  const [showRegisterModal, setShowRegisterModal] = useState(false)

  // Login states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Register states
  const [registerName, setRegisterName] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('')
  const [showRegisterPassword, setShowRegisterPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = async () => {
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (response.ok) {
        console.log('Login successful:', data)
        // Navigate to homepage after successful login
        navigate('/')
      } else {
        setError(data.message || 'Đăng nhập thất bại')
      }
    } catch (err) {
      console.log('err', err)
      setError('Có lỗi xảy ra. Vui lòng thử lại sau.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async () => {
    setError('')

    // Validate
    if (registerPassword !== registerConfirmPassword) {
      setError('Mật khẩu xác nhận không khớp')
      return
    }

    if (registerPassword.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: registerName,
          email: registerEmail,
          password: registerPassword
        })
      })

      const data = await response.json()

      if (response.ok) {
        console.log('Register successful:', data)
        // Close modal after successful registration
        setShowRegisterModal(false)
        setError('')
        // Pre-fill email in login form
        setEmail(registerEmail)
        // Reset register form
        setRegisterName('')
        setRegisterEmail('')
        setRegisterPassword('')
        setRegisterConfirmPassword('')
      } else {
        setError(data.message || 'Đăng ký thất bại')
      }
    } catch (err) {
      console.log('err', err)
      setError('Có lỗi xảy ra. Vui lòng thử lại sau.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = '/api/auth/google'
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  const handleRegisterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleRegister()
    }
  }

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600',
      purple: 'bg-purple-50 text-purple-600',
      yellow: 'bg-yellow-50 text-yellow-600',
      green: 'bg-green-50 text-green-600'
    }
    return colors[color as keyof typeof colors]
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-sky-600 via-sky-500 to-blue-600 text-white overflow-hidden flex'>
      <Link
        to='/'
        className='fixed top-5 left-5 z-50 bg-sky-600 text-white p-3 rounded-full shadow-lg hover:bg-sky-700 transition-colors'
      >
        <HomeIcon className='w-6 h-6 text-white' />
      </Link>
      {/* Left Section - Welcome & Features */}
      <div className='lg:flex lg:w-1/2 p-12 flex-col flex items-center justify-center'>
        {/* Background decoration */}
        <div className='absolute inset-0 overflow-hidden pointer-events-none'>
          <div className='absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl'></div>
          <div className='absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl'></div>
        </div>

        <div className='relative z-10'>
          {/* Logo & Title */}
          <div className='mb-12'>
            <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>Chào mừng đến với EV Charging System</h1>
            <h3 className='text-xl text-sky-100'>Giải pháp sạc xe điện thông minh cho tương lai xanh</h3>
          </div>

          {/* Features */}
          <div className='grid grid-cols-2 gap-4'>
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className='flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20'
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center m-0 ${getColorClasses(feature.color)}`}
                  >
                    <Icon component={Icon} />
                  </div>
                  <div>
                    <h3 className='text-white font-semibold mb-1'>{feature.title}</h3>
                    <p className='text-blue-100 text-sm'>{feature.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Stats */}
        <div className='relative z-10 grid grid-cols-3 gap-6 mt-12 w-3/4'>
          <div className='text-center'>
            <div className='text-4xl font-bold text-white mb-1'>50K+</div>
            <div className='text-sm text-sky-100'>Người dùng</div>
          </div>
          <div className='text-center'>
            <div className='text-4xl font-bold text-white mb-1'>500+</div>
            <div className='text-sm text-sky-100'>Trạm sạc</div>
          </div>
          <div className='text-center'>
            <div className='text-4xl font-bold text-white mb-1'>24/7</div>
            <div className='text-sm text-sky-100'>Hỗ trợ</div>
          </div>
        </div>
      </div>

      {/* Right Section - Auth Form */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12'>
        <div className='w-full max-w-md'>
          <div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
            {/* Header */}
            <div className='bg-gradient-to-r from-sky-600 via-sky-500 to-blue-600 px-8 py-6'>
              <div>
                <h2 className='text-2xl font-bold text-white mb-1'>Đăng nhập</h2>
                <p className='text-sky-100 text-sm'>Chào mừng bạn quay trở lại!</p>
              </div>
            </div>

            {/* Form Content */}
            <div className='p-8'>
              {error && (
                <div className='mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2'>
                  <svg className='w-5 h-5 text-red-500 flex-shrink-0 mt-0.5' fill='currentColor' viewBox='0 0 20 20'>
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <p className='text-sm text-red-800'>{error}</p>
                </div>
              )}

              {/* Login Form */}
              <div className='space-y-5'>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>Email</label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <EmailIcon className='w-5 h-5 text-gray-400' />
                    </div>
                    <input
                      type='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className='w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:ring-4 focus:ring-sky-100 text-gray-700 outline-none transition-all'
                      placeholder='••••••••'
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600'
                    >
                      {showPassword ? (
                        <RemoveRedEyeIcon className='w-5 h-5 text-gray-400' />
                      ) : (
                        <VisibilityOffIcon className='w-5 h-5 text-gray-400' />
                      )}
                    </button>
                  </div>
                </div>

                <div className='flex items-center justify-between text-sm'>
                  <label className='flex items-center gap-2 cursor-pointer'>
                    <input
                      type='checkbox'
                      className='w-4 h-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500'
                    />
                    <span className='text-gray-600'>Ghi nhớ đăng nhập</span>
                  </label>
                  <a href='#' className='text-sky-600 hover:text-sky-700 font-medium'>
                    Quên mật khẩu?
                  </a>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isLoading || !email || !password}
                  className='w-full bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                >
                  {isLoading ? (
                    <>
                      <LoginIcon className='w-5 h-5 text-white' />
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
                        />
                      </svg>
                      Đăng nhập
                    </>
                  )}
                </button>
              </div>

              <div className='relative my-6'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-gray-200'></div>
                </div>
                <div className='relative flex justify-center text-sm'>
                  <span className='px-4 bg-white text-gray-500 font-medium'>Hoặc đăng nhập với</span>
                </div>
              </div>

              <button
                type='button'
                onClick={handleGoogleLogin}
                className='w-full bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 py-3.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-sm hover:shadow'
              >
                {/* Logo Google */}
                <svg className='w-6 h-6' viewBox='0 0 24 24'>
                  <path
                    fill='#4285F4'
                    d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                  />
                  <path
                    fill='#34A853'
                    d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                  />
                  <path
                    fill='#FBBC05'
                    d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                  />
                  <path
                    fill='#EA4335'
                    d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                  />
                </svg>
                Đăng nhập bằng Google
              </button>

              <p className='mt-6 text-center text-sm text-gray-600'>
                Chưa có tài khoản?{' '}
                <button
                  onClick={() => setShowRegisterModal(true)}
                  className='text-sky-600 hover:text-sky-700 font-semibold'
                >
                  Đăng ký ngay
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Register Modal */}
      {showRegisterModal && (
        <div className='fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm'>
          <div className='bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto'>
            <div className='bg-gradient-to-r from-sky-600 via-sky-500 to-blue-600 px-8 py-6 sticky top-0'>
              <div className='flex items-center justify-between'>
                <div>
                  <h2 className='text-2xl font-bold text-white mb-1'>Đăng ký</h2>
                  <p className='text-sky-100 text-sm'>Tạo tài khoản mới</p>
                </div>
                <button
                  onClick={() => setShowRegisterModal(false)}
                  className='text-white hover:bg-white/20 rounded-lg p-2 transition-all'
                >
                  <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </button>
              </div>
            </div>

            <div className='p-8'>
              {error && (
                <div className='mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2'>
                  <svg className='w-5 h-5 text-red-500 flex-shrink-0 mt-0.5' fill='currentColor' viewBox='0 0 20 20'>
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <p className='text-sm text-red-800'>{error}</p>
                </div>
              )}

              <RegisterModal
                registerName={registerName}
                setRegisterName={setRegisterName}
                registerEmail={registerEmail}
                setRegisterEmail={setRegisterEmail}
                registerPassword={registerPassword}
                setRegisterPassword={setRegisterPassword}
                registerConfirmPassword={registerConfirmPassword}
                setRegisterConfirmPassword={setRegisterConfirmPassword}
                showRegisterPassword={showRegisterPassword}
                setShowRegisterPassword={setShowRegisterPassword}
                showConfirmPassword={showConfirmPassword}
                setShowConfirmPassword={setShowConfirmPassword}
                handleKeyPress={handleRegisterKeyPress}
                handleRegister={handleRegister}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AuthPage

import { useState, useEffect, useRef } from 'react'
import {
  EvStation,
  ElectricCar,
  LocationOn,
  Timer,
  BatteryChargingFull,
  Pause,
  Stop,
  PlayArrow,
  CheckCircle,
  Warning
} from '@mui/icons-material'
import {
  verifyOTPAndStartCharging,
  stopChargingSession,
  pauseChargingSession,
  resumeChargingSession
} from '../../apis/chargeSession.api'

interface StationInfo {
  name: string
  address: string
  chargePointName: string
}

interface VehicleInfo {
  model: string
  licensePlate: string
}

interface ChargingData {
  timeElapsed: number // in seconds
  energyConsumed: number // in kWh
  power: number // in kW
}

type ChargingStatus = 'idle' | 'charging' | 'paused' | 'stopped'

const DirectChargeControl = () => {
  // States
  const [authStatus, setAuthStatus] = useState<'waiting' | 'authenticated'>('waiting')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [otpError, setOtpError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [chargingStatus, setChargingStatus] = useState<ChargingStatus>('idle')
  const [showStopModal, setShowStopModal] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Mock data
  const [stationInfo] = useState<StationInfo>({
    name: 'VinFast Landmark 81',
    address: '720A Đ. Điện Biên Phủ, Vinhomes Tân Cảng, Bình Thạnh, TP.HCM',
    chargePointName: 'Trụ sạc nhanh #03'
  })

  const [vehicleInfo] = useState<VehicleInfo>({
    model: 'VinFast VF8',
    licensePlate: '51H-123.45'
  })

  const [chargingData, setChargingData] = useState<ChargingData>({
    timeElapsed: 0,
    energyConsumed: 0,
    power: 50 // 50 kW charging power
  })

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Format time (seconds to HH:MM:SS)
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  // Start charging timer
  useEffect(() => {
    if (chargingStatus === 'charging') {
      intervalRef.current = setInterval(() => {
        setChargingData((prev) => ({
          ...prev,
          timeElapsed: prev.timeElapsed + 1,
          // Simulate energy consumption: power (kW) * time (hours)
          energyConsumed: parseFloat(((prev.power * (prev.timeElapsed + 1)) / 3600).toFixed(2))
        }))
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [chargingStatus])

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    setOtpError('')

    // Auto focus next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus()
    }
  }

  // Handle OTP input keydown
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus()
    }
  }

  // Handle OTP paste
  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)
    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split('')
      while (newOtp.length < 6) newOtp.push('')
      setOtp(newOtp)
      setOtpError('')
      // Focus last filled input or last input
      const lastIndex = Math.min(pastedData.length, 5)
      otpInputRefs.current[lastIndex]?.focus()
    }
  }

  // Handle OTP submission
  const handleStartCharging = async () => {
    setOtpError('')

    const otpString = otp.join('')
    if (!otpString || otpString.length < 6) {
      setOtpError('Vui lòng nhập đầy đủ 6 chữ số OTP')
      return
    }

    setIsLoading(true)

    try {
      // Call actual API to verify OTP and start charging
      const response = await verifyOTPAndStartCharging({
        otp: otpString
        // Add chargePointId and vehicleId if needed from URL params or state
        // chargePointId: 'CP001',
        // vehicleId: 'VEH001'
      })

      if (response.sessionId) {
        setSessionId(response.sessionId)
        setAuthStatus('authenticated')
        setChargingStatus('charging')
      } else {
        setOtpError('Mã OTP không hợp lệ. Vui lòng thử lại.')
      }
    } catch (error: unknown) {
      // For demo purposes, allow '123456' as valid OTP
      if (otpString === '123456') {
        setSessionId('demo-session-' + Date.now())
        setAuthStatus('authenticated')
        setChargingStatus('charging')
      } else {
        const err = error as { response?: { data?: { message?: string } } }
        setOtpError(err?.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.')
      }
      console.error('OTP verification error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle pause/resume
  const handlePauseResume = async () => {
    if (!sessionId) return

    try {
      if (chargingStatus === 'charging') {
        await pauseChargingSession(sessionId)
        setChargingStatus('paused')
      } else if (chargingStatus === 'paused') {
        await resumeChargingSession(sessionId)
        setChargingStatus('charging')
      }
    } catch (error) {
      console.error('Error pausing/resuming charging:', error)
      // For demo, still allow state change
      if (chargingStatus === 'charging') {
        setChargingStatus('paused')
      } else if (chargingStatus === 'paused') {
        setChargingStatus('charging')
      }
    }
  }

  // Handle stop charging
  const handleStopCharging = async () => {
    if (!sessionId) return

    try {
      // Call actual API to stop charging
      await stopChargingSession(sessionId)

      setChargingStatus('stopped')
      setShowStopModal(false)

      // Reset after 2 seconds
      setTimeout(() => {
        setAuthStatus('waiting')
        setOtp(['', '', '', '', '', ''])
        setSessionId(null)
        setChargingData({
          timeElapsed: 0,
          energyConsumed: 0,
          power: 50
        })
        setChargingStatus('idle')
      }, 2000)
    } catch (error) {
      console.error('Stop charging error:', error)
      // For demo, still proceed with stopping
      setChargingStatus('stopped')
      setShowStopModal(false)

      setTimeout(() => {
        setAuthStatus('waiting')
        setOtp(['', '', '', '', '', ''])
        setSessionId(null)
        setChargingData({
          timeElapsed: 0,
          energyConsumed: 0,
          power: 50
        })
        setChargingStatus('idle')
      }, 2000)
    }
  }

  // Render OTP Input State
  const renderOTPState = () => (
    <div className='min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        <div className='bg-white rounded-3xl shadow-2xl overflow-hidden'>
          {/* Header */}
          <div className='bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 px-8 py-10 text-center'>
            <div className='w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg'>
              <EvStation className='w-12 h-12 text-sky-600' />
            </div>
            <h1 className='text-2xl font-bold text-white mb-2'>Điều Khiển Sạc Trực Tiếp</h1>
            <p className='text-blue-100 text-sm'>Nhập mã OTP để bắt đầu phiên sạc</p>
          </div>

          {/* Content */}
          <div className='p-8'>
            {/* Station Info */}
            <div className='mb-6 p-4 bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl border border-sky-100'>
              <div className='flex items-start gap-3'>
                <div className='p-2 bg-sky-100 rounded-lg'>
                  <LocationOn className='w-5 h-5 text-sky-600' />
                </div>
                <div>
                  <p className='font-semibold text-gray-900'>{stationInfo.name}</p>
                  <p className='text-sm text-gray-600 mt-1'>{stationInfo.address}</p>
                  <p className='text-sm text-sky-600 font-medium mt-2'>{stationInfo.chargePointName}</p>
                </div>
              </div>
            </div>

            {/* OTP Input */}
            <div className='mb-6'>
              <label className='block text-sm font-semibold text-gray-700 mb-4 text-center'>
                Nhập mã OTP <span className='text-red-500'>*</span>
              </label>
              <div className='flex gap-3 justify-center mb-4' onPaste={handleOtpPaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      otpInputRefs.current[index] = el
                    }}
                    type='text'
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className={`w-14 h-14 text-center text-2xl font-bold border-2 rounded-xl focus:outline-none focus:ring-4 transition-all duration-200 ${
                      otpError
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200 bg-red-50'
                        : digit
                          ? 'border-sky-500 bg-sky-50 focus:border-sky-600 focus:ring-sky-200'
                          : 'border-gray-200 focus:border-sky-500 focus:ring-sky-200 hover:border-sky-300'
                    }`}
                    disabled={isLoading}
                  />
                ))}
              </div>
              {otpError && (
                <div className='mt-3 flex items-center justify-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg'>
                  <Warning className='w-4 h-4' />
                  <span>{otpError}</span>
                </div>
              )}
              <p className='mt-3 text-xs text-gray-500 text-center'>Mã OTP được gửi qua email hoặc ứng dụng của bạn</p>
            </div>

            {/* Start Button */}
            <button
              onClick={handleStartCharging}
              disabled={isLoading || otp.join('').length < 6}
              className='w-full py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2'
            >
              {isLoading ? (
                <>
                  <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  <span>Đang xác thực...</span>
                </>
              ) : (
                <>
                  <PlayArrow className='w-6 h-6' />
                  <span>Bắt đầu Sạc</span>
                </>
              )}
            </button>

            {/* Demo hint */}
            <div className='mt-4 p-3 bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl'>
              <p className='text-xs text-yellow-800 text-center'>
                <strong>Demo:</strong> Sử dụng mã OTP <strong>123456</strong> để test
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Render Charging State
  const renderChargingState = () => (
    <div className='min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 p-4 py-8'>
      <div className='max-w-5xl mx-auto'>
        {/* Header */}
        <div className='bg-white rounded-3xl shadow-2xl overflow-hidden mb-6'>
          <div
            className={`px-8 py-6 ${
              chargingStatus === 'charging'
                ? 'bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600'
                : chargingStatus === 'paused'
                  ? 'bg-gradient-to-r from-blue-400 via-sky-500 to-cyan-500'
                  : 'bg-gradient-to-r from-slate-500 via-blue-600 to-indigo-600'
            }`}
          >
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-4'>
                <div className='w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg'>
                  <BatteryChargingFull className='w-10 h-10 text-sky-600' />
                </div>
                <div>
                  <h1 className='text-2xl font-bold text-white'>Phiên Sạc Đang Hoạt Động</h1>
                  <p className='text-white/90 text-sm mt-1'>
                    {chargingStatus === 'charging' && 'Đang sạc...'}
                    {chargingStatus === 'paused' && 'Đã tạm dừng'}
                    {chargingStatus === 'stopped' && 'Đã dừng'}
                  </p>
                </div>
              </div>
              <div
                className={`px-6 py-3 rounded-full font-bold text-white flex items-center gap-2 ${
                  chargingStatus === 'charging' ? 'bg-white/20 animate-pulse' : 'bg-white/20'
                }`}
              >
                {chargingStatus === 'charging' && (
                  <>
                    <div className='w-3 h-3 bg-sky-300 rounded-full animate-ping absolute'></div>
                    <div className='w-3 h-3 bg-white rounded-full'></div>
                    <span>ĐANG SẠC</span>
                  </>
                )}
                {chargingStatus === 'paused' && (
                  <>
                    <Pause className='w-5 h-5' />
                    <span>TẠM DỪNG</span>
                  </>
                )}
                {chargingStatus === 'stopped' && (
                  <>
                    <Stop className='w-5 h-5' />
                    <span>ĐÃ DỪNG</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Left Column - Info */}
          <div className='lg:col-span-1 space-y-6'>
            {/* Station Info */}
            <div className='bg-white rounded-3xl shadow-xl p-6'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='w-12 h-12 bg-gradient-to-br from-sky-100 to-blue-100 rounded-xl flex items-center justify-center'>
                  <EvStation className='w-6 h-6 text-sky-600' />
                </div>
                <h2 className='text-lg font-bold text-gray-900'>Thông tin Trạm</h2>
              </div>
              <div className='space-y-3'>
                <div>
                  <p className='text-xs text-gray-500 mb-1'>Tên trạm</p>
                  <p className='font-semibold text-gray-900'>{stationInfo.name}</p>
                </div>
                <div>
                  <p className='text-xs text-gray-500 mb-1'>Địa chỉ</p>
                  <p className='text-sm text-gray-700'>{stationInfo.address}</p>
                </div>
                <div className='pt-3 border-t border-gray-100'>
                  <p className='text-sm font-semibold text-sky-600'>{stationInfo.chargePointName}</p>
                </div>
              </div>
            </div>

            {/* Vehicle Info */}
            <div className='bg-white rounded-3xl shadow-xl p-6'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='w-12 h-12 bg-gradient-to-br from-cyan-100 to-sky-100 rounded-xl flex items-center justify-center'>
                  <ElectricCar className='w-6 h-6 text-cyan-600' />
                </div>
                <h2 className='text-lg font-bold text-gray-900'>Thông tin Xe</h2>
              </div>
              <div className='space-y-3'>
                <div>
                  <p className='text-xs text-gray-500 mb-1'>Dòng xe</p>
                  <p className='font-semibold text-gray-900'>{vehicleInfo.model}</p>
                </div>
                <div>
                  <p className='text-xs text-gray-500 mb-1'>Biển số</p>
                  <p className='text-lg font-bold text-sky-600'>{vehicleInfo.licensePlate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Charging Data & Controls */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Real-time Data */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Time Elapsed */}
              <div className='bg-white rounded-3xl shadow-xl p-8 relative overflow-hidden'>
                <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-sky-100 to-blue-100 rounded-full -mr-16 -mt-16 opacity-50'></div>
                <div className='relative'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-14 h-14 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg'>
                      <Timer className='w-8 h-8 text-white' />
                    </div>
                    <div>
                      <p className='text-sm text-gray-500'>Thời gian sạc</p>
                      <p className='text-xs text-gray-400'>Tự động cập nhật</p>
                    </div>
                  </div>
                  <div className='text-center mt-6'>
                    <p className='text-5xl font-bold text-gray-900 font-mono tracking-tight'>
                      {formatTime(chargingData.timeElapsed)}
                    </p>
                    <p className='text-sm text-gray-500 mt-2'>Giờ : Phút : Giây</p>
                  </div>
                </div>
              </div>

              {/* Energy Consumed */}
              <div className='bg-white rounded-3xl shadow-xl p-8 relative overflow-hidden'>
                <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-100 to-sky-100 rounded-full -mr-16 -mt-16 opacity-50'></div>
                <div className='relative'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-14 h-14 bg-gradient-to-br from-cyan-500 to-sky-600 rounded-2xl flex items-center justify-center shadow-lg'>
                      <BatteryChargingFull className='w-8 h-8 text-white' />
                    </div>
                    <div>
                      <p className='text-sm text-gray-500'>Năng lượng</p>
                      <p className='text-xs text-gray-400'>Đã tiêu thụ</p>
                    </div>
                  </div>
                  <div className='text-center mt-6'>
                    <p className='text-5xl font-bold text-gray-900 font-mono tracking-tight'>
                      {chargingData.energyConsumed.toFixed(2)}
                    </p>
                    <p className='text-sm text-gray-500 mt-2'>kWh</p>
                  </div>
                  <div className='mt-4 pt-4 border-t border-gray-100'>
                    <div className='flex justify-between text-sm'>
                      <span className='text-gray-500'>Công suất:</span>
                      <span className='font-semibold text-gray-900'>{chargingData.power} kW</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Control Buttons */}
            <div className='bg-white rounded-3xl shadow-xl p-8'>
              <h2 className='text-lg font-bold text-gray-900 mb-6'>Điều khiển Phiên sạc</h2>
              <div className='grid grid-cols-2 gap-4'>
                {/* Pause/Resume Button */}
                <button
                  onClick={handlePauseResume}
                  disabled={chargingStatus === 'stopped'}
                  className={`py-6 rounded-2xl font-bold text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3 ${
                    chargingStatus === 'charging'
                      ? 'bg-gradient-to-r from-blue-400 to-cyan-500'
                      : 'bg-gradient-to-r from-sky-500 to-blue-600'
                  } disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
                >
                  {chargingStatus === 'charging' ? (
                    <>
                      <Pause className='w-6 h-6' />
                      <span>Tạm dừng</span>
                    </>
                  ) : (
                    <>
                      <PlayArrow className='w-6 h-6' />
                      <span>Tiếp tục</span>
                    </>
                  )}
                </button>

                {/* Stop Button */}
                <button
                  onClick={() => setShowStopModal(true)}
                  disabled={chargingStatus === 'stopped'}
                  className='py-6 bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
                >
                  <Stop className='w-6 h-6' />
                  <span>Dừng hẳn</span>
                </button>
              </div>

              {/* Status Message */}
              {chargingStatus === 'stopped' && (
                <div className='mt-6 p-4 bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-xl flex items-center gap-3'>
                  <CheckCircle className='w-6 h-6 text-sky-600' />
                  <div>
                    <p className='font-semibold text-sky-900'>Phiên sạc đã kết thúc</p>
                    <p className='text-sm text-sky-700'>Đang chuyển về màn hình chính...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Statistics Summary */}
            <div className='bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600 rounded-3xl shadow-xl p-8 text-white'>
              <h2 className='text-lg font-bold mb-6'>Tóm tắt Phiên sạc</h2>
              <div className='grid grid-cols-3 gap-6'>
                <div className='text-center'>
                  <p className='text-3xl font-bold'>{formatTime(chargingData.timeElapsed)}</p>
                  <p className='text-sky-100 text-sm mt-2'>Tổng thời gian</p>
                </div>
                <div className='text-center'>
                  <p className='text-3xl font-bold'>{chargingData.energyConsumed.toFixed(2)}</p>
                  <p className='text-sky-100 text-sm mt-2'>Tổng năng lượng (kWh)</p>
                </div>
                <div className='text-center'>
                  <p className='text-3xl font-bold'>{(chargingData.energyConsumed * 3500).toFixed(0)} ₫</p>
                  <p className='text-sky-100 text-sm mt-2'>Chi phí ước tính</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stop Confirmation Modal */}
      {showStopModal && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in slide-in-from-top-4'>
            <div className='bg-gradient-to-r from-indigo-500 via-blue-600 to-sky-600 p-6 text-center'>
              <div className='w-16 h-16 mx-auto mb-3 bg-white rounded-full flex items-center justify-center'>
                <Warning className='w-10 h-10 text-indigo-600' />
              </div>
              <h3 className='text-2xl font-bold text-white'>Xác nhận Dừng sạc</h3>
            </div>
            <div className='p-8'>
              <p className='text-gray-700 text-center mb-6'>
                Bạn có chắc chắn muốn dừng phiên sạc? Hành động này không thể hoàn tác.
              </p>
              <div className='space-y-4 mb-6 p-4 bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl border border-sky-100'>
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-600'>Thời gian đã sạc:</span>
                  <span className='font-semibold'>{formatTime(chargingData.timeElapsed)}</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-600'>Năng lượng tiêu thụ:</span>
                  <span className='font-semibold'>{chargingData.energyConsumed.toFixed(2)} kWh</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-600'>Chi phí ước tính:</span>
                  <span className='font-semibold text-sky-600'>
                    {(chargingData.energyConsumed * 3500).toFixed(0)} ₫
                  </span>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <button
                  onClick={() => setShowStopModal(false)}
                  className='py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-colors'
                >
                  Hủy
                </button>
                <button
                  onClick={handleStopCharging}
                  className='py-3 bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200'
                >
                  Dừng ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  // Main render
  return <div>{authStatus === 'waiting' ? renderOTPState() : renderChargingState()}</div>
}

export default DirectChargeControl

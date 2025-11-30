import { useState } from 'react'
import {
  LocationOn as MapPinIcon,
  Phone as PhoneIcon,
  Email as EnvelopeIcon,
  AccessTime as ClockIcon,
  Business as BuildingOfficeIcon,
  Chat as ChatBubbleLeftRightIcon,
  FlashOn as BoltIcon,
  CheckCircleOutline as CheckCircleIcon,
  Description as DocumentTextIcon,
  AttachMoney as CurrencyDollarIcon,
  Group as UsersIcon
} from '@mui/icons-material'

const Contact = () => {
  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  // Station Registration Form State
  const [stationForm, setStationForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    address: '',
    city: '',
    investmentType: 'franchise',
    locationArea: '',
    estimatedBudget: '',
    message: ''
  })

  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [stationSubmitted, setStationSubmitted] = useState(false)

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle contact form submission
    console.log('Contact form submitted:', contactForm)
    setContactSubmitted(true)
    setTimeout(() => {
      setContactSubmitted(false)
      setContactForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    }, 3000)
  }

  const handleStationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle station registration form submission
    console.log('Station registration form submitted:', stationForm)
    setStationSubmitted(true)
    setTimeout(() => {
      setStationSubmitted(false)
      setStationForm({
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        address: '',
        city: '',
        investmentType: 'franchise',
        locationArea: '',
        estimatedBudget: '',
        message: ''
      })
    }, 3000)
  }

  return (
    <div className='w-full bg-white'>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-br from-sky-600 via-sky-500 to-blue-600 text-white overflow-hidden'>
        <div className='absolute inset-0 bg-black opacity-10'></div>
        <div className='relative container mx-auto px-6 py-24 md:py-32'>
          <div className='max-w-4xl mx-auto text-center'>
            <h1 className='text-4xl md:text-6xl font-bold leading-tight mb-6'>Liên Hệ Với Chúng Tôi</h1>
            <p className='text-xl md:text-2xl text-sky-50 mb-8'>
              Đội ngũ chuyên nghiệp sẵn sàng hỗ trợ bạn 24/7. Hãy để chúng tôi giúp bạn bắt đầu hành trình với xe điện
            </p>
          </div>
        </div>
        <div className='absolute bottom-0 left-0 right-0'>
          <svg viewBox='0 0 1440 120' className='w-full h-auto'>
            <path
              fill='#ffffff'
              d='M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z'
            ></path>
          </svg>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className='py-20 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>Thông Tin Liên Hệ</h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn</p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {/* Address */}
            <div className='bg-gradient-to-br from-sky-50 to-blue-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-sky-100'>
              <div className='bg-sky-600 w-14 h-14 rounded-full flex items-center justify-center mb-4'>
                <MapPinIcon className='w-7 h-7 text-white' />
              </div>
              <h3 className='text-xl font-bold text-gray-800 mb-2'>Địa Chỉ</h3>
              <p className='text-gray-600 text-sm'>
                123 Đường Nguyễn Huệ
                <br />
                Quận 1, TP. Hồ Chí Minh
                <br />
                Việt Nam
              </p>
            </div>

            {/* Phone */}
            <div className='bg-gradient-to-br from-blue-50 to-sky-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-blue-100'>
              <div className='bg-blue-600 w-14 h-14 rounded-full flex items-center justify-center mb-4'>
                <PhoneIcon className='w-7 h-7 text-white' />
              </div>
              <h3 className='text-xl font-bold text-gray-800 mb-2'>Điện Thoại</h3>
              <p className='text-gray-600 text-sm mb-2'>
                <a href='tel:+84123456789' className='hover:text-blue-600 transition-colors'>
                  Hotline: 1900 xxxx
                </a>
              </p>
              <p className='text-gray-600 text-sm'>
                <a href='tel:+84987654321' className='hover:text-blue-600 transition-colors'>
                  Hỗ trợ: (+84) 987 654 321
                </a>
              </p>
            </div>

            {/* Email */}
            <div className='bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-green-100'>
              <div className='bg-green-600 w-14 h-14 rounded-full flex items-center justify-center mb-4'>
                <EnvelopeIcon className='w-7 h-7 text-white' />
              </div>
              <h3 className='text-xl font-bold text-gray-800 mb-2'>Email</h3>
              <p className='text-gray-600 text-sm mb-2'>
                <a href='mailto:info@evcharging.vn' className='hover:text-green-600 transition-colors'>
                  info@evcharging.vn
                </a>
              </p>
              <p className='text-gray-600 text-sm'>
                <a href='mailto:support@evcharging.vn' className='hover:text-green-600 transition-colors'>
                  support@evcharging.vn
                </a>
              </p>
            </div>

            {/* Working Hours */}
            <div className='bg-gradient-to-br from-purple-50 to-violet-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-purple-100'>
              <div className='bg-purple-600 w-14 h-14 rounded-full flex items-center justify-center mb-4'>
                <ClockIcon className='w-7 h-7 text-white' />
              </div>
              <h3 className='text-xl font-bold text-gray-800 mb-2'>Giờ Làm Việc</h3>
              <p className='text-gray-600 text-sm mb-2'>Thứ 2 - Thứ 6: 8:00 - 18:00</p>
              <p className='text-gray-600 text-sm mb-2'>Thứ 7: 8:00 - 12:00</p>
              <p className='text-gray-600 text-sm'>Hotline 24/7</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Station Registration */}
      <section className='py-20 bg-gradient-to-br from-gray-50 to-sky-50'>
        <div className='container mx-auto px-6'>
          <div className='grid lg:grid-cols-2 gap-12'>
            {/* General Contact Form */}
            <div className='bg-white rounded-2xl shadow-xl p-8'>
              <div className='flex items-center gap-4 mb-6'>
                <div className='bg-sky-100 w-12 h-12 rounded-full flex items-center justify-center'>
                  <ChatBubbleLeftRightIcon className='w-6 h-6 text-sky-600' />
                </div>
                <div>
                  <h2 className='text-3xl font-bold text-gray-800'>Gửi Tin Nhắn</h2>
                  <p className='text-gray-600'>Chúng tôi sẽ phản hồi trong vòng 24h</p>
                </div>
              </div>

              {contactSubmitted && (
                <div className='mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3'>
                  <CheckCircleIcon className='w-6 h-6 text-green-600' />
                  <p className='text-green-800 font-semibold'>Tin nhắn đã được gửi thành công!</p>
                </div>
              )}

              <form onSubmit={handleContactSubmit} className='space-y-5'>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>Họ và tên *</label>
                  <input
                    type='text'
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:ring-4 focus:ring-sky-100 outline-none transition-all'
                    placeholder='Nguyễn Văn A'
                  />
                </div>

                <div className='grid md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Email *</label>
                    <input
                      type='email'
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:ring-4 focus:ring-sky-100 outline-none transition-all'
                      placeholder='example@email.com'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Số điện thoại</label>
                    <input
                      type='tel'
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:ring-4 focus:ring-sky-100 outline-none transition-all'
                      placeholder='0987 654 321'
                    />
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>Chủ đề *</label>
                  <select
                    required
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:ring-4 focus:ring-sky-100 outline-none transition-all'
                  >
                    <option value=''>Chọn chủ đề</option>
                    <option value='support'>Hỗ trợ kỹ thuật</option>
                    <option value='billing'>Thanh toán & Hóa đơn</option>
                    <option value='partnership'>Hợp tác kinh doanh</option>
                    <option value='feedback'>Góp ý & Phản hồi</option>
                    <option value='other'>Khác</option>
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>Nội dung *</label>
                  <textarea
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    rows={6}
                    className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:ring-4 focus:ring-sky-100 outline-none transition-all resize-none'
                    placeholder='Nhập nội dung tin nhắn của bạn...'
                  ></textarea>
                </div>

                <button
                  type='submit'
                  className='w-full bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300'
                >
                  Gửi Tin Nhắn
                </button>
              </form>
            </div>

            {/* Quick Contact Info */}
            <div className='space-y-6'>
              {/* Social Media */}
              <div className='bg-white rounded-2xl shadow-xl p-8'>
                <h3 className='text-2xl font-bold text-gray-800 mb-6'>Kết Nối Với Chúng Tôi</h3>
                <div className='space-y-4'>
                  <a
                    href='#'
                    className='flex items-center gap-4 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all'
                  >
                    <div className='bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center'>
                      <svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 24 24'>
                        <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                      </svg>
                    </div>
                    <div>
                      <div className='font-semibold text-gray-800'>Facebook</div>
                      <div className='text-sm text-gray-600'>@EVChargingVietnam</div>
                    </div>
                  </a>

                  <a
                    href='#'
                    className='flex items-center gap-4 p-4 bg-sky-50 rounded-xl hover:bg-sky-100 transition-all'
                  >
                    <div className='bg-sky-500 w-12 h-12 rounded-full flex items-center justify-center'>
                      <svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 24 24'>
                        <path d='M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.56-4.458c.538-.196 1.006.128.832.941z' />
                      </svg>
                    </div>
                    <div>
                      <div className='font-semibold text-gray-800'>Telegram</div>
                      <div className='text-sm text-gray-600'>@EVChargingSupport</div>
                    </div>
                  </a>

                  <a
                    href='#'
                    className='flex items-center gap-4 p-4 bg-pink-50 rounded-xl hover:bg-pink-100 transition-all'
                  >
                    <div className='bg-gradient-to-br from-purple-600 to-pink-600 w-12 h-12 rounded-full flex items-center justify-center'>
                      <svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 24 24'>
                        <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
                      </svg>
                    </div>
                    <div>
                      <div className='font-semibold text-gray-800'>Instagram</div>
                      <div className='text-sm text-gray-600'>@evcharging.vn</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Emergency Support */}
              <div className='bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-xl p-8 border-2 border-red-200'>
                <h3 className='text-2xl font-bold text-gray-800 mb-4'>Hỗ Trợ Khẩn Cấp</h3>
                <p className='text-gray-600 mb-4'>Gặp sự cố kỹ thuật? Liên hệ ngay với chúng tôi</p>
                <a
                  href='tel:1900xxxx'
                  className='flex items-center justify-center gap-3 bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all'
                >
                  <PhoneIcon className='w-6 h-6' />
                  Hotline: 1900 xxxx
                </a>
                <p className='text-sm text-gray-600 mt-4 text-center'>Phục vụ 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Station Registration Section */}
      <section className='py-20 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16'>
            <div className='bg-gradient-to-r from-sky-600 to-blue-600 text-white inline-block px-6 py-2 rounded-full font-semibold mb-4'>
              Cơ Hội Kinh Doanh
            </div>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>Đăng Ký Mở Trạm Sạc</h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Tham gia mạng lưới trạm sạc xe điện lớn nhất Việt Nam. Cơ hội đầu tư hấp dẫn với lợi nhuận bền vững
            </p>
          </div>

          {/* Benefits */}
          <div className='grid md:grid-cols-4 gap-6 mb-12'>
            <div className='bg-gradient-to-br from-sky-50 to-blue-50 p-6 rounded-xl shadow-md text-center border border-sky-100'>
              <div className='bg-sky-600 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4'>
                <BoltIcon className='w-7 h-7 text-white' />
              </div>
              <h3 className='font-bold text-gray-800 mb-2'>Công Nghệ Hàng Đầu</h3>
              <p className='text-sm text-gray-600'>Thiết bị chính hãng từ các thương hiệu uy tín</p>
            </div>

            <div className='bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl shadow-md text-center border border-green-100'>
              <div className='bg-green-600 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4'>
                <CurrencyDollarIcon className='w-7 h-7 text-white' />
              </div>
              <h3 className='font-bold text-gray-800 mb-2'>Lợi Nhuận Ổn Định</h3>
              <p className='text-sm text-gray-600'>ROI hấp dẫn trong 18-24 tháng</p>
            </div>

            <div className='bg-gradient-to-br from-blue-50 to-sky-50 p-6 rounded-xl shadow-md text-center border border-blue-100'>
              <div className='bg-blue-600 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4'>
                <UsersIcon className='w-7 h-7 text-white' />
              </div>
              <h3 className='font-bold text-gray-800 mb-2'>Hỗ Trợ Toàn Diện</h3>
              <p className='text-sm text-gray-600'>Đào tạo, marketing và vận hành</p>
            </div>

            <div className='bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-xl shadow-md text-center border border-purple-100'>
              <div className='bg-purple-600 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4'>
                <DocumentTextIcon className='w-7 h-7 text-white' />
              </div>
              <h3 className='font-bold text-gray-800 mb-2'>Hợp Đồng Rõ Ràng</h3>
              <p className='text-sm text-gray-600'>Cam kết pháp lý minh bạch</p>
            </div>
          </div>

          {/* Registration Form */}
          <div className='max-w-4xl mx-auto'>
            <div className='bg-gradient-to-br from-gray-50 to-sky-50 rounded-2xl shadow-xl p-8 md:p-12 border border-sky-100'>
              <div className='flex items-center gap-4 mb-8'>
                <div className='bg-gradient-to-br from-sky-600 to-blue-600 w-14 h-14 rounded-full flex items-center justify-center'>
                  <BuildingOfficeIcon className='w-7 h-7 text-white' />
                </div>
                <div>
                  <h3 className='text-3xl font-bold text-gray-800'>Form Đăng Ký</h3>
                  <p className='text-gray-600'>Điền thông tin để được tư vấn chi tiết</p>
                </div>
              </div>

              {stationSubmitted && (
                <div className='mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3'>
                  <CheckCircleIcon className='w-6 h-6 text-green-600' />
                  <p className='text-green-800 font-semibold'>
                    Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn trong 24h.
                  </p>
                </div>
              )}

              <form onSubmit={handleStationSubmit} className='space-y-6'>
                <div className='grid md:grid-cols-2 gap-6'>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Họ và tên *</label>
                    <input
                      type='text'
                      required
                      value={stationForm.fullName}
                      onChange={(e) => setStationForm({ ...stationForm, fullName: e.target.value })}
                      className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:ring-4 focus:ring-sky-100 outline-none transition-all'
                      placeholder='Nguyễn Văn A'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Email *</label>
                    <input
                      type='email'
                      required
                      value={stationForm.email}
                      onChange={(e) => setStationForm({ ...stationForm, email: e.target.value })}
                      className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:ring-4 focus:ring-sky-100 outline-none transition-all'
                      placeholder='example@email.com'
                    />
                  </div>
                </div>

                <div className='grid md:grid-cols-2 gap-6'>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Số điện thoại *</label>
                    <input
                      type='tel'
                      required
                      value={stationForm.phone}
                      onChange={(e) => setStationForm({ ...stationForm, phone: e.target.value })}
                      className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:ring-4 focus:ring-sky-100 outline-none transition-all'
                      placeholder='0987 654 321'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Tên công ty/Tổ chức</label>
                    <input
                      type='text'
                      value={stationForm.companyName}
                      onChange={(e) => setStationForm({ ...stationForm, companyName: e.target.value })}
                      className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:ring-4 focus:ring-sky-100 outline-none transition-all'
                      placeholder='Công ty TNHH ABC'
                    />
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>Địa chỉ địa điểm *</label>
                  <input
                    type='text'
                    required
                    value={stationForm.address}
                    onChange={(e) => setStationForm({ ...stationForm, address: e.target.value })}
                    className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:ring-4 focus:ring-sky-100 outline-none transition-all'
                    placeholder='123 Đường ABC, Phường XYZ'
                  />
                </div>

                <div className='grid md:grid-cols-2 gap-6'>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Tỉnh/Thành phố *</label>
                    <select
                      required
                      value={stationForm.city}
                      onChange={(e) => setStationForm({ ...stationForm, city: e.target.value })}
                      className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:ring-4 focus:ring-sky-100 outline-none transition-all'
                    >
                      <option value=''>Chọn Tỉnh/Thành phố</option>
                      <option value='hanoi'>Hà Nội</option>
                      <option value='hcm'>TP. Hồ Chí Minh</option>
                      <option value='danang'>Đà Nẵng</option>
                      <option value='haiphong'>Hải Phòng</option>
                      <option value='cantho'>Cần Thơ</option>
                      <option value='other'>Tỉnh khác</option>
                    </select>
                  </div>

                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Loại hình đầu tư *</label>
                    <select
                      required
                      value={stationForm.investmentType}
                      onChange={(e) => setStationForm({ ...stationForm, investmentType: e.target.value })}
                      className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:ring-4 focus:ring-sky-100 outline-none transition-all'
                    >
                      <option value='franchise'>Nhượng quyền (Franchise)</option>
                      <option value='partnership'>Hợp tác kinh doanh</option>
                      <option value='rental'>Cho thuê mặt bằng</option>
                      <option value='equipment'>Mua thiết bị</option>
                    </select>
                  </div>
                </div>

                <div className='grid md:grid-cols-2 gap-6'>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Diện tích mặt bằng (m²)</label>
                    <input
                      type='text'
                      value={stationForm.locationArea}
                      onChange={(e) => setStationForm({ ...stationForm, locationArea: e.target.value })}
                      className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:ring-4 focus:ring-sky-100 outline-none transition-all'
                      placeholder='VD: 100m²'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Ngân sách dự kiến</label>
                    <select
                      value={stationForm.estimatedBudget}
                      onChange={(e) => setStationForm({ ...stationForm, estimatedBudget: e.target.value })}
                      className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:ring-4 focus:ring-sky-100 outline-none transition-all'
                    >
                      <option value=''>Chọn mức ngân sách</option>
                      <option value='under500'>Dưới 500 triệu</option>
                      <option value='500-1b'>500 triệu - 1 tỷ</option>
                      <option value='1-2b'>1 - 2 tỷ</option>
                      <option value='2-5b'>2 - 5 tỷ</option>
                      <option value='above5b'>Trên 5 tỷ</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>Ghi chú thêm</label>
                  <textarea
                    value={stationForm.message}
                    onChange={(e) => setStationForm({ ...stationForm, message: e.target.value })}
                    rows={5}
                    className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:ring-4 focus:ring-sky-100 outline-none transition-all resize-none'
                    placeholder='Thông tin bổ sung, câu hỏi hoặc yêu cầu đặc biệt...'
                  ></textarea>
                </div>

                <div className='bg-sky-50 border border-sky-200 rounded-xl p-4'>
                  <p className='text-sm text-gray-600'>
                    <strong>Lưu ý:</strong> Sau khi gửi đăng ký, đội ngũ tư vấn của chúng tôi sẽ liên hệ với bạn trong
                    vòng 24h để trao đổi chi tiết về kế hoạch đầu tư, chi phí, lợi nhuận và các điều khoản hợp tác.
                  </p>
                </div>

                <button
                  type='submit'
                  className='w-full bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300'
                >
                  Gửi Đăng Ký Ngay
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className='py-20 bg-gradient-to-br from-gray-50 to-sky-50'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>Câu Hỏi Thường Gặp</h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>Giải đáp những thắc mắc phổ biến</p>
          </div>

          <div className='max-w-4xl mx-auto space-y-4'>
            {[
              {
                q: 'Chi phí đầu tư mở một trạm sạc là bao nhiêu?',
                a: 'Chi phí đầu tư dao động từ 500 triệu đến 5 tỷ VNĐ tùy thuộc vào quy mô, loại thiết bị (AC/DC), số lượng cổng sạc và vị trí địa lý. Chúng tôi có nhiều gói đầu tư phù hợp với ngân sách của bạn.'
              },
              {
                q: 'Thời gian hoàn vốn dự kiến là bao lâu?',
                a: 'Với mô hình kinh doanh hiệu quả và vị trí đắc địa, thời gian hoàn vốn trung bình là 18-24 tháng. Lợi nhuận phụ thuộc vào lượng khách hàng sử dụng và các dịch vụ kèm theo.'
              },
              {
                q: 'Tôi cần chuẩn bị những gì để mở trạm sạc?',
                a: 'Bạn cần có: (1) Mặt bằng phù hợp với diện tích tối thiểu 50-100m², (2) Nguồn điện ổn định, (3) Giấy phép kinh doanh hợp lệ, (4) Vốn đầu tư ban đầu. Chúng tôi sẽ hỗ trợ toàn bộ quy trình sau đó.'
              },
              {
                q: 'Công ty có hỗ trợ gì cho nhà đầu tư?',
                a: 'Chúng tôi cung cấp: Thiết bị chính hãng, lắp đặt và vận hành ban đầu, đào tạo nhân viên, phần mềm quản lý, marketing và quảng bá, hỗ trợ kỹ thuật 24/7, và chia sẻ kinh nghiệm vận hành.'
              },
              {
                q: 'Làm thế nào để liên hệ tư vấn chi tiết?',
                a: 'Bạn có thể điền form đăng ký trên trang này, gọi hotline 1900 xxxx, hoặc gửi email đến partnership@evcharging.vn. Đội ngũ tư vấn sẽ liên hệ trong vòng 24h.'
              }
            ].map((faq, idx) => (
              <details key={idx} className='bg-white rounded-xl shadow-md overflow-hidden group'>
                <summary className='px-6 py-5 cursor-pointer font-semibold text-gray-800 hover:bg-sky-50 transition-all flex items-center justify-between'>
                  <span>{faq.q}</span>
                  <svg
                    className='w-5 h-5 text-sky-600 transition-transform group-open:rotate-180'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                  </svg>
                </summary>
                <div className='px-6 pb-5 text-gray-600 leading-relaxed'>{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className='py-20 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>Văn Phòng Chính</h2>
            <p className='text-xl text-gray-600'>Hãy ghé thăm chúng tôi</p>
          </div>

          <div className='bg-gray-200 rounded-2xl overflow-hidden shadow-xl' style={{ height: '500px' }}>
            {/* Google Maps Embed - Replace with actual embed code */}
            <div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-sky-100 to-blue-100'>
              <div className='text-center'>
                <MapPinIcon className='w-16 h-16 text-sky-600 mx-auto mb-4' />
                <p className='text-gray-600 font-semibold'>
                  123 Đường Nguyễn Huệ, Quận 1
                  <br />
                  TP. Hồ Chí Minh, Việt Nam
                </p>
                <p className='text-sm text-gray-500 mt-2'>(Thay thế với Google Maps embed thực tế)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className='py-20 bg-gradient-to-br from-sky-600 via-blue-600 to-sky-700 text-white'>
        <div className='container mx-auto px-6 text-center'>
          <h2 className='text-4xl md:text-5xl font-bold mb-6'>Bắt Đầu Ngay Hôm Nay!</h2>
          <p className='text-xl md:text-2xl mb-8 text-sky-50 max-w-2xl mx-auto'>
            Đừng bỏ lỡ cơ hội tham gia vào thị trường xe điện đang phát triển mạnh mẽ tại Việt Nam
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <a
              href='tel:1900xxxx'
              className='bg-white text-sky-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-sky-50 transition-all duration-300 shadow-lg inline-flex items-center justify-center gap-2'
            >
              <PhoneIcon className='w-6 h-6' />
              Gọi Ngay: 1900 xxxx
            </a>
            <a
              href='mailto:info@evcharging.vn'
              className='border-2 border-white text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-sky-600 transition-all duration-300 inline-flex items-center justify-center gap-2'
            >
              <EnvelopeIcon className='w-6 h-6' />
              Gửi Email
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact

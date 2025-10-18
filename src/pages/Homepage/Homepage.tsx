import {
  Bolt,
  AccessTime,
  LocationOn,
  VerifiedUser,
  AttachMoney,
  PhoneAndroid,
  BarChart,
  Cloud,
  Payments
} from '@mui/icons-material'
import heroImage from '/Users/donhianh/Desktop/Code/EV-charging-system/fe-ev-charging-system/src/assets/Homepage/hero-section.jpeg'
import technologyImage from '/Users/donhianh/Desktop/Code/EV-charging-system/fe-ev-charging-system/src/assets/Homepage/tinh-nang-cong-nghe.jpeg'
import networkImage from '/Users/donhianh/Desktop/Code/EV-charging-system/fe-ev-charging-system/src/assets/Homepage/mang-luoi-phu-song.jpeg'
import { useNavigate } from 'react-router-dom'

const Homepage = () => {
  const navigate = useNavigate()
  return (
    <div className='w-full bg-white'>
      {/* Hero Section - Phần nổi bật nhất trang */}
      <section className='relative bg-gradient-to-br from-sky-600 via-sky-500 to-blue-600 text-white overflow-hidden'>
        <div className='absolute inset-0 bg-black opacity-10'></div>
        <div className='relative container mx-auto px-6 py-24 md:py-32'>
          <div className='grid md:grid-cols-2 gap-12 items-center'>
            <div className='space-y-6'>
              {/* Tiêu đề trang */}
              <h1 className='text-4xl md:text-6xl font-bold leading-tight'>
                Xe Điện - Tương Lai Xanh Cho Thế Hệ Mai Sau
              </h1>
              {/* Mô tả trang */}
              <p className='text-xl md:text-2xl text-sky-50'>
                Hãy cùng chúng tôi bảo vệ môi trường sống xanh, giảm thiểu khí thải carbon và xây dựng một tương lai bền
                vững cho hành tinh
              </p>
              {/* Services */}
              <div className='flex flex-col sm:flex-row gap-4 pt-4'>
                {/* Nút đặt lịch sạc */}
                <button
                  className='bg-white text-sky-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-sky-50 transition-all duration-300 shadow-lg'
                  onClick={() => navigate('/map')}
                >
                  Đặt Lịch Sạc Ngay
                </button>
                {/* Nút tìm hiểu thêm */}
                <button
                  className='border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-sky-600 transition-all duration-300'
                  onClick={() => navigate('/about')}
                >
                  Tìm Hiểu Thêm
                </button>
              </div>
              {/* Thống kê */}
              <div className='grid grid-cols-3 gap-6 pt-8'>
                <div className='text-center border-2 border-stone-50 p-6 rounded-lg'>
                  <div className='text-4xl font-bold'>500+</div>
                  <div className='text-sky-100 text-lg'>Trạm Sạc</div>
                </div>
                <div className='text-center border-2 border-stone-50 p-4 pt-6 rounded-lg'>
                  <div className='text-4xl font-bold'>50K+</div>
                  <div className='text-sky-100 text-lg'>Người Dùng</div>
                </div>
                <div className='text-center border-2 border-stone-50 p-4 pt-6 rounded-lg'>
                  <div className='text-4xl font-bold'>24/7</div>
                  <div className='text-sky-100 text-lg'>Hỗ Trợ</div>
                </div>
              </div>
            </div>
            {/* Hình ảnh */}
            <div className='hidden md:block'>
              <img src={heroImage} alt='EV Charging' className='rounded-2xl shadow-2xl' />
            </div>
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

      {/* Phần giải pháp */}
      <section className='py-20 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>Giải Pháp Sạc Thông Minh</h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Đặt lịch sạc xe điện mọi lúc, mọi nơi với hệ thống tiện ích 24/24 của chúng tôi
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            <div className='bg-gradient-to-br from-sky-50 to-blue-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-sky-100'>
              <div className='bg-sky-600 w-16 h-16 rounded-full flex items-center justify-center mb-6'>
                <AccessTime className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-gray-800 mb-4'>Đặt Lịch Linh Hoạt</h3>
              <p className='text-gray-600 leading-relaxed'>
                Đặt lịch sạc trước, chọn thời gian phù hợp với lịch trình của bạn. Hệ thống tự động nhắc nhở và sẵn sàng
                phục vụ 24/7.
              </p>
            </div>

            <div className='bg-gradient-to-br from-sky-50 to-blue-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-sky-100'>
              <div className='bg-sky-600 w-16 h-16 rounded-full flex items-center justify-center mb-6'>
                <LocationOn className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-gray-800 mb-4'>Mọi Lúc, Mọi Nơi</h3>
              <p className='text-gray-600 leading-relaxed'>
                Tìm kiếm và đặt lịch tại hơn 500+ trạm sạc trên toàn quốc. Ứng dụng thông minh giúp bạn tìm trạm gần
                nhất chỉ trong vài giây.
              </p>
            </div>

            <div className='bg-gradient-to-br from-sky-50 to-blue-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-sky-100'>
              <div className='bg-sky-600 w-16 h-16 rounded-full flex items-center justify-center mb-6'>
                <Bolt className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-gray-800 mb-4'>Sạc Nhanh Siêu Tốc</h3>
              <p className='text-gray-600 leading-relaxed'>
                Công nghệ sạc nhanh DC cho phép sạc đầy 80% pin chỉ trong 30-45 phút. Tiết kiệm thời gian, tối ưu hành
                trình của bạn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lợi ích nổi bật */}
      <section className='py-20 bg-gradient-to-br from-gray-50 to-sky-50'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>Lợi Ích Vượt Trội</h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Tại sao hơn 50,000+ người dùng đã tin tưởng lựa chọn dịch vụ của chúng tôi
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
            <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-center'>
              <div className='bg-sky-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4'>
                <AttachMoney className='w-7 h-7 text-sky-600' />
              </div>
              <h4 className='text-lg font-bold text-gray-800 mb-2'>Tiết Kiệm Chi Phí</h4>
              <p className='text-gray-600 text-sm'>Chi phí sạc thấp hơn 60% so với xăng dầu truyền thống</p>
            </div>

            <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-center'>
              <div className='bg-sky-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4'>
                <VerifiedUser className='w-7 h-7 text-sky-600' />
              </div>
              <h4 className='text-lg font-bold text-gray-800 mb-2'>An Toàn Tuyệt Đối</h4>
              <p className='text-gray-600 text-sm'>Hệ thống bảo vệ quá tải, chống rò rỉ điện và giám sát 24/7</p>
            </div>

            <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-center'>
              <div className='bg-sky-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4'>
                <PhoneAndroid className='w-7 h-7 text-sky-600' />
              </div>
              <h4 className='text-lg font-bold text-gray-800 mb-2'>Ứng Dụng Thông Minh</h4>
              <p className='text-gray-600 text-sm'>Quản lý lịch sạc, thanh toán và theo dõi tiến độ trên điện thoại</p>
            </div>

            <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-center'>
              <div className='bg-sky-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Cloud className='w-7 h-7 text-sky-600' />
              </div>
              <h4 className='text-lg font-bold text-gray-800 mb-2'>Thân Thiện Môi Trường</h4>
              <p className='text-gray-600 text-sm'>Giảm 100% khí thải CO2, góp phần bảo vệ hành tinh xanh</p>
            </div>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-10 pl-30 pr-30'>
            <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-center'>
              <div className='bg-sky-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Payments className='w-12 h-12 text-sky-600 mx-auto mb-3' />
              </div>
              <h4 className='text-lg font-bold text-gray-800 mb-2'>2,500đ/kWh</h4>
              <p className='text-gray-600 text-sm'>Giá sạc cạnh tranh nhất thị trường</p>
            </div>

            <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-center'>
              <div className='bg-sky-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4'>
                <BarChart className='w-12 h-12 text-sky-600 mx-auto mb-3' />
              </div>
              <h4 className='text-lg font-bold text-gray-800 mb-2'>99.9%</h4>
              <p className='text-gray-600 text-sm'>Thời gian hoạt động ổn định</p>
            </div>

            <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-center'>
              <div className='bg-sky-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Bolt className='w-12 h-12 text-sky-600 mx-auto mb-3' />
              </div>
              <h4 className='text-lg font-bold text-gray-800 mb-2'>150 kW</h4>
              <p className='text-gray-600 text-sm'>Công suất sạc tối đa</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tính năng công nghệ */}
      <section className='py-20 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>Công Nghệ Tiên Tiến</h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Hệ thống trụ sạc hiện đại với công nghệ hàng đầu thế giới
            </p>
          </div>

          <div className='grid lg:grid-cols-2 gap-12 items-center mb-16'>
            <div>
              <img src={technologyImage} alt='Charging Station' className='rounded-2xl shadow-xl' />
            </div>
            <div className='space-y-6'>
              <div className='flex gap-4'>
                <div className='bg-sky-600 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold flex-shrink-0'>
                  1
                </div>
                <div>
                  <h3 className='text-xl font-bold text-gray-800 mb-2'>Trụ Sạc DC Siêu Nhanh</h3>
                  <p className='text-gray-600'>
                    Công suất từ 50kW - 150kW, sạc đầy 80% chỉ trong 30-45 phút. Tương thích với tất cả các dòng xe điện
                    phổ biến.
                  </p>
                </div>
              </div>

              <div className='flex gap-4'>
                <div className='bg-sky-600 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold flex-shrink-0'>
                  2
                </div>
                <div>
                  <h3 className='text-xl font-bold text-gray-800 mb-2'>Trụ Sạc AC Tiêu Chuẩn</h3>
                  <p className='text-gray-600'>
                    Công suất 7kW - 22kW, phù hợp cho việc sạc trong thời gian dài tại nhà, văn phòng hoặc trung tâm
                    thương mại.
                  </p>
                </div>
              </div>

              <div className='flex gap-4'>
                <div className='bg-sky-600 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold flex-shrink-0'>
                  3
                </div>
                <div>
                  <h3 className='text-xl font-bold text-gray-800 mb-2'>Công Nghệ Thông Minh</h3>
                  <p className='text-gray-600'>
                    Tích hợp IoT, thanh toán không tiếp xúc, giám sát từ xa, cập nhật firmware tự động và báo cáo thống
                    kê chi tiết.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-gradient-to-br from-sky-600 to-blue-600 text-white p-10 rounded-2xl'>
            <h3 className='text-3xl font-bold mb-8 text-center'>Đặc Điểm Kỹ Thuật Nổi Bật</h3>
            <div className='grid md:grid-cols-3 gap-8'>
              <div className='text-center'>
                <div className='text-5xl font-bold mb-2'>150kW</div>
                <div className='text-sky-100'>Công suất tối đa</div>
                <div className='text-sm text-sky-200 mt-2'>Chuẩn CCS2 & CHAdeMO</div>
              </div>
              <div className='text-center'>
                <div className='text-5xl font-bold mb-2'>IP54</div>
                <div className='text-sky-100'>Chống bụi & nước</div>
                <div className='text-sm text-sky-200 mt-2'>Hoạt động mọi thời tiết</div>
              </div>
              <div className='text-center'>
                <div className='text-5xl font-bold mb-2'>4.3"</div>
                <div className='text-sky-100'>Màn hình cảm ứng</div>
                <div className='text-sm text-sky-200 mt-2'>Giao diện thân thiện</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mạng lưới phủ sóng */}
      <section className='py-20 bg-gradient-to-br from-gray-50 to-sky-50'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>Mạng Lưới Phủ Sóng Toàn Quốc</h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Hệ thống trạm sạc phủ khắp 63 tỉnh thành Việt Nam, sẵn sàng phục vụ mọi hành trình của bạn
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-12 items-center'>
            <div className='space-y-6'>
              <div className='bg-white p-6 rounded-xl shadow-md'>
                <div className='flex items-center gap-4 mb-3'>
                  <div className='bg-sky-600 text-white px-4 py-2 rounded-lg font-bold'>Miền Bắc</div>
                  <span className='text-2xl font-bold text-gray-800'>200+ trạm</span>
                </div>
                <p className='text-gray-600'>Hà Nội, Hải Phòng, Quảng Ninh, Thanh Hóa, Nghệ An và các tỉnh lân cận</p>
              </div>

              <div className='bg-white p-6 rounded-xl shadow-md'>
                <div className='flex items-center gap-4 mb-3'>
                  <div className='bg-sky-600 text-white px-4 py-2 rounded-lg font-bold'>Miền Trung</div>
                  <span className='text-2xl font-bold text-gray-800'>150+ trạm</span>
                </div>
                <p className='text-gray-600'>Đà Nẵng, Huế, Quảng Nam, Khánh Hòa, Bình Định và các tỉnh miền Trung</p>
              </div>

              <div className='bg-white p-6 rounded-xl shadow-md'>
                <div className='flex items-center gap-4 mb-3'>
                  <div className='bg-sky-600 text-white px-4 py-2 rounded-lg font-bold'>Miền Nam</div>
                  <span className='text-2xl font-bold text-gray-800'>150+ trạm</span>
                </div>
                <p className='text-gray-600'>TP.HCM, Bình Dương, Đồng Nai, Vũng Tàu, Cần Thơ và các tỉnh Đông Nam Bộ</p>
              </div>

              <div className='bg-sky-600 text-white p-6 rounded-xl shadow-lg'>
                <div className='text-center'>
                  <div className='text-5xl font-bold mb-2'>63/63</div>
                  <div className='text-xl text-sky-100'>Tỉnh thành được phủ sóng</div>
                </div>
              </div>
            </div>

            <div className='bg-white p-8 rounded-2xl shadow-xl'>
              <img src={networkImage} alt='Vietnam Map' className='rounded-lg mb-6 w-full h-full' />
              <div className='grid grid-cols-2 gap-4 text-center'>
                <div className='bg-sky-50 p-4 rounded-lg'>
                  <div className='text-3xl font-bold text-sky-600'>500+</div>
                  <div className='text-sm text-gray-600'>Trạm sạc</div>
                </div>
                <div className='bg-sky-50 p-4 rounded-lg'>
                  <div className='text-3xl font-bold text-sky-600'>1,200+</div>
                  <div className='text-sm text-gray-600'>Cổng sạc</div>
                </div>
                <div className='bg-sky-50 p-4 rounded-lg'>
                  <div className='text-3xl font-bold text-sky-600'>24/7</div>
                  <div className='text-sm text-gray-600'>Hoạt động</div>
                </div>
                <div className='bg-sky-50 p-4 rounded-lg'>
                  <div className='text-3xl font-bold text-sky-600'>100%</div>
                  <div className='text-sm text-gray-600'>Phủ sóng</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Đối tác tin tưởng */}
      <section className='py-20 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>Đối Tác Tin Tưởng</h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Chúng tôi hợp tác với các thương hiệu hàng đầu thế giới để mang đến dịch vụ tốt nhất
            </p>
          </div>

          <div className='bg-gradient-to-br from-sky-50 to-blue-50 p-12 rounded-2xl mb-12'>
            <h3 className='text-2xl font-bold text-gray-800 mb-8 text-center'>Nhà Cung Cấp Thiết Bị</h3>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
              <div className='bg-white p-6 rounded-xl shadow-md flex items-center justify-center hover:shadow-lg transition-all'>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-gray-700'>ABB</div>
                  <div className='text-sm text-gray-500'>Switzerland</div>
                </div>
              </div>
              <div className='bg-white p-6 rounded-xl shadow-md flex items-center justify-center hover:shadow-lg transition-all'>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-gray-700'>Schneider</div>
                  <div className='text-sm text-gray-500'>France</div>
                </div>
              </div>
              <div className='bg-white p-6 rounded-xl shadow-md flex items-center justify-center hover:shadow-lg transition-all'>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-gray-700'>Siemens</div>
                  <div className='text-sm text-gray-500'>Germany</div>
                </div>
              </div>
              <div className='bg-white p-6 rounded-xl shadow-md flex items-center justify-center hover:shadow-lg transition-all'>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-gray-700'>Tesla</div>
                  <div className='text-sm text-gray-500'>USA</div>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-gradient-to-br from-gray-50 to-sky-50 p-12 rounded-2xl'>
            <h3 className='text-2xl font-bold text-gray-800 mb-8 text-center'>Đối Tác Bảo Dưỡng & Phụ Tùng</h3>
            <div className='grid grid-cols-2 md:grid-cols-5 gap-6'>
              <div className='bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-all'>
                <div className='font-bold text-gray-700'>ChargePoint</div>
              </div>
              <div className='bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-all'>
                <div className='font-bold text-gray-700'>EVBox</div>
              </div>
              <div className='bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-all'>
                <div className='font-bold text-gray-700'>Wallbox</div>
              </div>
              <div className='bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-all'>
                <div className='font-bold text-gray-700'>Blink</div>
              </div>
              <div className='bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-all'>
                <div className='font-bold text-gray-700'>Webasto</div>
              </div>
            </div>
          </div>

          <div className='mt-12 text-center bg-sky-600 text-white p-8 rounded-2xl'>
            <h3 className='text-2xl font-bold mb-4'>Chứng Nhận & Tiêu Chuẩn Quốc Tế</h3>
            <div className='flex flex-wrap justify-center gap-6 text-lg'>
              <span className='bg-white text-sky-600 px-6 py-2 rounded-full font-semibold'>ISO 9001:2015</span>
              <span className='bg-white text-sky-600 px-6 py-2 rounded-full font-semibold'>CE Certified</span>
              <span className='bg-white text-sky-600 px-6 py-2 rounded-full font-semibold'>IEC 61851</span>
              <span className='bg-white text-sky-600 px-6 py-2 rounded-full font-semibold'>OCPP 1.6</span>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className='py-20 bg-gradient-to-br from-sky-600 via-blue-600 to-sky-700 text-white'>
        <div className='container mx-auto px-6 text-center'>
          <h2 className='text-4xl md:text-5xl font-bold mb-6'>Sẵn Sàng Trải Nghiệm Tương Lai?</h2>
          <p className='text-xl md:text-2xl mb-8 text-sky-50 max-w-2xl mx-auto'>
            Tham gia cùng hàng ngàn người dùng đã chọn xe điện và dịch vụ của chúng tôi
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button className='bg-white text-sky-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-sky-50 transition-all duration-300 shadow-lg'>
              Đăng Ký Ngay
            </button>
            <button className='border-2 border-white text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-sky-600 transition-all duration-300'>
              Liên Hệ Tư Vấn
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Homepage

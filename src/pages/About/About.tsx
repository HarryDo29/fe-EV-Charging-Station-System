import {
  FlashOn as BoltIcon,
  VerifiedUser as ShieldCheckIcon,
  Public as GlobeAltIcon,
  FavoriteBorder as HeartIcon,
  Lightbulb as LightBulbIcon,
  AutoAwesome as SparklesIcon,
  CheckCircleOutline as CheckCircleIcon,
  Memory as CpuChipIcon,
  AccessTime as ClockIcon,
  Group as UserGroupIcon,
  BarChart as ChartBarIcon,
  Cloud as CloudIcon
} from '@mui/icons-material'

const progress = [
  {
    year: 2020,
    title: 'Khởi Đầu',
    description:
      'Thành lập công ty với 10 trạm sạc đầu tiên tại Hà Nội và TP.HCM. Đặt nền móng cho tầm nhìn phát triển xe điện tại Việt Nam.'
  },
  {
    year: 2021,
    title: 'Mở Rộng',
    description: 'Phủ sóng 100+ trạm sạc tại 20 tỉnh thành. Ra mắt ứng dụng di động và hệ thống đặt lịch thông minh.'
  },
  {
    year: 2022,
    title: 'Đổi Mới',
    description: 'Triển khai công nghệ sạc nhanh DC 150kW. Hợp tác với các đối tác quốc tế hàng đầu như ABB, Siemens.'
  },
  {
    year: 2023,
    title: 'Dẫn Đầu',
    description: 'Đạt mốc 300+ trạm sạc, phủ sóng 50 tỉnh thành. Phục vụ hơn 30,000 khách hàng thân thiết.'
  },
  {
    year: 2024,
    title: 'Hiện Tại',
    description:
      'Vươn tới 500+ trạm sạc, phủ sóng toàn bộ 63 tỉnh thành. Hơn 50,000 người dùng tin tưởng và sử dụng dịch vụ mỗi ngày.'
  }
]

const About = () => {
  return (
    <div className='w-full bg-white'>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-br from-sky-600 via-sky-500 to-blue-600 text-white overflow-hidden'>
        <div className='absolute inset-0 bg-black opacity-10'></div>
        <div className='relative container mx-auto px-6 py-24 md:py-32'>
          <div className='max-w-4xl mx-auto text-center'>
            <h1 className='text-4xl md:text-6xl font-bold leading-tight mb-6'>Về Chúng Tôi</h1>
            <p className='text-xl md:text-2xl text-sky-50 mb-8'>
              Dẫn đầu trong việc xây dựng hệ thống trạm sạc xe điện thông minh, góp phần tạo nên một tương lai xanh và
              bền vững cho Việt Nam
            </p>
            <div className='flex flex-wrap justify-center gap-4'>
              <div className='bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30'>
                <span className='font-semibold'>Thành lập 2020</span>
              </div>
              <div className='bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30'>
                <span className='font-semibold'>500+ Trạm sạc</span>
              </div>
              <div className='bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30'>
                <span className='font-semibold'>63/63 Tỉnh thành</span>
              </div>
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

      {/* Mission & Vision */}
      <section className='py-20 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='grid md:grid-cols-2 gap-12'>
            {/* Mission */}
            <div className='bg-gradient-to-br from-sky-50 to-blue-50 p-10 rounded-2xl shadow-lg border border-sky-100'>
              <div className='bg-sky-600 w-16 h-16 rounded-full flex items-center justify-center mb-6'>
                <HeartIcon className='w-8 h-8 text-white' />
              </div>
              <h2 className='text-3xl font-bold text-gray-800 mb-4'>Sứ Mệnh</h2>
              <p className='text-gray-600 text-lg leading-relaxed mb-4'>
                Cung cấp giải pháp sạc xe điện toàn diện, tiện lợi và thân thiện với môi trường, góp phần thúc đẩy việc
                sử dụng phương tiện giao thông xanh tại Việt Nam.
              </p>
              <ul className='space-y-3'>
                <li className='flex items-start gap-3'>
                  <CheckCircleIcon className='w-6 h-6 text-sky-600 flex-shrink-0 mt-1' />
                  <span className='text-gray-700'>Xây dựng hạ tầng sạc điện hiện đại trên toàn quốc</span>
                </li>
                <li className='flex items-start gap-3'>
                  <CheckCircleIcon className='w-6 h-6 text-sky-600 flex-shrink-0 mt-1' />
                  <span className='text-gray-700'>Mang đến trải nghiệm sạc nhanh, an toàn và tiện lợi</span>
                </li>
                <li className='flex items-start gap-3'>
                  <CheckCircleIcon className='w-6 h-6 text-sky-600 flex-shrink-0 mt-1' />
                  <span className='text-gray-700'>Góp phần giảm thiểu ô nhiễm môi trường</span>
                </li>
              </ul>
            </div>

            {/* Vision */}
            <div className='bg-gradient-to-br from-blue-50 to-sky-50 p-10 rounded-2xl shadow-lg border border-blue-100'>
              <div className='bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mb-6'>
                <LightBulbIcon className='w-8 h-8 text-white' />
              </div>
              <h2 className='text-3xl font-bold text-gray-800 mb-4'>Tầm Nhìn</h2>
              <p className='text-gray-600 text-lg leading-relaxed mb-4'>
                Trở thành nền tảng hàng đầu trong lĩnh vực cung cấp dịch vụ sạc xe điện tại Đông Nam Á, với mạng lưới
                trạm sạc thông minh phủ khắp mọi miền.
              </p>
              <ul className='space-y-3'>
                <li className='flex items-start gap-3'>
                  <SparklesIcon className='w-6 h-6 text-blue-600 flex-shrink-0 mt-1' />
                  <span className='text-gray-700'>Dẫn đầu công nghệ sạc thông minh IoT</span>
                </li>
                <li className='flex items-start gap-3'>
                  <SparklesIcon className='w-6 h-6 text-blue-600 flex-shrink-0 mt-1' />
                  <span className='text-gray-700'>Mở rộng ra thị trường khu vực năm 2026</span>
                </li>
                <li className='flex items-start gap-3'>
                  <SparklesIcon className='w-6 h-6 text-blue-600 flex-shrink-0 mt-1' />
                  <span className='text-gray-700'>Hướng tới 100% năng lượng tái tạo</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className='py-20 bg-gradient-to-br from-gray-50 to-sky-50'>
        <div className='container mx-auto px-6'>
          <div className='max-w-4xl mx-auto'>
            <div className='text-center mb-16'>
              <h2 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>Câu Chuyện Của Chúng Tôi</h2>
              <p className='text-xl text-gray-600'>Hành trình xây dựng cơ sở hạ tầng xe điện tại Việt Nam</p>
            </div>

            {progress.map((item) => (
              <div key={item.year} className='space-y-8'>
                <div className='flex gap-6 '>
                  <div className='flex-shrink-0 p-6'>
                    <div className='bg-sky-600 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg'>
                      {item.year}
                    </div>
                  </div>
                  <div className='bg-white p-6 m-4 rounded-xl shadow-md flex-1'>
                    <h3 className='text-xl font-bold text-gray-800 mb-2'>{item.title}</h3>
                    <p className='text-gray-600'>{item.description}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* <div className='space-y-8'>
              <div className='flex gap-6'>
                <div className='flex-shrink-0'>
                  <div className='bg-sky-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg'>
                    2020
                  </div>
                </div>
                <div className='bg-white p-6 rounded-xl shadow-md flex-1'>
                  <h3 className='text-xl font-bold text-gray-800 mb-2'>Khởi Đầu</h3>
                  <p className='text-gray-600'>
                    Thành lập công ty với 10 trạm sạc đầu tiên tại Hà Nội và TP.HCM. Đặt nền móng cho tầm nhìn phát
                    triển xe điện tại Việt Nam.
                  </p>
                </div>
              </div>

              <div className='flex gap-6'>
                <div className='flex-shrink-0'>
                  <div className='bg-sky-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg'>
                    2021
                  </div>
                </div>
                <div className='bg-white p-6 rounded-xl shadow-md flex-1'>
                  <h3 className='text-xl font-bold text-gray-800 mb-2'>Mở Rộng</h3>
                  <p className='text-gray-600'>
                    Phủ sóng 100+ trạm sạc tại 20 tỉnh thành. Ra mắt ứng dụng di động và hệ thống đặt lịch thông minh.
                  </p>
                </div>
              </div>

              <div className='flex gap-6'>
                <div className='flex-shrink-0'>
                  <div className='bg-sky-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg'>
                    2022
                  </div>
                </div>
                <div className='bg-white p-6 rounded-xl shadow-md flex-1'>
                  <h3 className='text-xl font-bold text-gray-800 mb-2'>Đổi Mới</h3>
                  <p className='text-gray-600'>
                    Triển khai công nghệ sạc nhanh DC 150kW. Hợp tác với các đối tác quốc tế hàng đầu như ABB, Siemens.
                  </p>
                </div>
              </div>

              <div className='flex gap-6'>
                <div className='flex-shrink-0'>
                  <div className='bg-sky-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg'>
                    2023
                  </div>
                </div>
                <div className='bg-white p-6 rounded-xl shadow-md flex-1'>
                  <h3 className='text-xl font-bold text-gray-800 mb-2'>Dẫn Đầu</h3>
                  <p className='text-gray-600'>
                    Đạt mốc 300+ trạm sạc, phủ sóng 50 tỉnh thành. Phục vụ hơn 30,000 khách hàng thân thiết.
                  </p>
                </div>
              </div>

              <div className='flex gap-6'>
                <div className='flex-shrink-0'>
                  <div className='bg-gradient-to-br from-sky-600 to-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg'>
                    2024
                  </div>
                </div>
                <div className='bg-gradient-to-br from-sky-50 to-blue-50 p-6 rounded-xl shadow-lg flex-1 border-2 border-sky-200'>
                  <h3 className='text-xl font-bold text-gray-800 mb-2'>Hiện Tại</h3>
                  <p className='text-gray-600'>
                    Vươn tới 500+ trạm sạc, phủ sóng toàn bộ 63 tỉnh thành. Hơn 50,000 người dùng tin tưởng và sử dụng
                    dịch vụ mỗi ngày.
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Equipment & Technology Section */}
      <section className='py-20 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>Thiết Bị & Công Nghệ</h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Chúng tôi sử dụng thiết bị sạc tiên tiến nhất từ các thương hiệu hàng đầu thế giới
            </p>
          </div>

          {/* Main Equipment Features */}
          <div className='grid md:grid-cols-3 gap-8 mb-16'>
            <div className='bg-gradient-to-br from-sky-50 to-blue-50 p-8 rounded-2xl shadow-lg border border-sky-100 hover:shadow-xl transition-all'>
              <div className='bg-sky-600 w-16 h-16 rounded-full flex items-center justify-center mb-6'>
                <BoltIcon className='w-14 h-14 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-gray-800 mb-4'>Công Suất Cao</h3>
              <p className='text-gray-600 mb-4'>
                Trụ sạc DC với công suất từ 50kW đến 150kW, sạc đầy 80% pin chỉ trong 30-45 phút.
              </p>
              <div className='space-y-2'>
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-gray-600'>DC Fast Charging:</span>
                  <span className='font-bold text-sky-600'>50-150 kW</span>
                </div>
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-gray-600'>AC Standard:</span>
                  <span className='font-bold text-sky-600'>7-22 kW</span>
                </div>
              </div>
            </div>

            <div className='bg-gradient-to-br from-blue-50 to-sky-50 p-8 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-all'>
              <div className='bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mb-6'>
                <CpuChipIcon className='w-14 h-14 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-gray-800 mb-4'>IoT Thông Minh</h3>
              <p className='text-gray-600 mb-4'>
                Tích hợp công nghệ IoT, theo dõi và quản lý từ xa, cập nhật firmware tự động.
              </p>
              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <CheckCircleIcon className='w-5 h-5 text-blue-600' />
                  <span className='text-sm text-gray-600'>Giám sát thời gian thực</span>
                </div>
                <div className='flex items-center gap-2'>
                  <CheckCircleIcon className='w-5 h-5 text-blue-600' />
                  <span className='text-sm text-gray-600'>Báo cáo chi tiết</span>
                </div>
              </div>
            </div>

            <div className='bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl shadow-lg border border-green-100 hover:shadow-xl transition-all'>
              <div className='bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mb-6'>
                <ShieldCheckIcon className='w-14 h-14 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-gray-800 mb-4'>An Toàn Tuyệt Đối</h3>
              <p className='text-gray-600 mb-4'>
                Hệ thống bảo vệ đa lớp: chống quá tải, rò rỉ điện, quá nhiệt và chống sét.
              </p>
              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <CheckCircleIcon className='w-5 h-5 text-green-600' />
                  <span className='text-sm text-gray-600'>Chứng nhận CE & ISO</span>
                </div>
                <div className='flex items-center gap-2'>
                  <CheckCircleIcon className='w-5 h-5 text-green-600' />
                  <span className='text-sm text-gray-600'>Chuẩn quốc tế IEC 61851</span>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className='bg-gradient-to-br from-sky-600 to-blue-600 text-white p-10 rounded-2xl shadow-xl'>
            <h3 className='text-3xl font-bold mb-8 text-center'>Thông Số Kỹ Thuật Chi Tiết</h3>
            <div className='grid md:grid-cols-4 gap-6'>
              <div className='text-center bg-white/10 backdrop-blur-sm p-6 rounded-xl'>
                <div className='text-4xl font-bold mb-2'>150kW</div>
                <div className='text-sky-100 text-sm mb-1'>Công suất tối đa</div>
                <div className='text-xs text-sky-200'>CCS2 & CHAdeMO</div>
              </div>
              <div className='text-center bg-white/10 backdrop-blur-sm p-6 rounded-xl'>
                <div className='text-4xl font-bold mb-2'>IP54</div>
                <div className='text-sky-100 text-sm mb-1'>Chống bụi & nước</div>
                <div className='text-xs text-sky-200'>Mọi thời tiết</div>
              </div>
              <div className='text-center bg-white/10 backdrop-blur-sm p-6 rounded-xl'>
                <div className='text-4xl font-bold mb-2'>4.3"</div>
                <div className='text-sky-100 text-sm mb-1'>Màn hình cảm ứng</div>
                <div className='text-xs text-sky-200'>Giao diện HD</div>
              </div>
              <div className='text-center bg-white/10 backdrop-blur-sm p-6 rounded-xl'>
                <div className='text-4xl font-bold mb-2'>OCPP</div>
                <div className='text-sky-100 text-sm mb-1'>Giao thức chuẩn</div>
                <div className='text-xs text-sky-200'>Version 1.6 & 2.0</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Charging Station Types */}
      <section className='py-20 bg-gradient-to-br from-gray-50 to-sky-50'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>Các Loại Trạm Sạc</h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Đa dạng loại hình trạm sạc phù hợp với mọi nhu cầu
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-8'>
            {/* DC Fast Charging */}
            <div className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all'>
              <div className='flex items-start gap-6 mb-6'>
                <div className='bg-gradient-to-br from-sky-600 to-blue-600 text-white w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0'>
                  <BoltIcon className='w-8 h-8' />
                </div>
                <div>
                  <h3 className='text-2xl font-bold text-gray-800 mb-2'>Trụ Sạc DC Siêu Nhanh</h3>
                  <p className='text-sky-600 font-semibold'>50kW - 150kW</p>
                </div>
              </div>

              <div className='space-y-4'>
                <p className='text-gray-600'>
                  Dành cho các trạm sạc công cộng, trung tâm thương mại, trạm dừng cao tốc. Thích hợp cho người dùng cần
                  sạc nhanh trong thời gian ngắn.
                </p>

                <div className='grid grid-cols-2 gap-4'>
                  <div className='bg-sky-50 p-4 rounded-lg'>
                    <div className='text-2xl font-bold text-sky-600 mb-1'>30-45'</div>
                    <div className='text-sm text-gray-600'>Thời gian sạc 80%</div>
                  </div>
                  <div className='bg-sky-50 p-4 rounded-lg'>
                    <div className='text-2xl font-bold text-sky-600 mb-1'>200km</div>
                    <div className='text-sm text-gray-600'>Quãng đường/30 phút</div>
                  </div>
                </div>

                <div className='space-y-2 pt-4'>
                  <h4 className='font-bold text-gray-800'>Tính năng nổi bật:</h4>
                  <ul className='space-y-2'>
                    <li className='flex items-start gap-2'>
                      <CheckCircleIcon className='w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5' />
                      <span className='text-sm text-gray-600'>Tương thích CCS2, CHAdeMO</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <CheckCircleIcon className='w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5' />
                      <span className='text-sm text-gray-600'>Màn hình cảm ứng 7 inch</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <CheckCircleIcon className='w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5' />
                      <span className='text-sm text-gray-600'>Thanh toán QR, thẻ RFID</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <CheckCircleIcon className='w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5' />
                      <span className='text-sm text-gray-600'>Hệ thống làm mát tự động</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* AC Standard Charging */}
            <div className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all'>
              <div className='flex items-start gap-6 mb-6'>
                <div className='bg-gradient-to-br from-blue-600 to-sky-600 text-white w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0'>
                  <ClockIcon className='w-8 h-8' />
                </div>
                <div>
                  <h3 className='text-2xl font-bold text-gray-800 mb-2'>Trụ Sạc AC Tiêu Chuẩn</h3>
                  <p className='text-blue-600 font-semibold'>7kW - 22kW</p>
                </div>
              </div>

              <div className='space-y-4'>
                <p className='text-gray-600'>
                  Phù hợp cho văn phòng, chung cư, nhà riêng, bãi đỗ xe. Sạc trong thời gian dài với chi phí tiết kiệm
                  và bảo vệ pin tối ưu.
                </p>

                <div className='grid grid-cols-2 gap-4'>
                  <div className='bg-blue-50 p-4 rounded-lg'>
                    <div className='text-2xl font-bold text-blue-600 mb-1'>4-8h</div>
                    <div className='text-sm text-gray-600'>Thời gian sạc đầy</div>
                  </div>
                  <div className='bg-blue-50 p-4 rounded-lg'>
                    <div className='text-2xl font-bold text-blue-600 mb-1'>40km</div>
                    <div className='text-sm text-gray-600'>Quãng đường/1 giờ</div>
                  </div>
                </div>

                <div className='space-y-2 pt-4'>
                  <h4 className='font-bold text-gray-800'>Tính năng nổi bật:</h4>
                  <ul className='space-y-2'>
                    <li className='flex items-start gap-2'>
                      <CheckCircleIcon className='w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5' />
                      <span className='text-sm text-gray-600'>Cổng Type 2 tiêu chuẩn EU</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <CheckCircleIcon className='w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5' />
                      <span className='text-sm text-gray-600'>Kết nối WiFi/4G</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <CheckCircleIcon className='w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5' />
                      <span className='text-sm text-gray-600'>Điều khiển qua app</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <CheckCircleIcon className='w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5' />
                      <span className='text-sm text-gray-600'>Tiết kiệm điện năng</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality & Partners */}
      <section className='py-20 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>Đối Tác & Chất Lượng</h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>Hợp tác với các thương hiệu hàng đầu thế giới</p>
          </div>

          {/* Partners */}
          <div className='bg-gradient-to-br from-sky-50 to-blue-50 p-12 rounded-2xl mb-12'>
            <h3 className='text-2xl font-bold text-gray-800 mb-8 text-center'>Nhà Cung Cấp Thiết Bị</h3>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
              {[
                { name: 'ABB', country: 'Switzerland', desc: 'Trụ sạc DC cao cấp' },
                { name: 'Schneider', country: 'France', desc: 'Giải pháp năng lượng' },
                { name: 'Siemens', country: 'Germany', desc: 'Công nghệ tự động hóa' },
                { name: 'Tesla', country: 'USA', desc: 'Connector & Cable' }
              ].map((partner, idx) => (
                <div key={idx} className='bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all'>
                  <div className='text-center'>
                    <div className='text-2xl font-bold text-gray-700 mb-2'>{partner.name}</div>
                    <div className='text-sm text-gray-500 mb-2'>{partner.country}</div>
                    <div className='text-xs text-sky-600'>{partner.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className='bg-gradient-to-br from-sky-600 to-blue-600 text-white p-10 rounded-2xl'>
            <h3 className='text-2xl font-bold mb-6 text-center'>Chứng Nhận & Tiêu Chuẩn Quốc Tế</h3>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              {[
                { cert: 'ISO 9001:2015', desc: 'Quản lý chất lượng' },
                { cert: 'CE Certified', desc: 'Chuẩn châu Âu' },
                { cert: 'IEC 61851', desc: 'Tiêu chuẩn sạc EV' },
                { cert: 'OCPP 1.6/2.0', desc: 'Giao thức kết nối' }
              ].map((item, idx) => (
                <div key={idx} className='bg-white/10 backdrop-blur-sm p-4 rounded-xl text-center'>
                  <div className='font-bold text-lg mb-1'>{item.cert}</div>
                  <div className='text-sm text-sky-100'>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className='py-20 bg-gradient-to-br from-gray-50 to-sky-50'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>Tại Sao Chọn Chúng Tôi?</h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Cam kết mang đến trải nghiệm tốt nhất cho khách hàng
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            <div className='bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all'>
              <div className='bg-sky-100 w-14 h-14 rounded-full flex items-center justify-center mb-4'>
                <GlobeAltIcon className='w-7 h-7 text-sky-600' />
              </div>
              <h3 className='text-xl font-bold text-gray-800 mb-3'>Phủ Sóng Toàn Quốc</h3>
              <p className='text-gray-600'>
                Hệ thống 500+ trạm sạc phủ khắp 63 tỉnh thành, sẵn sàng phục vụ 24/7 mọi lúc mọi nơi.
              </p>
            </div>

            <div className='bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all'>
              <div className='bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4'>
                <BoltIcon className='w-7 h-7 text-blue-600' />
              </div>
              <h3 className='text-xl font-bold text-gray-800 mb-3'>Công Nghệ Hàng Đầu</h3>
              <p className='text-gray-600'>
                Thiết bị từ các thương hiệu uy tín thế giới, công nghệ sạc nhanh DC lên đến 150kW.
              </p>
            </div>

            <div className='bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all'>
              <div className='bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-4'>
                <ShieldCheckIcon className='w-7 h-7 text-green-600' />
              </div>
              <h3 className='text-xl font-bold text-gray-800 mb-3'>An Toàn Tuyệt Đối</h3>
              <p className='text-gray-600'>
                Hệ thống bảo vệ đa lớp, chứng nhận quốc tế, đảm bảo an toàn cho xe và người dùng.
              </p>
            </div>

            <div className='bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all'>
              <div className='bg-purple-100 w-14 h-14 rounded-full flex items-center justify-center mb-4'>
                <UserGroupIcon className='w-7 h-7 text-purple-600' />
              </div>
              <h3 className='text-xl font-bold text-gray-800 mb-3'>Hỗ Trợ Tận Tâm</h3>
              <p className='text-gray-600'>
                Đội ngũ chăm sóc khách hàng chuyên nghiệp, sẵn sàng hỗ trợ 24/7 qua hotline và app.
              </p>
            </div>

            <div className='bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all'>
              <div className='bg-yellow-100 w-14 h-14 rounded-full flex items-center justify-center mb-4'>
                <ChartBarIcon className='w-7 h-7 text-yellow-600' />
              </div>
              <h3 className='text-xl font-bold text-gray-800 mb-3'>Giá Cả Cạnh Tranh</h3>
              <p className='text-gray-600'>
                Mức giá hợp lý chỉ từ 2,500đ/kWh, chương trình khuyến mãi và ưu đãi thường xuyên.
              </p>
            </div>

            <div className='bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all'>
              <div className='bg-teal-100 w-14 h-14 rounded-full flex items-center justify-center mb-4'>
                <CloudIcon className='w-7 h-7 text-teal-600' />
              </div>
              <h3 className='text-xl font-bold text-gray-800 mb-3'>Thân Thiện Môi Trường</h3>
              <p className='text-gray-600'>
                Sử dụng năng lượng sạch, giảm phát thải CO2, góp phần bảo vệ môi trường xanh.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='py-20 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='bg-gradient-to-br from-sky-600 to-blue-600 text-white p-12 rounded-2xl shadow-xl'>
            <h3 className='text-3xl font-bold mb-12 text-center'>Thành Tựu Đáng Tự Hào</h3>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
              <div className='text-center'>
                <div className='text-5xl font-bold mb-2'>500+</div>
                <div className='text-sky-100 text-lg'>Trạm sạc</div>
              </div>
              <div className='text-center'>
                <div className='text-5xl font-bold mb-2'>50K+</div>
                <div className='text-sky-100 text-lg'>Người dùng</div>
              </div>
              <div className='text-center'>
                <div className='text-5xl font-bold mb-2'>1.2M+</div>
                <div className='text-sky-100 text-lg'>Lượt sạc</div>
              </div>
              <div className='text-center'>
                <div className='text-5xl font-bold mb-2'>99.9%</div>
                <div className='text-sky-100 text-lg'>Độ ổn định</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className='py-20 bg-gradient-to-br from-sky-600 via-blue-600 to-sky-700 text-white'>
        <div className='container mx-auto px-6 text-center'>
          <h2 className='text-4xl md:text-5xl font-bold mb-6'>Sẵn Sàng Bắt Đầu Hành Trình Xanh?</h2>
          <p className='text-xl md:text-2xl mb-8 text-sky-50 max-w-2xl mx-auto'>
            Tham gia cùng hàng ngàn người dùng đã tin tưởng chọn dịch vụ của chúng tôi
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button className='bg-white text-sky-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-sky-50 transition-all duration-300 shadow-lg'>
              Tìm Trạm Sạc Gần Nhất
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

export default About

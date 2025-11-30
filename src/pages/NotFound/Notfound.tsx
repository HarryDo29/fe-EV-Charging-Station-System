import { Link } from 'react-router-dom'
import { Home, LocationOn, ArrowBack } from '@mui/icons-material'

const NotFound = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 flex items-center justify-center px-6'>
      <div className='max-w-4xl w-full text-center'>
        {/* 404 Number with gradient */}
        <div className='mb-8'>
          <h1 className='text-[150px] md:text-[200px] font-bold bg-gradient-to-br from-sky-600 via-blue-600 to-sky-700 bg-clip-text text-transparent leading-none'>
            404
          </h1>
        </div>

        {/* Main Message */}
        <div className='mb-8 space-y-4'>
          <h2 className='text-3xl md:text-5xl font-bold text-gray-800'>Oops! Trang Không Tồn Tại</h2>
          <p className='text-lg md:text-xl text-gray-600 max-w-2xl mx-auto'>
            Trang bạn đang tìm kiếm có thể đã bị xóa, thay đổi tên hoặc tạm thời không khả dụng.
          </p>
        </div>

        {/* Illustration - Electric Car Icon */}
        <div className='mb-12 flex justify-center'>
          <div className='relative'>
            {/* Circular background */}
            <div className='absolute inset-0 bg-gradient-to-br from-sky-600 to-blue-600 rounded-full blur-3xl opacity-20 animate-pulse'></div>

            {/* Icon Container */}
            <div className='relative bg-white p-12 rounded-full shadow-2xl border-4 border-sky-100'>
              <svg
                className='w-32 h-32 text-sky-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7'
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center mb-12'>
          <Link to='/'>
            <button className='group bg-gradient-to-r from-sky-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-sky-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2'>
              <Home className='w-6 h-6' />
              Về Trang Chủ
            </button>
          </Link>

          <Link to='/map'>
            <button className='group border-2 border-sky-600 text-sky-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-sky-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2'>
              <LocationOn className='w-6 h-6' />
              Tìm Trạm Sạc
            </button>
          </Link>
        </div>

        {/* Quick Links */}
        <div className='bg-white rounded-2xl shadow-xl p-8 border border-sky-100'>
          <h3 className='text-xl font-bold text-gray-800 mb-6'>Hoặc khám phá các trang phổ biến:</h3>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            <Link
              to='/'
              className='group p-4 rounded-lg bg-gradient-to-br from-sky-50 to-blue-50 hover:from-sky-100 hover:to-blue-100 transition-all duration-300 hover:shadow-md'
            >
              <Home className='w-8 h-8 text-sky-600 mx-auto mb-2 group-hover:scale-110 transition-transform' />
              <p className='text-sm font-semibold text-gray-700'>Trang Chủ</p>
            </Link>

            <Link
              to='/map'
              className='group p-4 rounded-lg bg-gradient-to-br from-sky-50 to-blue-50 hover:from-sky-100 hover:to-blue-100 transition-all duration-300 hover:shadow-md'
            >
              <LocationOn className='w-8 h-8 text-sky-600 mx-auto mb-2 group-hover:scale-110 transition-transform' />
              <p className='text-sm font-semibold text-gray-700'>Đặt Lịch</p>
            </Link>

            <Link
              to='/about'
              className='group p-4 rounded-lg bg-gradient-to-br from-sky-50 to-blue-50 hover:from-sky-100 hover:to-blue-100 transition-all duration-300 hover:shadow-md'
            >
              <svg
                className='w-8 h-8 text-sky-600 mx-auto mb-2 group-hover:scale-110 transition-transform'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              <p className='text-sm font-semibold text-gray-700'>Về Chúng Tôi</p>
            </Link>

            <Link
              to='/contact'
              className='group p-4 rounded-lg bg-gradient-to-br from-sky-50 to-blue-50 hover:from-sky-100 hover:to-blue-100 transition-all duration-300 hover:shadow-md'
            >
              <svg
                className='w-8 h-8 text-sky-600 mx-auto mb-2 group-hover:scale-110 transition-transform'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                />
              </svg>
              <p className='text-sm font-semibold text-gray-700'>Liên Hệ</p>
            </Link>
          </div>
        </div>

        {/* Back Button */}
        <div className='mt-8'>
          <button
            onClick={() => window.history.back()}
            className='text-sky-600 hover:text-sky-700 font-semibold flex items-center gap-2 mx-auto group transition-all duration-300'
          >
            <ArrowBack className='w-5 h-5 group-hover:-translate-x-1 transition-transform' />
            Quay lại trang trước
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFound

import { useEffect, useState } from 'react'
import PresentationCard from '../../components/Station/v2/PresentationCard'
import { StationStatus } from '../../constants/stationStatus'
import type { Station } from '../../interface/station.interface'
import {
  FilterList as FilterListIcon,
  Sort as SortIcon,
  EvStation as EvStationIcon,
  RestartAlt as RestartAltIcon
} from '@mui/icons-material'
import { Pagination } from '@mui/material'
import { fetchStations, fetchStationsSorted } from '../../apis/station.api'
import type { Coordinates } from '../../interface/coordinate.interface'

const StationPage = () => {
  const [stations, setStations] = useState<Station[]>([])
  const [filter, setFilter] = useState<StationStatus | 'all'>('all')
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating' | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState<number | null>(null)
  const stationsPerPage = 12
  const [, setIsLoadingLocation] = useState(true)
  const [location, setLocation] = useState<Coordinates | null>(null)
  // Lấy vị trí hiện tại của người dùng
  useEffect(() => {
    // Kiểm tra xem trình duyệt có hỗ trợ định vị không
    if (!navigator.geolocation) {
      console.log('Không hỗ trợ định vị')
      setIsLoadingLocation(false)
      return
    }

    // Lấy vị trí hiện tại của người dùng
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
        setIsLoadingLocation(false)
      },
      (err) => {
        console.log('err', err)
        // Sử dụng vị trí mặc định nếu không lấy được GPS
        setLocation({
          lat: 10.84102,
          lng: 106.80941
        })
        setIsLoadingLocation(false)
      },
      {
        enableHighAccuracy: true, // dùng GPS nếu có
        timeout: 10000, // tối đa 10s
        maximumAge: 0 // luôn lấy mới
      }
    )
  }, [])

  useEffect(() => {
    const fetchStationsData = async () => {
      try {
        if (location) {
          const res = await fetchStationsSorted(location.lat.toString(), location.lng.toString())
          console.log('res fetchStationsSorted', res)
          setStations(res.data)
          setTotalPages(Math.ceil(res.data.length / stationsPerPage))
        } else {
          const res = await fetchStations()
          console.log('res fetchStations', res)
          setStations(res.data)
          setTotalPages(Math.ceil(res.data.length / stationsPerPage))
        }
      } catch (error) {
        console.log('error', error)
      }
    }
    fetchStationsData()
  }, [location])

  const firstStationIndex = (page - 1) * stationsPerPage
  const lastStationIndex = firstStationIndex + stationsPerPage

  // const getStationsNearest = async () => {
  //   try {
  //     const res = await fetchStationsByDistance(
  //       Number(location?.lat.toFixed(4)) || 0,
  //       Number(location?.lng.toFixed(4)) || 0
  //     )
  //     console.log('res get stations nearest', res.data)
  //     setStations(res.data)
  //     setTotalPages(Math.ceil(res.data.length / stationsPerPage))
  //   } catch (error) {
  //     console.log('error', error)
  //   }
  // }

  const filteredStations = stations
    .filter((station: Station) => filter === 'all' || station.status === filter)
    .sort((a: Station, b: Station) => {
      if (!sortBy) return 0
      if (sortBy === 'name') return a.name.localeCompare(b.name, 'vi')
      if (sortBy === 'price') return (a.pricePerKwh || 0) - (b.pricePerKwh || 0)
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0)
      return 0
    })

  const handleResetFilters = () => {
    setFilter('all')
    setSortBy(null)
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50'>
      {/* Header Section */}
      <div className='bg-gradient-to-br from-sky-600 via-sky-500 to-blue-600 text-white pt-14 pb-4 shadow-lg'>
        <div className='container mx-auto px-4'>
          <div className='flex items-center gap-4 mb-4'>
            <div className='bg-white/20 backdrop-blur-sm rounded-xl p-3'>
              <EvStationIcon className='w-10 h-10' />
            </div>
            <div>
              <h1 className='text-4xl font-bold mb-2'>Trạm Sạc Điện</h1>
              <p className='text-blue-100 text-lg'>Tìm kiếm và đặt trạm sạc phù hợp với nhu cầu của bạn</p>
            </div>
          </div>
          <div className='flex items-center gap-2 text-blue-100'>
            <span className='text-sm'>
              Tổng cộng <span className='font-bold text-white'>{filteredStations.length}</span> trạm sạc được tìm thấy
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex flex-col gap-1'>
        {/* Sort Filter */}
        <div className='container mx-auto flex items-center space-y-3 px-4 py-2'>
          <label className='flex items-center text-sm font-semibold text-gray-700 p-1 m-0'>
            <SortIcon className='w-4 h-4 text-2xl text-blue-600' />
            Sắp xếp theo
          </label>

          <div className='flex items-center gap-3'>
            {[
              { value: 'name', label: 'Tên (A-Z)', icon: '🔤' },
              { value: 'price', label: 'Giá thấp nhất', icon: '💰' },
              { value: 'rating', label: 'Đánh giá cao nhất', icon: '⭐' }
            ].map((option) => (
              <label
                key={option.value}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  sortBy === option.value
                    ? 'bg-indigo-50 border-indigo-500 shadow-sm'
                    : 'bg-gray-50 border-transparent hover:bg-gray-100'
                }`}
              >
                <input
                  type='radio'
                  name='sort'
                  value={option.value}
                  checked={sortBy === option.value}
                  onChange={(e) => {
                    setSortBy(e.target.value as 'name' | 'price' | 'rating')
                  }}
                  className='w-4 h-4 text-indigo-600 focus:ring-2 focus:ring-indigo-500'
                />
                <span className='text-lg'>{option.icon}</span>
                <span
                  className={`text-sm font-medium ${sortBy === option.value ? 'text-indigo-900' : 'text-gray-700'}`}
                >
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className='container mx-auto p-4'>
          <div className='flex flex-col lg:flex-row gap-4'>
            {/* Sidebar Filter */}
            <div className='w-full lg:w-80 flex-shrink-0'>
              <div className='bg-white rounded-2xl shadow-xl overflow-hidden sticky top-6 border border-gray-100'>
                {/* Filter Header */}
                <div className='bg-gradient-to-br from-sky-600 via-sky-500 to-blue-600 p-6 text-white'>
                  <div className='flex items-center gap-3 mb-2'>
                    <FilterListIcon className='w-6 h-6' />
                    <h2 className='text-xl font-bold'>Bộ lọc</h2>
                  </div>
                  <p className='text-blue-100 text-sm'>Tùy chỉnh kết quả tìm kiếm</p>
                </div>

                {/* Filter Body */}
                <div className='p-6 space-y-6'>
                  {/* Status Filter */}
                  <div className='space-y-3'>
                    <label className='flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3'>
                      <FilterListIcon className='w-4 h-4 text-blue-600' />
                      Trạng thái
                    </label>
                    <div className='space-y-2'>
                      {[
                        { value: 'all', label: 'Tất cả', color: 'blue' },
                        { value: 'available', label: 'Sẵn sàng', color: 'green' },
                        { value: 'unavailable', label: 'Không khả dụng', color: 'red' },
                        { value: 'maintenance', label: 'Bảo trì', color: 'yellow' }
                      ].map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                            filter === option.value
                              ? 'bg-blue-50 border-2 border-blue-500 shadow-sm'
                              : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                          }`}
                        >
                          <input
                            type='radio'
                            name='status'
                            value={option.value}
                            checked={filter === option.value}
                            onChange={(e) => setFilter(e.target.value as StationStatus | 'all')}
                            className='w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500'
                          />
                          <span
                            className={`text-sm font-medium ${
                              filter === option.value ? 'text-blue-900' : 'text-gray-700'
                            }`}
                          >
                            {option.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Reset Button */}
                  {(filter !== 'all' || sortBy !== null) && (
                    <button
                      onClick={handleResetFilters}
                      className='w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105'
                    >
                      <RestartAltIcon className='w-5 h-5' />
                      Đặt lại bộ lọc
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className='flex-1 min-w-0'>
              {totalPages && totalPages > 0 ? (
                <div className='space-y-6'>
                  {/* Station Cards Grid */}
                  <div className='animate-fadeIn'>
                    <PresentationCard stations={filteredStations.slice(firstStationIndex, lastStationIndex)} />
                  </div>
                </div>
              ) : (
                <div className='bg-white rounded-2xl shadow-xl p-12 text-center'>
                  <div className='max-w-md mx-auto'>
                    <div className='bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6'>
                      <EvStationIcon className='w-12 h-12 text-gray-400' />
                    </div>
                    <h3 className='text-2xl font-bold text-gray-900 mb-3'>Không tìm thấy trạm sạc</h3>
                    <p className='text-gray-600 mb-6'>
                      Không có trạm sạc nào phù hợp với bộ lọc của bạn. Hãy thử điều chỉnh bộ lọc.
                    </p>
                    <button
                      onClick={handleResetFilters}
                      className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200'
                    >
                      Đặt lại bộ lọc
                    </button>
                  </div>
                </div>
              )}
              <Pagination
                page={page}
                onChange={(_, value: number) => setPage(value)}
                count={sortBy !== null ? Math.ceil(filteredStations.length / stationsPerPage) : totalPages || 0}
                variant='outlined'
                color='primary'
                shape='rounded'
                size='medium'
                showFirstButton
                showLastButton
                className='w-full m-4 flex justify-center items-center'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StationPage

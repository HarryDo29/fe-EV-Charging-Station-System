import EVMap from '../../components/Map/Map'
import { useState, useEffect } from 'react'
import type { Coordinates, Station } from '../../types/station'
import { mockStations } from '../../data/mockStations'
import Search from '../../components/Search/Search'
import StationList from '../../components/Station/StationList'

const Map = () => {
  const [location, setLocation] = useState<Coordinates | null>(null)
  const [selectedStationId, setSelectedStationId] = useState<number | null>(null)
  const [query, setQuery] = useState('')
  const [isLoadingLocation, setIsLoadingLocation] = useState(true)
  const [searchStations, setSearchStations] = useState<Station[]>(mockStations)

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

  // // lấy stationId trong khu vực
  // useEffect(() => {

  // }, [location])

  //filter stations
  const filteredStations = (): Station[] => {
    return query == ''
      ? mockStations
      : mockStations.filter((station) => station.name.toLowerCase().includes(query.toLowerCase()))
  }

  // Xử lý khi người dùng chọn trạm sạc
  const handleStationSelect = (stationId: number) => {
    setSelectedStationId(stationId)
  }

  // Hiển thị loading khi đang lấy vị trí của người dùng
  if (isLoadingLocation) {
    return (
      <div className='min-h-[calc(100vh-80px)] flex justify-center items-center bg-gray-50'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4'></div>
          <p className='text-gray-600 text-lg'>Đang lấy vị trí của bạn...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='w-screen h-screen'>
      <EVMap
        location={location}
        stations={searchStations}
        selectedStationId={selectedStationId}
        onStationSelect={handleStationSelect}
      />

      <div
        className={`absolute top-12 left-12 z-[1000] min-w-[400px] max-w-[600px] ${searchStations.length > 0 ? 'h-[calc(100vh-2rem)] max-h-[85vh] bg-white p-0 m-0' : ''} rounded-4xl shadow-lg flex flex-col`}
      >
        <Search
          query={query}
          setQuery={setQuery}
          filteredStations={filteredStations}
          setSelectedStationId={setSelectedStationId}
          setSearchStations={setSearchStations}
        />
        {searchStations.length > 0 && (
          <StationList
            stations={searchStations}
            selectedStationId={selectedStationId}
            onStationSelect={handleStationSelect}
          />
        )}
      </div>

      {/* Chú thích màu sắc của trạm sạc trên map (trạng thái của các trạm sạc) */}
      <div className='absolute bottom-6 right-12 bg-white rounded-lg shadow-lg p-4 z-[1000]'>
        <h3 className='font-semibold text-sm mb-2 text-gray-800'>Chú thích</h3>
        <div className='space-y-2 text-xs'>
          <div className='flex items-center'>
            <div className='w-3 h-3 bg-green-500 rounded-full mr-2'></div>
            <span className='text-gray-700'>Có sẵn</span>
          </div>
          <div className='flex items-center'>
            <div className='w-3 h-3 bg-orange-500 rounded-full mr-2'></div>
            <span className='text-gray-700'>Đang bận</span>
          </div>
          <div className='flex items-center'>
            <div className='w-3 h-3 bg-red-500 rounded-full mr-2'></div>
            <span className='text-gray-700'>Offline</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Map

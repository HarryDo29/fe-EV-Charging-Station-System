import { StationStatus } from '../../../constants/stationStatus'
import type { Station } from '../../../interface/station.interface'
import {
  LocationOn as LocationOnIcon,
  Power as PowerIcon,
  AttachMoney as AttachMoneyIcon,
  Map as MapIcon
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import MapModal from '../../Modal/MapModal'
import type { Coordinates } from '../../../interface/coordinate.interface'

const StationCard = (station: Station) => {
  const navigate = useNavigate()
  const [showMapModal, setShowMapModal] = useState(false)
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

  const getStatusColor = (status: StationStatus) => {
    const colors = {
      [StationStatus.AVAILABLE]: 'bg-green-100 text-green-800',
      [StationStatus.UNAVAILABLE]: 'bg-red-100 text-red-800',
      [StationStatus.MAINTENANCE]: 'bg-gray-100 text-gray-800'
    }
    return colors[status]
  }

  const getStatusText = (status: StationStatus) => {
    const texts = {
      [StationStatus.AVAILABLE]: 'Active',
      [StationStatus.UNAVAILABLE]: 'Offline',
      [StationStatus.MAINTENANCE]: 'Maintenance'
    }
    return texts[status]
  }

  return (
    <div
      key={station.id}
      className='bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1'
    >
      {/* Card Header */}
      <div className='bg-gradient-to-br from-sky-600 via-sky-500 to-blue-600 p-4 h-20 text-white'>
        <div className='flex justify-between items-start mb-2'>
          <h3 className='font-bold text-lg'>{station.name}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(station.status)}`}>
            {getStatusText(station.status)}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className='p-4'>
        <div className='flex items-start mb-2'>
          <LocationOnIcon className='w-4 h-4 text-gray-400 mt-1 mr-2 flex-shrink-0' />
          <p className='htext-sm text-gray-600'>{station.address}</p>
        </div>

        {/* Connectors */}
        <div className='flex flex-wrap gap-2 mb-3'>
          {station.connectorTypes.map((type) => (
            <span key={type} className='px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-medium'>
              {type}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className='grid grid-cols-2 gap-3 mb-3'>
          <div className='flex items-center'>
            <PowerIcon className='w-4 h-4 text-yellow-500 mr-2' />
            <span className='text-sm font-semibold text-gray-700'>{station.powerKw} kW</span>
          </div>
          <div className='flex items-center'>
            <AttachMoneyIcon className='w-4 h-4 text-green-500 mr-2' />
            <span className='text-sm font-semibold text-gray-700'>
              {station.pricePerKwh ? station.pricePerKwh.toLocaleString('vi-VN') + ' đ' : 'Không có giá'}
            </span>
          </div>
        </div>

        {/* Availability */}
        <div className='bg-gray-50 rounded-lg p-3 mb-1'>
          <div className='flex justify-between items-center mb-1'>
            <span className='text-sm text-gray-600'>Điểm sạc khả dụng</span>
            <span className='font-bold text-gray-900'>
              {station.totalChargePoints > 0
                ? station.availableChargePoints + '/' + station.totalChargePoints
                : 'Không có'}
            </span>
          </div>
          <div className='w-full bg-gray-200 rounded-full h-2'>
            {station.totalChargePoints > 0 && (
              <div
                className='bg-blue-600 h-2 rounded-full transition-all duration-300'
                style={{ width: `${(station.availableChargePoints / station.totalChargePoints) * 100}%` }}
              />
            )}
          </div>
        </div>

        {/* map view */}
        <div>
          <p className='text-sm text-gray-600 cursor-pointer hover:text-blue-600' onClick={() => setShowMapModal(true)}>
            <u>
              <MapIcon className='w-4 h-4 text-gray-400 mt-1 mr-2 flex-shrink-0' />
              <span>View on map</span>
            </u>
          </p>
        </div>

        {showMapModal && (
          <MapModal
            location={location}
            station={station}
            showMapModal={showMapModal}
            onClose={() => setShowMapModal(false)}
          />
        )}
      </div>

      {/* Card Footer */}
      <div className='border-t border-gray-100 p-4'>
        <button
          className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed'
          disabled={station.status === StationStatus.UNAVAILABLE || station.status === StationStatus.MAINTENANCE}
          onClick={() => navigate(`/booking/${station.id}`)}
        >
          Đặt lịch sạc
        </button>
      </div>
    </div>
  )
}

export default StationCard

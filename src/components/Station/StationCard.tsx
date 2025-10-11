import type { Station } from '../../types/station'

interface StationCardProps {
  station: Station
  isSelected: boolean
  onClick: () => void
}

const StationCard = ({ station, isSelected, onClick }: StationCardProps) => {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800'
      case 'busy':
        return 'bg-yellow-100 text-yellow-800'
      case 'offline':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status?: string) => {
    switch (status) {
      case 'available':
        return 'Có sẵn'
      case 'busy':
        return 'Đang bận'
      case 'offline':
        return 'Offline'
      default:
        return 'Không rõ'
    }
  }

  return (
    <div
      onClick={onClick}
      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
      }`}
    >
      <div className='flex justify-between items-start mb-2'>
        <h3 className='font-semibold text-gray-800 text-lg'>{station.name}</h3>
        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(station.status)}`}>
          {getStatusText(station.status)}
        </span>
      </div>

      <p className='text-sm text-gray-600 mb-3 flex items-start'>
        <svg className='h-4 w-4 mr-1 mt-0.5 flex-shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
          />
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
        </svg>
        {station.address}
      </p>

      <div className='flex items-center justify-between text-sm'>
        <div className='flex items-center text-gray-600'>
          <svg className='h-4 w-4 mr-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
          </svg>
          <span>
            {station.availableChargers || 0}/{station.totalChargers || 0} sẵn sàng
          </span>
        </div>

        {station.distance && (
          <div className='flex items-center text-gray-600'>
            <svg className='h-4 w-4 mr-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7'
              />
            </svg>
            <span>{station.distance.toFixed(1)} km</span>
          </div>
        )}
      </div>

      {station.price && (
        <div className='mt-2 pt-2 border-t border-gray-200'>
          <p className='text-sm text-gray-600'>
            Giá: <span className='font-semibold text-blue-600'>{station.price.toLocaleString()} đ/kWh</span>
          </p>
        </div>
      )}

      {station.rating && (
        <div className='mt-2 flex items-center'>
          <div className='flex items-center'>
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`h-4 w-4 ${i < Math.floor(station.rating!) ? 'text-yellow-400' : 'text-gray-300'}`}
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
              </svg>
            ))}
            <span className='ml-1 text-sm text-gray-600'>({station.rating.toFixed(1)})</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default StationCard

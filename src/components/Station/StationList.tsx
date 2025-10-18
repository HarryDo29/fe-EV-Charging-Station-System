import type { Station } from '../../interface/station.interface'
import StationCard from './StationCard'
import { useNavigate } from 'react-router-dom'

interface StationListProps {
  stations: Station[]
  selectedStationId: number | null
  onStationSelect: (stationId: number) => void
}

const StationList = ({ stations, selectedStationId, onStationSelect }: StationListProps) => {
  const navigate = useNavigate()
  return (
    <div
      className={`flex-1 overflow-y-auto p-4 bg-gray-50 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 min-h-0 rounded-b-4xl`}
    >
      <div className='flex justify-between items-center mb-4'>
        <h3 className='font-semibold text-gray-700'>Tìm thấy {stations.length} trạm sạc</h3>
      </div>

      <div className='space-y-3'>
        {stations.length === 0 ? (
          <div className='text-center py-12'>
            <svg className='mx-auto h-12 w-12 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <p className='mt-2 text-gray-500'>Không tìm thấy trạm sạc nào</p>
          </div>
        ) : (
          stations.map((station) => (
            <div key={station.id}>
              <StationCard
                station={station}
                isSelected={selectedStationId === station.id}
                onClick={() => onStationSelect(station.id)}
              />
              {selectedStationId === station.id && (
                <div className='mt-2 px-4'>
                  <button
                    disabled={station.status === 'busy' || station.status === 'offline'}
                    onClick={() => navigate(`/booking/${station.id}`)}
                    className='w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed'
                  >
                    Đặt lịch sạc
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default StationList

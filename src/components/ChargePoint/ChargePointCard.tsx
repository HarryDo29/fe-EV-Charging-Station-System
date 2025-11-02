import { StationStatus } from '../../constants/stationStatus'
import type { ChargePoint } from '../../interface/chargePoint.interface'
import {
  EvStation as EvStationIcon,
  Power as PowerIcon,
  BoltOutlined as BoltIcon,
  AttachMoney as MoneyIcon
} from '@mui/icons-material'

interface ChargePointCardProps {
  chargePoint: ChargePoint
  selectedChargePoint: ChargePoint | null
  setSelectedChargePoint: (cp: ChargePoint) => void
}

const ChargePointCard = ({ chargePoint, selectedChargePoint, setSelectedChargePoint }: ChargePointCardProps) => {
  const isSelected = selectedChargePoint?.id === chargePoint.id
  const isAvailable = chargePoint.status === StationStatus.AVAILABLE

  const getStatusStyle = () => {
    if (chargePoint.status === StationStatus.AVAILABLE) {
      return 'bg-green-100 text-green-800 border-green-300'
    }
    if (chargePoint.status === StationStatus.UNAVAILABLE) {
      return 'bg-red-100 text-red-800 border-red-300'
    }
    return 'bg-yellow-100 text-yellow-800 border-yellow-300'
  }

  const getStatusText = () => {
    if (chargePoint.status === StationStatus.AVAILABLE) return 'Khả dụng'
    if (chargePoint.status === StationStatus.UNAVAILABLE) return 'Không khả dụng'
    return 'Bảo trì'
  }

  return (
    <div
      key={chargePoint.id}
      onClick={() => isAvailable && setSelectedChargePoint(chargePoint)}
      className={`
        bg-white rounded-lg border-2 p-4 transition-all duration-200
        ${isSelected ? 'border-blue-500 shadow-md' : 'border-gray-200'}
        ${isAvailable ? 'cursor-pointer hover:border-blue-300 hover:shadow-sm' : 'cursor-not-allowed opacity-60'}
      `}
    >
      {/* Header */}
      <div className='flex justify-between items-center mb-3'>
        <div className='flex items-center gap-2'>
          <EvStationIcon className={`w-5 h-5 ${isSelected ? 'text-blue-600' : 'text-gray-600'}`} />
          <h3 className='font-bold text-gray-900'>{chargePoint.identifer}</h3>
        </div>
        {/* Status */}
        <div className='mb-3'>
          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getStatusStyle()}`}>
            <span
              className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                chargePoint.status === StationStatus.AVAILABLE
                  ? 'bg-green-600'
                  : chargePoint.status === StationStatus.UNAVAILABLE
                    ? 'bg-red-600'
                    : 'bg-yellow-600'
              }`}
            />
            {getStatusText()}
          </span>
        </div>

        {/* {isSelected && <CheckIcon className='w-5 h-5 text-blue-600' />} */}
      </div>

      {/* Info Grid */}
      <div className='grid grid-cols-3 gap-2 text-center'>
        <div className='bg-gray-50 rounded p-2'>
          <PowerIcon className='w-4 h-4 text-blue-600 mx-auto mb-1' />
          <p className='text-xs font-semibold text-gray-900'>{chargePoint.connector_type}</p>
        </div>

        <div className='bg-gray-50 rounded p-2'>
          <BoltIcon className='w-4 h-4 text-yellow-600 mx-auto mb-1' />
          <p className='text-xs font-semibold text-gray-900'>{chargePoint.maxPowerKw} kW</p>
        </div>

        <div className='bg-gray-50 rounded p-2'>
          <MoneyIcon className='w-4 h-4 text-green-600 mx-auto mb-1' />
          <p className='text-xs font-semibold text-green-700'>{chargePoint.pricePerKwh.toLocaleString('vi-VN')} đ</p>
        </div>
      </div>
    </div>
  )
}

export default ChargePointCard

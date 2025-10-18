import type { ChargePoint } from '../../interface/chargePoint.interface'

interface ChargePointCardProps {
  chargePoint: ChargePoint
  selectedChargePoint: ChargePoint | null
  setSelectedChargePoint: (cp: ChargePoint) => void
}

const ChargePointCard = ({ chargePoint, selectedChargePoint, setSelectedChargePoint }: ChargePointCardProps) => {
  return (
    <div
      key={chargePoint.id}
      onClick={() => chargePoint.status === 'available' && setSelectedChargePoint(chargePoint)}
      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
        selectedChargePoint?.id === chargePoint.id
          ? 'border-blue-500 bg-blue-50'
          : chargePoint.status === 'available'
            ? 'border-gray-200 hover:border-blue-300'
            : 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-60'
      }`}
    >
      <div className='flex justify-between items-start mb-2'>
        <h3 className='font-semibold text-gray-900'>{chargePoint.name}</h3>
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            chargePoint.status === 'available'
              ? 'bg-green-100 text-green-800'
              : chargePoint.status === 'occupied'
                ? 'bg-red-100 text-red-800'
                : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {chargePoint.status === 'available'
            ? 'Khả dụng'
            : chargePoint.status === 'occupied'
              ? 'Đang sử dụng'
              : 'Bảo trì'}
        </span>
      </div>
      <div className='space-y-1 text-sm text-gray-600'>
        <p>
          Loại: <span className='font-medium'>{chargePoint.type}</span>
        </p>
        <p>
          Công suất: <span className='font-medium'>{chargePoint.power} kW</span>
        </p>
        <p>
          Cổng: <span className='font-medium'>{chargePoint.connectorType}</span>
        </p>
        <p className='text-blue-600 font-semibold'>{chargePoint.price.toLocaleString()} VND/kWh</p>
      </div>
    </div>
  )
}

export default ChargePointCard

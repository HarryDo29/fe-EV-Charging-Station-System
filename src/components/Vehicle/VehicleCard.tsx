import type { Vehicle } from '../../interface/vehicle.interface'

interface VehicleProps {
  vehicle: Vehicle
  selectedVehicle: Vehicle | null
}

const VehicleCard = ({ vehicle, selectedVehicle }: VehicleProps) => {
  return (
    <div className='flex justify-between items-center'>
      <div>
        <h3 className='font-semibold text-gray-900'>{vehicle.name}</h3>
        <p className='text-sm text-gray-600'>
          {vehicle.brand} {vehicle.model} ({vehicle.year})
        </p>
        <div className='flex gap-4 mt-2 text-sm text-gray-600'>
          <span>🔋 {vehicle.batteryCapacity} kWh</span>
          <span>🔌 {vehicle.connectorType}</span>
        </div>
      </div>
      {selectedVehicle?.id === vehicle.id && (
        <svg className='w-6 h-6 text-blue-500' fill='currentColor' viewBox='0 0 20 20'>
          <path
            fillRule='evenodd'
            d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
            clipRule='evenodd'
          />
        </svg>
      )}
    </div>
  )
}

export default VehicleCard

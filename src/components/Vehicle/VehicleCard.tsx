import type { Vehicle } from '../../interface/vehicle.interface'
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull'
import PowerIcon from '@mui/icons-material/Power'
import BoltIcon from '@mui/icons-material/Bolt'

interface VehicleProps {
  vehicle: Vehicle
  selectedVehicle: Vehicle | null
}

const VehicleCard = ({ vehicle, selectedVehicle }: VehicleProps) => {
  return (
    <div className='flex justify-between items-center'>
      <div>
        <div className='flex items-center'>
          <h3 className='text-xl font-bold text-gray-900 p-2'>
            {vehicle.car_maker} {vehicle.model}
          </h3>

          {/* License plate */}
          <div className='inline-block px-3 py-1 bg-gray-800 text-white rounded-lg font-mono text-sm p-2'>
            {vehicle.license_plate}
          </div>
        </div>

        {/* specs */}
        <div className='grid grid-cols-3 gap-2'>
          <div className='flex items-center gap-2 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-2'>
            <BatteryChargingFullIcon className='w-4 h-4 text-green-600 flex-shrink-0' />
            <div>
              <p className='text-xs text-gray-600'>Pin</p>
              <p className='text-sm font-bold text-gray-900'>{vehicle.battery_capacity_kwh} kWh</p>
            </div>
          </div>

          <div className='flex items-center gap-2 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-2'>
            <PowerIcon className='w-4 h-4 text-blue-600 flex-shrink-0' />
            <div>
              <p className='text-xs text-gray-600'>Cổng</p>
              <p className='text-sm font-bold text-gray-900'>{vehicle.connector_type}</p>
            </div>
          </div>

          <div className='flex items-center gap-2 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-2'>
            <BoltIcon className='w-4 h-4 text-purple-600 flex-shrink-0' />
            <div>
              <p className='text-xs text-gray-600'>Công suất</p>
              <p className='text-sm font-bold text-gray-900'>{vehicle.charging_power_kw} kW</p>
            </div>
          </div>
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

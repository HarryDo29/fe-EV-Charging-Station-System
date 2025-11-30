import type { AddVehicle, Vehicle } from '../../interface/vehicle.interface'
import { ConnectorType } from '../../constants/connectorType'
import { Close, LocalShipping, CalendarToday, Bolt, Stars, Power as PowerIcon } from '@mui/icons-material'
import { addVehicle } from '../../apis/vehicle.api'

interface AddVehicleModalProps {
  vehicles: Vehicle[]
  newVehicle: AddVehicle
  setVehicles: (vehicles: Vehicle[]) => void
  setNewVehicle: (vehicle: AddVehicle) => void
  setShowAddVehicleModal: (show: boolean) => void
}

const AddVehicleModal = ({
  vehicles,
  newVehicle,
  setNewVehicle,
  setVehicles,
  setShowAddVehicleModal
}: AddVehicleModalProps) => {
  const handleAddVehicle = async () => {
    if (newVehicle.car_maker && newVehicle.license_plate && newVehicle.models && newVehicle.battery_capacity_kwh > 0) {
      const vehicle: AddVehicle = {
        car_maker: newVehicle.car_maker,
        license_plate: newVehicle.license_plate,
        models: newVehicle.models,
        battery_capacity_kwh: newVehicle.battery_capacity_kwh,
        connector_type: newVehicle.connector_type,
        charging_power_kw: newVehicle.charging_power_kw,
        status: true
      } as AddVehicle
      try {
        const response = await addVehicle(vehicle)
        if (response.statusCode === 200) {
          setVehicles([...vehicles, response.data])
        }
        console.log('vehicles', vehicles)
      } catch (error) {
        console.log('addVehicle error', error)
      }
      setShowAddVehicleModal(false)
      setNewVehicle({
        car_maker: '',
        license_plate: '',
        models: '',
        battery_capacity_kwh: 0,
        connector_type: null,
        charging_power_kw: 0,
        status: true
      } as AddVehicle)
    } else {
      alert('Vui lòng điền đầy đủ thông tin xe')
    }
  }

  return (
    <div
      className='fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm'
      onClick={() => setShowAddVehicleModal(false)}
    >
      <div
        className='bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden transform transition-all animate-slideUp'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Gradient */}
        <div className='bg-gradient-to-r from-sky-600 via-blue-600 to-sky-700 px-6 py-6 relative'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='bg-white bg-opacity-20 p-2 rounded-lg backdrop-blur-sm'>
                <LocalShipping className='w-6 h-6 text-white' />
              </div>
              <div>
                <h2 className='text-2xl font-bold text-white'>Thêm Xe Mới</h2>
                <p className='text-sky-100 text-sm'>Thêm thông tin xe điện của bạn</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddVehicleModal(false)}
              className='text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-all duration-300'
            >
              <Close className='w-6 h-6' />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className='p-6 max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-thin scrollbar-thumb-sky-200 scrollbar-track-gray-100'>
          <div className='space-y-5'>
            {/* Hãng xe */}
            <div className='group'>
              <label className='flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2'>
                <Stars className='w-4 h-4 text-sky-600' />
                Hãng xe
              </label>
              <input
                type='text'
                value={newVehicle.car_maker}
                onChange={(e) => setNewVehicle({ ...newVehicle, car_maker: e.target.value })}
                placeholder='VD: Tesla Model 3 của tôi'
                className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300 hover:border-sky-300 bg-gray-50 focus:bg-white'
              />
            </div>

            {/* Grid 2 columns for Brand and Model */}
            <div className='grid grid-cols-2 gap-4'>
              {/* Mẫu xe */}
              <div className='group'>
                <label className='flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2'>
                  <LocalShipping className='w-4 h-4 text-sky-600' />
                  Mẫu xe
                </label>
                <input
                  type='text'
                  value={newVehicle.models}
                  onChange={(e) => setNewVehicle({ ...newVehicle, models: e.target.value })}
                  placeholder='VD: Model 3'
                  className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300 hover:border-sky-300 bg-gray-50 focus:bg-white'
                />
              </div>

              <div className='group'>
                <label className='flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2'>
                  <svg className='w-4 h-4 text-sky-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
                  </svg>
                  Cổng sạc
                </label>
                <input
                  type='text'
                  value={newVehicle.connector_type || 'Chọn cổng sạc'}
                  onChange={(e) => setNewVehicle({ ...newVehicle, connector_type: e.target.value as ConnectorType })}
                  placeholder={Object.values(ConnectorType).join(', ').toString()}
                  className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300 hover:border-sky-300 bg-gray-50 focus:bg-white'
                />
              </div>
            </div>

            {/* Biển số xe */}
            <div className='group'>
              <label className='flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2'>
                <CalendarToday className='w-4 h-4 text-sky-600' />
                Biển số xe
              </label>
              <input
                type='text'
                value={newVehicle.license_plate}
                onChange={(e) => setNewVehicle({ ...newVehicle, license_plate: e.target.value })}
                className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300 hover:border-sky-300 bg-gray-50 focus:bg-white'
              />
            </div>

            {/* Grid 2 columns for Battery and Connector */}
            <div className='grid grid-cols-2 gap-4'>
              {/* Dung lượng pin */}
              <div className='group'>
                <label className='flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2'>
                  <Bolt className='w-4 h-4 text-sky-600' />
                  Pin (kWh)
                </label>
                <input
                  type='number'
                  value={newVehicle.battery_capacity_kwh || ''}
                  onChange={(e) => setNewVehicle({ ...newVehicle, battery_capacity_kwh: parseFloat(e.target.value) })}
                  placeholder='VD: 60'
                  className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300 hover:border-sky-300 bg-gray-50 focus:bg-white'
                />
              </div>

              {/* Loại cổng sạc */}
              <div className='group'>
                <label className='flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2'>
                  <PowerIcon fontSize='small' className='w-4 h-4 text-sky-600' />
                  Công suất sạc (kW)
                </label>
                <input
                  type='number'
                  value={newVehicle.charging_power_kw || ''}
                  onChange={(e) => setNewVehicle({ ...newVehicle, charging_power_kw: parseFloat(e.target.value) })}
                  placeholder='VD: 100'
                  className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300 hover:border-sky-300 bg-gray-50 focus:bg-white'
                />
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className='mt-6 bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-xl p-4'>
            <div className='flex gap-3'>
              <div className='flex-shrink-0'>
                <svg className='w-5 h-5 text-sky-600' fill='currentColor' viewBox='0 0 20 20'>
                  <path
                    fillRule='evenodd'
                    d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <div className='flex-1'>
                <p className='text-sm text-gray-700'>
                  <span className='font-semibold text-sky-700'>Lưu ý:</span> Thông tin xe giúp chúng tôi đề xuất trạm
                  sạc phù hợp và tính toán thời gian sạc chính xác.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className='px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-3'>
          <button
            onClick={() => setShowAddVehicleModal(false)}
            className='flex-1 px-5 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-100 hover:border-gray-400 transition-all duration-300 hover:shadow-md'
          >
            Hủy bỏ
          </button>
          <button
            onClick={handleAddVehicle}
            className='flex-1 px-5 py-3 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-xl font-semibold hover:from-sky-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
          >
            Thêm xe
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddVehicleModal

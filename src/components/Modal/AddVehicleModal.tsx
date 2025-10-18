import type { Vehicle } from '../../types/station'
import { XMarkIcon, TruckIcon, TagIcon, CalendarIcon, BoltIcon, SparklesIcon } from '@heroicons/react/24/outline'

interface AddVehicleModalProps {
  vehicles: Vehicle[]
  newVehicle: Vehicle
  setVehicles: (vehicles: Vehicle[]) => void
  setSelectedVehicle: (vehicle: Vehicle) => void
  setNewVehicle: (vehicle: Vehicle) => void
  setShowAddVehicleModal: (show: boolean) => void
}

const AddVehicleModal = ({
  vehicles,
  newVehicle,
  setNewVehicle,
  setVehicles,
  setSelectedVehicle,
  setShowAddVehicleModal
}: AddVehicleModalProps) => {
  const handleAddVehicle = () => {
    if (newVehicle.name && newVehicle.brand && newVehicle.model && newVehicle.batteryCapacity > 0) {
      const vehicle: Vehicle = {
        id: Date.now().toString(),
        name: newVehicle.name,
        brand: newVehicle.brand,
        model: newVehicle.model,
        year: newVehicle.year,
        batteryCapacity: newVehicle.batteryCapacity,
        connectorType: newVehicle.connectorType
      }
      setVehicles([...vehicles, vehicle])
      setSelectedVehicle(vehicle)
      setShowAddVehicleModal(false)
      setNewVehicle({
        id: '',
        name: '',
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        batteryCapacity: 0,
        connectorType: ''
      })
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
                <TruckIcon className='w-6 h-6 text-white' />
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
              <XMarkIcon className='w-6 h-6' />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className='p-6 max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-thin scrollbar-thumb-sky-200 scrollbar-track-gray-100'>
          <div className='space-y-5'>
            {/* Tên xe */}
            <div className='group'>
              <label className='flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2'>
                <SparklesIcon className='w-4 h-4 text-sky-600' />
                Tên xe
              </label>
              <input
                type='text'
                value={newVehicle.name}
                onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
                placeholder='VD: Tesla Model 3 của tôi'
                className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300 hover:border-sky-300 bg-gray-50 focus:bg-white'
              />
            </div>

            {/* Grid 2 columns for Brand and Model */}
            <div className='grid grid-cols-2 gap-4'>
              {/* Hãng xe */}
              <div className='group'>
                <label className='flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2'>
                  <TagIcon className='w-4 h-4 text-sky-600' />
                  Hãng xe
                </label>
                <input
                  type='text'
                  value={newVehicle.brand}
                  onChange={(e) => setNewVehicle({ ...newVehicle, brand: e.target.value })}
                  placeholder='VD: Tesla'
                  className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300 hover:border-sky-300 bg-gray-50 focus:bg-white'
                />
              </div>

              {/* Mẫu xe */}
              <div className='group'>
                <label className='flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2'>
                  <TruckIcon className='w-4 h-4 text-sky-600' />
                  Mẫu xe
                </label>
                <input
                  type='text'
                  value={newVehicle.model}
                  onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                  placeholder='VD: Model 3'
                  className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300 hover:border-sky-300 bg-gray-50 focus:bg-white'
                />
              </div>
            </div>

            {/* Năm sản xuất */}
            <div className='group'>
              <label className='flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2'>
                <CalendarIcon className='w-4 h-4 text-sky-600' />
                Năm sản xuất
              </label>
              <input
                type='number'
                value={newVehicle.year}
                onChange={(e) => setNewVehicle({ ...newVehicle, year: parseInt(e.target.value) })}
                min='2000'
                max={new Date().getFullYear() + 1}
                className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300 hover:border-sky-300 bg-gray-50 focus:bg-white'
              />
            </div>

            {/* Grid 2 columns for Battery and Connector */}
            <div className='grid grid-cols-2 gap-4'>
              {/* Dung lượng pin */}
              <div className='group'>
                <label className='flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2'>
                  <BoltIcon className='w-4 h-4 text-sky-600' />
                  Pin (kWh)
                </label>
                <input
                  type='number'
                  value={newVehicle.batteryCapacity || ''}
                  onChange={(e) => setNewVehicle({ ...newVehicle, batteryCapacity: parseFloat(e.target.value) })}
                  placeholder='VD: 60'
                  className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300 hover:border-sky-300 bg-gray-50 focus:bg-white'
                />
              </div>

              {/* Loại cổng sạc */}
              <div className='group'>
                <label className='flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2'>
                  <svg className='w-4 h-4 text-sky-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
                  </svg>
                  Cổng sạc
                </label>
                <input
                  type='text'
                  value={newVehicle.connectorType}
                  onChange={(e) => setNewVehicle({ ...newVehicle, connectorType: e.target.value })}
                  placeholder='Type 2, CCS2'
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

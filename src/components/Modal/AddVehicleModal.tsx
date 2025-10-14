import type { Vehicle } from '../../types/station'

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
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-lg shadow-xl max-w-md w-full p-6'>
        <h2 className='text-2xl font-bold mb-4'>Thêm xe mới</h2>
        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Tên xe</label>
            <input
              type='text'
              value={newVehicle.name}
              onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
              placeholder='VD: Tesla Model 3 của tôi'
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Hãng xe</label>
            <input
              type='text'
              value={newVehicle.brand}
              onChange={(e) => setNewVehicle({ ...newVehicle, brand: e.target.value })}
              placeholder='VD: Tesla'
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Mẫu xe</label>
            <input
              type='text'
              value={newVehicle.model}
              onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
              placeholder='VD: Model 3'
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Năm sản xuất</label>
            <input
              type='number'
              value={newVehicle.year}
              onChange={(e) => setNewVehicle({ ...newVehicle, year: parseInt(e.target.value) })}
              min='2000'
              max={new Date().getFullYear() + 1}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Dung lượng pin (kWh)</label>
            <input
              type='number'
              value={newVehicle.batteryCapacity || ''}
              onChange={(e) => setNewVehicle({ ...newVehicle, batteryCapacity: parseFloat(e.target.value) })}
              placeholder='VD: 60'
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Loại cổng sạc</label>
            <input
              type='text'
              value={newVehicle.connectorType}
              onChange={(e) => setNewVehicle({ ...newVehicle, connectorType: e.target.value })}
              placeholder='VD: Type 2, CCS2'
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
          </div>
        </div>
        <div className='flex gap-3 mt-6'>
          <button
            onClick={() => setShowAddVehicleModal(false)}
            className='flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors'
          >
            Hủy
          </button>
          <button
            onClick={handleAddVehicle}
            className='flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
          >
            Thêm xe
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddVehicleModal

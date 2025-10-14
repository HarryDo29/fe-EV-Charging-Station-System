import type { Vehicle } from '../types/station'

const initialVehicles: Vehicle[] = [
  {
    id: '1',
    name: 'Tesla Model 3',
    brand: 'Tesla',
    model: 'Model 3',
    year: 2023,
    batteryCapacity: 60,
    connectorType: 'Type 2, CCS2'
  },
  {
    id: '2',
    name: 'VinFast VF8',
    brand: 'VinFast',
    model: 'VF8',
    year: 2024,
    batteryCapacity: 87.7,
    connectorType: 'Type 2, CCS2'
  }
]

export default initialVehicles

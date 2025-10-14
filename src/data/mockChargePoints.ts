import type { ChargePoint } from '../types/station'

const mockChargePoints: ChargePoint[] = [
  {
    id: 1,
    name: 'Cổng sạc A1',
    type: 'AC',
    power: 7.4,
    status: 'available',
    connectorType: 'Type 2',
    price: 3500
  },
  {
    id: 2,
    name: 'Cổng sạc A2',
    type: 'AC',
    power: 11,
    status: 'available',
    connectorType: 'Type 2',
    price: 3500
  },
  {
    id: 3,
    name: 'Cổng sạc DC1',
    type: 'DC',
    power: 50,
    status: 'available',
    connectorType: 'CCS2',
    price: 4500
  },
  {
    id: 4,
    name: 'Cổng sạc DC2',
    type: 'DC',
    power: 120,
    status: 'occupied',
    connectorType: 'CCS2',
    price: 5500
  },
  {
    id: 5,
    name: 'Cổng sạc DC3',
    type: 'DC',
    power: 180,
    status: 'available',
    connectorType: 'CCS2',
    price: 6500
  }
]

export default mockChargePoints

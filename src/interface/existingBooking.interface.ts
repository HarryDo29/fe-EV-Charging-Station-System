export interface ExistingBooking {
  id: string
  station: string
  chargePointId: number
  date: string // YYYY-MM-DD
  startTime: string // HH:mm
  endTime: string // HH:mm
  power: number // kWh
  price: number // VND per kWh
  vehicleName: string
  status: 'confirmed' | 'in-progress' | 'completed' | 'upcoming'
}

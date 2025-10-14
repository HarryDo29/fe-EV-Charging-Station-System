export interface Coordinates {
  lat: number
  lng: number
}

export interface Station {
  id: number
  name: string
  lat: number
  lng: number
  address: string
  status?: 'available' | 'busy' | 'offline'
  totalChargers?: number
  availableChargers?: number
  price?: number
  distance?: number
  rating?: number
}

export interface SearchFilters {
  searchText: string
  status?: 'all' | 'available' | 'busy' | 'offline'
  maxDistance?: number
  minRating?: number
}

export interface ChargePoint {
  id: number
  name: string
  type: 'AC' | 'DC'
  power: number // kW
  status: 'available' | 'occupied' | 'maintenance'
  connectorType: string
  price: number // VND per kWh
}

export interface Vehicle {
  id: string
  name: string
  brand: string
  model: string
  year: number
  batteryCapacity: number // kWh
  connectorType: string
}

export interface BookingData {
  stationId: number
  chargePointId: number
  vehicleId: string
  startDate: Date
  startTime: string
  duration: number // hours
}

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

export interface Transaction {
  id: string
  type: 'Pay for charge' | 'Pay for subscription'
  date: string
  amount: number // VND
  status: 'success' | 'pending' | 'failed'
  method: string
  transactionId: string
  description: string
}

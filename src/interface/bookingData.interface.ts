export interface BookingData {
  stationId: number
  chargePointId: number
  vehicleId: string
  startDate: Date
  startTime: string
  duration: number // hours
}

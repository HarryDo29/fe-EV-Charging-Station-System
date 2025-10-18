export interface WeeklyBookingDate {
  id: number
  chargePointId: number
  startTime: string
  endTime: string
  vehicleName: string
}

export interface WeeklyBookingDates {
  [key: string]: WeeklyBookingDate[]
}

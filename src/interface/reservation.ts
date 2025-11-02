import type { ReservationStatus } from '../constants/reservationStatus'

export interface CreateReservation {
  reservation_day: string // format: YYYY-MM-DD
  start_time: string
  end_time: string
  charge_point_id: string
  vehicle_id: string
}

export interface Reservation {
  id: string
  reservation_day: string // format: YYYY-MM-DD
  start_time: string
  end_time: string
  status: ReservationStatus
  charge_point_id: string
  vehicle_id: string
}

export interface WeeklyBookingDates {
  [key: string]: Reservation[]
}

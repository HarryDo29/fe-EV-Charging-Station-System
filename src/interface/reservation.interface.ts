import type { ReservationStatus } from '../constants/reservationStatus'
import type { ChargePoint } from './chargePoint.interface'

export interface CreateReservation {
  station_id: string
  charge_point_id: string
  vehicle_id: string
  date: string
  slots: string[]
}

export interface Reservation {
  id: string
  reservation_day: string // format: YYYY-MM-DD
  start_time: string
  end_time: string
  status: ReservationStatus
  charge_point_id: string
  charge_point: ChargePoint
}

import type { ReservationStatus } from '../constants/reservationStatus'
import type { ChargePoint } from './chargePoint.interface'

export interface Reservation {
  id: string
  reservation_day: string // format: YYYY-MM-DD
  start_time: string
  end_time: string
  status: ReservationStatus
  charge_point_id: string
  charge_point: ChargePoint
}

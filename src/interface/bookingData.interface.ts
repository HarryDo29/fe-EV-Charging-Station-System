import type { Station } from './station.interface'
import type { ChargePoint } from './chargePoint.interface'
import type { Vehicle } from './vehicle.interface'
import type { SelectedSlot } from './selectedSlot.interface'

export interface BookingData {
  station: Station
  chargePoint: ChargePoint
  vehicle: Vehicle
  date: string // format: YYYY-MM-DD
  slots: SelectedSlot[]
  amount: number
}

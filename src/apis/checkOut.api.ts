import api from './api.instance'
import type { ReservationCheckOut } from '../interface/checkOut.interface'

export const checkOutApi = async (reserCheckOut: ReservationCheckOut) => {
  const response = await api.post(`/checkout/reservation`, reserCheckOut)
  return response.data
}

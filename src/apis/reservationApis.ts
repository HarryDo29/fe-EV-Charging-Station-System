import api from './apiInstance'
import type { CreateReservation, Reservation } from '../interface/reservation'

export const createReservation = async (createReservation: CreateReservation) => {
  const response = await api.post('/station/reservation', createReservation)
  console.log('createReservation response', response)
  return response.data
}

export const getReservation = async (chargePointId: string) => {
  const response = await api.get(`/station/reservation/${chargePointId}`)
  console.log('getReservation response', response)
  return response.data.data as Reservation[]
}

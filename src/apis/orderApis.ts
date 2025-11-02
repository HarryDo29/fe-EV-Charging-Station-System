import api from './apiInstance'

export const createOrder = async (reservationId: string) => {
  const response = await api.post(`/order/reservation`, { reservationId })
  return response.data
}

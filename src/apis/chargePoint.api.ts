import api from './api.instance'

// export const fetchChargePoints = async () => {
//   const response = await api.get('/charge-point/get-all-charge-points')
//   return response.data
// }

export const fetchChargePointsByStationId = async (stationId: string) => {
  const response = await api.get(`/station/get-charge-points/${stationId}`)
  return response.data
}

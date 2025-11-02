import api from './apiInstance'
import type { Station } from '../interface/station.interface'

export const fetchStations = async (): Promise<{ data: Station[] }> => {
  const response = await api.get('/station/get-all-stations')
  console.log('response', response)
  return response.data
}

export const fetchStationsByDistance = async (latitude: number, longitude: number): Promise<{ data: Station[] }> => {
  const response = await api.get(`/station?latitude=${latitude}&longitude=${longitude}`)
  return response.data
}

export const fetchStationById = async (id: string) => {
  const response = await api.get(`/station/${id}`)
  return response.data
}

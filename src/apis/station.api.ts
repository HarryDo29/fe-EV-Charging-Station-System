import api from './api.instance'
import type { Station } from '../interface/station.interface'

export const fetchStations = async (): Promise<{ data: Station[] }> => {
  const response = await api.get('/station')
  console.log('response', response)
  return response.data
}

export const fetchStationsSorted = async (latitude: string, longitude: string) => {
  const response = await api.get(`/station/sorted?latitude=${latitude}&longitude=${longitude}`)
  console.log('response', response)
  return response.data
}

export const fetchStationById = async (id: string) => {
  const response = await api.get(`/station/${id}`)
  return response.data
}

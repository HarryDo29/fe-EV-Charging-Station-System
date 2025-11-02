import type { AddVehicle } from '../interface/vehicle.interface'
import api from './apiInstance'

export const addVehicle = async (vehicle: AddVehicle) => {
  const response = await api.post(`/vehicle/add-vehicle`, vehicle)
  console.log('addVehicle response', response)
  return response.data
}

export const fetchOwnVehicles = async () => {
  const response = await api.get(`/vehicle/get-all-vehicles`)
  console.log('fetchVehicles response', response)
  return response.data
}

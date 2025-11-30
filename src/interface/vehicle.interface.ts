import type { ConnectorType } from '../constants/connectorType'

export interface AddVehicle {
  car_maker: string
  models: string
  license_plate: string
  battery_capacity_kwh: number // kWh
  charging_power_kw: number
  connector_type: ConnectorType | null
  status: boolean
}

export interface Vehicle {
  id: string
  car_maker: string
  models: string
  license_plate: string
  connector_type: ConnectorType | null
  battery_capacity_kwh: number // kWh
  charging_power_kw: number
  status: boolean
}

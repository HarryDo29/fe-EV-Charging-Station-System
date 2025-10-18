import type { ConnectorType } from '../constants/connectorType'

export interface Vehicle {
  id: string
  car_maker: string
  model: string
  license_plate: string
  connector_type: ConnectorType
  battery_capacity_kwh: number // kWh
  charging_power_kw: number
  status: boolean
}

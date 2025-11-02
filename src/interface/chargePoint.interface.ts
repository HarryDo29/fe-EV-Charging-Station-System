import type { ConnectorType } from '../constants/connectorType'
import { StationStatus } from '../constants/stationStatus'

export interface ChargePoint {
  id: string
  identifier: string
  connector_type: ConnectorType
  maxPowerKw: number
  pricePerKwh: number
  ParkingFeePerHour: number
  reserved_status: boolean
  status: StationStatus
}

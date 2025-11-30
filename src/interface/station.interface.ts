import { StationStatus } from '../constants/stationStatus'
import { ConnectorType } from '../constants/connectorType'

export interface Station {
  id: string
  identifer: string
  name: string
  address: string
  latitude: number
  longitude: number
  status: StationStatus
  connectorTypes: ConnectorType[]
  powerKw: number
  pricePerKwh: number | null
  totalChargePoints: number
  availableChargePoints: number
  rating?: number
}

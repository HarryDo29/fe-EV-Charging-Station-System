import { ConnectorType } from '../constants/connectorType'
import { StationStatus } from '../constants/stationStatus'
import type { ChargePoint } from '../interface/chargePoint.interface'

const mockChargePoints: ChargePoint[] = [
  {
    id: 1,
    identifer: 'Cổng sạc A1',
    connector_type: ConnectorType.TYPE1,
    maxPowerKw: 7.4,
    pricePerKwh: 3500,
    ParkingFeePerHour: 10000,
    reserved_status: false,
    status: StationStatus.AVAILABLE
  },
  {
    id: 2,
    identifer: 'Cổng sạc A2',
    connector_type: ConnectorType.TYPE2,
    maxPowerKw: 11,
    pricePerKwh: 3500,
    ParkingFeePerHour: 10000,
    reserved_status: false,
    status: StationStatus.AVAILABLE
  },
  {
    id: 3,
    identifer: 'Cổng sạc DC1',
    connector_type: ConnectorType.CCS2,
    maxPowerKw: 50,
    pricePerKwh: 4500,
    ParkingFeePerHour: 10000,
    reserved_status: false,
    status: StationStatus.AVAILABLE
  },
  {
    id: 4,
    identifer: 'Cổng sạc DC2',
    connector_type: ConnectorType.CCS2,
    maxPowerKw: 120,
    pricePerKwh: 5500,
    ParkingFeePerHour: 10000,
    reserved_status: false,
    status: StationStatus.AVAILABLE
  },
  {
    id: 5,
    identifer: 'Cổng sạc DC3',
    connector_type: ConnectorType.CCS2,
    maxPowerKw: 180,
    pricePerKwh: 6500,
    ParkingFeePerHour: 10000,
    reserved_status: false,
    status: StationStatus.AVAILABLE
  }
]

export default mockChargePoints

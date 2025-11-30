import type { Station } from '../interface/station.interface'
import { StationStatus } from '../constants/stationStatus'
import { ConnectorType } from '../constants/connectorType'

export const mockStations: Station[] = [
  {
    id: '1',
    identifer: '1',
    connectorTypes: [ConnectorType.CCS1],
    powerKw: 100,
    name: 'Trạm sạc Khu Công Nghệ Cao',
    latitude: 10.84102,
    longitude: 106.80941,
    address: 'Đường D1, Khu CNC Quận 9, TP. Thủ Đức',
    status: StationStatus.AVAILABLE,
    totalChargPoints: 8,
    availableChargPoints: 5,
    pricePerKwh: 3500,
    rating: 4.5
  },
  {
    id: '2',
    identifer: '2',
    connectorTypes: [ConnectorType.CCS1],
    powerKw: 100,
    name: 'Trạm sạc Lê Văn Việt',
    latitude: 10.84552,
    longitude: 106.78391,
    address: 'Lê Văn Việt, Phường Hiệp Phú, Quận 9',
    status: StationStatus.AVAILABLE,
    totalChargPoints: 6,
    availableChargPoints: 3,
    pricePerKwh: 3200,
    rating: 4.2
  },
  {
    id: '3',
    identifer: '3',
    connectorTypes: [ConnectorType.CCS1],
    powerKw: 100,
    name: 'Trạm sạc Nguyễn Xiển',
    latitude: 10.82292,
    longitude: 106.79232,
    address: 'Nguyễn Xiển, Phường Long Thạnh Mỹ, Quận 9',
    status: StationStatus.UNAVAILABLE,
    totalChargPoints: 10,
    availableChargPoints: 1,
    pricePerKwh: 3800,
    rating: 4.7
  },
  {
    id: '4',
    identifer: '4',
    connectorTypes: [ConnectorType.CCS1],
    powerKw: 100,
    name: 'Trạm sạc Xa Lộ Hà Nội',
    latitude: 10.84932,
    longitude: 106.78025,
    address: 'Xa Lộ Hà Nội, Phường Phước Long A, Quận 9',
    status: StationStatus.AVAILABLE,
    totalChargPoints: 12,
    availableChargPoints: 8,
    pricePerKwh: 3300,
    rating: 4.8
  },
  {
    id: '5',
    identifer: '5',
    connectorTypes: [ConnectorType.CCS1],
    powerKw: 100,
    name: 'Trạm sạc Đỗ Xuân Hợp',
    latitude: 10.81975,
    longitude: 106.7778,
    address: 'Đỗ Xuân Hợp, Phường Phước Long B, Quận 9',
    status: StationStatus.MAINTENANCE,
    totalChargPoints: 4,
    availableChargPoints: 0,
    pricePerKwh: 3000,
    rating: 3.9
  },
  {
    id: '6',
    identifer: '6',
    connectorTypes: [ConnectorType.CCS1],
    powerKw: 100,
    name: 'Trạm sạc Long Trường',
    latitude: 10.79645,
    longitude: 106.83217,
    address: 'Lã Xuân Oai, Phường Long Trường, Quận 9',
    status: StationStatus.AVAILABLE,
    totalChargPoints: 6,
    availableChargPoints: 4,
    pricePerKwh: 3400,
    rating: 4.3
  },
  {
    id: '7',
    identifer: '7',
    connectorTypes: [ConnectorType.CCS1],
    powerKw: 100,
    name: 'Trạm sạc Phú Hữu',
    latitude: 10.78593,
    longitude: 106.81245,
    address: 'Nguyễn Duy Trinh, Phường Phú Hữu, Quận 9',
    status: StationStatus.AVAILABLE,
    totalChargPoints: 8,
    availableChargPoints: 6,
    pricePerKwh: 3600,
    rating: 4.6
  },
  {
    id: '8',
    identifer: '8',
    connectorTypes: [ConnectorType.CCS1],
    powerKw: 100,
    name: 'Trạm sạc Tăng Nhơn Phú A',
    latitude: 10.84067,
    longitude: 106.77329,
    address: 'Tăng Nhơn Phú A, Quận 9',
    status: StationStatus.UNAVAILABLE,
    totalChargPoints: 5,
    availableChargPoints: 1,
    pricePerKwh: 3100,
    rating: 4.0
  },
  {
    id: '9',
    identifer: '9',
    connectorTypes: [ConnectorType.CCS1],
    powerKw: 100,
    name: 'Trạm sạc Long Phước',
    latitude: 10.80587,
    longitude: 106.86017,
    address: 'Đường Long Phước, Phường Long Phước, Quận 9',
    status: StationStatus.AVAILABLE,
    totalChargPoints: 7,
    availableChargPoints: 5,
    pricePerKwh: 3700,
    rating: 4.4
  },
  {
    id: '10',
    identifer: '10',
    connectorTypes: [ConnectorType.CCS1],
    powerKw: 100,
    name: 'Trạm sạc Trường Đại học Nông Lâm',
    latitude: 10.87029,
    longitude: 106.79485,
    address: 'Khuôn viên Đại học Nông Lâm, Quận 9',
    status: StationStatus.AVAILABLE,
    totalChargPoints: 15,
    availableChargPoints: 12,
    pricePerKwh: 2900,
    rating: 4.9
  }
]

// Hàm tính khoảng cách giữa 2 điểm (Haversine formula)
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Bán kính Trái Đất (km)
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

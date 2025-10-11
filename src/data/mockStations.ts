import type { Station } from '../types/station'

export const mockStations: Station[] = [
  {
    id: 1,
    name: 'Trạm sạc Khu Công Nghệ Cao',
    lat: 10.84102,
    lng: 106.80941,
    address: 'Đường D1, Khu CNC Quận 9, TP. Thủ Đức',
    status: 'available',
    totalChargers: 8,
    availableChargers: 5,
    price: 3500,
    rating: 4.5
  },
  {
    id: 2,
    name: 'Trạm sạc Lê Văn Việt',
    lat: 10.84552,
    lng: 106.78391,
    address: 'Lê Văn Việt, Phường Hiệp Phú, Quận 9',
    status: 'available',
    totalChargers: 6,
    availableChargers: 3,
    price: 3200,
    rating: 4.2
  },
  {
    id: 3,
    name: 'Trạm sạc Nguyễn Xiển',
    lat: 10.82292,
    lng: 106.79232,
    address: 'Nguyễn Xiển, Phường Long Thạnh Mỹ, Quận 9',
    status: 'busy',
    totalChargers: 10,
    availableChargers: 1,
    price: 3800,
    rating: 4.7
  },
  {
    id: 4,
    name: 'Trạm sạc Xa Lộ Hà Nội',
    lat: 10.84932,
    lng: 106.78025,
    address: 'Xa Lộ Hà Nội, Phường Phước Long A, Quận 9',
    status: 'available',
    totalChargers: 12,
    availableChargers: 8,
    price: 3300,
    rating: 4.8
  },
  {
    id: 5,
    name: 'Trạm sạc Đỗ Xuân Hợp',
    lat: 10.81975,
    lng: 106.7778,
    address: 'Đỗ Xuân Hợp, Phường Phước Long B, Quận 9',
    status: 'offline',
    totalChargers: 4,
    availableChargers: 0,
    price: 3000,
    rating: 3.9
  },
  {
    id: 6,
    name: 'Trạm sạc Long Trường',
    lat: 10.79645,
    lng: 106.83217,
    address: 'Lã Xuân Oai, Phường Long Trường, Quận 9',
    status: 'available',
    totalChargers: 6,
    availableChargers: 4,
    price: 3400,
    rating: 4.3
  },
  {
    id: 7,
    name: 'Trạm sạc Phú Hữu',
    lat: 10.78593,
    lng: 106.81245,
    address: 'Nguyễn Duy Trinh, Phường Phú Hữu, Quận 9',
    status: 'available',
    totalChargers: 8,
    availableChargers: 6,
    price: 3600,
    rating: 4.6
  },
  {
    id: 8,
    name: 'Trạm sạc Tăng Nhơn Phú A',
    lat: 10.84067,
    lng: 106.77329,
    address: 'Tăng Nhơn Phú A, Quận 9',
    status: 'busy',
    totalChargers: 5,
    availableChargers: 1,
    price: 3100,
    rating: 4.0
  },
  {
    id: 9,
    name: 'Trạm sạc Long Phước',
    lat: 10.80587,
    lng: 106.86017,
    address: 'Đường Long Phước, Phường Long Phước, Quận 9',
    status: 'available',
    totalChargers: 7,
    availableChargers: 5,
    price: 3700,
    rating: 4.4
  },
  {
    id: 10,
    name: 'Trạm sạc Trường Đại học Nông Lâm',
    lat: 10.87029,
    lng: 106.79485,
    address: 'Khuôn viên Đại học Nông Lâm, Quận 9',
    status: 'available',
    totalChargers: 15,
    availableChargers: 12,
    price: 2900,
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

export interface Coordinates {
  lat: number
  lng: number
}

export interface Station {
  id: number
  name: string
  lat: number
  lng: number
  address: string
  status?: 'available' | 'busy' | 'offline'
  totalChargers?: number
  availableChargers?: number
  price?: number
  distance?: number
  rating?: number
}

export interface SearchFilters {
  searchText: string
  status?: 'all' | 'available' | 'busy' | 'offline'
  maxDistance?: number
  minRating?: number
}

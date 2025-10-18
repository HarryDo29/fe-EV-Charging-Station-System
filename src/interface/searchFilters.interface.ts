export interface SearchFilters {
  searchText: string
  status?: 'all' | 'available' | 'busy' | 'offline'
  maxDistance?: number
  minRating?: number
}

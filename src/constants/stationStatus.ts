export const StationStatus = {
  AVAILABLE: 'available',
  UNAVAILABLE: 'unavailable',
  MAINTENANCE: 'maintenance'
} as const

export type StationStatus = (typeof StationStatus)[keyof typeof StationStatus]

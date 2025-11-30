export const OrderType = {
  RESERVATION: 'reservation',
  CHARGING: 'charging',
  PARKING: 'parking',
  OTHER: 'other'
} as const

export type OrderType = (typeof OrderType)[keyof typeof OrderType]

export const OrderStatus = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
} as const

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]

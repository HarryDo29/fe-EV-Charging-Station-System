export const ReservationStatus = {
  PENDING: 'pending',
  RESERVED: 'reserved',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
}

export type ReservationStatus = (typeof ReservationStatus)[keyof typeof ReservationStatus]

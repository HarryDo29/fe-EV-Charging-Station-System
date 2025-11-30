export const TransactionStatus = {
  PENDING: 'pending', // Chờ thanh toán
  SUCCESS: 'success', // Thanh toán thành công
  FAILED: 'failed' // Thanh toán thất bại
} as const

export type TransactionStatus = (typeof TransactionStatus)[keyof typeof TransactionStatus]

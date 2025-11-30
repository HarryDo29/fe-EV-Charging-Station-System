export const TransactionMethod = {
  PAYOS: 'payos', // Thanh toán qua payOS
  ZALO: 'zalopay', // Thanh toán qua ZaloPay
  CASH: 'cash' // Thanh toán qua tiền mặt
}

export type TransactionMethod = (typeof TransactionMethod)[keyof typeof TransactionMethod]

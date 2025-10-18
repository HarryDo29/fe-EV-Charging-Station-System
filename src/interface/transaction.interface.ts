import type { TransactionMethod } from '../constants/transactionMethod'
import type { TransactionStatus } from '../constants/transactionStatus'
export interface Transaction {
  id: string
  order_code: number
  amount: number // VND
  method: TransactionMethod
  status: TransactionStatus
}

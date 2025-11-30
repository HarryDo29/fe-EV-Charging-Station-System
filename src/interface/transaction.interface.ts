import type { TransactionMethod } from '../constants/transactionMethod'
import type { TransactionStatus } from '../constants/transactionStatus'
import type { TransactionType } from '../constants/transactionType'

export interface CreateTransaction {
  amount: number // VND
  type: TransactionType
  order_id: string
}

export interface Transaction {
  id: string
  order_code: number
  transaction_code: number
  amount: number // VND
  type: TransactionType
  method: TransactionMethod
  status: TransactionStatus
  order_id: string
  date: string
}

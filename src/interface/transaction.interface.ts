import type { TransactionMethod } from '../constants/transactionMethod'
import type { TransactionStatus } from '../constants/transactionStatus'
import type { TransactionType } from '../constants/transactionType'

export interface CreateTransaction {
  amount: number // VND
  method: TransactionMethod
  type: TransactionType
}

export interface Transaction {
  id: string
  order_code: number
  amount: number // VND
  type: TransactionType
  method: TransactionMethod
  status: TransactionStatus
  date: string
}

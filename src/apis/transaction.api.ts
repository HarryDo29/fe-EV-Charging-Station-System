import api from './api.instance'
import type { CreateTransaction } from '../interface/transaction.interface'

export const createTransaction = async (createTransaction: CreateTransaction) => {
  const response = await api.post('/transaction', createTransaction)
  return response.data
}

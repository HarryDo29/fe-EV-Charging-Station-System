import type { Transaction } from '../types/station'

export const transactions: Transaction[] = [
  {
    id: 't1',
    type: 'Pay for charge',
    amount: 150000,
    date: '15/10/2024',
    status: 'success',
    method: 'card',
    transactionId: 't1',
    description: 'Sạc xe'
  },
  {
    id: 't2',
    type: 'Pay for charge',
    amount: 500000,
    date: '14/10/2024',
    status: 'success',
    method: 'card',
    transactionId: 't2',
    description: 'Nạp tiền'
  },
  {
    id: 't3',
    type: 'Pay for charge',
    amount: 135000,
    date: '12/10/2024',
    status: 'success',
    method: 'card',
    transactionId: 't3',
    description: 'Sạc xe'
  },
  {
    id: 't4',
    type: 'Pay for subscription',
    amount: 299000,
    date: '10/10/2024',
    status: 'success',
    method: 'card',
    transactionId: 't4',
    description: 'Đăng ký gói VIP'
  }
]

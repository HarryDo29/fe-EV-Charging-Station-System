export const TransactionType = {
  PAY_PARKING_FEE: 'pay_parking_fee',
  PAY_CHARGING_FEE: 'pay_charging_fee',
  PAY_OTHER_FEE: 'pay_other_fee'
} as const

export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType]

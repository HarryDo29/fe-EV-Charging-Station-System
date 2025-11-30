import type { OrderStatus } from '../constants/orderStatus'
import type { OrderType } from '../constants/orderType'

export interface Order {
  id: string
  order_status: OrderStatus
  order_type: OrderType
  total_amount: number
}

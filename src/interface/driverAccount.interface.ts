import type { Role } from '../constants/role'

export interface DriverAccount {
  id: string
  full_name: string
  phone_number: string
  email: string
  role: Role
  is_verified: boolean
  is_active: boolean
  is_oauth2: boolean
  avatar_url?: string
}

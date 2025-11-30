/**
 * Staff Module Type Definitions
 * Defines interfaces for chargers, sessions, tickets, and staff operations
 */

export type ChargerStatus = 'online' | 'offline' | 'maintenance' | 'in-use'
export type ConnectorType = 'Type2' | 'CCS2' | 'CHAdeMO' | 'Tesla'
export type SessionStatus = 'draft' | 'scheduled' | 'active' | 'completed' | 'cancelled'
export type SessionType = 'draft' | 'scheduled' | 'immediate'
export type TicketStatus = 'open' | 'in-progress' | 'resolved' | 'closed'
export type TicketPriority = 'low' | 'normal' | 'high' | 'urgent'
export type MessageSender = 'customer' | 'staff' | 'system'

/**
 * Charger (Trụ sạc) Interface
 */
export interface Charger {
  id: string
  stationId: string
  stationName: string
  stationAddress: string
  connectorType: ConnectorType
  maxKW: number
  status: ChargerStatus
  lastHeartbeat: string
  currentSessionId?: string
  temperature?: number
  uptime?: number // hours
  totalEnergyDelivered?: number // kWh
  region?: string
}

/**
 * Charging Session Interface
 */
export interface ChargingSession {
  id: string
  chargerId: string
  chargerName?: string
  driverName: string
  phone: string
  email?: string
  vehicle: string
  plate: string
  status: SessionStatus
  type: SessionType
  scheduledAt?: string
  startTime?: string
  endTime?: string
  estimatedKWh?: number
  estimatedDuration?: number // minutes
  actualKWh?: number
  cost?: number
  notes?: string
  createdBy: string
  createdAt: string
  progress?: number // 0-100
}

/**
 * Ticket Message Interface
 */
export interface TicketMessage {
  id: string
  from: MessageSender
  senderName: string
  text: string
  timestamp: string
  isInternal?: boolean // private note for staff only
  attachments?: string[]
}

/**
 * Support Ticket Interface
 */
export interface SupportTicket {
  id: string
  customerId: string
  customerName: string
  customerPhone: string
  customerEmail: string
  subject: string
  messages: TicketMessage[]
  status: TicketStatus
  priority: TicketPriority
  assignedTo?: string
  assignedToName?: string
  linkedBookingId?: string
  linkedChargerId?: string
  createdAt: string
  updatedAt: string
  resolvedAt?: string
}

/**
 * Staff User Interface
 */
export interface StaffUser {
  id: string
  name: string
  email: string
  role: 'staff' | 'admin'
  assignedStations: string[]
  phone: string
  isOnline: boolean
}

/**
 * Charger Telemetry (for detail view)
 */
export interface ChargerTelemetry {
  chargerId: string
  timestamp: string
  voltage: number
  current: number
  power: number
  temperature: number
  energy: number
}

/**
 * Charger Log Event
 */
export interface ChargerLogEvent {
  id: string
  chargerId: string
  timestamp: string
  eventType: 'heartbeat' | 'session_start' | 'session_end' | 'error' | 'maintenance' | 'reset'
  message: string
  severity: 'info' | 'warning' | 'error'
}

/**
 * Quick Response Template
 */
export interface QuickResponse {
  id: string
  title: string
  content: string
  category: 'technical' | 'billing' | 'booking' | 'general'
}

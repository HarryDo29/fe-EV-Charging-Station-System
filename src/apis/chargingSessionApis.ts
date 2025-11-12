import api from './apiInstance'

// Interface for charging session
export interface ChargingSessionRequest {
  otp: string
  chargePointId?: string
  vehicleId?: string
}

export interface ChargingSessionResponse {
  sessionId: string
  status: 'active' | 'paused' | 'stopped'
  startTime: string
  chargePointId: string
  vehicleId: string
  message?: string
}

export interface ChargingSessionData {
  sessionId: string
  timeElapsed: number
  energyConsumed: number
  power: number
  cost: number
}

// Verify OTP and start charging session
export const verifyOTPAndStartCharging = async (
  data: ChargingSessionRequest
): Promise<ChargingSessionResponse> => {
  try {
    const response = await api.post('/charging-session/start', data)
    return response.data
  } catch (error) {
    console.error('Error starting charging session:', error)
    throw error
  }
}

// Get current charging session data
export const getChargingSessionData = async (sessionId: string): Promise<ChargingSessionData> => {
  try {
    const response = await api.get(`/charging-session/${sessionId}`)
    return response.data
  } catch (error) {
    console.error('Error getting charging session data:', error)
    throw error
  }
}

// Pause charging session
export const pauseChargingSession = async (sessionId: string): Promise<{ message: string }> => {
  try {
    const response = await api.post(`/charging-session/${sessionId}/pause`)
    return response.data
  } catch (error) {
    console.error('Error pausing charging session:', error)
    throw error
  }
}

// Resume charging session
export const resumeChargingSession = async (sessionId: string): Promise<{ message: string }> => {
  try {
    const response = await api.post(`/charging-session/${sessionId}/resume`)
    return response.data
  } catch (error) {
    console.error('Error resuming charging session:', error)
    throw error
  }
}

// Stop charging session
export const stopChargingSession = async (sessionId: string): Promise<{ message: string; finalData: ChargingSessionData }> => {
  try {
    const response = await api.post(`/charging-session/${sessionId}/stop`)
    return response.data
  } catch (error) {
    console.error('Error stopping charging session:', error)
    throw error
  }
}

// Get OTP for charging (if needed to request OTP)
export const requestChargingOTP = async (chargePointId: string): Promise<{ otp: string; expiresAt: string }> => {
  try {
    const response = await api.post('/charging-session/request-otp', { chargePointId })
    return response.data
  } catch (error) {
    console.error('Error requesting OTP:', error)
    throw error
  }
}


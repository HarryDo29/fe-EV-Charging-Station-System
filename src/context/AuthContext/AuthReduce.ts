import type { Cookie } from 'universal-cookie'
import type { DriverAccount } from '../../interface/driverAccount.interface'

interface AuthAction {
  type: keyof typeof AuthAction
  payload: { driver_account: DriverAccount | null; error: Error | null }
}

export interface AuthResponse {
  driver_account: DriverAccount | null
  error: Error | null
}

export const getInitialState = (cookies: Cookie): AuthResponse => {
  return {
    driver_account: cookies.driver_account as DriverAccount | null,
    error: null as Error | null
  }
}

export const AuthAction = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS' as string, // login success
  LOGIN_FAILURE: 'LOGIN_FAILURE' as string, // login failure
  LOGOUT: 'LOGOUT' as string // logout
}

export const authReducer = (state: AuthResponse, action: AuthAction): AuthResponse => {
  // log action type and payload
  const { driver_account, error } = action.payload
  console.log('ActionState', action)
  switch (action.type) {
    case AuthAction.LOGIN_SUCCESS:
      return {
        ...state,
        driver_account: driver_account,
        error: null
      }
    case AuthAction.LOGIN_FAILURE:
      return { ...state, driver_account: null, error: error }
    case AuthAction.LOGOUT:
      return { ...state, driver_account: null, error: null }
    default:
      return { ...state, driver_account: null, error: null }
  }
}

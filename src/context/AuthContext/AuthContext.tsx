import React, { useEffect, useReducer, useRef } from 'react'
import { useCookies } from 'react-cookie'
import { AuthAction, authReducer, getInitialState } from './AuthReduce'
import type { DriverAccount } from '../../interface/driverAccount.interface'
import { fetchLogin } from '../../apis/authApis'
import { fetchGetAccount } from '../../apis/accountApis'
import type { AuthResponse } from './AuthReduce.ts'

interface AuthContextType {
  login: (email: string, password: string) => Promise<void>
  loginOAuth2: () => void
  logOut: () => void
  state: AuthResponse
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['driver_account'])

  const initialState = getInitialState(cookies)
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Ref để đảm bảo chỉ fetch 1 lần, tránh reload loop
  const hasFetched = useRef(false)

  const fetchUserOnLoad = async () => {
    try {
      // apiClient sẽ tự động gửi HttpOnly cookie (nếu có)
      const response = await fetchGetAccount()
      console.log('response', response)
      // Server trả về user data, chúng ta cập nhật state
      if (response.data) {
        dispatch({
          type: AuthAction.LOGIN_SUCCESS as keyof typeof AuthAction,
          payload: { driver_account: response.data as DriverAccount, error: null }
        })
      } else {
        dispatch({
          type: AuthAction.LOGIN_FAILURE as keyof typeof AuthAction,
          payload: { driver_account: null, error: new Error('Không tìm thấy tài khoản') }
        })
      }
    } catch (err) {
      // Không sao, chỉ là người dùng chưa đăng nhập
      console.log('Chưa đăng nhập.', err)
    }
  }

  useEffect(() => {
    // Nếu trong state chưa có user (ví dụ sau khi F5 hoặc redirect)
    // VÀ chưa fetch lần nào
    if (!state.driver_account && !hasFetched.current) {
      hasFetched.current = true // Đánh dấu đã fetch
      fetchUserOnLoad()
    }
  }, [state.driver_account]) // Thêm dependency để React không cảnh báo

  // when state changes, set the cookies
  useEffect(() => {
    if (state.driver_account) {
      setCookie('driver_account', JSON.stringify(state.driver_account), {
        path: '/',
        maxAge: 15 * 60 * 1000
      })
    } else {
      removeCookie('driver_account', { path: '/' })
    }
  }, [state.driver_account, setCookie, removeCookie])

  // login
  const login = async (email: string, password: string) => {
    try {
      const data = await fetchLogin(email, password)
      dispatch({
        type: AuthAction.LOGIN_SUCCESS as keyof typeof AuthAction,
        payload: {
          driver_account: data.driver_account as DriverAccount,
          error: null
        }
      })
    } catch (error) {
      dispatch({
        type: AuthAction.LOGIN_FAILURE as keyof typeof AuthAction,
        payload: { driver_account: null, error: error as Error }
      })
    }
  }

  // login oauth2
  const loginOAuth2 = () => {
    // Đây là URL của backend NestJS, không phải của Google
    const backendGoogleLoginURL = 'http://localhost:3000/google/redirect'
    // Chuyển hướng toàn bộ trang
    window.location.href = backendGoogleLoginURL
  }

  // logout
  const logOut = () => {
    removeCookie('driver_account', { path: '/' })
    dispatch({
      type: AuthAction.LOGOUT as keyof typeof AuthAction,
      payload: { driver_account: null, error: null }
    })
    window.location.href = '/auth'
  }

  return <AuthContext.Provider value={{ login, loginOAuth2, logOut, state }}>{children}</AuthContext.Provider>
}

export default AuthContext
